import React from 'react';
import { useAudit } from '../context/AuditContext';
import { Terminal, Download, Trash2, Activity, Cpu, Database, User } from 'lucide-react';

export const AuditConsole: React.FC = () => {
    const { logs, exportLogs, clearLogs } = useAudit();

    const getIcon = (type: string) => {
        switch (type) {
            case 'AI_THOUGHT': return <Cpu className="w-4 h-4 text-purple-400" />;
            case 'TRANSACTION': return <Database className="w-4 h-4 text-blue-400" />;
            case 'USER_ACTION': return <User className="w-4 h-4 text-green-400" />;
            default: return <Activity className="w-4 h-4 text-gray-400" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'AI_THOUGHT': return 'text-purple-300';
            case 'TRANSACTION': return 'text-blue-300';
            case 'USER_ACTION': return 'text-green-300';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="p-6 h-full flex flex-col bg-gray-900 text-gray-100 font-mono">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <div className="flex items-center">
                    <Terminal className="w-6 h-6 mr-3 text-green-500" />
                    <div>
                        <h1 className="text-xl font-bold text-white">System Audit Log & Traceability Console</h1>
                        <p className="text-xs text-gray-400">Real-time monitoring of AI decision logic and system transactions.</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={clearLogs}
                        className="flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-300 border border-gray-700 transition-colors"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Console
                    </button>
                    <button
                        onClick={exportLogs}
                        className="flex items-center px-3 py-2 bg-procure-600 hover:bg-procure-700 text-white rounded text-sm font-medium transition-colors"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Log (.txt)
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-black/50 rounded-lg border border-gray-800 p-4 shadow-inner custom-scrollbar">
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="group hover:bg-white/5 p-2 rounded transition-colors -mx-2 px-2">
                            <div className="flex items-start">
                                <span className="text-xs text-gray-500 w-40 flex-shrink-0 font-mono pt-0.5">
                                    [{new Date(log.timestamp).toLocaleTimeString()}.{new Date(log.timestamp).getMilliseconds()}]
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 ${getColor(log.type)} mr-2 border border-white/5`}>
                                            {getIcon(log.type)}
                                            <span className="ml-1.5">{log.type}</span>
                                        </span>
                                        <span className="text-gray-400 text-xs uppercase tracking-wider font-bold mr-2">[{log.module}]</span>
                                        <span className="text-gray-200 text-sm">{log.message}</span>
                                    </div>
                                    {log.details && (
                                        <div className="ml-0 mt-2 pl-3 border-l-2 border-gray-700">
                                            <pre className="text-xs text-gray-400 overflow-x-auto">
                                                {JSON.stringify(log.details, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {logs.length === 0 && (
                        <div className="text-center text-gray-500 py-12 italic">
                            -- No logs recorded yet --
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
