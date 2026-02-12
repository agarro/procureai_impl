import React, { useState } from 'react';
import { AlertTriangle, Calendar, ArrowRight, CheckCircle, XCircle, Clock, ShoppingCart, FileText, Zap } from 'lucide-react';
import { MOCK_EXCEPTIONS, MOCK_REQUISITIONS } from '../services/mockData';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../components/Tooltip';

import { useAudit } from '../context/AuditContext';

export const MRPExceptions: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'exceptions' | 'requisitions'>('exceptions');
    const [processingId, setProcessingId] = useState<string | null>(null);
    const { addLog } = useAudit();

    const handleAction = (id: string, action: string) => {
        setProcessingId(id);
        addLog({
            type: 'USER_ACTION',
            module: 'MRP Control Tower',
            message: `User confirmed action: ${action}`,
            details: { itemId: id }
        });

        setTimeout(() => {
            alert(`Acción "${action}" ejecutada exitosamente.`);
            setProcessingId(null);
            addLog({
                type: 'TRANSACTION',
                module: 'MRP Control Tower',
                message: `Action executed successfully: ${action}`,
                details: { itemId: id, status: 'Success' }
            });
        }, 1000);
    };

    const handleConvertToEvent = (id: string) => {
        setProcessingId(id);
        addLog({
            type: 'AI_THOUGHT',
            module: 'MRP Control Tower',
            message: 'Converting Requisition to Sourcing Event',
            details: { requisitionId: id, reasoning: 'Low confidence score or high value requires manual sourcing.' }
        });

        setTimeout(() => {
            navigate('/new-event'); // In a real app, this would pass state to pre-fill the form
        }, 800);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Zap className="w-8 h-8 mr-3 text-yellow-600" />
                    MRP Control Tower
                </h1>
                <p className="text-gray-500 mt-1">Gestión de excepciones y automatización de solicitudes de pedido.</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
                <button
                    onClick={() => setActiveTab('exceptions')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'exceptions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Excepciones MRP ({MOCK_EXCEPTIONS.length})
                </button>
                <button
                    onClick={() => setActiveTab('requisitions')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'requisitions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Solicitudes Automáticas ({MOCK_REQUISITIONS.length})
                </button>
            </div>

            {activeTab === 'exceptions' && (
                <div className="space-y-4">
                    {MOCK_EXCEPTIONS.map((ex) => (
                        <div key={ex.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-full ${ex.impact === 'High' ? 'bg-red-100 text-red-600' :
                                    ex.impact === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${ex.type === 'Stockout Risk' ? 'bg-red-100 text-red-800' :
                                            ex.type === 'Reschedule In' ? 'bg-orange-100 text-orange-800' :
                                                ex.type === 'Cancel' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {ex.type}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" /> {ex.date}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{ex.materialName}</h3>
                                    <p className="text-gray-600 mt-1">{ex.description}</p>
                                    <p className="text-sm font-medium text-gray-500 mt-2">Impacto Financiero: <span className="text-gray-900">${ex.value.toLocaleString()}</span></p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Tooltip content={ex.actionDescription || 'Confirmar acción recomendada'}>
                                    <button
                                        onClick={() => handleAction(ex.id, 'Aceptar Recomendación')}
                                        disabled={processingId === ex.id}
                                        className="bg-procure-600 hover:bg-procure-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center min-w-[160px]"
                                    >
                                        {processingId === ex.id ? 'Procesando...' : 'Aceptar Acción'}
                                    </button>
                                </Tooltip>
                                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Ignorar / Posponer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'requisitions' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Entrega</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confianza IA</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origen</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {MOCK_REQUISITIONS.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{req.materialName}</div>
                                                <div className="text-xs text-gray-500">ID: {req.id.toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {req.quantity.toLocaleString()} {req.unit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {req.deliveryDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                <div
                                                    className={`h-2 rounded-full ${req.confidenceScore > 90 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                    style={{ width: `${req.confidenceScore}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-600">{req.confidenceScore}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${req.source === 'MRP Auto' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {req.source}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        {req.status === 'Pending' ? (
                                            <>
                                                <button
                                                    onClick={() => handleConvertToEvent(req.id)}
                                                    className="text-procure-600 hover:text-procure-900 font-medium"
                                                >
                                                    Sourcing Event
                                                </button>
                                                <span className="text-gray-300">|</span>
                                                <button
                                                    onClick={() => handleAction(req.id, 'Aprobar OC Directa')}
                                                    className="text-green-600 hover:text-green-900 font-medium"
                                                >
                                                    Aprobar OC
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-400 italic">Procesado</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Guía de Gestión: MRP Control Tower
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
                    <div>
                        <h4 className="font-semibold mb-2">Gestión de Excepciones</h4>
                        <p className="mb-2">
                            El sistema monitorea continuamente la cadena de suministro para detectar desviaciones críticas.
                            Las excepciones se clasifican por impacto financiero y tipo (Riesgo de Quiebre, Reprogramación, Cancelación).
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2 opacity-90">
                            <li><strong>Stockout Risk:</strong> Inventario proyectado por debajo del stock de seguridad. Acción: Acelerar entregas.</li>
                            <li><strong>Reschedule In:</strong> Demanda anticipada requiere adelantar recepciones.</li>
                            <li><strong>Cancel:</strong> Pedidos ya no necesarios por cambios en la demanda. Acción: Cancelar para evitar sobre-stock.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Automatización de Solicitudes (Touchless)</h4>
                        <p className="mb-2">
                            Las solicitudes de pedido (PR) generadas por el MRP son analizadas por el Agente de Compras.
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2 opacity-90">
                            <li><strong>Confianza IA &gt; 90%:</strong> Se pueden convertir automáticamente en Órdenes de Compra (OC) sin intervención humana si la configuración lo permite.</li>
                            <li><strong>Aprobar OC Directa:</strong> Convierte la solicitud en una OC enviada al proveedor adjudicado.</li>
                            <li><strong>Sourcing Event:</strong> Si no hay proveedor válido o el monto excede límites, se deriva a un evento de licitación.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
