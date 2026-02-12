
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, DollarSign, Tag, Layers, Send, ArrowLeft, ShoppingCart, FileText, Target, Briefcase, Wrench, TrendingUp, RefreshCw } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { SourcingEvent, Supplier, SourcingProcessType } from '../types';

export const NewEvent: React.FC = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    volume: '',
    category: '',
    targetPrice: '',
    unit: 'USD/Unidad',
    processType: 'spot' as SourcingProcessType,
    serviceRequirements: '',
    marketAnalysisScope: '',
    contractDuration: '',
    monthlyFee: '',
    extraServicesRate: '',
    currency: 'USD' as 'USD' | 'ARS',
    developmentStage: 'Prototype' as 'Prototype' | 'Pilot' | 'Production',
    vmiMinStock: '',
    vmiMaxStock: '',
    vmiLocation: '',
    marketIndex: '',
    hedgingStrategy: 'Spot' as 'Spot' | 'Forward' | 'Options'
  });

  const PROCESS_OPTIONS: { id: SourcingProcessType; label: string; description: string; icon: React.ReactNode }[] = [
    { id: 'spot', label: 'Compra Spot', description: 'Compra única y rápida para necesidades inmediatas.', icon: <ShoppingCart className="w-6 h-6 text-blue-600" /> },
    { id: 'tender', label: 'Licitación (RFP)', description: 'Proceso formal competitivo para contratos de alto valor.', icon: <FileText className="w-6 h-6 text-purple-600" /> },
    { id: 'strategic', label: 'Sourcing Estratégico', description: 'Análisis profundo de mercado y desarrollo de proveedores.', icon: <Target className="w-6 h-6 text-red-600" /> },
    { id: 'framework', label: 'Contrato Marco', description: 'Negociación de términos para compras recurrentes.', icon: <Briefcase className="w-6 h-6 text-green-600" /> },
    { id: 'NPI', label: 'NPI Sourcing', description: 'Abastecimiento para nuevos productos en desarrollo.', icon: <Wrench className="w-6 h-6 text-orange-600" /> },
    { id: 'VMI', label: 'Acuerdo VMI', description: 'Inventario gestionado por el proveedor.', icon: <RefreshCw className="w-6 h-6 text-teal-600" /> },
    { id: 'Commodity', label: 'Commodities', description: 'Compra de materias primas con cobertura.', icon: <TrendingUp className="w-6 h-6 text-yellow-600" /> },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateMockLeads = (basePrice: number): Supplier[] => {
    return [
      { name: 'Proveedor Estándar A', price: basePrice * 1.05, score: 85, risk: 'Bajo' },
      { name: 'Proveedor Económico B', price: basePrice * 0.98, score: 75, risk: 'Medio' },
      { name: 'Proveedor Premium C', price: basePrice * 1.12, score: 98, risk: 'Bajo' },
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.confirm(`¿Está seguro que desea crear el evento con moneda ${formData.currency}?`)) {
      return;
    }

    setIsSubmitting(true);

    const targetPrice = parseFloat(formData.targetPrice);
    const id = formData.title.toLowerCase().replace(/[^a-z0-9]/g, '_');

    const newEvent: SourcingEvent = {
      id: id,
      title: formData.title,
      volume: formData.volume,
      category: formData.category,
      targetPrice: targetPrice,
      unit: formData.unit,
      processType: formData.processType,
      serviceRequirements: formData.serviceRequirements,
      marketAnalysisScope: formData.marketAnalysisScope,
      contractDuration: formData.contractDuration,
      monthlyFee: formData.monthlyFee ? parseFloat(formData.monthlyFee) : undefined,
      extraServicesRate: formData.extraServicesRate ? parseFloat(formData.extraServicesRate) : undefined,
      status: 'Iniciado',
      currentStepIndex: -1,
      steps: ['Validación Requisición', 'Análisis Riesgo', 'Sourcing Automatizado', 'Adjudicación & OC'],

      leads: generateMockLeads(targetPrice || 0),
      currency: formData.currency,
      developmentStage: formData.processType === 'NPI' ? formData.developmentStage : undefined,
      vmiMinStock: formData.processType === 'VMI' ? parseFloat(formData.vmiMinStock) : undefined,
      vmiMaxStock: formData.processType === 'VMI' ? parseFloat(formData.vmiMaxStock) : undefined,
      vmiLocation: formData.processType === 'VMI' ? formData.vmiLocation : undefined,
      marketIndex: formData.processType === 'Commodity' ? formData.marketIndex : undefined,
      hedgingStrategy: formData.processType === 'Commodity' ? formData.hedgingStrategy : undefined,
    };

    // Simular delay de red
    setTimeout(() => {
      addEvent(newEvent);
      setIsSubmitting(false);
      navigate(`/events/${id}`);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-procure-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="bg-procure-600 px-8 py-6">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <PlusCircleIcon className="w-6 h-6 mr-3" />
            Crear Nuevo Sourcing Event
          </h1>
          <p className="text-blue-100 mt-2">
            Configure los parámetros iniciales para que los Agentes de IA inicien la búsqueda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Process Selection - Moved to Top */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de Proceso de Compra</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROCESS_OPTIONS.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setFormData({ ...formData, processType: option.id })}
                  className={`relative border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${formData.processType === option.id
                    ? 'border-procure-600 bg-procure-50 ring-1 ring-procure-600'
                    : 'border-gray-200 hover:border-procure-300'
                    }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${formData.processType === option.id ? 'text-procure-700' : 'text-gray-900'}`}>
                        {option.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  {formData.processType === option.id && (
                    <div className="absolute top-3 right-3 w-3 h-3 bg-procure-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título del Evento / Material</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Ej: Aditivo Acelerante Tipo C"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Moneda del Evento</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="currency"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 bg-white transition-colors"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="USD">USD - Dólar Estadounidense</option>
                  <option value="ARS">ARS - Peso Argentino</option>
                </select>
              </div>
            </div>

            {/* Dynamic Fields based on Process Type */}
            {formData.processType === 'spot' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Volumen / Cantidad</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Layers className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="volume"
                      required
                      placeholder="Ej: 5,000 Litros"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.volume}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="category"
                      required
                      placeholder="Ej: Químicos"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.processType === 'tender' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría del Servicio</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="category"
                      required
                      placeholder="Ej: Mantenimiento Industrial"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requerimientos del Servicio (RFP)</label>
                  <textarea
                    name="serviceRequirements"
                    required
                    rows={4}
                    placeholder="Describa los requerimientos técnicos, alcance del servicio y entregables esperados..."
                    className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                    value={formData.serviceRequirements}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {formData.processType === 'strategic' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría Estratégica</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="category"
                      required
                      placeholder="Ej: Materias Primas Críticas"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alcance del Análisis de Mercado</label>
                  <textarea
                    name="marketAnalysisScope"
                    required
                    rows={4}
                    placeholder="Defina el alcance geográfico, proveedores a investigar y objetivos de desarrollo..."
                    className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                    value={formData.marketAnalysisScope}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {formData.processType === 'framework' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duración del Contrato</label>
                    <input
                      type="text"
                      name="contractDuration"
                      required
                      placeholder="Ej: 24 Meses"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.contractDuration}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <input
                      type="text"
                      name="category"
                      required
                      placeholder="Ej: Servicios Generales"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Mensual Estimado</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="monthlyFee"
                        required
                        placeholder="0.00"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                        value={formData.monthlyFee}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tarifa Servicios Extra</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="extraServicesRate"
                        placeholder="0.00"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                        value={formData.extraServicesRate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.processType === 'NPI' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Etapa de Desarrollo</label>
                  <select
                    name="developmentStage"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                    value={formData.developmentStage}
                    onChange={handleChange}
                  >
                    <option value="Prototype">Prototipo</option>
                    <option value="Pilot">Piloto</option>
                    <option value="Production">Producción Masiva</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especificaciones Técnicas (Planos/CAD)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-procure-500 transition-colors cursor-pointer">
                    <Wrench className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Arrastre archivos aquí o haga clic para subir</p>
                  </div>
                </div>
              </div>
            )}

            {formData.processType === 'VMI' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                    <input
                      type="number"
                      name="vmiMinStock"
                      required
                      placeholder="Ej: 100"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.vmiMinStock}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Máximo</label>
                    <input
                      type="number"
                      name="vmiMaxStock"
                      required
                      placeholder="Ej: 500"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.vmiMaxStock}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación del Almacén</label>
                  <input
                    type="text"
                    name="vmiLocation"
                    required
                    placeholder="Ej: Planta Pilar - Almacén B"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                    value={formData.vmiLocation}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {formData.processType === 'Commodity' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Índice de Mercado Referencia</label>
                  <input
                    type="text"
                    name="marketIndex"
                    required
                    placeholder="Ej: LME Copper Grade A"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                    value={formData.marketIndex}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estrategia de Cobertura</label>
                  <select
                    name="hedgingStrategy"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                    value={formData.hedgingStrategy}
                    onChange={handleChange}
                  >
                    <option value="Spot">Spot (Sin Cobertura)</option>
                    <option value="Forward">Contrato Forward</option>
                    <option value="Options">Opciones (Call/Put)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Common Fields (Target Price & Unit) - Only for Spot, but maybe relevant for others? 
                User request implies specific fields for each. 
                Let's keep Target Price for Spot and maybe Tender/Strategic as 'Budget'. 
                For Framework we have Fee.
                Let's conditionally render Target Price too.
            */}

            {(formData.processType === 'spot' || formData.processType === 'tender' || formData.processType === 'NPI' || formData.processType === 'Commodity') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.processType === 'spot' ? 'Precio Objetivo (Target)' : 'Presupuesto Estimado'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="targetPrice"
                      required
                      step="0.01"
                      placeholder="0.00"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 transition-colors"
                      value={formData.targetPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad de Medida</label>
                  <select
                    name="unit"
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500 bg-white transition-colors"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option value="USD/Unidad">USD/Unidad</option>
                    <option value="USD/Ton">USD/Ton (Tonelada)</option>
                    <option value="USD/m3">USD/m³ (Metro Cúbico)</option>
                    <option value="USD/Lt">USD/Lt (Litro)</option>
                    <option value="USD/Gal">USD/Gal (Galón)</option>
                    <option value="USD/Servicio">USD/Servicio Global</option>
                  </select>
                </div>


              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white font-medium ${isSubmitting ? 'bg-procure-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando Agentes...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Crear y Activar Evento
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
        <div className="text-blue-500 mr-3">
          <Layers className="w-5 h-5" />
        </div>
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Al crear el evento, el Agente de Sourcing iniciará inmediatamente la búsqueda de proveedores en las redes conectadas (SAP Ariba, Coupa, etc.) basándose en la categoría seleccionada.
        </p>
      </div>
    </div>
  );
};

const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

