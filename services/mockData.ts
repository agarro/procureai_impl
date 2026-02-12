
import { SourcingEvent, RiskFactor, DemandForecast, MRPException, PurchaseRequisition, MasterDataUpdate } from '../types';

export const INITIAL_RISK_FACTORS: RiskFactor[] = [
  // Factores de Proveedor
  { id: 'rf_p1', name: 'Estabilidad Financiera', category: 'provider', weight: 30, description: 'Solvencia y liquidez del proveedor' },
  { id: 'rf_p2', name: 'Cumplimiento Normativo', category: 'provider', weight: 25, description: 'Certificaciones y cumplimiento legal' },
  { id: 'rf_p3', name: 'Desempeño Histórico', category: 'provider', weight: 25, description: 'Evaluaciones previas y calidad de entregas' },
  { id: 'rf_p4', name: 'Capacidad Operativa', category: 'provider', weight: 20, description: 'Infraestructura y capacidad de producción' },

  // Factores de Mercado
  { id: 'rf_m1', name: 'Volatilidad de Precios', category: 'market', weight: 40, description: 'Fluctuaciones históricas en el precio del commodity' },
  { id: 'rf_m2', name: 'Disponibilidad Geopolítica', category: 'market', weight: 30, description: 'Riesgos asociados a la región de origen' },
  { id: 'rf_m3', name: 'Tendencia de Demanda', category: 'market', weight: 30, description: 'Proyecciones de demanda global' },
];

export const INTEGRATION_CONFIG: import('../types').IntegrationConfig[] = [
  { id: '1', name: 'SAP S/4HANA', type: 'ERP', status: 'conectado', lastSync: 'hace 2 min', details: 'Inventario, Módulos Finanzas' },
  { id: '2', name: 'Oracle NetSuite', type: 'ERP', status: 'desconectado', lastSync: 'hace 4 días', details: 'Libro Mayor Respaldo' },
  { id: '3', name: 'Red Ariba', type: 'Proveedor', status: 'conectado', lastSync: 'hace 10 min', details: 'Portal de Proveedores' },
  { id: '4', name: 'Coupa', type: 'Proveedor', status: 'conectado', lastSync: 'hace 1 hora', details: 'Gestión de Facturas' },
];

