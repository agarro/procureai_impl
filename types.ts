import React from 'react';

export interface Supplier {
  name: string;
  price: number;
  score: number;
  risk: 'Bajo' | 'Medio' | 'Alto';
}

export type SourcingProcessType = 'spot' | 'tender' | 'strategic' | 'framework';

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