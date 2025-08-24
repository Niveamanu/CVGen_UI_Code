import { useState, useEffect, useCallback } from 'react';
import { CVData ,CVCollection} from '../types/cv';
import { useApiClient } from './useApiClient';
import { PaginationParams } from '../api/services/cv';

interface UseCVReturn {
  //cv: CVData[];
  cvCollections: CVCollection[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  selectedRows: Set<number>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<number>>>;
  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
  // Search
  searchString: string;
  setSearchString: (search: string) => void;
  handleSearch: () => void;
  clearSearch: () => void;
  activeSearchString: string;
}

export const useCV = (): UseCVReturn => {
  const [cvData, setCvData] = useState<CVData[]>([]);
  const [cvCollections, setCvCollections] = useState<CVCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Search state - separate input state from actual search
  const [searchString, setSearchString] = useState<string>('');
  const [activeSearchString, setActiveSearchString] = useState<string>('');
  
  const apiClient = useApiClient();

  const fetchCVData = useCallback(async () => {
    if (!apiClient) {
      setError('API client not initialized');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const offset = (currentPage - 1) * pageSize;
      const params: PaginationParams = {
        limit: pageSize,
        offset: offset,
        search_string: activeSearchString || ''
      };
      
      const data = await apiClient.cv.getCVCollection(params);
      //setCvData(data);
      setCvCollections(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching CV data';
      setError(errorMessage);
      console.error('Error fetching CV data:', err);
    } finally {
      setLoading(false);
    }
  }, [apiClient, currentPage, pageSize, activeSearchString]);

  // Initial data fetch when component mounts
  useEffect(() => {
    if (apiClient) {
      fetchCVData();
    }
  }, [apiClient]);

  // Fetch data when pagination or search changes
  useEffect(() => {
    if (apiClient) {
      console.log('useEffect triggered:', { currentPage, pageSize, activeSearchString });
      fetchCVData();
    }
  }, [currentPage, pageSize, activeSearchString, fetchCVData]);

  const refetch = useCallback(async () => {
    await fetchCVData();
  }, [fetchCVData]);

  // Pagination helpers
  const totalPages = Math.ceil(cvCollections.length / pageSize);

  // Reset to first page when page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSearchString]);

  // Search handler - only called when search button is clicked
  const handleSearch = useCallback(() => {
    console.log('Search triggered with:', searchString);
    setActiveSearchString(searchString);
  }, [searchString]);

  // Clear search handler
  const clearSearch = useCallback(() => {
    setSearchString('');
    setActiveSearchString('');
  }, []);

  return {
    //cvData,
    cvCollections,
    loading,
    error,
    refetch,
    selectedRows,
    setSelectedRows,
    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    // Search
    searchString,
    setSearchString,
    handleSearch,
    clearSearch,
    activeSearchString,
  };
};
