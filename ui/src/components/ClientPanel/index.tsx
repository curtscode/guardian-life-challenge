'use client';

import { useEffect, useState } from 'react';
import ClienList from '@/components/ClientList';
import ClientDetail from '../ClientDetail';
import { useClientContext } from '@/context/ClientContext';
import type { Client } from '@/types/Client';

export default function ClientPanel() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { currentPage, featuredPerson } = useClientContext();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`http://localhost:3001/clients/page/${currentPage}`);
        console.log('Fetching clients from API', { res });
        if (!res.ok) {
          setError(true);
          return;
        }
        const json = await res.json();
        setClients(json.data);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading clients {JSON.stringify(error)}</div>;

  return (
    <section className="flex w-full h-full">
      <div className="w-1/4 bg-gray-100 p-4">
        <ClienList clients={clients} totalPages={5} />
      </div>
      <div className="w-3/4 text-left bg-white p-4">
        <h2>test</h2>
        <ClientDetail featuredPerson={featuredPerson || clients[0]} />
      </div>
    </section>
  );
}
