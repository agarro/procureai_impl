import React from 'react';
import { Bot, Bell, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-[rgb(0,55,125)] text-white flex items-center justify-between px-6 fixed top-0 left-0 w-full z-20 shadow-md">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-3">
          <Bot className="w-6 h-6 text-blue-200" />
        </div>
        <h1 className="text-lg font-bold tracking-tight">ProcureAI <span className="font-normal opacity-70">| Sistema de Agentes Empresarial</span></h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-procure-900"></span>
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium leading-none">Usuario Admin</p>
            <p className="text-xs text-gray-400 mt-1">Director de Compras</p>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center border-2 border-white/20">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};