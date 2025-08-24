import React from "react";
import styles from "./SkeletonSection.module.scss";

interface SkeletonSectionProps {
  title?: string;
  rows?: number;
}

const SkeletonSection: React.FC<SkeletonSectionProps> = ({ rows = 6 }) => {
  return (
    <div className={styles["skeleton-section"]}>
      <div className={styles["skeleton-title"]} style={{ marginBottom: 28 }} />
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={
            i === rows - 1
              ? `${styles["skeleton-row"]} ${styles["short"]}`
              : styles["skeleton-row"]
          }
        />
      ))}
    </div>
  );
};

export default SkeletonSection;
