import React from "react";
import { useArchivedCVs } from "../hooks";
import GenericCVTable from "./GenericCVTable";

export default function ArchivedCVsTable() {
  const { 
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
  } = useArchivedCVs();

  return (
    <GenericCVTable
      cvCollections={cvCollections}
      loading={loading}
      error={error}
      refetch={refetch}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      totalPages={totalPages}
      searchString={searchString}
      setSearchString={setSearchString}
      handleSearch={handleSearch}
      clearSearch={clearSearch}
      title="Archived CVs"
    />
  );
}
