import { useClientContext } from '@/context/ClientContext';
import type { Client } from '@/types/Client';

export function useClient() {
  const { currentPage, setCurrentPage, setFeaturedPerson } = useClientContext();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClientClick = (client: Client) => {
    console.log('Client clicked:', client);
    setFeaturedPerson(client);
  };

  return { currentPage, handlePageChange, handleClientClick };
}