export const INITIAL_EVENTS: Record<string, SourcingEvent> = {
  'cemento_portland': {
    id: 'cemento_portland',
    title: 'Cemento Portland Granel',
    volume: '1,200 Toneladas',
    category: 'Materia Prima Crítica',
    targetPrice: 115.00,
    unit: 'USD/Ton',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'Cementos del Valle', price: 118.50, score: 96, risk: 'Bajo', esgScore: 85, qualityScore: 99 },
      { name: 'Holcim Industrial', price: 116.00, score: 92, risk: 'Bajo', esgScore: 90, qualityScore: 95 },
      { name: 'Importadora Global Cem', price: 112.00, score: 78, risk: 'Medio', esgScore: 60, qualityScore: 80 }
    ],
    steps: ['Validación Stock Silos', 'Matriz de Riesgo', 'Sourcing y Negociación', 'Generación OC']
  },
  'aridos_triturados': {
    id: 'aridos_triturados',
    title: 'Grava 3/4" Lavada',
    volume: '5,000 Metros Cúbicos',
    category: 'Materia Prima',
    targetPrice: 22.00,
    unit: 'USD/m³',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'Cantera La Piedra', price: 21.50, score: 88, risk: 'Bajo', esgScore: 75, qualityScore: 90 },
      { name: 'Agregados del Sur', price: 23.00, score: 95, risk: 'Bajo', esgScore: 88, qualityScore: 98 }
    ],
    steps: ['Validación Calidad', 'Análisis Logístico', 'Subasta Inversa', 'Contrato Marco']
  },
  'aditivo_plastificante': {
    id: 'aditivo_plastificante',
    title: 'Aditivo Superplastificante',
    volume: '20,000 Litros',
    category: 'Químicos',
    targetPrice: 4.50,
    unit: 'USD/Lt',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'Sika Construcción', price: 4.80, score: 98, risk: 'Bajo' },
      { name: 'BASF MasterBuilders', price: 4.65, score: 94, risk: 'Bajo' },
      { name: 'Químicos Locales SRL', price: 3.90, score: 70, risk: 'Alto' }
    ],
    steps: ['Validación Lab', 'Compliance Ambiental', 'Sourcing Global', 'Adjudicación']
  },
  'mantenimiento_mixers': {
    id: 'mantenimiento_mixers',
    title: 'Mantenimiento Flota Mixers',
    volume: 'Contrato Anual (20 Unidades)',
    category: 'Servicios MRO',
    targetPrice: 85000.00,
    unit: 'USD/Año',
    status: 'Iniciado',
    currentStepIndex: -1,
    contractStartDate: '2025-01-01',
    contractEndDate: '2025-12-31',
    daysRemaining: 45,
    renewable: true,
    incumbentSupplier: 'Talleres Diesel Pro',
    leads: [
      { name: 'Talleres Diesel Pro', price: 82000.00, score: 85, risk: 'Medio' },
      { name: 'Servicios Mecánicos Oficiales', price: 90000.00, score: 99, risk: 'Bajo' }
    ],
    steps: ['Alcance Técnico', 'Evaluación Talleres', 'Negociación Tarifas', 'Orden de Servicio']
  },
  'diesel_planta': {
    id: 'diesel_planta',
    title: 'Diesel B5 Industrial',
    volume: '50,000 Galones/Mes',
    category: 'Energía',
    targetPrice: 3.80,
    unit: 'USD/Gal',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'PetroEnergy Corp', price: 3.85, score: 95, risk: 'Bajo' },
      { name: 'Distribuidora FuelMax', price: 3.75, score: 82, risk: 'Medio' }
    ],
    steps: ['Proyección Consumo', 'Cobertura Precios', 'Sourcing Spot', 'Generación OC']
  },
  'epp_operativo': {
    id: 'epp_operativo',
    title: 'Dotación EPP Planta',
    volume: '200 Kits Completos',
    category: 'Seguridad Industrial',
    targetPrice: 150.00,
    unit: 'USD/Kit',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'Seguridad Total SA', price: 145.00, score: 90, risk: 'Bajo' },
      { name: 'Importadora Safety', price: 130.00, score: 85, risk: 'Medio' }
    ],
    steps: ['Validación Normativa', 'Muestreo', 'Compra Directa', 'OC']
  },
  'caliza_industrial': {
    id: 'caliza_industrial',
    title: 'Materia Prima: Caliza Industrial',
    volume: '500,000 Toneladas',
    category: 'Materia Prima Crítica',
    targetPrice: 7.50,
    unit: 'USD/Ton',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'Cantera del Norte S.A.', price: 7.80, score: 95, risk: 'Bajo' },
      { name: 'Minera Sierra Azul', price: 7.60, score: 88, risk: 'Bajo' },
      { name: 'Agregados La Roca', price: 7.20, score: 75, risk: 'Medio' }
    ],
    steps: ['Necesidad (Validación/Agrupación)', 'Estrategia (Riesgo/Mercado)', 'Sourcing (Evaluación Ofertas)', 'Adjudicación (OC Automática)']
  },
  'transporte_hormigon': {
    id: 'transporte_hormigon',
    title: 'Servicio: Transporte de Hormigón',
    volume: 'Contrato Anual (300,000m³)',
    category: 'Servicio Logístico',
    targetPrice: 15.00,
    unit: 'USD/m³',
    status: 'Iniciado',
    currentStepIndex: -1,
    contractStartDate: '2025-01-01',
    contractEndDate: '2025-12-31',
    daysRemaining: 30,
    renewable: true,
    incumbentSupplier: 'Logística Rápida',
    leads: [
      { name: 'Logística Rápida', price: 15.50, score: 90, risk: 'Bajo' },
      { name: 'Transportes Globales', price: 14.80, score: 85, risk: 'Bajo' },
      { name: 'Flota Express', price: 14.20, score: 70, risk: 'Medio' }
    ],
    steps: ['Necesidad (Validación/Agrupación)', 'Estrategia (Riesgo/Mercado)', 'Sourcing (Evaluación Ofertas)', 'Adjudicación (OC Automática)']
  },
  'mantenimiento_hornos': {
    id: 'mantenimiento_hornos',
    title: 'Servicio MRO: Mantenimiento de Hornos',
    volume: 'Contrato Bianual',
    category: 'MRO Especializado',
    targetPrice: 250000.00,
    unit: 'USD/Contrato',
    status: 'Iniciado',
    currentStepIndex: -1,
    contractStartDate: '2025-06-01',
    contractEndDate: '2026-05-31',
    daysRemaining: 180,
    renewable: false,
    incumbentSupplier: 'Industrial Maintenance Group',
    leads: [
      { name: 'ThermoTech Ing.', price: 260000.00, score: 99, risk: 'Bajo' },
      { name: 'Industrial Maintenance Group', price: 235000.00, score: 95, risk: 'Bajo' }
    ],
    steps: ['Necesidad (Validación/Agrupación)', 'Estrategia (Riesgo/Mercado)', 'Sourcing (Evaluación Ofertas)', 'Adjudicación (OC Automática)']
  },
  'arena_silicea': {
    id: 'arena_silicea',
    title: 'Arena Silícea Lavada',
    volume: '10,000 Toneladas',
    category: 'Materia Prima',
    targetPrice: 18.50,
    unit: 'USD/Ton',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'Arenera del Litoral', price: 19.00, score: 92, risk: 'Bajo' },
      { name: 'Silíleos Industriales', price: 18.20, score: 85, risk: 'Medio' }
    ],
    steps: ['Validación Calidad', 'Análisis Logístico', 'Subasta Inversa', 'Contrato Marco']
  },
  'ceniza_volante': {
    id: 'ceniza_volante',
    title: 'Ceniza Volante (Fly Ash) Tipo F',
    volume: '2,000 Toneladas',
    category: 'Aditivos',
    targetPrice: 45.00,
    unit: 'USD/Ton',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'EcoAsh Solutions', price: 44.50, score: 94, risk: 'Bajo' },
      { name: 'Materiales Sustentables', price: 46.00, score: 89, risk: 'Bajo' }
    ],
    steps: ['Pruebas Laboratorio', 'Certificación Ambiental', 'Negociación', 'OC']
  },
  'fibras_refuerzo': {
    id: 'fibras_refuerzo',
    title: 'Macrofibra Sintética Estructural',
    volume: '5,000 Kg',
    category: 'Aditivos',
    targetPrice: 8.50,
    unit: 'USD/Kg',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'FiberTech Global', price: 8.75, score: 96, risk: 'Bajo' },
      { name: 'Refuerzos Sintéticos SA', price: 8.40, score: 90, risk: 'Bajo' }
    ],
    steps: ['Especificación Técnica', 'Muestreo', 'Compra Directa', 'OC']
  },
  'servicio_bombeo': {
    id: 'servicio_bombeo',
    title: 'Servicio de Bombeo de Concreto',
    volume: 'Contrato Marco (20 Bombas)',
    category: 'Servicios Obra',
    targetPrice: 120000.00,
    unit: 'USD/Mes',
    status: 'Iniciado',
    currentStepIndex: -1,
    contractStartDate: '2025-03-01',
    contractEndDate: '2026-02-28',
    daysRemaining: 90,
    renewable: true,
    incumbentSupplier: 'Concreto Express',
    leads: [
      { name: 'Bombeos Profesionales', price: 125000.00, score: 93, risk: 'Bajo' },
      { name: 'Concreto Express', price: 118000.00, score: 80, risk: 'Medio' }
    ],
    steps: ['Disponibilidad Equipos', 'Tarifario', 'Negociación SLA', 'Contrato']
  },
  'neumaticos_mixers': {
    id: 'neumaticos_mixers',
    title: 'Neumáticos Radiales 12R22.5',
    volume: '100 Unidades',
    category: 'Repuestos',
    targetPrice: 450.00,
    unit: 'USD/Unidad',
    status: 'Iniciado',
    currentStepIndex: -1,
    leads: [
      { name: 'TireMaster Industrial', price: 455.00, score: 91, risk: 'Bajo' },
      { name: 'Importadora Rodar', price: 440.00, score: 85, risk: 'Medio' }
    ],
    steps: ['Homologación Marca', 'Comparativa Precios', 'Adjudicación', 'OC']
  },
  'agua_industrial': {
    id: 'agua_industrial',
    title: 'Suministro Agua Industrial Cisternas',
    volume: '50,000 m3',
    category: 'Servicios',
    targetPrice: 2.10,
    unit: 'USD/m3',
    status: 'Iniciado',
    currentStepIndex: -1,
    contractStartDate: '2025-01-01',
    contractEndDate: '2025-12-31',
    daysRemaining: 40,
    renewable: true,
    incumbentSupplier: 'Aguas del Valle',
    leads: [
      { name: 'Aguas del Valle', price: 2.15, score: 98, risk: 'Bajo' },
      { name: 'Transportes H2O', price: 2.05, score: 88, risk: 'Medio' }
    ],
    steps: ['Análisis Calidad', 'Logística Entrega', 'Contrato Suministro', 'OC Mensual']
  },
  'limpieza_industrial': {
    id: 'limpieza_industrial',
    title: 'Limpieza Industrial de Planta y Silos',
    volume: 'Servicio Mensual',
    category: 'Servicios Mantenimiento',
    targetPrice: 3500.00,
    unit: 'USD/Mes',
    status: 'Iniciado',
    currentStepIndex: -1,
    contractStartDate: '2025-01-01',
    contractEndDate: '2025-12-31',
    daysRemaining: 35,
    renewable: true,
    incumbentSupplier: 'CleanPlant Pro',
    leads: [
      { name: 'CleanPlant Pro', price: 3600.00, score: 95, risk: 'Bajo' },
      { name: 'Servicios Integrales', price: 3400.00, score: 85, risk: 'Medio' }
    ],
    steps: ['Alcance Servicio', 'Visita Técnica', 'Cotización', 'Orden Servicio']
  }
};

