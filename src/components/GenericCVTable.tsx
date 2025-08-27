import React from "react";
import styles from "./CVTable.module.scss";
import { CVCollection } from "../types/cv";
import SkeletonTable from "./Skeleton/SkeletonTable";

interface GenericCVTableProps {
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
  title?: string;
  showStatusColumn?: boolean;
  onPreview?: (cv: CVCollection) => void;
  onEdit?: (cv: CVCollection) => void;
  onBulkDownload?: (selectedCVs: CVCollection[]) => void;
  bulkDownloadLoading?: boolean;
}

export default function GenericCVTable({
  cvCollections,
  loading,
  error,
  refetch,
  selectedRows,
  setSelectedRows,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalPages,
  totalCount,
  searchString,
  setSearchString,
  handleSearch,
  clearSearch,
  title = "CV Data",
  showStatusColumn = false,
  onPreview,
  onEdit,
  onBulkDownload,
  bulkDownloadLoading = false
}: GenericCVTableProps) {
  
  // Debug logging
  console.log('🔍 GenericCVTable props:', { 
    cvCollectionsLength: cvCollections.length, 
    totalCount, 
    totalPages, 
    pageSize, 
    currentPage,
    loading,
    error 
  });
  // Handle row selection
  const handleRowSelection = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
      console.log("Row deselected:", index, "New selectedRows:", newSelectedRows);
    } else {
      newSelectedRows.add(index);
      console.log("Row selected:", index, "New selectedRows:", newSelectedRows);
    }
    setSelectedRows(newSelectedRows);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.size === cvCollections.length) {
      console.log("Deselecting all rows");
      setSelectedRows(new Set());
    } else {
      console.log("Selecting all rows, count:", cvCollections.length);
      setSelectedRows(new Set(cvCollections.map((_, index) => index)));
    }
  };

  // Page size options
  const pageSizeOptions = [1,5, 10, 20, 50, 100];

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.tableWrapper}>
          <SkeletonTable columns={6} rows={8} />
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.tableWrapper}>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            Error: {error}
            <br />
            <button onClick={refetch} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
              Retry
            </button>
          </div>
        </div>
      );
    }

    // Always show the search interface and table structure
    return (
      <div className={styles.tableWrapper}>
        {/* Search Input - Moved to extreme left */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          marginBottom: '1rem',
          padding: '0.5rem 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search CVs..."
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              style={{ 
                padding: '0.5rem', 
                borderRadius: '4px', 
                border: '1px solid #e1e0e0',
                minWidth: '200px',
                fontSize: '14px'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: 'rgba(255, 234, 136, 0.8)',
                backgroundColor: 'rgba(255, 234, 136, 0.8)',
                color: '#1a1a1a',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 234, 136, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(255, 234, 136, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 234, 136, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(255, 234, 136, 0.8)';
              }}
            >
              Search
            </button>
            <button
              onClick={clearSearch}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: '1px solid #6f7171',
                backgroundColor: '#6f7171',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#575656';
                e.currentTarget.style.borderColor = '#575656';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6f7171';
                e.currentTarget.style.borderColor = '#6f7171';
              }}
            >
              Clear
            </button>
          </div>
        </div>



        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>
                <input 
                  type="checkbox" 
                  checked={selectedRows.size === cvCollections.length && cvCollections.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th style={{ width: '200px' }}>Full Name</th>
              <th style={{ width: '200px' }}>Site Name</th>
              <th style={{ width: '150px' }}>Role</th>
              <th style={{ width: '150px' }}>Created At</th>
              <th style={{ width: '150px' }}>Created By</th>
              <th style={{ width: '80px' }}>Preview</th>
              {onEdit && <th style={{ width: '80px' }}>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {cvCollections.length === 0 ? (
              <tr>
                <td colSpan={onEdit ? 8 : 7} style={{ textAlign: 'center', padding: '2rem', color: '#6f7171' }}>
                  {searchString ? 'No records found for your search. Try clearing the search or using different keywords.' : `No ${title} available.`}
                </td>
              </tr>
            ) : (
              cvCollections.map((cv, idx) => (
                <tr key={idx}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedRows.has(idx)}
                      onChange={() => handleRowSelection(idx)}
                    />
                  </td>
                  <td>{cv["full_name"]}</td>
                  <td>{cv["site_name"]}</td>
                  <td>{cv["role"] || 'N/A'}</td>
                  <td>{cv["created_at"] || 'N/A'}</td>
                  <td>{cv["created_by"] || 'N/A'}</td>
                  <td style={{ textAlign: 'center' }}>
                    {onPreview && (
                      <button
                        onClick={() => onPreview(cv)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          borderRadius: '4px',
                          color: '#6b7280',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#374151';
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#6b7280';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Preview CV"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </td>
                  {onEdit && (
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => onEdit(cv)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          borderRadius: '4px',
                          color: '#3b82f6',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#1d4ed8';
                          e.currentTarget.style.backgroundColor = '#eff6ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#3b82f6';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Edit CV"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer with rows per page and entry count */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '1rem',
          padding: '0.5rem 0',
          borderTop: '1px solid #e1e0e0'
        }}>
          {/* Rows per page - Moved to footer left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="pageSize" style={{ fontSize: '0.875rem', color: '#6f7171' }}>Rows per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{ 
                padding: '0.25rem', 
                borderRadius: '4px', 
                border: '1px solid #e1e0e0',
                fontSize: '0.875rem'
              }}
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          
          {/* Entry count - Moved to footer right */}
          <div style={{ fontSize: '0.875rem', color: '#6f7171' }}>
            {totalCount === 0 ? (
              'No entries to display'
            ) : (
              `Showing ${((currentPage - 1) * pageSize) + 1} to ${Math.min(currentPage * pageSize, cvCollections.length)} of ${totalCount} entries`
            )}
          </div>
        </div>

        {/* Debug Info */}
        {/* <div style={{ 
          padding: '0.5rem', 
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          borderRadius: '4px',
          border: '1px solid #e5e7eb'
        }}>
          Debug: totalPages={totalPages}, totalCount={totalCount}, pageSize={pageSize}, currentPage={currentPage}, cvCollections.length={cvCollections.length}
          {totalCount === 0 && ' - No data from API'}
          {totalCount > 0 && totalPages <= 1 && ' - Only one page of results'}
        </div> */}

        {/* Pagination Navigation */}
        {totalCount > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginTop: '1rem',
            padding: '1rem 0',
            borderTop: '1px solid #e1e0e0'
          }}>
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: currentPage === 1 ? '#f3f4f6' : '#ffffff',
                color: currentPage === 1 ? '#9ca3af' : '#374151',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              First
            </button>

            {/* Previous Page */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: currentPage === 1 ? '#f3f4f6' : '#ffffff',
                color: currentPage === 1 ? '#9ca3af' : '#374151',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              Previous
            </button>

            {/* Page Info */}
            <span style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              color: '#374151',
              fontWeight: '500'
            }}>
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: currentPage === totalPages ? '#f3f4f6' : '#ffffff',
                color: currentPage === totalPages ? '#9ca3af' : '#374151',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              Next
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                background: currentPage === totalPages ? '#f3f4f6' : '#ffffff',
                color: currentPage === totalPages ? '#9ca3af' : '#374151',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              Last
            </button>
          </div>
        )}
      </div>
    );
  };

  return renderContent();
}
