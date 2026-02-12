import React from 'react';

export interface Supplier {
  name: string;
  price: number;
  score: number;
  risk: 'Bajo' | 'Medio' | 'Alto';
  esgScore?: number;
  qualityScore?: number;
}

export type SourcingProcessType = 'spot' | 'tender' | 'strategic' | 'framework' | 'NPI' | 'VMI' | 'MRO' | 'Commodity';

export interface SourcingEvent {
  id: string;
  title: string;
  volume: string;
  category: string;
  targetPrice: number;
  unit: string;
  leads: Supplier[];
  steps: string[];
  status: 'Iniciado' | 'En Progreso' | 'Completado';
  currentStepIndex: number;
  processType?: SourcingProcessType;
  serviceRequirements?: string;
  marketAnalysisScope?: string;
  contractDuration?: string;
  monthlyFee?: number;
  extraServicesRate?: number;
  finalSupplier?: string;
  finalPrice?: number;
  savings?: number;
  poNumber?: number;
  contractStartDate?: string;
  contractEndDate?: string;
  daysRemaining?: number;
  renewable?: boolean;
  incumbentSupplier?: string;
  currency?: 'USD' | 'ARS';
  // New fields for manufacturing functionalities
  developmentStage?: 'Prototype' | 'Pilot' | 'Production'; // For NPI
  vmiMinStock?: number; // For VMI
  vmiMaxStock?: number; // For VMI
  vmiLocation?: string; // For VMI
  marketIndex?: string; // For Commodities
  hedgingStrategy?: 'Spot' | 'Forward' | 'Options'; // For Commodities
}

export interface AgentMessage {
  id: string;
  sender: 'procure' | 'sourcing' | 'risk' | 'erp' | 'legal';
  senderName: string;
  icon: string;
  text: string;
  thinking?: string;
  tableData?: {
    headers: string[];
    rows: (string | number | React.ReactNode)[][];
  };
  timestamp: Date;
}

export type ConnectionStatus = 'conectado' | 'desconectado' | 'sincronizando' | 'error';

export interface IntegrationConfig {
  id: string;
  name: string;
  type: 'ERP' | 'Proveedor' | 'Datos';
  status: ConnectionStatus;
  lastSync: string;
  details: string;
}

export interface RiskFactor {
  id: string;
  name: string;
  category: 'provider' | 'market';
  weight: number;
  description?: string;
}

// MRP Functionalities Types

export interface DemandForecast {
  id: string;
  materialId: string;
  materialName: string;
  period: string; // e.g., '2024-01'
  actualDemand?: number;
  predictedDemand: number;
  confidenceLower: number;
  confidenceUpper: number;
  safetyStockStatic: number;
  safetyStockDynamic: number;
}

export interface MRPException {
  id: string;
  type: 'Reschedule In' | 'Reschedule Out' | 'Cancel' | 'Stockout Risk' | 'Excess Stock';
  materialName: string;
  date: string;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  value: number;
  actionDescription?: string;
}

export interface PurchaseRequisition {
  id: string;
  materialName: string;
  quantity: number;
  unit: string;
  deliveryDate: string;
  status: 'Pending' | 'Approved' | 'Converted';
  source: 'MRP Auto' | 'Manual';
  confidenceScore: number; // AI Confidence in the need
}

export interface MasterDataUpdate {
  id: string;
  materialName: string;
  field: 'Lead Time' | 'Price' | 'Safety Stock';
  oldValue: string | number;
  newValue: string | number;
  timestamp: string;
  status: 'Synced' | 'Pending' | 'Error';
}

// New Module Types

export interface Contract {
  id: string;
  title: string;
  supplier: string;
  value: number;
  status: 'Draft' | 'Review' | 'Active' | 'Expiring';
  startDate: string;
  endDate: string;
  aiRiskScore: number;
  content: string;
}

export interface MROItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  supplier: string;
  rating: number;
}

export interface Invoice {
  id: string;
  supplier: string;
  amount: number;
  date: string;
  poNumber: string;
  status: 'Matched' | 'Exception' | 'Pending';
  matchScore: number;
}

export interface SpendCategory {
  name: string;
  value: number;
  color: string;
}

export interface SupplierSpend {
  name: string;
  spend: number;
}