export const MOCK_FORECASTS: DemandForecast[] = [
  { id: 'df_1', materialId: 'cemento_portland', materialName: 'Cemento Portland', period: '2024-10', actualDemand: 1100, predictedDemand: 1150, confidenceLower: 1050, confidenceUpper: 1250, safetyStockStatic: 200, safetyStockDynamic: 150 },
  { id: 'df_2', materialId: 'cemento_portland', materialName: 'Cemento Portland', period: '2024-11', actualDemand: 1250, predictedDemand: 1200, confidenceLower: 1100, confidenceUpper: 1300, safetyStockStatic: 200, safetyStockDynamic: 180 },
  { id: 'df_3', materialId: 'cemento_portland', materialName: 'Cemento Portland', period: '2024-12', actualDemand: 1300, predictedDemand: 1350, confidenceLower: 1250, confidenceUpper: 1450, safetyStockStatic: 200, safetyStockDynamic: 220 },
  { id: 'df_4', materialId: 'cemento_portland', materialName: 'Cemento Portland', period: '2025-01', predictedDemand: 1100, confidenceLower: 1000, confidenceUpper: 1200, safetyStockStatic: 200, safetyStockDynamic: 140 },
  { id: 'df_5', materialId: 'cemento_portland', materialName: 'Cemento Portland', period: '2025-02', predictedDemand: 1050, confidenceLower: 950, confidenceUpper: 1150, safetyStockStatic: 200, safetyStockDynamic: 130 },
  { id: 'df_6', materialId: 'cemento_portland', materialName: 'Cemento Portland', period: '2025-03', predictedDemand: 1400, confidenceLower: 1300, confidenceUpper: 1500, safetyStockStatic: 200, safetyStockDynamic: 250 },

  // Áridos Triturados (Grava)
  { id: 'df_7', materialId: 'aridos_triturados', materialName: 'Áridos Triturados', period: '2024-10', actualDemand: 4800, predictedDemand: 4900, confidenceLower: 4700, confidenceUpper: 5100, safetyStockStatic: 800, safetyStockDynamic: 600 },
  { id: 'df_8', materialId: 'aridos_triturados', materialName: 'Áridos Triturados', period: '2024-11', actualDemand: 5100, predictedDemand: 5000, confidenceLower: 4800, confidenceUpper: 5200, safetyStockStatic: 800, safetyStockDynamic: 650 },
  { id: 'df_9', materialId: 'aridos_triturados', materialName: 'Áridos Triturados', period: '2024-12', actualDemand: 4500, predictedDemand: 4600, confidenceLower: 4400, confidenceUpper: 4800, safetyStockStatic: 800, safetyStockDynamic: 500 },
  { id: 'df_10', materialId: 'aridos_triturados', materialName: 'Áridos Triturados', period: '2025-01', predictedDemand: 4700, confidenceLower: 4500, confidenceUpper: 4900, safetyStockStatic: 800, safetyStockDynamic: 550 },
  { id: 'df_11', materialId: 'aridos_triturados', materialName: 'Áridos Triturados', period: '2025-02', predictedDemand: 4900, confidenceLower: 4700, confidenceUpper: 5100, safetyStockStatic: 800, safetyStockDynamic: 600 },
  { id: 'df_12', materialId: 'aridos_triturados', materialName: 'Áridos Triturados', period: '2025-03', predictedDemand: 5200, confidenceLower: 5000, confidenceUpper: 5400, safetyStockStatic: 800, safetyStockDynamic: 700 },

  // Arena Silícea
  { id: 'df_13', materialId: 'arena_silicea', materialName: 'Arena Silícea', period: '2024-10', actualDemand: 3200, predictedDemand: 3300, confidenceLower: 3100, confidenceUpper: 3500, safetyStockStatic: 500, safetyStockDynamic: 400 },
  { id: 'df_14', materialId: 'arena_silicea', materialName: 'Arena Silícea', period: '2024-11', actualDemand: 3400, predictedDemand: 3350, confidenceLower: 3150, confidenceUpper: 3550, safetyStockStatic: 500, safetyStockDynamic: 420 },
  { id: 'df_15', materialId: 'arena_silicea', materialName: 'Arena Silícea', period: '2024-12', actualDemand: 3000, predictedDemand: 3100, confidenceLower: 2900, confidenceUpper: 3300, safetyStockStatic: 500, safetyStockDynamic: 350 },
  { id: 'df_16', materialId: 'arena_silicea', materialName: 'Arena Silícea', period: '2025-01', predictedDemand: 3200, confidenceLower: 3000, confidenceUpper: 3400, safetyStockStatic: 500, safetyStockDynamic: 380 },
  { id: 'df_17', materialId: 'arena_silicea', materialName: 'Arena Silícea', period: '2025-02', predictedDemand: 3300, confidenceLower: 3100, confidenceUpper: 3500, safetyStockStatic: 500, safetyStockDynamic: 400 },
  { id: 'df_18', materialId: 'arena_silicea', materialName: 'Arena Silícea', period: '2025-03', predictedDemand: 3500, confidenceLower: 3300, confidenceUpper: 3700, safetyStockStatic: 500, safetyStockDynamic: 450 },

  // Aditivo Plastificante
  { id: 'df_19', materialId: 'aditivo_plastificante', materialName: 'Aditivo Plastificante', period: '2024-10', actualDemand: 15000, predictedDemand: 15200, confidenceLower: 14800, confidenceUpper: 15600, safetyStockStatic: 2500, safetyStockDynamic: 2000 },
  { id: 'df_20', materialId: 'aditivo_plastificante', materialName: 'Aditivo Plastificante', period: '2024-11', actualDemand: 15500, predictedDemand: 15400, confidenceLower: 15000, confidenceUpper: 15800, safetyStockStatic: 2500, safetyStockDynamic: 2100 },
  { id: 'df_21', materialId: 'aditivo_plastificante', materialName: 'Aditivo Plastificante', period: '2024-12', actualDemand: 14000, predictedDemand: 14200, confidenceLower: 13800, confidenceUpper: 14600, safetyStockStatic: 2500, safetyStockDynamic: 1800 },
  { id: 'df_22', materialId: 'aditivo_plastificante', materialName: 'Aditivo Plastificante', period: '2025-01', predictedDemand: 14500, confidenceLower: 14100, confidenceUpper: 14900, safetyStockStatic: 2500, safetyStockDynamic: 1900 },
  { id: 'df_23', materialId: 'aditivo_plastificante', materialName: 'Aditivo Plastificante', period: '2025-02', predictedDemand: 15000, confidenceLower: 14600, confidenceUpper: 15400, safetyStockStatic: 2500, safetyStockDynamic: 2000 },
  { id: 'df_24', materialId: 'aditivo_plastificante', materialName: 'Aditivo Plastificante', period: '2025-03', predictedDemand: 16000, confidenceLower: 15600, confidenceUpper: 16400, safetyStockStatic: 2500, safetyStockDynamic: 2200 },

  // Diesel Industrial
  { id: 'df_25', materialId: 'diesel_planta', materialName: 'Diesel Industrial', period: '2024-10', actualDemand: 42000, predictedDemand: 42500, confidenceLower: 41500, confidenceUpper: 43500, safetyStockStatic: 5000, safetyStockDynamic: 4000 },
  { id: 'df_26', materialId: 'diesel_planta', materialName: 'Diesel Industrial', period: '2024-11', actualDemand: 43000, predictedDemand: 42800, confidenceLower: 41800, confidenceUpper: 43800, safetyStockStatic: 5000, safetyStockDynamic: 4100 },
  { id: 'df_27', materialId: 'diesel_planta', materialName: 'Diesel Industrial', period: '2024-12', actualDemand: 40000, predictedDemand: 40500, confidenceLower: 39500, confidenceUpper: 41500, safetyStockStatic: 5000, safetyStockDynamic: 3800 },
  { id: 'df_28', materialId: 'diesel_planta', materialName: 'Diesel Industrial', period: '2025-01', predictedDemand: 41000, confidenceLower: 40000, confidenceUpper: 42000, safetyStockStatic: 5000, safetyStockDynamic: 3900 },
  { id: 'df_29', materialId: 'diesel_planta', materialName: 'Diesel Industrial', period: '2025-02', predictedDemand: 42000, confidenceLower: 41000, confidenceUpper: 43000, safetyStockStatic: 5000, safetyStockDynamic: 4000 },
  { id: 'df_30', materialId: 'diesel_planta', materialName: 'Diesel Industrial', period: '2025-03', predictedDemand: 44000, confidenceLower: 43000, confidenceUpper: 45000, safetyStockStatic: 5000, safetyStockDynamic: 4300 },
];

