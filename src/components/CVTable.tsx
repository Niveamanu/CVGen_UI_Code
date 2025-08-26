// import React from "react";
// import { useCV } from "../hooks";
// import GenericCVTable from "./GenericCVTable";

// export default function CVTable() {
//   const { 
//     cvCollections, 
//     loading, 
//     error, 
//     refetch, 
//     selectedRows, 
//     setSelectedRows,
//     // Pagination
//     currentPage,
//     setCurrentPage,
//     pageSize,
//     setPageSize,
//     totalPages,
//     // Search
//     searchString,
//     setSearchString,
//     handleSearch,
//     clearSearch,
//   } = useCV();

//   return (
//     <GenericCVTable
//       cvCollections={cvCollections}
//       loading={loading}
//       error={error}
//       refetch={refetch}
//       selectedRows={selectedRows}
//       setSelectedRows={setSelectedRows}
//       currentPage={currentPage}
//       setCurrentPage={setCurrentPage}
//       pageSize={pageSize}
//       setPageSize={setPageSize}
//       totalPages={totalPages}
//       searchString={searchString}
//       setSearchString={setSearchString}
//       handleSearch={handleSearch}
//       clearSearch={clearSearch}
//       title="CV Collection"
//     />
//   );
// }


import React, { forwardRef, useImperativeHandle } from "react";
import { useCV } from "../hooks";
import GenericCVTable from "./GenericCVTable";

// Define the ref interface
export interface CVTableRef {
  getSelectedRows: () => Set<number>;
  getCVCollections: () => any[];
}

const CVTable = forwardRef<CVTableRef>((props, ref) => {
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
    clearSearch,
    setSearchString,
    handleSearch,
  } = useCV();

  // Expose selectedRows to parent via ref
  useImperativeHandle(ref, () => ({
    getSelectedRows: () => {
      console.log("CVTable ref: getSelectedRows called, selectedRows:", selectedRows);
      console.log("CVTable ref: selectedRows size:", selectedRows.size);
      return selectedRows;
    },
    getCVCollections: () => {
      console.log("CVTable ref: getCVCollections called, cvCollections:", cvCollections);
      return cvCollections;
    }
  }));

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
      clearSearch={clearSearch}
      setSearchString={setSearchString}
      handleSearch={handleSearch}
      title="CV Collection"
    />
  );
});

CVTable.displayName = 'CVTable';

export default CVTable;