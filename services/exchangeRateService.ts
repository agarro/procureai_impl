
export interface ExchangeRate {
    nombre: string;
    compra: number;
    venta: number;
    fechaActualizacion: string;
}

const MOCK_RATES: ExchangeRate[] = [
    { nombre: 'Oficial', compra: 365.50, venta: 385.50, fechaActualizacion: new Date().toISOString() },
    { nombre: 'Blue', compra: 980.00, venta: 1000.00, fechaActualizacion: new Date().toISOString() },
    { nombre: 'Mep', compra: 990.00, venta: 995.00, fechaActualizacion: new Date().toISOString() },
    { nombre: 'Contado con liquidación', compra: 995.00, venta: 1010.00, fechaActualizacion: new Date().toISOString() },
    { nombre: 'Tarjeta', compra: 731.00, venta: 740.00, fechaActualizacion: new Date().toISOString() },
    { nombre: 'Cripto', compra: 1005.00, venta: 1015.00, fechaActualizacion: new Date().toISOString() }
];

export const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
    try {
        const response = await fetch('https://dolarapi.com/v1/dolares');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Map API response to our interface if needed, but dolarapi matches closely
        // The API returns an array of objects like { casa: "oficial", compra: 365.5, venta: 385.5, ... }
        // We map 'casa' to 'nombre' for consistency or just use the data as is if we adjust the interface.
        // Let's map it to be safe and consistent with our mock.
        return data.map((item: any) => ({
            nombre: item.nombre,
            compra: item.compra,
            venta: item.venta,
            fechaActualizacion: item.fechaActualizacion
        }));
    } catch (error) {
        console.warn('Failed to fetch exchange rates, using mock data:', error);
        return MOCK_RATES;
    }
};
