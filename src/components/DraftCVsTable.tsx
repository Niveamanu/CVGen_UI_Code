import React from "react";
import { useDraftCVs } from "../hooks";
import GenericCVTable from "./GenericCVTable";

export default function DraftCVsTable() {
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
  } = useDraftCVs();

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
      title="Draft CVs"
      showStatusColumn={true}
    />
  );
}
