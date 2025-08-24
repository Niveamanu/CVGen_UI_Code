import React from "react";
import styles from "./SkeletonCVForm.module.scss";

const SkeletonCVForm: React.FC = () => {
  return (
    <div className={styles.cvFormSkeletonWrapper}>
      <div className={styles.formGrid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.formField} />
        ))}
      </div>
      <div className={styles.formGrid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.formField} />
        ))}
      </div>
      <div className={styles.formActions}>
        <div className={styles.actionBtn} />
        <div className={styles.actionBtn} />
      </div>
    </div>
  );
};

export default SkeletonCVForm;
