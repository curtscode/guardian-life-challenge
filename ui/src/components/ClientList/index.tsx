'use client'
import React from 'react';
import { useClient } from '@/hook/useClient';
import { Client } from '@/types/Client';
import { useClientContext } from '@/context/ClientContext';


type ClienListProps = {
  clients: Client[];
  totalPages: number;
}

export default function ClienList({ clients, totalPages }: ClienListProps) {
//  console.log('ClienList: Rendering client list', clients);
  const { handlePageChange, handleClientClick } = useClient();
  const { currentPage } = useClientContext();
  return (
    <section className=" w-full h-full ">
      <ul className="text-black divide-y divide-gray-300">
        {
          clients.map((client) => (
            <li key={client.id} onClick={() => handleClientClick(client)} className="hover:bg-blue-100 py-2">
              {client.firstName} {client.lastName}
            </li>
          ))
        }

      </ul>
      <div className="flex py-4 bg-gray-100 gap-2">
        <button disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)} className="disabled:bg-gray-300 bg-blue-500 text-white px-4 py-2 rounded">
          Previous
        </button>
        <button disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)} className="disabled:bg-gray-300 bg-green-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
      <div className="text-center text-gray-500 text-sm">
        Page {currentPage} of {totalPages}<br />
        Showing 1-10 of 100
      </div>
    </section>
  );
}
