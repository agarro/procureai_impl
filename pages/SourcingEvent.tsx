
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Play, CheckCheck, Download, Bot, Gavel, Database, AlertTriangle, Send, Monitor, Check } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { AgentMessage } from '../types';
import { generatePurchaseOrderPDF } from '../services/pdfService';
import { useExchangeRate } from '../context/ExchangeRateContext';

export const SourcingEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const { convert, getCurrentRateValue } = useExchangeRate();

  // Local state for simulation UI
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [isStepLoading, setIsStepLoading] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Get current event from context
  const event = id ? events[id] : null;

  // Load initial chat when event changes
  useEffect(() => {
    if (event) {
      // Reset state when ID changes
      setIsSimulating(false);
      setSimulationStep(0);
      setIsStepLoading(false);
      setSimulationComplete(event.status === 'Completado');

      const initialMsg: AgentMessage = {
        id: 'init',
        sender: 'procure',
        senderName: 'Orquestador ProcureAI',
        icon: 'monitor',
        text: event.status === 'Completado'
          ? `Evento finalizado. El proveedor ${event.finalSupplier} fue adjudicado.`
          : `Listo para iniciar sourcing autónomo para ${event.title}. Haga clic en "Iniciar Flujo" para comenzar la negociación de agentes.`,
        timestamp: new Date()
      };
      setMessages([initialMsg]);
    }
  }, [id]); // Only re-initialize when the event ID changes, preserving logs during status updates

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = async (msg: Omit<AgentMessage, 'id' | 'timestamp'>, delay = 1000) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setMessages(prev => [...prev, { ...msg, id: Math.random().toString(), timestamp: new Date() }]);
        resolve();
      }, delay);
    });
  };

  const executeNextStep = async () => {
    if (!event || !id) return;

    setIsSimulating(true);
    setIsStepLoading(true);

    try {
      switch (simulationStep) {
        case 0: // Step 1: Validation
          updateEvent(id, { currentStepIndex: 0, status: 'En Progreso' });
          await addMessage({
            sender: 'procure',
            senderName: 'Orquestador',
            icon: 'monitor',
            text: `Req ${event.id.toUpperCase()}. Solicitando validación de inventario y agregación de demanda.`,
            thinking: "Analizando solicitud de compra... Identificando categoría y unidad de negocio... Iniciando protocolo de validación de requisitos..."
          }, 800);
          await addMessage({
            sender: 'erp',
            senderName: 'Conector ERP',
            icon: 'database',
            text: `Recibido. Verificando niveles de stock en nodos de almacén...`,
            thinking: "Consultando API SAP S/4HANA (MM Module)... Verificando disponibilidad en almacenes regionales... Comprobando stock de seguridad y puntos de reorden..."
          }, 1500);

          const isService = event.category.includes('Servicio') || event.category.includes('MRO');

          // Calculate simulated dates for services
          let serviceTableData;
          if (isService) {
            const today = new Date();
            // Random start date between 1 and 11 months ago
            const monthsAgo = Math.floor(Math.random() * 10) + 1;
            const startDate = new Date(today);
            startDate.setMonth(today.getMonth() - monthsAgo);

            // End date is exactly 1 year after start date
            const endDate = new Date(startDate);
            endDate.setFullYear(startDate.getFullYear() + 1);

            // Calculate days remaining
            const diffTime = Math.abs(endDate.getTime() - today.getTime());
            const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Format dates
            const formatDate = (date: Date) => date.toISOString().split('T')[0];

            serviceTableData = {
              headers: ['Origen', 'Inicio Contrato', 'Fin Contrato', 'Días Restantes', 'Renovable', 'Empresa Actual'],
              rows: [
                ['Contrato Marco', formatDate(startDate), formatDate(endDate), `${daysRemaining} días`, event.renewable ? 'Sí' : 'No', event.incumbentSupplier || '-']
              ]
            };
          }

          await addMessage({
            sender: 'erp',
            senderName: 'Conector ERP',
            icon: 'database',
            text: isService
              ? `Información de contrato vigente recuperada. Detalle de servicio:`
              : `Confirmado: Por debajo del stock de seguridad. Detalle de agregación de demanda:`,
            thinking: isService
              ? "Recuperando metadatos del contrato marco... Calculando vigencia y consumo acumulado..."
              : "Consolidando requerimientos de múltiples centros... Calculando déficit total vs stock mínimo...",
            tableData: isService ? serviceTableData : {
              headers: ['Origen', 'Cant. Solicitada', 'Stock Actual', 'Estado'],
              rows: [
                ['Almacén Central', '5,000 un', '1,200 un', <span className="text-red-600 font-bold">Crítico</span>],
                ['Planta Norte', '3,000 un', '800 un', <span className="text-yellow-600 font-bold">Bajo</span>],
                ['Stock Seguridad', '2,000 un', '0 un', <span className="text-red-600 font-bold">Vacío</span>],
                ['Total Agregado', event.volume, '-', <span className="text-green-600 font-bold">Aprobado</span>]
              ]
            }
          }, 1500);
          setSimulationStep(1);
          break;

        case 1: // Step 2: Risk & Offers
          updateEvent(id, { currentStepIndex: 1 });
          const bestSupplier = event.leads.reduce((prev, current) => (prev.score > current.score) ? prev : current);

          await addMessage({
            sender: 'sourcing',
            senderName: 'Agente de Sourcing',
            icon: 'send',
            text: `Contactando a ${event.leads.length} proveedores calificados...`,
            thinking: "Consultando base de proveedores homologados... Filtrando por categoría, capacidad y rating de desempeño... Generando RFQ personalizado..."
          }, 1000);

          // Generate mock offers
          const offers = event.leads.map(lead => ({
            name: lead.name,
            price: convert(event.targetPrice * (0.9 + Math.random() * 0.2), 'USD', event.currency || 'ARS'), // Convert base target to event currency
            delivery: Math.floor(10 + Math.random() * 20) + ' días',
            score: lead.score,
            risk: lead.risk
          }));

          const isServiceStep2 = event.category.includes('Servicio') || event.category.includes('MRO');

          await addMessage({
            sender: 'sourcing',
            senderName: 'Agente de Sourcing',
            icon: 'send',
            text: `Se han recibido ${offers.length} ofertas. Generando cuadro comparativo:`,
            thinking: "Procesando respuestas de proveedores... Normalizando términos comerciales y fechas de entrega... Calculando TCO (Total Cost of Ownership)...",
            tableData: {
              headers: isServiceStep2
                ? ['Proveedor', 'Precio', 'Score', 'Riesgo']
                : ['Proveedor', 'Precio', 'Entrega', 'Score', 'Riesgo'],
              rows: offers.map(o => {
                const commonRow = [
                  o.name,
                  `$${o.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                ];

                if (!isServiceStep2) {
                  commonRow.push(o.delivery);
                }

                commonRow.push(
                  o.score,
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${o.risk === 'Bajo' ? 'bg-green-100 text-green-800' :
                    o.risk === 'Medio' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>{o.risk}</span>
                );

                return commonRow;
              })
            }
          }, 1500);

          await addMessage({
            sender: 'risk',
            senderName: 'Agente de Riesgo',
            icon: 'alert-triangle',
            text: `Análisis Completo. ${bestSupplier.name} (Score: ${bestSupplier.score}) identificado como la mejor opción integral.`,
            thinking: "Evaluando salud financiera de proveedores... Verificando listas de sanciones (OFAC, EU)... Analizando riesgos geopolíticos y de cadena de suministro..."
          }, 1500);
          setSimulationStep(2);
          break;

        case 2: // Step 3: Sourcing & Negotiation
          updateEvent(id, { currentStepIndex: 2 });
          const supplier = event.leads.reduce((prev, current) => (prev.score > current.score) ? prev : current);
          // Prices in Event Currency
          const baseTarget = event.currency === 'USD' ? event.targetPrice : convert(event.targetPrice, 'USD', 'ARS'); // Assuming targetPrice in mockData is USD base? Actually NewEvent sets it.
          // Wait, NewEvent sets targetPrice in the selected currency. So event.targetPrice IS in event.currency.
          // BUT, if we switch currency, we need to convert the target price? 
          // The requirement says "Asegurate que los valores se convierten". 
          // If I switch the toggle, I should probably update the targetPrice in the event?
          // Or just interpret the value differently?
          // Let's assume targetPrice is stored in the currency selected at creation.
          // If I switch currency in the UI, I should update the event's targetPrice and currency.
          // The toggle above updates event.currency. But it doesn't convert the value.
          // I should update the toggle to convert the value too.

          const startPrice = event.targetPrice * 1.15;
          const round1Price = event.targetPrice * 1.05;
          const finalNegPrice = event.targetPrice * 0.95;

          await addMessage({
            sender: 'sourcing',
            senderName: 'Agente de Sourcing',
            icon: 'send',
            text: `Iniciando protocolo de negociación automatizada con ${supplier.name}.`,
            thinking: "Definiendo estrategia de negociación (BATNA/ZOPA)... Estableciendo parámetros de precio objetivo y límites de concesión..."
          }, 1000);
          await addMessage({
            sender: 'sourcing',
            senderName: 'Agente de Sourcing',
            icon: 'send',
            text: `Ronda 1: Enviada oferta inicial basada en volumen histórico.`,
            thinking: "Generando propuesta inicial agresiva pero realista... Aprovechando apalancamiento por volumen consolidado..."
          }, 1500);
          await addMessage({
            sender: 'sourcing',
            senderName: 'Agente de Sourcing',
            icon: 'send',
            text: `Contraoferta recibida. Analizando márgenes...`,
            thinking: "Evaluando contrapropuesta del proveedor... Comparando con precios de mercado y costos históricos... Calculando impacto en margen..."
          }, 1500);

          await addMessage({
            sender: 'sourcing',
            senderName: 'Agente de Sourcing',
            icon: 'send',
            text: `Negociación finalizada exitosamente. Resumen de rondas:`,
            thinking: "Validando acuerdo final... Verificando cumplimiento de objetivos de ahorro... Cerrando términos comerciales...",
            tableData: {
              headers: ['Ronda', 'Oferta ($)', 'Ahorro vs Target', 'Estado'],
              rows: [
                ['Inicial', `$${startPrice.toFixed(2)}`, <span className="text-red-500">-15%</span>, 'Rechazada'],
                ['Ronda 1', `$${round1Price.toFixed(2)}`, <span className="text-yellow-500">-5%</span>, 'Contraoferta'],
                ['Final', `$${finalNegPrice.toFixed(2)}`, <span className="text-green-600 font-bold">+5%</span>, <span className="bg-green-100 text-green-800 px-2 rounded">Aceptada</span>]
              ]
            }
          }, 2000);
          setSimulationStep(3);
          break;

        case 3: // Step 4: Adjudication
          updateEvent(id, { currentStepIndex: 3 });
          const winningSupplier = event.leads.reduce((prev, current) => (prev.score > current.score) ? prev : current);

          await addMessage({
            sender: 'legal',
            senderName: 'Agente Legal',
            icon: 'gavel',
            text: `Iniciando validación contractual y normativa con el proveedor ${winningSupplier.name}.`,
            thinking: "Recuperando plantillas de contrato estándar... Verificando cláusulas de responsabilidad y garantías... Revisando cumplimiento de políticas internas..."
          }, 1000);

          await addMessage({
            sender: 'legal',
            senderName: 'Agente Legal',
            icon: 'gavel',
            text: `Verificación de cumplimiento completada:`,
            thinking: "Validando firmas digitales... Confirmando aceptación de términos y condiciones... Archivando auditoría de cumplimiento...",
            tableData: {
              headers: ['Requisito', 'Estado', 'Verificado Por', 'Timestamp'],
              rows: [
                ['Términos Legales', <span className="text-green-600 flex items-center"><Check className="w-3 h-3 mr-1" /> OK</span>, 'Legal Bot', '10:42:01'],
                ['SLA Garantizado', <span className="text-green-600 flex items-center"><Check className="w-3 h-3 mr-1" /> OK</span>, 'Sourcing Bot', '10:42:05'],
                ['Compliance Financiero', <span className="text-green-600 flex items-center"><Check className="w-3 h-3 mr-1" /> OK</span>, 'Risk Bot', '10:42:12'],
                ['Aprobación Presupuestaria', <span className="text-green-600 flex items-center"><Check className="w-3 h-3 mr-1" /> OK</span>, 'ERP Connector', '10:42:15']
              ]
            }
          }, 2000);

          const poNum = Math.floor(100000 + Math.random() * 900000);
          await addMessage({
            sender: 'erp',
            senderName: 'Conector ERP',
            icon: 'database',
            text: `OC #${poNum} generada para ${winningSupplier.name} y liberada automáticamente en SAP S/4HANA.`,
            thinking: "Verificando disponibilidad presupuestaria en centro de costos... Creando registro de Orden de Compra en SAP... Disparando flujo de aprobación (Auto-aprobado)..."
          }, 1500);

          // Final Update
          const price = event.targetPrice * 0.95;

          updateEvent(id, {
            status: 'Completado',
            finalSupplier: winningSupplier.name,
            finalPrice: price,
            poNumber: poNum,
            savings: (event.targetPrice - price) * 1000 // Mock calculation
          });

          setSimulationStep(4);
          setSimulationComplete(true);
          setIsSimulating(false);
          break;
      }
    } catch (error) {
      console.error("Simulation error:", error);
    } finally {
      setIsStepLoading(false);
    }
  };

  if (!event) return <div className="p-8 text-gray-500">Evento no encontrado o cargando...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded flex items-center"><LayersIcon className="w-3 h-3 mr-1" />{event.volume}</span>
            <span className="bg-gray-100 px-2 py-1 rounded flex items-center"><TagIcon className="w-3 h-3 mr-1" />{event.category}</span>
            <span className="text-green-600 font-medium flex items-center"><DollarIcon className="w-3 h-3 mr-1" />Objetivo: ${event.targetPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {event.currency}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${event.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {event.status}
        </div>
      </div>

      {/* Currency Selector for Initiated Events */}
      {event.status === 'Iniciado' && (
        <div className="mb-4 flex justify-end">
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-600">Moneda del Evento:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  if (event.currency === 'ARS') return;
                  const newPrice = convert(event.targetPrice, 'USD', 'ARS');
                  updateEvent(event.id, { currency: 'ARS', targetPrice: newPrice });
                }}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${event.currency === 'ARS' || !event.currency ? 'bg-white text-procure-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                ARS
              </button>
              <button
                onClick={() => {
                  if (event.currency === 'USD') return;
                  const newPrice = convert(event.targetPrice, 'ARS', 'USD');
                  updateEvent(event.id, { currency: 'USD', targetPrice: newPrice });
                }}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${event.currency === 'USD' ? 'bg-white text-procure-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                USD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Stepper */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="flex justify-between">
          {event.steps.map((step, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${idx <= event.currentStepIndex ? 'bg-procure-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                {idx < event.currentStepIndex ? <Check className="w-5 h-5" /> : idx + 1}
              </div>
              <span className={`text-xs mt-2 font-medium text-center px-1 ${idx <= event.currentStepIndex ? 'text-procure-700' : 'text-gray-400'}`}>{step}</span>
              {idx < event.steps.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 ${idx < event.currentStepIndex ? 'bg-procure-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 flex items-center">
              <Bot className="w-4 h-4 mr-2 text-procure-600" /> Log de Orquestación
            </h3>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {!isSimulating && !simulationComplete && simulationStep === 0 && (
                <button
                  onClick={executeNextStep}
                  className="bg-procure-600 hover:bg-procure-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center transition-colors"
                >
                  <Play className="w-4 h-4 mr-2" /> Iniciar Flujo
                </button>
              )}

              {isSimulating && !isStepLoading && !simulationComplete && (
                <span className="text-sm text-blue-600 font-medium animate-pulse">Esperando confirmación...</span>
              )}

              {isStepLoading && (
                <span className="text-sm text-procure-600 font-medium flex items-center">
                  <span className="w-2 h-2 bg-procure-600 rounded-full animate-bounce mr-1"></span>
                  <span className="w-2 h-2 bg-procure-600 rounded-full animate-bounce mr-1 delay-75"></span>
                  <span className="w-2 h-2 bg-procure-600 rounded-full animate-bounce delay-150"></span>
                  Procesando...
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col max-w-[90%] ${msg.sender === 'sourcing' || msg.sender === 'erp' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                <div className="flex items-center text-xs font-bold text-gray-500 mb-1 px-1">
                  {msg.sender === 'risk' && <AlertTriangle className="w-3 h-3 mr-1 text-red-500" />}
                  {msg.sender === 'erp' && <Database className="w-3 h-3 mr-1 text-green-600" />}
                  {msg.sender === 'legal' && <Gavel className="w-3 h-3 mr-1 text-purple-600" />}
                  {msg.sender === 'procure' && <Monitor className="w-3 h-3 mr-1 text-blue-600" />}
                  {msg.senderName}
                </div>
                <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'procure' ? 'bg-blue-50 text-blue-900 border border-blue-100 rounded-tl-none' :
                  msg.sender === 'risk' ? 'bg-red-50 text-red-900 border border-red-100 rounded-tl-none' :
                    msg.sender === 'erp' ? 'bg-green-50 text-green-900 border border-green-100 rounded-tr-none' :
                      'bg-white text-gray-800 border border-gray-200 rounded-tr-none'
                  }`}>
                  {msg.thinking && (
                    <div className="mb-3 pb-3 border-b border-gray-200/50">
                      <div className="flex items-center text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5 animate-pulse"></span>
                        Proceso de Pensamiento
                      </div>
                      <div className="text-xs text-gray-500 italic pl-2 border-l-2 border-gray-300">
                        {msg.thinking}
                      </div>
                    </div>
                  )}
                  {msg.text}
                </div>
                {msg.tableData && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {msg.tableData.headers.map((header, idx) => (
                            <th key={idx} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {msg.tableData.rows.map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="px-3 py-2 text-sm text-gray-700 whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Results Panel */}
        {simulationComplete && event.finalSupplier && (
          <div className="w-80 bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-fade-in flex flex-col">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Sourcing Completado</h3>
              <p className="text-sm text-gray-500">OC Liberada Exitosamente</p>
            </div>

            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Proveedor</span>
                <span className="font-semibold text-gray-900 text-right">{event.finalSupplier}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Precio Final</span>
                <span className="font-semibold text-procure-600 text-right">${event.finalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Ahorros</span>
                <span className="font-semibold text-green-600 text-right">${event.savings?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Número OC</span>
                <span className="font-mono bg-gray-100 px-2 rounded text-right">{event.poNumber}</span>
              </div>
            </div>

            <button
              onClick={() => generatePurchaseOrderPDF(event)}
              className="mt-auto w-full bg-procure-600 hover:bg-procure-700 text-white py-2 rounded-lg font-medium flex items-center justify-center transition-colors"
            >
              <Download className="w-4 h-4 mr-2" /> Descargar OC (PDF)
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {isSimulating && !isStepLoading && !simulationComplete && (
        <button
          onClick={executeNextStep}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center transition-all hover:scale-105 animate-bounce"
        >
          <Play className="w-5 h-5 mr-2" /> Continuar Siguiente Paso
        </button>
      )}
    </div>
  );
};

// Helper Icons
const LayersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
);
const TagIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
);
const DollarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
);
