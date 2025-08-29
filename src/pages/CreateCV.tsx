import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import styles from "./CreateCV.module.scss";
import { useApiClient } from "../hooks/useApiClient";
import { toast } from "react-toastify";

export default function CreateCV() {
  const navigate = useNavigate();
  const apiClient = useApiClient();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    // Only take the first file (single file upload)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidFileType(droppedFile)) {
        setFile(droppedFile);
      } else {
        toast.error("Please select a valid file type (.docx or .pdf)");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only take the first file (single file upload)
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile);
      } else {
        toast.error("Please select a valid file type (.docx or .pdf)");
      }
    }
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/pdf", // .pdf
    ];
    return validTypes.includes(file.type);
  };

  const handleCreateNewCV = async () => {
    // If no file is uploaded, go directly to CV builder
    if (!file) {
      navigate("/cv-builder");
      return;
    }

    // If file is uploaded, process it first
    try {
      setIsProcessing(true);

      // Upload the file to the API
      const response = await apiClient.cv.uploadCV(file);

      // Wait a moment to show completion
      setTimeout(() => {
        toast.success("CV uploaded successfully! Processing completed.");
        setIsProcessing(false);

        // Navigate to CV builder with the processed data
        navigate("/cv-builder", {
          state: {
            uploadedCVData: response,
            fileName: file.name,
          },
        });
      }, 1000);
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast.error("Failed to upload CV. Please try again.");
      setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className={styles.createCVPage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          {isProcessing ? (
            <div className={styles.processingState}>
              <h1 className={styles.processingTitle}>
                We are Processing, Please Wait
              </h1>
              <p className={styles.processingSubtitle}>
                Your file is currently being processed. This may take a moment.
                Please stay on this page until the process is complete.
              </p>

              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.cardHeader}>
                <h1 className={styles.title}>Build Professional CV</h1>
                <p className={styles.subtitle}>
                  Create professional CV that showcases expertise and
                  achievements
                </p>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.uploadSection}>
                  <h3 className={styles.uploadTitle}>
                    Upload Your Existing CV
                  </h3>

                  {file ? (
                    <div className={styles.fileSelected}>
                      <div className={styles.fileIcon}>
                        <span className={styles.fileType}>
                          {file.name.split(".").pop()?.toUpperCase() || "DOC"}
                        </span>
                      </div>
                      <div className={styles.fileInfo}>
                        <p className={styles.fileName}>{file.name}</p>
                        <p className={styles.fileSize}>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        className={styles.removeFile}
                        onClick={removeFile}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`${styles.uploadArea} ${
                        dragActive ? styles.dragActive : ""
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <div className={styles.uploadIcon}>
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <mask
                              id="mask0_212_2991"
                              style={{ maskType: "alpha" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="48"
                              height="48"
                            >
                              <rect width="48" height="48" fill="#1472ED" />
                            </mask>
                            <g mask="url(#mask0_212_2991)">
                              <path
                                d="M13 38C10.505 38 8.38133 37.1323 6.629 35.397C4.87633 33.662 4 31.5412 4 29.0345C4 26.6655 4.81533 24.6117 6.446 22.873C8.077 21.1347 9.9925 20.2 12.1925 20.069C12.6412 17.1563 13.9808 14.75 16.2115 12.85C18.4422 10.95 21.0383 10 24 10C27.343 10 30.1787 11.1643 32.507 13.493C34.8357 15.8213 36 18.657 36 22V24H37.231C39.1463 24.0617 40.7533 24.7648 42.052 26.1095C43.3507 27.4545 44 29.0847 44 31C44 32.9617 43.3365 34.6187 42.0095 35.971C40.6825 37.3237 39.0383 38 37.077 38H26.231C25.3103 38 24.5417 37.6917 23.925 37.075C23.3083 36.4583 23 35.6897 23 34.769V23.1615L18.8 27.3385L17.3845 25.9615L24 19.346L30.6155 25.9615L29.2 27.3385L25 23.1615V34.769C25 35.077 25.1282 35.3592 25.3845 35.6155C25.6408 35.8718 25.923 36 26.231 36H37C38.4 36 39.5833 35.5167 40.55 34.55C41.5167 33.5833 42 32.4 42 31C42 29.6 41.5167 28.4167 40.55 27.45C39.5833 26.4833 38.4 26 37 26H34V22C34 19.2333 33.025 16.875 31.075 14.925C29.125 12.975 26.7667 12 24 12C21.2333 12 18.875 12.975 16.925 14.925C14.975 16.875 14 19.2333 14 22H12.923C11.0667 22 9.44867 22.6833 8.069 24.05C6.68967 25.4167 6 27.0667 6 29C6 30.9333 6.68333 32.5833 8.05 33.95C9.41667 35.3167 11.0667 36 13 36H18V38H13Z"
                                fill="#1472ED"
                              />
                            </g>
                          </svg>
                        </div>
                        <div
                          className={styles.browseBtn}
                          onClick={() =>
                            document.getElementById("fileInput")?.click()
                          }
                        >
                          Browse Files
                        </div>
                      </div>
                      <div className={styles.uploadContent}>
                        <p className={styles.uploadText}>
                          Select File or drag and drop here
                        </p>
                        <p className={styles.supportedFormats}>
                          Supported File (*.docx, *.pdf)
                        </p>
                      </div>

                      <input
                        id="fileInput"
                        type="file"
                        accept=".docx,.pdf"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        multiple={false}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.divider}>
                  <span>or</span>
                </div>

                <button
                  className={styles.createNewBtn}
                  onClick={handleCreateNewCV}
                  disabled={isProcessing}
                >
                  {file ? "Process CV & Continue" : "Create New CV"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Full-screen overlay to prevent user interaction during upload */}
      {isProcessing && <div className={styles.overlay} />}
    </div>
  );
}
