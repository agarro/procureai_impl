import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExchangeRate, fetchExchangeRates } from '../services/exchangeRateService';

interface ExchangeRateContextType {
    rates: ExchangeRate[];
    selectedRateType: string; // 'Oficial', 'Blue', 'Custom', etc.
    customRateValue: number;
    setSelectedRateType: (type: string) => void;
    setCustomRateValue: (value: number) => void;
    getCurrentRateValue: () => number;
    convert: (amount: number, from: 'USD' | 'ARS', to: 'USD' | 'ARS') => number;
    refreshRates: () => Promise<void>;
}

const ExchangeRateContext = createContext<ExchangeRateContextType | undefined>(undefined);

export const ExchangeRateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rates, setRates] = useState<ExchangeRate[]>([]);
    const [selectedRateType, setSelectedRateType] = useState<string>('Oficial');
    const [customRateValue, setCustomRateValue] = useState<number>(1000);

    const refreshRates = async () => {
        const fetchedRates = await fetchExchangeRates();
        setRates(fetchedRates);
    };

    useEffect(() => {
        refreshRates();
    }, []);

    const getCurrentRateValue = () => {
        if (selectedRateType === 'Custom') {
            return customRateValue;
        }
        const rate = rates.find(r => r.nombre === selectedRateType);
        return rate ? rate.venta : 1000; // Default fallback
    };

    const convert = (amount: number, from: 'USD' | 'ARS', to: 'USD' | 'ARS') => {
        if (from === to) return amount;
        const rate = getCurrentRateValue();
        if (from === 'USD' && to === 'ARS') {
            return amount * rate;
        } else {
            return amount / rate;
        }
    };

    return (
        <ExchangeRateContext.Provider value={{
            rates,
            selectedRateType,
            customRateValue,
            setSelectedRateType,
            setCustomRateValue,
            getCurrentRateValue,
            convert,
            refreshRates
        }}>
            {children}
        </ExchangeRateContext.Provider>
    );
};

export const useExchangeRate = () => {
    const context = useContext(ExchangeRateContext);
    if (context === undefined) {
        throw new Error('useExchangeRate must be used within an ExchangeRateProvider');
    }
    return context;
};
