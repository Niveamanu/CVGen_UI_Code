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


import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useCV } from "../hooks";
import GenericCVTable from "./GenericCVTable";
import CVPreviewModal from "./CVPreviewModal/CVPreviewModal";
import { CVCollection } from "../types/cv";
import api from "../api";
import CVTemplateHTML from "../containers/DocRender/CVTemplateHTML";
import saveAs from "file-saver";

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

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewCVData, setPreviewCVData] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Handle preview
  const handlePreview = async (cv: CVCollection) => {
    try {
      setPreviewLoading(true);
      setPreviewModalOpen(true);
      
      // Fetch CV data for preview
      const response = await api.cv.getCVInformation(cv.email, cv.version);
      setPreviewCVData(response);
    } catch (error) {
      console.error("Error fetching CV for preview:", error);
      // You might want to show a toast error here
    } finally {
      setPreviewLoading(false);
    }
  };

  // Handle download from preview
  const handlePreviewDownload = () => {
    if (previewCVData && previewCVData["Encoded Content"]) {
      try {
        // Get the CV collection data for the filename
        const cvCollection = cvCollections.find(cv => 
          cv.email === previewCVData["Personal Information"]?.["Business Email Address"] ||
          cv.email === previewCVData["Personal Information"]?.["Email Address"]
        );
        
        const email = cvCollection?.email || "unknown";
        const fullName = cvCollection?.full_name || 
          `${previewCVData["Personal Information"]?.["First Name"] || ""} ${previewCVData["Personal Information"]?.["Last Name"] || ""}`.trim();
        
        // Use the same download logic as the main download function
        const base64String = previewCVData["Encoded Content"];
        
        // Validate input
        if (!base64String || typeof base64String !== 'string') {
          console.error('Invalid base64 string provided');
          return;
        }

        // Check if the base64 string is valid
        if (base64String.length === 0) {
          console.error('Empty base64 string provided');
          return;
        }

        // Remove any potential data URL prefix
        let cleanBase64 = base64String;
        if (base64String.includes(',')) {
          cleanBase64 = base64String.split(',')[1];
        }

        // Decode base64 to binary
        const byteCharacters = atob(cleanBase64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Generate filename
        let finalFileName;
        if (fullName) {
          finalFileName = `${fullName}_Flourish_CV.pdf`;
        } else {
          finalFileName = email.endsWith(".pdf") ? email : `${email}.pdf`;
        }

        // Use file-saver for download
        saveAs(blob, finalFileName);
        
        // Close the preview modal after download
        handleClosePreview();
        
      } catch (error) {
        console.error("Error downloading PDF from preview:", error);
      }
    }
  };

  // Close preview modal
  const handleClosePreview = () => {
    setPreviewModalOpen(false);
    setPreviewCVData(null);
  };

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
    <>
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
        onPreview={handlePreview}
      />
      
      <CVPreviewModal
        isOpen={previewModalOpen}
        onClose={handleClosePreview}
        onDownload={handlePreviewDownload}
      >
        {previewLoading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading preview...</div>
        ) : previewCVData ? (
          <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <CVTemplateHTML data={previewCVData} />
          </div>
        ) : null}
      </CVPreviewModal>
    </>
  );
});

CVTable.displayName = 'CVTable';

export default CVTable;