export const MOCK_EXCEPTIONS: MRPException[] = [
  { id: 'ex_1', type: 'Stockout Risk', materialName: 'Aditivo Plastificante', date: '2025-02-15', impact: 'High', description: 'Demanda proyectada excede stock + recepciones confirmadas.', value: 15000, actionDescription: 'Generar Orden de Compra de emergencia por 5,000 Litros a Sika Construcción.' },
  { id: 'ex_2', type: 'Reschedule In', materialName: 'Acero Corrugado 1/2"', date: '2025-02-20', impact: 'Medium', description: 'Adelantar PO #4500123 para evitar quiebre en semana 8.', value: 45000, actionDescription: 'Contactar proveedor para adelantar entrega de PO #4500123 al 18/02/2025.' },
  { id: 'ex_3', type: 'Cancel', materialName: 'Lubricante Industrial', date: '2025-03-01', impact: 'Low', description: 'Exceso de inventario detectado. Cancelar PR #100234.', value: 2500, actionDescription: 'Cancelar solicitud de pedido PR #100234 y notificar al solicitante.' },
  { id: 'ex_4', type: 'Reschedule Out', materialName: 'Grava 3/4"', date: '2025-02-25', impact: 'Medium', description: 'Retrasar entrega PO #4500111 por capacidad de almacén.', value: 12000, actionDescription: 'Solicitar postergación de entrega PO #4500111 para el 05/03/2025.' },
];

