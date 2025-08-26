import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Toolbar from "../components/Toolbar";
import CVTable from "../components/CVTable";
import DraftCVsTable from "../components/DraftCVsTable";
import ArchivedCVsTable from "../components/ArchivedCVsTable";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { pageTransitions, staggerContainer, staggerItem } from "../utils/animations";
import { useDraftCVs, useArchivedCVs } from "../hooks";
import { useApiClient } from "../hooks/useApiClient"
import { toast } from "react-toastify";
import saveAs from "file-saver";

interface CVTableRef {
  getSelectedRows: () => Set<number>;
  getCVCollections: () => any[];
}
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("collection");
  const cvTableRef = useRef<CVTableRef>(null);
  const navigate = useNavigate();
  const apiClient = useApiClient();

  // Get CV data and pagination state for different tabs
  const { refetch: refetchDraft } = useDraftCVs();
  const { refetch: refetchArchived } = useArchivedCVs();

  // Helper function to validate base64 string
  const isValidBase64 = (str: string): boolean => {
    try {
      // Check if the string contains only valid base64 characters
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(str)) {
        return false;
      }
      
      // Try to decode it
      atob(str);
      return true;
    } catch {
      return false;
    }
  };

  const downloadPDF = (base64String: string, fileName: string, fullName?: string) => {
    try {
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

      // Remove any potential data URL prefix (e.g., "data:application/pdf;base64,")
      let cleanBase64 = base64String;
      if (base64String.includes(',')) {
        cleanBase64 = base64String.split(',')[1];
      }

      console.log(`Processing base64 data: length=${cleanBase64.length}, starts with: ${cleanBase64.substring(0, 20)}...`);

      // Validate the base64 string
      if (!isValidBase64(cleanBase64)) {
        console.error('Invalid base64 string format');
        toast.error('Invalid PDF data received from server. Please try again.', {
          autoClose: 5000
        });
        return;
      }

      // Decode base64 to binary
      const byteCharacters = atob(cleanBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      console.log(`Created blob: size=${blob.size} bytes, type=${blob.type}`);

      // Generate filename
      let finalFileName;
      if (fullName) {
        finalFileName = `${fullName}_Flourish_CV.pdf`;
      } else {
        finalFileName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
      }

      console.log(`Attempting to download: ${finalFileName}`);

      // Use file-saver for more reliable downloads
      saveAs(blob, finalFileName);
      
      // Show success toast
      toast.success(`Download started: ${finalFileName}`, {
        autoClose: 3000
      });
      
      // Check if download was successful after a short delay
      setTimeout(() => {
        console.log("Download attempt completed. Check if file was downloaded.");
        toast.info(`Download completed: ${finalFileName}`, {
          autoClose: 2000
        });
      }, 2000);

    } catch (error) {
      console.error("Error downloading PDF:", error);
      
      // Fallback method if file-saver fails
      try {
        console.log("Attempting fallback download method...");
        
        let cleanBase64 = base64String;
        if (base64String.includes(',')) {
          cleanBase64 = base64String.split(',')[1];
        }

        const byteCharacters = atob(cleanBase64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fullName ? `${fullName}_Flourish_CV.pdf` : (fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // Show fallback success toast
        toast.info(`Download started (fallback method): ${fullName ? `${fullName}_Flourish_CV.pdf` : (fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`)}`, {
          autoClose: 3000
        });
        
        // Delay cleanup to ensure download starts
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 1000);
        
        console.log("Fallback download method completed");
        
      } catch (fallbackError) {
        console.error("Fallback download method also failed:", fallbackError);
        toast.error("Failed to download PDF. Please try again or contact support.", {
          autoClose: 5000
        });
      }
    }
  };

  // const downloadPDF = (base64String: string, fileName: string, fullName?: string) => {
  //   const byteCharacters = atob(base64String);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: "application/pdf" });
  //   saveAs(blob, fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
  // };
  const handleDownload = async () => {
    const selectedRowsFromRef = cvTableRef.current?.getSelectedRows() || new Set();
    console.log("selectedRows from ref:", selectedRowsFromRef);

    if (activeTab === "collection" && selectedRowsFromRef.size > 0) {
      // Get cvCollections from the CVTable ref
      const cvCollections = cvTableRef.current?.getCVCollections?.() || [];
      const selectedIndices = Array.from(selectedRowsFromRef);
      const selectedCVs = selectedIndices.map(index => cvCollections[index]);

      for (const cv of selectedCVs) {
        try {
          const email = cv?.["email"];
          const version = cv?.["version"];
          const fullName = cv?.["full_name"];
          if (!email) continue;

          console.log(`Attempting to download CV for: ${email}, version: ${version}, fullName: ${fullName}`);
          
          const response = await apiClient.cv.getCVInformation(email, version);
          console.log("Information API response:", response);
          console.log("Response keys:", Object.keys(response));
          console.log("Response type:", typeof response);
          
          const encoded = response["Encoded Content"];
          if (encoded) {
            console.log(`Base64 data length: ${encoded.length} characters`);
            console.log(`Base64 data starts with: ${encoded.substring(0, 50)}...`);
            console.log(`Base64 data type: ${typeof encoded}`);
            
            downloadPDF(encoded, email, fullName);
          } else {
            console.error("No 'Encoded Content' found in response:", response);
            console.log("Available keys in response:", Object.keys(response));
            
            // Check if the data might be nested differently
            if (response.data && response.data["Encoded Content"]) {
              console.log("Found 'Encoded Content' in response.data");
              const nestedEncoded = response.data["Encoded Content"];
              downloadPDF(nestedEncoded, email, fullName);
            } else {
              toast.error(`Failed to get PDF data for ${fullName || email}`, {
                autoClose: 3000
              });
            }
          }

        } catch (error) {
          console.error("Error fetching information:", error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          toast.error(`Failed to download CV: ${errorMessage}`, {
            autoClose: 3000
          });
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

    // Note: API calls will happen automatically via useEffect in the hooks
    // when the components mount/unmount, so we don't need manual refetch calls
    // Selected rows will be managed by each individual table component
  };

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
      </motion.div>
    </motion.div>
  );
}
