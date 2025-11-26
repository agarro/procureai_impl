
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SourcingEvent } from '../types';
import { INITIAL_EVENTS } from '../services/mockData';

interface EventContextType {
  events: Record<string, SourcingEvent>;
  addEvent: (event: SourcingEvent) => void;
  updateEvent: (id: string, updates: Partial<SourcingEvent>) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Record<string, SourcingEvent>>(INITIAL_EVENTS);

  const addEvent = (event: SourcingEvent) => {
    setEvents(prev => ({
      ...prev,
      [event.id]: event
    }));
  };

  const updateEvent = (id: string, updates: Partial<SourcingEvent>) => {
    setEvents(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], ...updates }
      };
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
