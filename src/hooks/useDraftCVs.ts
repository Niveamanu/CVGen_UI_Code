import { useState, useEffect, useCallback, useRef } from 'react';
import { CVCollection, CVData } from '../types/cv';
import { useApiClient } from './useApiClient';
import { PaginationParams, CVCollectionResponse } from '../api/services/cv';

interface UseDraftCVsReturn {
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
  totalCount: number;
  // Search
  searchString: string;
  setSearchString: (search: string) => void;
  handleSearch: () => void;
  clearSearch: () => void;
  activeSearchString: string;
}

export const useDraftCVs = (): UseDraftCVsReturn => {
  const hookId = useRef(Math.random().toString(36).substr(2, 9));
  console.log(`🔄 useDraftCVs hook instantiated with ID: ${hookId.current}`);
  
  const [cvCollections, setCvCollections] = useState<CVCollection[]>([]);
  const [totalCount, setTotalCount] = useState(0);
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
  
  console.log(`🔄 useDraftCVs hook ${hookId.current} state initialized:`, { currentPage, pageSize, activeSearchString });
  
  // Flag to prevent duplicate API calls
  const isFetchingRef = useRef(false);

  const fetchCVData = useCallback(async () => {
    console.log(`🔄 useDraftCVs ${hookId.current} fetchCVData called with:`, { currentPage, pageSize, activeSearchString });
    
    // Prevent duplicate API calls
    if (isFetchingRef.current) {
      console.log(`⚠️ useDraftCVs ${hookId.current} fetchCVData: Already fetching, skipping duplicate call`);
      return;
    }
    
    if (!apiClient) {
      setError('API client not initialized');
      setLoading(false);
      return;
    }

    try {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);
      
      const offset = (currentPage - 1) * pageSize;
      const params: PaginationParams = {
        limit: pageSize,
        offset: offset,
        search_string: activeSearchString || ''
      };
      
      console.log(`📡 useDraftCVs ${hookId.current} API call with params:`, params);
      const response: CVCollectionResponse = await apiClient.cv.getDraftCVs(params);
      console.log(`✅ useDraftCVs ${hookId.current} API response received:`, response.records.length, 'items, total:', response.total_count);
      setCvCollections(response.records);
      setTotalCount(response.total_count);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching draft CV data';
      setError(errorMessage);
      console.error(`❌ useDraftCVs ${hookId.current} API error:`, err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [apiClient, currentPage, pageSize, activeSearchString, hookId]);

  // Initial data fetch when component mounts
  useEffect(() => {
    console.log(`🔄 useDraftCVs ${hookId.current} initial useEffect triggered, apiClient:`, !!apiClient);
    if (apiClient) {
      fetchCVData();
    }
  }, [apiClient, fetchCVData]);

  // Fetch data when pagination or search changes
  useEffect(() => {
    console.log(`🔄 useDraftCVs ${hookId.current} pagination/search useEffect triggered:`, { currentPage, pageSize, activeSearchString });
    if (apiClient) {
      console.log(`useDraftCVs ${hookId.current} useEffect triggered:`, { currentPage, pageSize, activeSearchString });
      fetchCVData();
    }
  }, [currentPage, pageSize, activeSearchString, fetchCVData]);

  const refetch = useCallback(async () => {
    console.log(`🔄 useDraftCVs ${hookId.current} refetch called`);
    await fetchCVData();
  }, [fetchCVData, hookId]);

  // Pagination helpers
  const totalPages = Math.ceil(totalCount / pageSize);

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
    console.log('Draft CVs search triggered with:', searchString);
    setActiveSearchString(searchString);
  }, [searchString]);

  // Clear search handler
  const clearSearch = useCallback(() => {
    setSearchString('');
    setActiveSearchString('');
  }, []);

  return {
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
    totalCount,
    // Search
    searchString,
    setSearchString,
    handleSearch,
    clearSearch,
    activeSearchString,
  };
};
