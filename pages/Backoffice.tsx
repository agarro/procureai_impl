import React, { useState } from 'react';
import { Database, Server, Globe, CheckCircle, XCircle, RefreshCw, Save, Plus, Sliders, DollarSign } from 'lucide-react';
import { IntegrationConfig, RiskFactor } from '../types';
import { INITIAL_RISK_FACTORS } from '../services/mockData';
import { useExchangeRate } from '../context/ExchangeRateContext';

const INITIAL_INTEGRATIONS: IntegrationConfig[] = [
  { id: '1', name: 'SAP S/4HANA', type: 'ERP', status: 'conectado', lastSync: 'hace 2 min', details: 'Inventario, Módulos Finanzas' },
  { id: '2', name: 'Oracle NetSuite', type: 'ERP', status: 'desconectado', lastSync: 'hace 4 días', details: 'Libro Mayor Respaldo' },
  { id: '3', name: 'Red Ariba', type: 'Proveedor', status: 'conectado', lastSync: 'hace 10 min', details: 'Portal de Proveedores' },
  { id: '4', name: 'Coupa', type: 'Proveedor', status: 'conectado', lastSync: 'hace 1 hora', details: 'Gestión de Facturas' },
];

export const Backoffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'erp' | 'suppliers' | 'sources' | 'risk-weights' | 'exchange-rates'>('erp');
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>(INITIAL_RISK_FACTORS);
  const { rates, selectedRateType, setSelectedRateType, customRateValue, setCustomRateValue, refreshRates } = useExchangeRate();

  const handleWeightChange = (id: string, newWeight: number) => {
    setRiskFactors(prev => prev.map(rf =>
      rf.id === id ? { ...rf, weight: newWeight } : rf
    ));
  };

  const getTotalWeight = (category: 'provider' | 'market') => {
    return riskFactors
      .filter(rf => rf.category === category)
      .reduce((sum, rf) => sum + rf.weight, 0);
  };

  const TabButton: React.FC<{ id: string, label: string, icon: React.ReactNode }> = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors ${activeTab === id ? 'border-procure-600 text-procure-700 bg-procure-50' : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Backoffice del Sistema</h1>
        <p className="text-gray-500 mt-1">Gestione conexiones, fuentes de datos y permisos de agentes.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <TabButton id="erp" label="Conexiones ERP" icon={<Database className="w-4 h-4" />} />
          <TabButton id="suppliers" label="Redes de Proveedores" icon={<Server className="w-4 h-4" />} />
          <TabButton id="sources" label="Fuentes de Conocimiento (RAG)" icon={<Globe className="w-4 h-4" />} />
          <TabButton id="risk-weights" label="Ponderación de Riesgos" icon={<Sliders className="w-4 h-4" />} />
          <TabButton id="exchange-rates" label="Tipo de Cambio" icon={<DollarSign className="w-4 h-4" />} />
        </div>

        <div className="p-6">
          {activeTab === 'erp' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Sistemas Empresariales Conectados</h3>
                <button className="bg-procure-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-procure-700">
                  <Plus className="w-4 h-4 mr-2" /> Agregar Conexión
                </button>
              </div>

              <div className="grid gap-4">
                {integrations.filter(i => i.type === 'ERP').map(item => (
                  <IntegrationCard key={item.id} item={item} />
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4">Configuración API (Mock SAP)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">URL Endpoint</label>
                    <input type="text" defaultValue="https://api.sap-gateway.corp/v1/procure" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Token Auth (Bóveda)</label>
                    <input type="password" defaultValue="**********************" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Permiso de Agente:</strong> Los Agentes de Sourcing están autorizados actualmente para enviar RFQs a todos los portales conectados por debajo de $100k.
                </p>
              </div>
              <div className="grid gap-4">
                {integrations.filter(i => i.type === 'Proveedor').map(item => (
                  <IntegrationCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Base de Conocimiento del Agente (RAG)</h3>
              <p className="text-sm text-gray-500">Configure las fuentes de datos que los agentes utilizan para análisis de mercado y evaluación de riesgos.</p>

              <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Índice de Commodities Bloomberg</h5>
                      <p className="text-xs text-gray-500">Feed de Datos de Mercado en Vivo</p>
                    </div>
                  </div>
                  <div className="flex items-center text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4 mr-1" /> Activo</div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Repositorio Interno de Contratos</h5>
                      <p className="text-xs text-gray-500">Ingesta SharePoint / PDF</p>
                    </div>
                  </div>
                  <div className="flex items-center text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4 mr-1" /> Indexado (450 docs)</div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="flex items-center bg-procure-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-procure-700">
                  <Save className="w-4 h-4 mr-2" /> Guardar Configuración
                </button>
              </div>
            </div>
          )}

          {activeTab === 'risk-weights' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ponderación de Factores de Riesgo</h3>
                <p className="text-sm text-gray-500 mb-6">Ajuste la importancia relativa de cada factor para el cálculo del score de riesgo global.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Factores de Proveedor */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-700">Riesgo de Proveedor</h4>
                      <span className={`text-sm font-bold px-2 py-1 rounded ${getTotalWeight('provider') === 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        Total: {getTotalWeight('provider')}%
                      </span>
                    </div>
                    <div className="space-y-6">
                      {riskFactors.filter(rf => rf.category === 'provider').map(factor => (
                        <div key={factor.id}>
                          <div className="flex justify-between mb-1">
                            <label className="text-sm font-medium text-gray-700">{factor.name}</label>
                            <span className="text-sm font-bold text-procure-600">{factor.weight}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={factor.weight}
                            onChange={(e) => handleWeightChange(factor.id, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-procure-600"
                          />
                          <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Factores de Mercado */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-700">Riesgo de Mercado</h4>
                      <span className={`text-sm font-bold px-2 py-1 rounded ${getTotalWeight('market') === 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        Total: {getTotalWeight('market')}%
                      </span>
                    </div>
                    <div className="space-y-6">
                      {riskFactors.filter(rf => rf.category === 'market').map(factor => (
                        <div key={factor.id}>
                          <div className="flex justify-between mb-1">
                            <label className="text-sm font-medium text-gray-700">{factor.name}</label>
                            <span className="text-sm font-bold text-procure-600">{factor.weight}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={factor.weight}
                            onChange={(e) => handleWeightChange(factor.id, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-procure-600"
                          />
                          <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button className="flex items-center bg-procure-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-procure-700 shadow-sm transition-all hover:shadow-md">
                  <Save className="w-4 h-4 mr-2" /> Guardar Ponderaciones
                </button>
              </div>
            </div>
          )}

          {activeTab === 'exchange-rates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Configuración de Tipo de Cambio</h3>
                <button
                  onClick={() => refreshRates()}
                  className="text-procure-600 hover:text-procure-800 text-sm font-medium flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Actualizar Tasas
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Seleccione el tipo de cambio que se utilizará como referencia para convertir valores a ARS en el Dashboard y para los cálculos de eventos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-700 mb-4">Tasas de Mercado (Argentina)</h4>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Compra</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Venta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {rates.map((rate) => (
                          <tr key={rate.nombre} className={selectedRateType === rate.nombre ? 'bg-blue-50' : ''}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{rate.nombre}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-right">${rate.compra.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 text-right">${rate.venta.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-700 mb-4">Configuración de Referencia</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cambio de Referencia</label>
                      <select
                        value={selectedRateType}
                        onChange={(e) => setSelectedRateType(e.target.value)}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-procure-500 focus:border-procure-500"
                      >
                        {rates.map((rate) => (
                          <option key={rate.nombre} value={rate.nombre}>
                            {rate.nombre} (Actual: ${rate.venta.toFixed(2)})
                          </option>
                        ))}
                        <option value="Custom">Personalizado (Manual)</option>
                      </select>
                    </div>

                    {selectedRateType === 'Custom' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Valor Personalizado (ARS/USD)</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">$</span>
                          </div>
                          <input
                            type="number"
                            value={customRateValue}
                            onChange={(e) => setCustomRateValue(parseFloat(e.target.value))}
                            className="block w-full pl-7 border border-gray-300 rounded-lg px-3 py-2 focus:ring-procure-500 focus:border-procure-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const IntegrationCard: React.FC<{ item: IntegrationConfig }> = ({ item }) => (
  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
    <div className="flex items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${item.status === 'conectado' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
        {item.type === 'ERP' ? <Database className="w-5 h-5" /> : <Server className="w-5 h-5" />}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
        <p className="text-xs text-gray-500">{item.details}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <div className={`flex items-center justify-end text-xs font-bold uppercase ${item.status === 'conectado' ? 'text-green-600' : 'text-gray-400'}`}>
          {item.status === 'conectado' ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
          {item.status}
        </div>
        <p className="text-xs text-gray-400 mt-0.5">Sync: {item.lastSync}</p>
      </div>
      <button className="text-gray-400 hover:text-procure-600">
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  </div>
);