import { motion } from "framer-motion";
import styles from "./CVBuilder.module.scss";
import { cvBuilderContext } from "@/contexts/cv-builder.context";
import { buttonHover, staggerContainer, staggerItem } from "@/utils/animations";

export default function Header() {
  const { handleBack, handleSaveDraft, handlePreview } = cvBuilderContext();
  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <motion.button
        className={styles.backBtn}
        onClick={handleBack}
        {...buttonHover}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.19512 7.79102L7.62845 12.2243L6.50033 13.3327L0.166992 6.99935L6.50033 0.666016L7.62845 1.77435L3.19512 6.20768H12.8337V7.79102H3.19512Z"
            fill="#1E2331"
          />
        </svg>{" "}
        CV Creation
      </motion.button>
      <motion.div
        className={styles.actions}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.button
          className={styles.saveDraftBtn}
          onClick={handleSaveDraft}
          variants={staggerItem}
          {...buttonHover}
          whileTap={{ scale: 0.95 }}
        >
          Save Draft
        </motion.button>
        <motion.button
          className={styles.previewBtn}
          onClick={handlePreview}
          variants={staggerItem}
          {...buttonHover}
          whileTap={{ scale: 0.95 }}
        >
          Preview CV
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
