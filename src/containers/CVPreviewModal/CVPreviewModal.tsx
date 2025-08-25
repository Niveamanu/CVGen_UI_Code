import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CVPreviewModal.module.scss";
import { cvBuilderContext } from "@/contexts/cv-builder.context";
import DocumentViewer from "../DocRender";
import { modalVariants, overlayVariants2 } from "@/utils/animations";

interface CVPreviewModalProps {
  // isOpen: boolean;
  // onClose: () => void;
  // onDownload?: () => void;
  children?: React.ReactNode;
}

const CVPreviewModal: React.FC = () => {
  
  const { isPreviewModalOpen, handleCloseModal, handleDownload, isBase64Request, isSavingDraft } = cvBuilderContext();
  console.log("isPreviewModalOpen:", isPreviewModalOpen, "isBase64Request:", isBase64Request, "isSavingDraft:", isSavingDraft);
  return (
    <AnimatePresence>
      {(isBase64Request || isSavingDraft) && !isPreviewModalOpen && (
        <DocumentViewer />
      )}
      {isPreviewModalOpen &&   (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants2}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleCloseModal}
        >
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>CV Preview</h2>
              <button
                className={styles.closeButton}
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.body}>
              <DocumentViewer />
            </div>

            {/* Modal Footer */}
            <div className={styles.footer}>
              <button
                className={styles.cancelButton}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className={styles.downloadButton}
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVPreviewModal;
