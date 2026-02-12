import React, { useState } from 'react';
import { FileText, Plus, CheckCircle, Clock, AlertTriangle, PenTool, Search, X, Save, Edit2 } from 'lucide-react';

import { Contract } from '../types';
import { MOCK_CONTRACTS } from '../data/mockData';


export const ContractManager: React.FC = () => {
    const [contracts, setContracts] = useState(MOCK_CONTRACTS);
    const [isDrafting, setIsDrafting] = useState(false);
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<{ title: string, content: string }>({ title: '', content: '' });

    const handleAIDraft = () => {
        setIsDrafting(true);
        setTimeout(() => {
            const newContract: Contract = {
                id: `CTR-2024-00${contracts.length + 1}`,
                title: 'Nuevo Contrato Generado por IA',
                supplier: 'Proveedor Pendiente',
                value: 0,
                status: 'Draft',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                aiRiskScore: 0,
                content: `CONTRATO GENERADO POR IA

Este es un borrador inicial generado automáticamente basado en sus parámetros.
Por favor revise y complete las secciones faltantes.`
            };
            setContracts([newContract, ...contracts]);
            setIsDrafting(false);
            alert('Borrador de contrato generado exitosamente.');
        }, 2000);
    };

    const openContract = (contract: Contract) => {
        setSelectedContract(contract);
        setEditForm({ title: contract.title, content: contract.content });
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!selectedContract) return;

        const updatedContracts = contracts.map(c =>
            c.id === selectedContract.id
                ? { ...c, title: editForm.title, content: editForm.content }
                : c
        );

        setContracts(updatedContracts);
        setSelectedContract({ ...selectedContract, title: editForm.title, content: editForm.content });
        setIsEditing(false);
        alert('Cambios guardados exitosamente.');
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <FileText className="w-8 h-8 mr-3 text-procure-600" />
                        Gestión de Contratos (CLM)
                    </h1>
                    <p className="text-gray-500 mt-1">Ciclo de vida de contratos potenciado por IA Generativa.</p>
                </div>
                <button
                    onClick={handleAIDraft}
                    disabled={isDrafting}
                    className="bg-procure-600 hover:bg-procure-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm"
                >
                    {isDrafting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Redactando...
                        </>
                    ) : (
                        <>
                            <PenTool className="w-4 h-4 mr-2" />
                            Redactar con IA
                        </>
                    )}
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex items-center">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                    type="text"
                    placeholder="Buscar contratos por título, proveedor o ID..."
                    className="flex-1 outline-none text-gray-700"
                />
            </div>

            {/* Contracts List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contrato</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vigencia</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Riesgo IA</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {contracts.map((contract) => (
                            <tr
                                key={contract.id}
                                onClick={() => openContract(contract)}
                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{contract.title}</div>
                                            <div className="text-xs text-gray-500">{contract.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contract.supplier}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${contract.value.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {contract.startDate} - {contract.endDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${contract.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            contract.status === 'Expiring' ? 'bg-red-100 text-red-800' :
                                                contract.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                        {contract.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                            <div
                                                className={`h-2 rounded-full ${contract.aiRiskScore > 50 ? 'bg-red-500' : contract.aiRiskScore > 20 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                style={{ width: `${contract.aiRiskScore}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{contract.aiRiskScore}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Contract Modal */}
            {selectedContract && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in-up">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <div className="flex-1 mr-4">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="text-xl font-bold text-gray-900 w-full border-b-2 border-procure-500 focus:outline-none"
                                    />
                                ) : (
                                    <h2 className="text-xl font-bold text-gray-900">{selectedContract.title}</h2>
                                )}
                                <p className="text-sm text-gray-500 mt-1">{selectedContract.id} • {selectedContract.supplier}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="p-2 text-gray-500 hover:text-procure-600 hover:bg-procure-50 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center px-3 py-1.5 bg-procure-600 text-white rounded-lg hover:bg-procure-700 text-sm font-medium"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Guardar
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelectedContract(null)}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm min-h-[500px] p-8">
                                {isEditing ? (
                                    <textarea
                                        value={editForm.content}
                                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                        className="w-full h-full min-h-[500px] resize-none focus:outline-none text-gray-800 font-mono text-sm leading-relaxed"
                                    />
                                ) : (
                                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                                        {selectedContract.content}
                                    </pre>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Help Section */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Guía de Gestión de Contratos y Riesgo IA
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-medium text-blue-800 mb-2">Ciclo de Vida de Contratos (CLM)</h4>
                        <p className="text-sm text-blue-700 mb-2">
                            Esta herramienta centraliza y automatiza la gestión de contratos utilizando Inteligencia Artificial Generativa.
                        </p>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                            <li><strong>Redacción Automática:</strong> Generación de borradores legales en segundos.</li>
                            <li><strong>Repositorio Centralizado:</strong> Búsqueda inteligente y organización.</li>
                            <li><strong>Monitoreo de Vigencia:</strong> Alertas de vencimientos y renovaciones.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-blue-800 mb-2">Cálculo del "Riesgo IA"</h4>
                        <p className="text-sm text-blue-700 mb-2">
                            Métrica compuesta (0-100%) que evalúa la salud legal y operativa en tiempo real, ponderando:
                        </p>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                            <li><strong>Ambigüedad (30%):</strong> Lenguaje vago o indefinido.</li>
                            <li><strong>Cumplimiento (25%):</strong> Alineación con regulaciones.</li>
                            <li><strong>Historial (20%):</strong> Disputas previas del proveedor.</li>
                            <li><strong>Desviación (15%):</strong> Diferencias con plantillas estándar.</li>
                            <li><strong>Financiero (10%):</strong> Términos de pago inusuales.</li>
                        </ul>
                        <div className="mt-3 flex space-x-4 text-xs font-medium">
                            <span className="text-green-700">● 0-20% Bajo</span>
                            <span className="text-yellow-700">● 21-50% Medio</span>
                            <span className="text-red-700">● &gt;50% Alto</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
