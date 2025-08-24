import React from "react";
import styles from "./SkeletonPage.module.scss";
import SkeletonTable from "./SkeletonTable";

const SkeletonPage: React.FC = () => {
  return (
    <div className={styles.skeletonPageWrapper}>
      {/* Header */}
      <div className={styles.skeletonHeader}>
        <div style={{ width: 180, height: 28, background: '#222', borderRadius: 8, marginRight: 24 }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 120, height: 28, background: '#ffd600', borderRadius: 16 }} />
      </div>
      {/* Tabs */}
      <div className={`d-flex justify-content-between ${styles.skeletonTabs}`} style={{background: "transparent"}}>
        <div className={styles.skeletonTab} />
        <div className={styles.skeletonTab} />
      </div>
      <div className={styles.skeletonTabs}>
        <div className={`${styles.skeletonTab} ${styles.active}`} />
        <div className={styles.skeletonTab} />
        <div className={styles.skeletonTab} />
        <div className={styles.skeletonTab} />
        <div className={styles.skeletonTab} />
      </div>
      {/* Main Table Skeleton */}
      <div className={styles.skeletonMain}>
        <SkeletonTable columns={6} rows={8} />
      </div>
      {/* Bottom Bar */}
      <div className={styles.skeletonBottomBar} />
    </div>
  );
};

export default SkeletonPage;
