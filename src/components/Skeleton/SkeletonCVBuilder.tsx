import React from "react";
import styles from "./SkeletonCVBuilder.module.scss";

const SkeletonCVBuilder: React.FC = () => {
  return (
    <div className={styles.cvBuilderSkeletonPage}>
      <div className={styles.sidebar}>
        {/* Progress Card */}
        <div className={styles.progressCard}>
          <div className={styles.progressTitle} />
          <div className={styles.progressBarWrapper}>
            <div className={styles.progressBar} />
          </div>
          <div className={styles.progressPercent} />
        </div>
        {/* Steps Skeleton */}
        <div className={styles.stepsList}>
          {[...Array(7)].map((_, i) => (
            <div key={i} className={styles.stepItem}>
              <div className={styles.stepCircle} />
              <div className={styles.stepLine} />
              <div className={styles.stepLabel} />
            </div>
          ))}
        </div>
      </div>
      {/* Main Content Skeleton */}
      <div className={styles.mainContent}>
        {/* Header Skeleton */}
        <div className={styles.header}>
          <div className={styles.headerLeft} />
          <div className={styles.headerRight} />
        </div>
        {/* Table Skeleton */}
        <div className={styles.formCard} style={{padding: 0, marginBottom: 32}}>
          {/* Table Header */}
          <div style={{display: 'flex', padding: '24px 24px 12px 24px', gap: 16, background: '#fffbe6', borderTopLeftRadius: 16, borderTopRightRadius: 16}}>
            <div style={{width: 32}} />
            <div style={{width: 160, height: 24, background: '#ffe066', borderRadius: 8}} />
            <div style={{width: 220, height: 24, background: '#ffe066', borderRadius: 8}} />
            <div style={{width: 180, height: 24, background: '#ffe066', borderRadius: 8}} />
            <div style={{width: 120, height: 24, background: '#ffe066', borderRadius: 8}} />
            <div style={{width: 160, height: 24, background: '#ffe066', borderRadius: 8}} />
          </div>
          {/* Table Rows */}
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', padding: '12px 24px', gap: 16}}>
              <div style={{width: 32}} />
              <div style={{width: 160, height: 20, background: '#f8f9fa', borderRadius: 8}} />
              <div style={{width: 220, height: 20, background: '#f8f9fa', borderRadius: 8}} />
              <div style={{width: 180, height: 20, background: '#f8f9fa', borderRadius: 8}} />
              <div style={{width: 120, height: 20, background: '#f8f9fa', borderRadius: 8}} />
              <div style={{width: 160, height: 20, background: '#f8f9fa', borderRadius: 8}} />
            </div>
          ))}
        </div>
        {/* Navigation Buttons Skeleton */}
        <div className={styles.formNav}>
          <div className={styles.navBtn} />
          <div className={styles.navBtn} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCVBuilder;
