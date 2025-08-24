import { useMemo } from 'react';
import api from '@/api';

/**
 * Custom hook that provides access to the singleton API client instance.
 * This ensures that all components use the same API client instance
 * with consistent configuration and state.
 * 
 * @returns The API client instance
 */
export const useApiClient = () => {
  return useMemo(() => api, []);
};
