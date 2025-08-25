
import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SkeletonPage.module.scss";
import SkeletonTable from "./SkeletonTable";
import SkeletonCVBuilder from "./SkeletonCVBuilder";

const SkeletonPage: React.FC = () => {
  const pathname = window.location.pathname;
  const isUploadPage = pathname === "/create-cv";

  if (isUploadPage) {
    return (
      <div
        className={styles.skeletonPageWrapper}
        style={{
          height: '100vh',
          width: '100vw',
          background: '#fafafa',
          padding: 0,
        }}
      >
        <div
          className={styles.skeletonHeader}
          style={{
            width: '100%',
            margin: '0 auto',
            marginBottom: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 56,
          }}
        >
          <div style={{ width: 180, height: 28, background: '#222', borderRadius: 8, marginRight: 'auto', marginLeft: 40 }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: 120, height: 28, background: '#ffd600', borderRadius: 16, marginRight: 40 }} />
        </div>
        {/* Upload Card Skeleton */}
        <div
          style={{
            width: 480,
            maxWidth: '95vw',
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
            padding: '3.5rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          <div style={{ width: 220, height: 32, background: '#e0e0e0', borderRadius: 8, marginBottom: 24, animation: 'skeleton-loading 1.2s infinite linear', backgroundImage: 'linear-gradient(90deg, #e0e0e0 25%, #f5f6f8 50%, #e0e0e0 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: 320, height: 18, background: '#f1f3f5', borderRadius: 6, marginBottom: 32, animation: 'skeleton-loading 1.2s infinite linear', backgroundImage: 'linear-gradient(90deg, #f1f3f5 25%, #e0e0e0 50%, #f1f3f5 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: 320, height: 44, background: '#f8f9fa', borderRadius: 12, marginBottom: 16, animation: 'skeleton-loading 1.2s infinite linear', backgroundImage: 'linear-gradient(90deg, #f8f9fa 25%, #e0e0e0 50%, #f8f9fa 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: 320, height: 44, background: '#f8f9fa', borderRadius: 12, marginBottom: 16, animation: 'skeleton-loading 1.2s infinite linear', backgroundImage: 'linear-gradient(90deg, #f8f9fa 25%, #e0e0e0 50%, #f8f9fa 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: 320, height: 44, background: '#f8f9fa', borderRadius: 12, marginBottom: 32, animation: 'skeleton-loading 1.2s infinite linear', backgroundImage: 'linear-gradient(90deg, #f8f9fa 25%, #e0e0e0 50%, #f8f9fa 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: 220, height: 18, background: '#e0e0e0', borderRadius: 6, marginBottom: 24, animation: 'skeleton-loading 1.2s infinite linear', backgroundImage: 'linear-gradient(90deg, #e0e0e0 25%, #f5f6f8 50%, #e0e0e0 75%)', backgroundSize: '200% 100%' }} />
          <div style={{ width: 320, height: 48, background: '#222', borderRadius: 12, animation: 'skeleton-loading 1.2s infinite linear', backgroundImage: 'linear-gradient(90deg, #222 25%, #e0e0e0 50%, #222 75%)', backgroundSize: '200% 100%' }} />
        </div>
      </div>
    );
  }

  // Default skeleton for all other pages
  return (
    <div className={styles.skeletonPageWrapper}>
      {/* Header */}
      <div className={styles.skeletonHeader}>
        <div style={{ width: 180, height: 28, background: '#222', borderRadius: 8, marginRight: 24 }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 120, height: 28, background: '#ffd600', borderRadius: 16 }} />
      </div>
      <>
        {location.pathname === "/cv-builder" ? (
          <SkeletonCVBuilder />
        ) : (
          <>
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
            <div className={styles.skeletonMain}>
              <SkeletonTable columns={6} rows={8} />
            </div>
            <div className={styles.skeletonBottomBar} />
          </>
        )}
      </>
    </div>
  );
};

export default SkeletonPage;
