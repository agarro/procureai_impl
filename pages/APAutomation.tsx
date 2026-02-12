import React, { useState } from 'react';
import { FileText, CheckCircle, AlertCircle, RefreshCw, DollarSign, Clock } from 'lucide-react';

import { Invoice } from '../types';
import { MOCK_INVOICES } from '../data/mockData';

export const APAutomation: React.FC = () => {
    const [invoices, setInvoices] = useState(MOCK_INVOICES);
    const [isMatching, setIsMatching] = useState(false);

    const handleAutoMatch = () => {
        setIsMatching(true);
        setTimeout(() => {
            setInvoices(prev => prev.map(inv =>
                inv.status === 'Pending' ? { ...inv, status: 'Matched', matchScore: 100 } : inv
            ));
            setIsMatching(false);
            alert('Proceso de Three-Way Matching completado. 1 factura conciliada automáticamente.');
        }, 2000);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <DollarSign className="w-8 h-8 mr-3 text-procure-600" />
                        Automatización de Cuentas por Pagar (AP)
                    </h1>
                    <p className="text-gray-500 mt-1">Conciliación automática de facturas (3-Way Match).</p>
                </div>
                <button
                    onClick={handleAutoMatch}
                    disabled={isMatching || !invoices.some(i => i.status === 'Pending')}
                    className="bg-procure-600 hover:bg-procure-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isMatching ? 'animate-spin' : ''}`} />
                    {isMatching ? 'Conciliando...' : 'Ejecutar Auto-Match'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center">
                    <div className="p-3 bg-green-100 rounded-full text-green-600 mr-4">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-green-800 font-medium">Conciliadas Hoy</p>
                        <p className="text-2xl font-bold text-green-900">{invoices.filter(i => i.status === 'Matched').length}</p>
                    </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-full text-yellow-600 mr-4">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-yellow-800 font-medium">Pendientes</p>
                        <p className="text-2xl font-bold text-yellow-900">{invoices.filter(i => i.status === 'Pending').length}</p>
                    </div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center">
                    <div className="p-3 bg-red-100 rounded-full text-red-600 mr-4">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-red-800 font-medium">Excepciones</p>
                        <p className="text-2xl font-bold text-red-900">{invoices.filter(i => i.status === 'Exception').length}</p>
                    </div>
                </div>
            </div>

            {/* Invoice List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factura</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden de Compra</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Score</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {invoices.map((invoice) => (
                            <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                                            <div className="text-xs text-gray-500">{invoice.date}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{invoice.supplier}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${invoice.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer">{invoice.poNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${invoice.status === 'Matched' ? 'bg-green-100 text-green-800' :
                                            invoice.status === 'Exception' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {invoice.status === 'Matched' && <CheckCircle className="w-3 h-3 mr-1" />}
                                        {invoice.status === 'Exception' && <AlertCircle className="w-3 h-3 mr-1" />}
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                            <div
                                                className={`h-2 rounded-full ${invoice.matchScore < 80 ? 'bg-red-500' : invoice.matchScore < 100 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                style={{ width: `${invoice.matchScore}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{invoice.matchScore}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Help Section */}
            <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-600 text-sm leading-relaxed">
                <h3 className="font-bold text-gray-800 mb-2">Ayuda: Automatización de Cuentas por Pagar (AP)</h3>
                <p className="mb-4">
                    El módulo de <strong>Automatización de Cuentas por Pagar (AP)</strong> en ProcureAI se centra en optimizar el proceso de reconciliación de facturas mediante la técnica de <strong>"3-Way Match" (Conciliación de Tres Vías)</strong>.
                </p>

                <h4 className="font-semibold text-gray-700 mt-4 mb-1">¿Qué es el 3-Way Match?</h4>
                <p className="mb-2">
                    Es un control interno estándar en contabilidad para validar una factura antes de pagarla. Consiste en comparar tres documentos clave para asegurar que coincidan:
                </p>
                <ul className="list-disc list-inside mb-2 pl-2 space-y-1">
                    <li><strong>Orden de Compra (Purchase Order - PO):</strong> Lo que la empresa solicitó y autorizó comprar (cantidad y precio acordado).</li>
                    <li><strong>Recepción de Mercancías (Goods Receipt - GR):</strong> Lo que realmente llegó al almacén o se recibió como servicio (cantidad y calidad verificada).</li>
                    <li><strong>Factura del Proveedor (Invoice):</strong> Lo que el proveedor está cobrando.</li>
                </ul>
                <p className="mb-4">
                    Si los datos (Precios, Cantidades, Proveedor) coinciden en los tres documentos (con cierta tolerancia configurada), se considera un <strong>"Match"</strong> y la factura se aprueba para pago automáticamente. Si hay discrepancias, se marca como una <strong>"Excepción"</strong> para revisión manual.
                </p>

                <h4 className="font-semibold text-gray-700 mt-4 mb-1">Implementación en ProcureAI</h4>
                <p className="mb-2">En la interfaz actual, este módulo ofrece:</p>
                <ul className="list-disc list-inside mb-2 pl-2 space-y-1">
                    <li><strong>Tablero de Control (KPIs):</strong> Visualiza facturas conciliadas, pendientes y excepciones.</li>
                    <li><strong>Lista de Facturas:</strong> Muestra el estado y el <strong>Match Score</strong> (porcentaje de coincidencia).</li>
                    <li><strong>Funcionalidad de "Auto-Match":</strong> El botón simula el proceso inteligente que procesa facturas pendientes y las aprueba si cumplen las reglas.</li>
                </ul>
                <p className="mt-2 italic">
                    Este módulo reduce drásticamente el trabajo manual del equipo de Cuentas por Pagar, permitiéndoles enfocarse solo en las excepciones reales.
                </p>
            </div>
        </div>
    );
};
