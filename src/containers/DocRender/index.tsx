
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { PDFViewer, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import CVTemplate from './CVTemplate';
import testPayload from './test.json';
import CVTemplateHTML from './CVTemplateHTML';
import { cvBuilderContext } from '@/contexts/cv-builder.context';
import api from '@/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUser } from '@/contexts/UserContext';
import styles from './DocRenderLoading.module.scss';
import { motion } from 'framer-motion';
import { overlayVariants } from '@/utils/animations';

const DocumentViewer: React.FC = () => {
  const { isDownload, setIsDownload, cvData, isSavingDraft, setIsSavingDraft, setIsBase64Request, isBase64Request, isPreviewModalOpen } = cvBuilderContext();
  const userProfile = useSelector((state: any) => state.authUser?.profile);
  const { user: msalUser } = useUser();
  const downloadLinkRef = useRef<any>(null);
  const pdfInProgress = useRef(false);

  const mappedData = cvData

  const onBase64PdfReady = (base64Pdf: string) => {
    if(isSavingDraft){
      api.Common.saveCVDraft({
        updated_by: userProfile?.username || userProfile?.Username || userProfile?.name || userProfile?.Name || msalUser?.name || userProfile?.email || userProfile?.Email || msalUser?.email || "unknown_user",
        updated_date: new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''),
        content: cvData,
        file_encoded_content: base64Pdf
      }).then(() => {
        setIsSavingDraft(false);
      }).catch((err) => {
        toast.error("Error saving completed CV");
        setIsSavingDraft(false);
      })
    }else{
      api.Common.saveCVComplete({
        updated_by: userProfile?.username || userProfile?.Username || userProfile?.name || userProfile?.Name || msalUser?.name || userProfile?.email || userProfile?.Email || msalUser?.email || "unknown_user",
        updated_date: new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''),
        content: cvData,
        base64_content: base64Pdf
      }).then(() => {
        setIsBase64Request(false);
      }).catch((err) => {
        toast.error("Error saving completed CV");
        setIsBase64Request(false);
      })
    }
  }

  const generatePdfBase64 = async () => {
    try {
      const doc = <CVTemplate data={mappedData} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      // Convert Blob to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          // Remove the data:application/pdf;base64, prefix
          const base64String = result.split(',')[1];
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      if (onBase64PdfReady) onBase64PdfReady(base64);
      return base64;
    } catch (err) {
      console.error('Error generating PDF base64:', err);
      return '';
    }
  };

  useEffect(() => {
    let cancelled = false;
    if ((isBase64Request || isSavingDraft) && !pdfInProgress.current) {
      pdfInProgress.current = true;
      generatePdfBase64().then((base64) => {
        if (!cancelled) {
          onBase64PdfReady(base64);
        }
      }).catch((error) => {
        if (!cancelled) {
          console.error('Error generating PDF base64:', error);
          if (onerror) onerror(error);
        }
      }).finally(() => {
        pdfInProgress.current = false;
      });
    }

    if (!isBase64Request && !isSavingDraft) {
      pdfInProgress.current = false;
    }

    return () => {
      cancelled = true;
      pdfInProgress.current = false;
    };
  }, [isBase64Request, isSavingDraft]);

  useEffect(() => {
    if(isDownload && setIsDownload) {
      setIsDownload(false);
      if (downloadLinkRef.current && downloadLinkRef.current.querySelector('a')) {
        downloadLinkRef.current.querySelector('a').click();
      }
    }
  }, [isDownload, setIsDownload])

  const generateFileName = () => {
    const personalInfo = mappedData["Personal Information"];
    const name = [personalInfo?.["First Name"], personalInfo?.["Middle Name"], personalInfo?.["Last Name"]].filter(Boolean).join('_') || 'CV';
    const date = new Date().toISOString().split('T')[0];
    return `${name}_CV_${date}.pdf`;
  };  
  if (isBase64Request || isSavingDraft) {
    const handleCancel = () => {
      if (isBase64Request) setIsBase64Request(false);
      if (isSavingDraft) setIsSavingDraft(false);
    };
    let title = "Generating your CV PDF...";
    let subtitle = "Please wait while we prepare your document for download and preview.";
    if (isSavingDraft) {
      title = "Saving your CV draft...";
      subtitle = "Please wait while we save your draft. Do not close the window.";
    } else if (isBase64Request) {
      title = "Generating your CV PDF...";
      subtitle = "Please wait while we generate your document. This may take a few seconds.";
    }
    return (
      <motion.div
        className={styles.loadingOverlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants as any}
      >
        <motion.div
          className={styles.loadingBox}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.4, type: "spring" } }}
        >
          <div className={styles.spinner} role="status" aria-label="Loading" />
          <div className={styles.loadingTitle}>{title}</div>
          <div className={styles.loadingSubtitle}>{subtitle}</div>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
            style={{
              marginTop: 24,
              padding: '0.5rem 1.5rem',
              fontSize: 16,
              borderRadius: 8,
              border: 'none',
              background: '#eee',
              color: '#1E2331',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(30,35,49,0.06)',
              transition: 'background 0.2s',
            }}
          >
            Cancel
          </button>
        </motion.div>
      </motion.div>
    );
  }
  return (
    <div 
      className="document-viewer-container"
      style={{ 
        width: "100%", 
        height: "100%", 
        minHeight: "500px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Hidden Download Link for programmatic download */}
      <div ref={downloadLinkRef} style={{ display: 'none' }}>
        <PDFDownloadLink
          document={<CVTemplate data={mappedData} />}
          fileName={generateFileName()}
        >
          {({ blob, url, loading, error }) => 'Download'}
        </PDFDownloadLink>
      </div>

      {/* PDF Viewer */}
      <div 
        style={{ 
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "auto",
          position: "relative"
        }}
      >
        <CVTemplateHTML data={mappedData} />
      </div>
    </div>
  );
};

export default DocumentViewer;