export const MOCK_REQUISITIONS: PurchaseRequisition[] = [
  { id: 'pr_1', materialName: 'Cemento Portland', quantity: 500, unit: 'Ton', deliveryDate: '2025-03-10', status: 'Pending', source: 'MRP Auto', confidenceScore: 98 },
  { id: 'pr_2', materialName: 'Aditivo Acelerante', quantity: 2000, unit: 'Litros', deliveryDate: '2025-02-28', status: 'Pending', source: 'MRP Auto', confidenceScore: 92 },
  { id: 'pr_3', materialName: 'Epp Guantes Nitrilo', quantity: 50, unit: 'Cajas', deliveryDate: '2025-02-15', status: 'Approved', source: 'Manual', confidenceScore: 100 },
];

export const MOCK_MASTER_DATA_UPDATES: MasterDataUpdate[] = [
  { id: 'md_1', materialName: 'Cemento Portland', field: 'Lead Time', oldValue: '5 días', newValue: '7 días', timestamp: '2025-02-01 10:00', status: 'Synced' },
  { id: 'md_2', materialName: 'Aditivo Plastificante', field: 'Price', oldValue: '$4.50', newValue: '$4.80', timestamp: '2025-02-02 14:30', status: 'Synced' },
  { id: 'md_3', materialName: 'Acero Corrugado', field: 'Safety Stock', oldValue: '100 Ton', newValue: '120 Ton', timestamp: '2025-02-03 09:15', status: 'Pending' },
];

