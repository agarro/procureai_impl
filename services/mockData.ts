
import { SourcingEvent, RiskFactor } from '../types';

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
      { name: 'Cementos del Valle', price: 118.50, score: 96, risk: 'Bajo' },
      { name: 'Holcim Industrial', price: 116.00, score: 92, risk: 'Bajo' },
      { name: 'Importadora Global Cem', price: 112.00, score: 78, risk: 'Medio' }
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
      { name: 'Cantera La Piedra', price: 21.50, score: 88, risk: 'Bajo' },
      { name: 'Agregados del Sur', price: 23.00, score: 95, risk: 'Bajo' }
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
    contractStartDate: '2024-01-01',
    contractEndDate: '2024-12-31',
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
    contractStartDate: '2024-01-01',
    contractEndDate: '2024-12-31',
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
    contractStartDate: '2023-06-01',
    contractEndDate: '2025-05-31',
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
    contractStartDate: '2024-03-01',
    contractEndDate: '2025-02-28',
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
    contractStartDate: '2024-01-01',
    contractEndDate: '2024-12-31',
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
    contractStartDate: '2024-01-01',
    contractEndDate: '2024-12-31',
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
