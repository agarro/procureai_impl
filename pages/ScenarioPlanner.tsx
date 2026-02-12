import React, { useState } from 'react';
import { GitBranch, Play, AlertTriangle, CheckCircle, Truck, Factory, Package, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SCENARIO_SIMULATIONS } from '../services/mockData';

export const ScenarioPlanner: React.FC = () => {
    const [selectedMaterial, setSelectedMaterial] = useState('cemento_portland');
    const [delayWeeks, setDelayWeeks] = useState(2);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationResult, setSimulationResult] = useState<any>(null);
    const [executedActions, setExecutedActions] = useState<number[]>([]);

    const handleExecuteAction = (index: number) => {
        setExecutedActions(prev => [...prev, index]);
        alert('Acción mitigante ejecutada exitosamente. Se ha notificado a los equipos correspondientes.');
    };

    const handleSimulate = () => {
        setIsSimulating(true);
        setSimulationResult(null);

        // Mock simulation delay
        setTimeout(() => {
            const result = SCENARIO_SIMULATIONS[selectedMaterial];
            if (result) {
                setSimulationResult(result);
            } else {
                // Fallback for safety
                setSimulationResult({
                    impact: 'High',
                    productionStoppage: '2024-03-15',
                    revenueRisk: 150000,
                    inventoryProjection: [],
                    recommendations: []
                });
            }
            setIsSimulating(false);
        }, 2000);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <GitBranch className="w-8 h-8 mr-3 text-indigo-600" />
                    Scenario Planner & Simulation
                </h1>
                <p className="text-gray-500 mt-1">Simulación de impacto en cadena de suministro ("What-If Analysis").</p>
            </div>

            {/* Simulation Controls */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Configuración del Escenario</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Material Crítico</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={selectedMaterial}
                            onChange={(e) => setSelectedMaterial(e.target.value)}
                        >
                            <option value="cemento_portland">Cemento Portland</option>
                            <option value="aridos_triturados">Áridos Triturados (Grava)</option>
                            <option value="arena_silicea">Arena Silícea</option>
                            <option value="aditivo_plastificante">Aditivo Plastificante</option>
                            <option value="diesel_planta">Diesel Industrial</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Escenario: Retraso de Proveedor (Semanas)</label>
                        <div className="flex items-center">
                            <input
                                type="range"
                                min="1"
                                max="8"
                                value={delayWeeks}
                                onChange={(e) => setDelayWeeks(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mr-4"
                            />
                            <span className="font-bold text-indigo-600 w-8">{delayWeeks} sem</span>
                        </div>
                    </div>
                    <button
                        onClick={handleSimulate}
                        disabled={isSimulating}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-colors disabled:opacity-70"
                    >
                        {isSimulating ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> : <Play className="w-4 h-4 mr-2" />}
                        {isSimulating ? 'Simulando...' : 'Ejecutar Simulación'}
                    </button>
                </div>
            </div>

            {/* Results */}
            {simulationResult && (
                <div className="space-y-6 animate-fade-in">
                    {/* Impact Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <div className="flex items-center mb-2">
                                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                                <h3 className="font-bold text-red-800">Riesgo de Parada</h3>
                            </div>
                            <p className="text-3xl font-bold text-red-700">{simulationResult.productionStoppage}</p>
                            <p className="text-sm text-red-600 mt-1">Fecha estimada de quiebre de stock</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-2">
                                <Factory className="w-5 h-5 text-gray-500 mr-2" />
                                <h3 className="font-bold text-gray-700">Impacto Financiero</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">${simulationResult.revenueRisk.toLocaleString()}</p>
                            <p className="text-sm text-gray-500 mt-1">Ingresos en riesgo por falta de producción</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-2">
                                <Package className="w-5 h-5 text-gray-500 mr-2" />
                                <h3 className="font-bold text-gray-700">Stock Crítico</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">Semana 6</p>
                            <p className="text-sm text-gray-500 mt-1">Momento donde el inventario cae bajo cero</p>
                        </div>
                    </div>

                    {/* Visualization Chart */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Proyección de Inventario vs Requerimiento</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={simulationResult.inventoryProjection}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Bar dataKey="stock" name="Nivel de Stock" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="requirement" name="Requerimiento Producción" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Acciones Mitigantes Recomendadas</h3>
                        <div className="space-y-4">
                            {simulationResult.recommendations.map((rec: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start">
                                        <div className={`p-2 rounded-lg mr-4 ${rec.type === 'Expedite' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {rec.type === 'Expedite' ? <Truck className="w-5 h-5" /> : <GitBranch className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{rec.type}</h4>
                                            <p className="text-gray-600 text-sm">{rec.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Costo: <span className="font-medium text-gray-900">${rec.cost.toLocaleString()}</span></div>
                                        <div className="text-sm text-green-600 font-bold">Evita pérdida: ${rec.savings.toLocaleString()}</div>
                                    </div>
                                    <button
                                        onClick={() => handleExecuteAction(idx)}
                                        disabled={executedActions.includes(idx)}
                                        className={`ml-4 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center ${executedActions.includes(idx)
                                            ? 'bg-green-100 text-green-700 border border-green-200 cursor-default'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {executedActions.includes(idx) ? (
                                            <>
                                                <CheckCircle className="w-4 h-4 mr-1.5" />
                                                Ejecutado
                                            </>
                                        ) : (
                                            <>
                                                Ejecutar <ArrowRight className="w-4 h-4 ml-1.5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
