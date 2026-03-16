// src/types/index.ts
export interface AgentDecision {
  agentName: 'Orchestrator' | 'Sourcing' | 'Risk' | 'Legal';
  thoughtProcess: string;
  action: string;
  timestamp: string;
  contextId: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  amount: number;
  currency: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
}
