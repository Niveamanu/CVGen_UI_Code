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
  // Search
  searchString: string;
  setSearchString: (search: string) => void;
  handleSearch: () => void;
  clearSearch: () => void;
  title?: string;
  showStatusColumn?: boolean;
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
  searchString,
  setSearchString,
  handleSearch,
  clearSearch,
  title = "CV Data",
  showStatusColumn = false
}: GenericCVTableProps) {
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
  const pageSizeOptions = [5, 10, 20, 50, 100];

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
              <th style={{ width: '20%' }}>Full Name</th>
              <th style={{ width: '25%' }}>Site Name</th>
              <th style={{ width: '20%' }}>Role</th>
              <th style={{ width: '15%' }}>Created At</th>
               
                <th style={{ width: '20%' }}>Created By</th>
              
            </tr>
          </thead>
          <tbody>
            {cvCollections.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6f7171' }}>
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
            {cvCollections.length === 0 ? (
              'No entries to display'
            ) : (
              `Showing ${((currentPage - 1) * pageSize) + 1} to ${Math.min(currentPage * pageSize, cvCollections.length)} of ${cvCollections.length} entries`
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
}