export const SCENARIO_SIMULATIONS: Record<string, any> = {
  'cemento_portland': {
    impact: 'High',
    productionStoppage: '2025-03-15',
    revenueRisk: 150000,
    inventoryProjection: [
      { week: 'W1', stock: 500, requirement: 100 },
      { week: 'W2', stock: 400, requirement: 100 },
      { week: 'W3', stock: 300, requirement: 100 },
      { week: 'W4', stock: 200, requirement: 150 },
      { week: 'W5', stock: 50, requirement: 150 },
      { week: 'W6', stock: -100, requirement: 150 },
      { week: 'W7', stock: -250, requirement: 150 },
      { week: 'W8', stock: -400, requirement: 150 },
    ],
    recommendations: [
      { type: 'Expedite', description: 'Solicitar envío aéreo parcial (20%)', cost: 5000, savings: 145000 },
      { type: 'Alternative Source', description: 'Activar proveedor secundario "Cementos del Norte"', cost: 12000, savings: 138000 }
    ]
  },
  'aridos_triturados': {
    impact: 'Medium',
    productionStoppage: '2025-03-20',
    revenueRisk: 85000,
    inventoryProjection: [
      { week: 'W1', stock: 1200, requirement: 200 },
      { week: 'W2', stock: 1000, requirement: 200 },
      { week: 'W3', stock: 800, requirement: 200 },
      { week: 'W4', stock: 600, requirement: 250 },
      { week: 'W5', stock: 350, requirement: 250 },
      { week: 'W6', stock: 100, requirement: 250 },
      { week: 'W7', stock: -150, requirement: 250 },
      { week: 'W8', stock: -400, requirement: 250 },
    ],
    recommendations: [
      { type: 'Spot Purchase', description: 'Compra spot a "Cantera La Piedra" con sobreprecio del 5%', cost: 2500, savings: 82500 },
      { type: 'Reduce Consumption', description: 'Ajustar mezcla para reducir consumo de grava en 10%', cost: 0, savings: 15000 }
    ]
  },
  'arena_silicea': {
    impact: 'High',
    productionStoppage: '2025-03-10',
    revenueRisk: 120000,
    inventoryProjection: [
      { week: 'W1', stock: 800, requirement: 150 },
      { week: 'W2', stock: 650, requirement: 150 },
      { week: 'W3', stock: 500, requirement: 150 },
      { week: 'W4', stock: 350, requirement: 200 },
      { week: 'W5', stock: 150, requirement: 200 },
      { week: 'W6', stock: -50, requirement: 200 },
      { week: 'W7', stock: -250, requirement: 200 },
      { week: 'W8', stock: -450, requirement: 200 },
    ],
    recommendations: [
      { type: 'Alternative Source', description: 'Activar contrato con "Arenera del Litoral"', cost: 4500, savings: 115500 },
      { type: 'Logistics Optimization', description: 'Optimizar ruta de transporte para reducir lead time en 2 días', cost: 1200, savings: 35000 }
    ]
  },
  'aditivo_plastificante': {
    impact: 'Critical',
    productionStoppage: '2025-03-05',
    revenueRisk: 200000,
    inventoryProjection: [
      { week: 'W1', stock: 300, requirement: 50 },
      { week: 'W2', stock: 250, requirement: 50 },
      { week: 'W3', stock: 200, requirement: 50 },
      { week: 'W4', stock: 150, requirement: 80 },
      { week: 'W5', stock: 70, requirement: 80 },
      { week: 'W6', stock: -10, requirement: 80 },
      { week: 'W7', stock: -90, requirement: 80 },
      { week: 'W8', stock: -170, requirement: 80 },
    ],
    recommendations: [
      { type: 'Expedite', description: 'Envío express desde planta de "Sika Construcción"', cost: 3000, savings: 197000 },
      { type: 'Substitute', description: 'Validar uso de aditivo alternativo en stock (requiere prueba de lab)', cost: 500, savings: 150000 }
    ]
  },
  'diesel_planta': {
    impact: 'High',
    productionStoppage: '2025-03-12',
    revenueRisk: 180000,
    inventoryProjection: [
      { week: 'W1', stock: 5000, requirement: 1000 },
      { week: 'W2', stock: 4000, requirement: 1000 },
      { week: 'W3', stock: 3000, requirement: 1000 },
      { week: 'W4', stock: 2000, requirement: 1200 },
      { week: 'W5', stock: 800, requirement: 1200 },
      { week: 'W6', stock: -400, requirement: 1200 },
      { week: 'W7', stock: -1600, requirement: 1200 },
      { week: 'W8', stock: -2800, requirement: 1200 },
    ],
    recommendations: [
      { type: 'Spot Purchase', description: 'Compra spot a distribuidor local "FuelMax"', cost: 1500, savings: 178500 },
      { type: 'Emergency Reserve', description: 'Utilizar reserva estratégica (tanque auxiliar)', cost: 0, savings: 50000 }
    ]
  }
};
