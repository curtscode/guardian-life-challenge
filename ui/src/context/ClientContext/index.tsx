'use client'; // Required for client-side hooks

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Client } from '@/types/Client';

type ClientContextProps = {
  featuredPerson: Client | null;
  setFeaturedPerson: (client: Client) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const ClientContext = createContext<ClientContextProps | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [featuredPerson, setFeaturedPerson] = useState<Client | null>(null);

  return (
    <ClientContext.Provider
      value={{ featuredPerson, setFeaturedPerson, currentPage, setCurrentPage }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClientContext must be used within a ReferenceProvider');
  }
  return context;
};
