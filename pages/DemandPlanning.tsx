import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Bar, BarChart } from 'recharts';
import { TrendingUp, ShieldCheck, Activity, ArrowRight, BrainCircuit, RefreshCw } from 'lucide-react';
import { MOCK_FORECASTS } from '../services/mockData';

export const DemandPlanning: React.FC = () => {
    const [selectedMaterial, setSelectedMaterial] = useState('cemento_portland');
    const [isApplying, setIsApplying] = useState(false);

    // Filter data for selected material
    const data = MOCK_FORECASTS.filter(f => f.materialId === selectedMaterial);

    const handleApplyRecommendations = () => {
        setIsApplying(true);
        setTimeout(() => {
            alert('Parámetros de Stock de Seguridad actualizados en SAP S/4HANA exitosamente.');
            setIsApplying(false);
        }, 1500);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <BrainCircuit className="w-8 h-8 mr-3 text-purple-600" />
                        Demand Planning & AI Forecasting
                    </h1>
                    <p className="text-gray-500 mt-1">Predicción de demanda y optimización de inventario impulsada por IA.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        value={selectedMaterial}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                    >
                        <option value="cemento_portland">Cemento Portland</option>
                        <option value="aridos_triturados">Áridos Triturados (Grava)</option>
                        <option value="arena_silicea">Arena Silícea</option>
                        <option value="aditivo_plastificante">Aditivo Plastificante</option>
                        <option value="diesel_planta">Diesel Industrial</option>
                    </select>
                    <button
                        onClick={handleApplyRecommendations}
                        disabled={isApplying}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors disabled:opacity-70"
                    >
                        {isApplying ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                        {isApplying ? 'Sincronizando...' : 'Aplicar Recomendaciones'}
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">+5.2% vs Año Anterior</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Precisión del Forecast (MAPE)</h3>
                    <div className="text-2xl font-bold text-gray-900">94.8%</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <span className="text-purple-600 text-xs font-bold bg-purple-50 px-2 py-1 rounded-full">IA Activa</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Reducción Stock Seguridad</h3>
                    <div className="text-2xl font-bold text-gray-900">-18.5%</div>
                    <p className="text-xs text-gray-400 mt-1">Optimización dinámica vs estática</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-green-50 text-green-600">
                            <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">Estable</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Nivel de Servicio Proyectado</h3>
                    <div className="text-2xl font-bold text-gray-900">99.2%</div>
                </div>
            </div>

            {/* Main Chart: Forecast vs Actual */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Proyección de Demanda (6 Meses)</h2>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Legend verticalAlign="top" height={36} />

                            {/* Confidence Interval Area */}
                            <Area type="monotone" dataKey="confidenceUpper" fill="#e9d5ff" stroke="none" name="Intervalo Confianza" />
                            <Area type="monotone" dataKey="confidenceLower" fill="#ffffff" stroke="none" />

                            {/* Lines */}
                            <Line type="monotone" dataKey="actualDemand" stroke="#3b82f6" strokeWidth={3} name="Demanda Real" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="predictedDemand" stroke="#9333ea" strokeWidth={3} strokeDasharray="5 5" name="Predicción IA" dot={{ r: 4 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Safety Stock Optimization Chart */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Optimización Dinámica de Stock de Seguridad</h2>
                    <div className="flex items-center text-sm text-gray-500">
                        <span className="w-3 h-3 bg-gray-300 rounded-sm mr-2"></span> Estático (ERP)
                        <span className="w-3 h-3 bg-green-500 rounded-sm ml-4 mr-2"></span> Dinámico (IA)
                    </div>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barGap={0} barCategoryGap="20%">
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Bar dataKey="safetyStockStatic" name="Stock Seguridad Estático" fill="#d1d5db" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="safetyStockDynamic" name="Stock Seguridad Dinámico (IA)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start">
                    <ShieldCheck className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-green-800">Recomendación de IA</h4>
                        <p className="text-sm text-green-700 mt-1">
                            Se detecta una reducción de la variabilidad en la demanda para los próximos 3 meses.
                            Se recomienda reducir el stock de seguridad en un <strong>25%</strong> promedio, liberando capital de trabajo estimado en <strong>$45,000 USD</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
