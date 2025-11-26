
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { SourcingEvent } from './pages/SourcingEvent';
import { Backoffice } from './pages/Backoffice';
import { NewEvent } from './pages/NewEvent';
import { EventProvider } from './context/EventContext';
import { ExchangeRateProvider } from './context/ExchangeRateContext';

const App: React.FC = () => {
  return (
    <ExchangeRateProvider>
      <EventProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Header />
            <Sidebar />
            <main className="pl-64 pt-16 min-h-screen">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/backoffice" element={<Backoffice />} />
                <Route path="/new-event" element={<NewEvent />} />
                <Route path="/events/:id" element={<SourcingEvent />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </EventProvider>
    </ExchangeRateProvider>
  );
};

export default App;
