import React from "react";
import styles from "./Pagination.module.scss";

export default function Pagination({ page = 1, totalPages = 5, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(1)} disabled={page === 1} className={"border border-dark rounded-md px-2 py-1 "+ styles.border}>
        <svg width="16" height="14" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.16406 0.666667L0.997396 4.83333L5.16406 9" stroke="#1E2331" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 0.666667L6.83333 4.83333L11 9" stroke="#1E2331" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className={"border border-dark rounded-md px-2 py-1 "+ styles.border}>
        <svg width="14" height="14" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.16699 0.832682L1.00033 4.99935L5.16699 9.16602" stroke="#1E2331" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          className={page === idx + 1 ? styles.active : ""}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}  className={"border border-dark rounded-md px-2 py-1 "+ styles.border}>
        <svg width="14" height="14" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 9.16732L5.16667 5.00065L1 0.833984" stroke="#1E2331" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages} className={"border border-dark rounded-md px-2 py-1 "+ styles.border}>
        <svg width="16" height="14" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.83594 9.33333L11.0026 5.16667L6.83594 1" stroke="#1E2331" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 9.33333L5.16667 5.16667L1 1" stroke="#1E2331" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
