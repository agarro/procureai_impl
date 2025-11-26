import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShieldCheck, AlertTriangle, CheckCircle2, BarChart2, ArrowUpRight } from 'lucide-react';
import { useExchangeRate } from '../context/ExchangeRateContext';

const chartData = [
  { name: 'Ene', agility: 35, transparency: 65 },
  { name: 'Feb', agility: 32, transparency: 70 },
  { name: 'Mar', agility: 28, transparency: 75 },
  { name: 'Abr', agility: 25, transparency: 80 },
  { name: 'May', agility: 22, transparency: 82 },
  { name: 'Jun', agility: 21, transparency: 85 },
  { name: 'Jul', agility: 20, transparency: 87 },
  { name: 'Ago', agility: 19, transparency: 89 },
  { name: 'Sep', agility: 18, transparency: 90 },
  { name: 'Oct', agility: 17, transparency: 91 },
  { name: 'Nov', agility: 16, transparency: 93 },
  { name: 'Dic', agility: 15, transparency: 95 },
];

const StatCard: React.FC<{ title: string; value: string; subtext: string; icon: React.ReactNode; colorClass: string }> = ({ title, value, subtext, icon, colorClass }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        {icon}
      </div>
      <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center">
        <ArrowUpRight className="w-3 h-3 mr-1" /> 2.4%
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
    <p className="text-xs text-gray-400 font-medium">{subtext}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  const { convert } = useExchangeRate();
  const savingsValue = 450240; // Base value in USD
  const savingsARS = convert(savingsValue, 'USD', 'ARS');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Resumen de Compras</h1>
        <p className="text-gray-500 mt-1">Métricas en tiempo real de la actividad de agentes autónomos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Ahorros IA (YTD)"
          value={`$${savingsARS.toLocaleString(undefined, { maximumFractionDigits: 0 })} ARS`}
          subtext="3.5% sobre presupuesto"
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          colorClass="bg-blue-600"
        />
        <StatCard
          title="Riesgo Proveedores"
          value="Bajo (98%)"
          subtext="Monitoreo Agente Riesgo"
          icon={<ShieldCheck className="w-6 h-6 text-yellow-600" />}
          colorClass="bg-yellow-500"
        />
        <StatCard
          title="Excepciones Activas"
          value="4"
          subtext="Requiere revisión humana"
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          colorClass="bg-red-600"
        />
        <StatCard
          title="Tasa OC Auto"
          value="92%"
          subtext="Sourcing sin intervención"
          icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
          colorClass="bg-green-600"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart2 className="w-5 h-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-bold text-gray-800">Agilidad del Agente vs. Score de Transparencia</h2>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center text-xs text-gray-500">
              <span className="w-3 h-3 bg-procure-600 rounded-full mr-2"></span> Agilidad (Días)
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Transparencia
            </div>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Line yAxisId="left" type="monotone" dataKey="agility" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="transparency" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">
          *Nota: La <span className="font-semibold">Agilidad del Agente</span> se mide en días promedio de ciclo de compra, mientras que el <span className="font-semibold">Score de Transparencia</span> (0-100%) evalúa la completitud de los logs de auditoría y la explicabilidad de las decisiones.*
        </p>
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Guía de Interpretación de Métricas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">Ahorros IA (YTD)</h3>
            <p className="text-sm text-blue-600">
              Suma total de ahorros generados por negociaciones autónomas en lo que va del año, comparado con el precio histórico o de presupuesto.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <h3 className="font-semibold text-yellow-800 mb-2">Riesgo Proveedores</h3>
            <p className="text-sm text-yellow-600">
              Puntaje ponderado de riesgo de la base de proveedores activos. Considera factores financieros, geopolíticos y de desempeño histórico.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
            <h3 className="font-semibold text-red-800 mb-2">Excepciones Activas</h3>
            <p className="text-sm text-red-600">
              Número de eventos de compra detenidos que requieren intervención humana inmediata debido a desviaciones de precio o riesgo elevado.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-800 mb-2">Tasa OC Auto</h3>
            <p className="text-sm text-green-600">
              Porcentaje de Órdenes de Compra generadas y liberadas sin intervención humana manual ("Touchless PO"), indicando la eficiencia del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};