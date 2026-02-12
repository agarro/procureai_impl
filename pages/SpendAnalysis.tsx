import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { PieChart as PieChartIcon, Filter, Download, Sparkles } from 'lucide-react';

import { INITIAL_SPEND_DATA, SUPPLIER_DATA } from '../data/mockData';

export const SpendAnalysis: React.FC = () => {
    const [spendData, setSpendData] = useState(INITIAL_SPEND_DATA);
    const [isClassifying, setIsClassifying] = useState(false);

    const handleAIClassification = () => {
        setIsClassifying(true);
        setTimeout(() => {
            // Simulate AI moving 'Sin Clasificar' to other categories
            const unclassified = spendData.find(d => d.name === 'Sin Clasificar')?.value || 0;
            const newData = spendData
                .filter(d => d.name !== 'Sin Clasificar')
                .map(d => ({
                    ...d,
                    value: d.value + (unclassified / 4) // Distribute evenly for demo
                }));

            setSpendData(newData);
            setIsClassifying(false);
            alert('Clasificación automática completada. Se han categorizado $85,000 previamente no identificados.');
        }, 2500);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <PieChartIcon className="w-8 h-8 mr-3 text-procure-600" />
                        Análisis de Gastos (Spend Analysis)
                    </h1>
                    <p className="text-gray-500 mt-1">Visibilidad total del gasto con clasificación automática.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-50">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </button>
                    <button
                        onClick={handleAIClassification}
                        disabled={isClassifying || !spendData.find(d => d.name === 'Sin Clasificar')}
                        className="bg-procure-600 hover:bg-procure-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isClassifying ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Clasificando...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Clasificar con IA
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Category Breakdown */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Gasto por Categoría</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={spendData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {spendData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Suppliers */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Top 5 Proveedores</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={SUPPLIER_DATA} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                                <RechartsTooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                                <Bar dataKey="spend" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Gasto Total (YTD)</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">$1,215,000</p>
                    <span className="text-xs text-green-600 font-bold flex items-center mt-1">
                        +12% vs año anterior
                    </span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Proveedores Activos</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">142</p>
                    <span className="text-xs text-gray-500 mt-1">
                        15 nuevos este mes
                    </span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Ahorro Identificado</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">$85,400</p>
                    <span className="text-xs text-green-600 font-bold flex items-center mt-1">
                        7.2% del gasto total
                    </span>
                </div>
            </div>
        </div>
    );
};
