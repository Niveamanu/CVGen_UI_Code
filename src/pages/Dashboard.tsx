import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Toolbar from "../components/Toolbar";
import CVTable from "../components/CVTable";
import DraftCVsTable from "../components/DraftCVsTable";
import ArchivedCVsTable from "../components/ArchivedCVsTable";
import Pagination from "../components/Pagination";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { pageTransitions, staggerContainer, staggerItem } from "../utils/animations";
import { useCV, useDraftCVs, useArchivedCVs } from "../hooks";
import { useApiClient } from "../hooks/useApiClient"
import { toast } from "react-toastify";

interface CVTableRef {
  getSelectedRows: () => Set<number>;
}
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("collection");
  const cvTableRef = useRef<CVTableRef>(null);
  const navigate = useNavigate();
  const apiClient = useApiClient();
  
  // Get CV data and pagination state for different tabs
  const { currentPage, setCurrentPage, totalPages, refetch: refetchCV,cvCollections,selectedRows,setSelectedRows} = useCV();
  const { currentPage: draftCurrentPage, setCurrentPage: setDraftCurrentPage, totalPages: draftTotalPages, refetch: refetchDraft } = useDraftCVs();
  const { currentPage: archivedCurrentPage, setCurrentPage: setArchivedCurrentPage, totalPages: archivedTotalPages, refetch: refetchArchived } = useArchivedCVs();

  const downloadPDF = (base64String: string, fileName: string) => {
    try {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
   
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
   
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
   
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
   
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error decoding Base64 PDF:", error);
    }
  };
   
    const handleDownload = async () => {  
    const selectedRowsFromRef = cvTableRef.current?.getSelectedRows() || new Set();
    console.log("selectedRows from ref:", selectedRowsFromRef);
   
    if (activeTab === "collection" && selectedRowsFromRef.size > 0) {
      const selectedIndices = Array.from(selectedRowsFromRef); 
      const selectedCVs = selectedIndices.map(index => cvCollections[index]);

      for (const cv of selectedCVs) {
        try {
          const email = cv?.["email"];
          const version = cv?.["version"];
          if (!email) continue;
   
          const response =  await apiClient.cv.getCVInformation(email, version);
          console.log("Information API response:", response);
          const encoded = response["Encoded Content"];
          if (encoded) {
            downloadPDF(encoded, email); // filename = email.pdf
          }
   
   
        } catch (error) {
          console.error("Error fetching information:", error);
        }
      }
   
      toast.success(`Download initiated for ${selectedRowsFromRef.size} selected CVs`, {
        autoClose: 2000
      });
    } else {
      toast.error("Please select CVs to download", {
        autoClose: 2000
      });
    }
  };
    
  // Handle tab changes and trigger appropriate API call
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Trigger API call for the new tab after a short delay to ensure state is updated
    setTimeout(() => {
      if (tab === "collection") {
        refetchCV();
        // Don't reset selectedRows for collection tab
      } else if (tab === "activities") {
        refetchDraft();
        // Reset selectedRows when switching to other tabs
        setSelectedRows(new Set());
      } else if (tab === "archived") {
        refetchArchived();
        // Reset selectedRows when switching to other tabs
        setSelectedRows(new Set());
      }
    }, 100);
  };

  // Initial API call when component mounts
  useEffect(() => {
    refetchCV();
  }, []);

  return (
    <motion.div 
      className={styles.dashboardBg}
      initial={pageTransitions.initial}
      animate={pageTransitions.animate}
      exit={pageTransitions.exit}
      transition={pageTransitions.transition}
    >
      <Header />
      <motion.div 
        className={styles.dashboardContainer}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
          <motion.div variants={staggerItem}>
            <Toolbar
              onCreate={() => {
                navigate("/create-cv");
              }}
              onDownload={() => alert("Download")}
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} onDownload={handleDownload} />
          </motion.div>
          <motion.div variants={staggerItem}>
            {activeTab === "collection" && <CVTable ref={cvTableRef} />}
            {activeTab === "activities" && <DraftCVsTable />}
            {activeTab === "archived" && <ArchivedCVsTable />}
          </motion.div>
          <motion.div variants={staggerItem}
            className={styles.cardStyleLayout}
          style={{
            position: "absolute",
            bottom: "0px",
            width: "97.5%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.8)",
          }}>
            <Pagination 
              page={
                activeTab === "collection" ? currentPage :
                activeTab === "activities" ? draftCurrentPage :
                archivedCurrentPage
              }
              totalPages={
                activeTab === "collection" ? totalPages :
                activeTab === "activities" ? draftTotalPages :
                archivedTotalPages
              }
              onPageChange={
                activeTab === "collection" ? setCurrentPage :
                activeTab === "activities" ? setDraftCurrentPage :
                setArchivedCurrentPage
              }
            />
          </motion.div>
      </motion.div>
    </motion.div>
  );
}
