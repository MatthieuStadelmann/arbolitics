import { useQuery } from '@tanstack/react-query';
import { ArboDataResponse } from '@/types/arbo';

export function useArboData(locationId: number = 10, limit: number = 1) {
  return useQuery<ArboDataResponse>({
    queryKey: ['arboData', locationId, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        location_id: locationId.toString(),
        limit: limit.toString()
      });

      const response = await fetch(`/api/arbo?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Arbolitics data');
      }

      return response.json();
    }
  });
}