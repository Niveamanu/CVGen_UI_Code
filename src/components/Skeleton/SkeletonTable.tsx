import React from "react";
import styles from "./SkeletonTable.module.scss";

interface SkeletonTableProps {
  columns?: number;
  rows?: number;
}

const columnWidths = ["short", "medium", "medium", "short", "short", "short"];

const SkeletonTable: React.FC<SkeletonTableProps> = ({ columns = 6, rows = 8 }) => {
  return (
    <div className={styles.skeletonTableWrapper}>
      <table className={styles.skeletonTable}>
        <thead>
          <tr>
            {[...Array(columns)].map((_, colIdx) => (
              <th key={colIdx} className={styles.skeletonHeaderCell}>
                <div className={`${styles.skeletonCell} ${styles.short}`} style={{ height: 18 }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIdx) => (
            <tr key={rowIdx} className={styles.skeletonRow}>
              {[...Array(columns)].map((_, colIdx) => (
                <td key={colIdx} style={{ padding: '0.5rem' }}>
                  <div
                    className={
                      `${styles.skeletonCell} ${styles[columnWidths[colIdx] || 'medium']}`
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
