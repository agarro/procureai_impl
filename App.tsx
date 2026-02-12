
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { SourcingEvent } from './pages/SourcingEvent';
import { Backoffice } from './pages/Backoffice';
import { DemandPlanning } from './pages/DemandPlanning';
import { MRPExceptions } from './pages/MRPExceptions';
import { ScenarioPlanner } from './pages/ScenarioPlanner';
import { NewEvent } from './pages/NewEvent';
import { MROCatalog } from './pages/MROCatalog';
import { EventProvider } from './context/EventContext';
import { ExchangeRateProvider } from './context/ExchangeRateContext';
import { ContractManager } from './pages/ContractManager';
import { SpendAnalysis } from './pages/SpendAnalysis';
import { APAutomation } from './pages/APAutomation';
import { ChatAssistant } from './components/ChatAssistant';

import { AuditConsole } from './pages/AuditConsole';
import { AuditProvider } from './context/AuditContext';

function App() {
  return (
    <AuditProvider>
      <EventProvider>
        <ExchangeRateProvider>
          <Router>
            <div className="flex flex-col h-screen bg-gray-50">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/backoffice" element={<Backoffice />} />
                    <Route path="/audit" element={<AuditConsole />} />
                    <Route path="/planning/demand" element={<DemandPlanning />} />
                    <Route path="/planning/exceptions" element={<MRPExceptions />} />
                    <Route path="/planning/scenarios" element={<ScenarioPlanner />} />
                    <Route path="/new-event" element={<NewEvent />} />
                    <Route path="/mro-catalog" element={<MROCatalog />} />
                    <Route path="/events/:id" element={<SourcingEvent />} />
                    <Route path="/contracts" element={<ContractManager />} />
                    <Route path="/spend-analysis" element={<SpendAnalysis />} />
                    <Route path="/ap-automation" element={<APAutomation />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
              <ChatAssistant />
            </div>
          </Router>
        </ExchangeRateProvider>
      </EventProvider>
    </AuditProvider>
  );
};

export default App;
