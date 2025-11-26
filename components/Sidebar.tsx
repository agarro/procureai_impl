
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Package, AlertTriangle, PlusCircle } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { SourcingEvent } from '../types';

export const Sidebar: React.FC = () => {
  const { events } = useEvents();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full fixed left-0 top-16 overflow-y-auto z-10">
      <div className="p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${isActive ? 'bg-procure-50 text-procure-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>

        <NavLink
          to="/backoffice"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mb-6 rounded-lg transition-colors ${isActive ? 'bg-procure-50 text-procure-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`
          }
        >
          <Settings className="w-5 h-5 mr-3" />
          Configuración
        </NavLink>

        <div className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          Eventos de Sourcing Activos
        </div>

        <div className="space-y-1">
          {Object.values(events).map((event: SourcingEvent) => (
            <NavLink
              key={event.id}
              to={`/events/${event.id}`}
              title={event.title}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-procure-50 text-procure-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`
              }
            >
              <Package className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="truncate">{event.title}</span>
            </NavLink>
          ))}

          <button
            onClick={() => navigate('/new-event')}
            className="w-full flex items-center px-4 py-2 text-sm text-procure-600 hover:bg-procure-50 rounded-lg transition-colors mt-2 font-medium"
          >
            <PlusCircle className="w-4 h-4 mr-3" />
            Nuevo sourcing event
          </button>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          Alertas
        </div>
        <div className="bg-red-50 border border-red-100 rounded-md p-3 flex items-start">
          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-xs text-red-800">
            Intervención: Riesgo detectado en suministro de Aditivos Químicos.
          </p>
        </div>
      </div>
    </aside>
  );
};