// src/services/erpService.ts
const ERP_API_URL = import.meta.env.API_URL_ERP;

export const erpService = {
  fetchPOStatus: async (poId: string) => {
    if (!poId) throw new Error('PO ID is required');
    try {
      const response = await fetch(`${ERP_API_URL}/po/${poId}`);
      if (!response.ok) throw new Error('Failed to fetch PO');
      return await response.json();
    } catch (error) {
      console.error('ERP Fetch Error:', error);
      throw error;
    }
  },
  
  submitOC: async (ocData: any) => {
    if (!ocData.supplierId || ocData.amount <= 0) {
      throw new Error('Invalid OC Data: Missing supplier or invalid amount');
    }
    try {
      const response = await fetch(`${ERP_API_URL}/po/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ocData)
      });
      if (!response.ok) throw new Error('ERP rejected OC submission');
      return await response.json();
    } catch (error) {
      console.error('ERP Submit Error:', error);
      throw error;
    }
  }
};
