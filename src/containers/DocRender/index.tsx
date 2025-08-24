
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

const DocumentViewer: React.FC = () => {
  const { isDownload, setIsDownload, cvData, isBase64Request, isSavingDraft, setIsPreviewModalOpen, setIsSavingDraft, setIsBase64Request } = cvBuilderContext();
  const userProfile = useSelector((state: any) => state.authUser?.profile);
  const { user: msalUser } = useUser();

  console.log("isBase64Request:", isBase64Request);
  const downloadLinkRef = useRef<any>(null);
  const mappedData = cvData

  const onBase64PdfReady = (base64Pdf: string) => {
    if(isSavingDraft){
      api.Common.saveCVDraft({
        updated_by: userProfile?.username || userProfile?.Username || userProfile?.name || userProfile?.Name || msalUser?.name || userProfile?.email || userProfile?.Email || msalUser?.email || "unknown_user",
        updated_date: new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''),
        content: cvData,
        file_encoded_content: base64Pdf
      }).then(() => {
        setIsPreviewModalOpen(false);
        setIsSavingDraft(false);
      }).catch((err) => {
        toast.error("Error saving completed CV");
        setIsPreviewModalOpen(false);
        setIsSavingDraft(false);
      })
    }else{
      api.Common.saveCVComplete({
        updated_by: userProfile?.username || userProfile?.Username || userProfile?.name || userProfile?.Name || msalUser?.name || userProfile?.email || userProfile?.Email || msalUser?.email || "unknown_user",
        updated_date: new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''),
        content: cvData,
        base64_content: base64Pdf
      }).then(() => {
        setIsPreviewModalOpen(false);
        setIsBase64Request(false);
      }).catch((err) => {
        toast.error("Error saving completed CV");
        setIsPreviewModalOpen(false);
        setIsBase64Request(false);
      })
    }
  }

  const generatePdfBase64 = useCallback(async () => {
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
  }, [mappedData, onBase64PdfReady]);

  useEffect(() => {
    if (typeof onBase64PdfReady === 'function' && isBase64Request) {
      generatePdfBase64().then((base64) => {
        onBase64PdfReady(base64);
      }).catch((error) => {
        console.error('Error generating PDF base64:', error);
        if (onerror) onerror(error);
      });
    }
  }, [generatePdfBase64, onBase64PdfReady, isBase64Request]);

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
        {/* Loading Overlay */}
        {isBase64Request && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.92)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontSize: 22,
              fontWeight: 600,
              marginBottom: 16,
              color: '#1E2331',
              letterSpacing: 0.5,
            }}>
              Generating your CV PDF...
            </div>
            <div style={{
              marginBottom: 8,
              color: '#666',
              fontSize: 15,
            }}>
              Please wait while we prepare your document for download and preview.
            </div>
            <div style={{
              marginTop: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div className="spinner-border" style={{ width: 48, height: 48, borderWidth: 5, color: '#007bff' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
        <CVTemplateHTML data={mappedData} />
      </div>
    </div>
  );
};

export default DocumentViewer;