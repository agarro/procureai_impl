import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AuditLogEntry {
    id: string;
    timestamp: string;
    type: 'AI_THOUGHT' | 'TRANSACTION' | 'SYSTEM' | 'USER_ACTION';
    module: string;
    message: string;
    details?: any;
}

interface AuditContextType {
    logs: AuditLogEntry[];
    addLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
    clearLogs: () => void;
    exportLogs: () => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const AuditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [logs, setLogs] = useState<AuditLogEntry[]>([
        {
            id: 'init-1',
            timestamp: new Date().toISOString(),
            type: 'SYSTEM',
            module: 'Kernel',
            message: 'Audit System Initialized',
            details: { version: '1.2.0', environment: 'production' }
        }
    ]);

    const addLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
        const newLog: AuditLogEntry = {
            ...entry,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
        };
        setLogs(prev => [newLog, ...prev]);
    };

    const clearLogs = () => setLogs([]);

    const exportLogs = () => {
        const content = logs.map(log =>
            `[${log.timestamp}] [${log.type}] [${log.module}] ${log.message}\nDetails: ${JSON.stringify(log.details, null, 2)}\n${'-'.repeat(80)}`
        ).join('\n\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-log-${new Date().toISOString()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <AuditContext.Provider value={{ logs, addLog, clearLogs, exportLogs }}>
            {children}
        </AuditContext.Provider>
    );
};

export const useAudit = () => {
    const context = useContext(AuditContext);
    if (context === undefined) {
        throw new Error('useAudit must be used within an AuditProvider');
    }
    return context;
};
