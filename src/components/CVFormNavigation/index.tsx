import React from "react";
import { motion } from "framer-motion";
import styles from "./CVFormNavigation.module.scss";

interface CVFormNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  showSkip?: boolean;
  nextButtonText?: string;
  prevButtonText?: string;
  onComplete?: () => void;
  currentStep: number;
}

export default function CVFormNavigation({ 
  onNext, 
  onPrev, 
  onSkip, 
  isFirstStep = false,
  isLastStep = false,
  showSkip = false,
  nextButtonText = "Next",
  prevButtonText = "Prev",
  onComplete,
  currentStep
}: CVFormNavigationProps) {
  return (
    <motion.div 
      className={styles.navigationContainer}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={styles.navigationContent}>
        {/* Skip Button */}
        <div className={styles.leftSection}>
          {showSkip && (
            <button 
              type="button" 
              className={styles.skipBtn} 
              onClick={onSkip}
            >
              Skip &gt;&gt;
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <span className={styles.stepText}>
            Step {currentStep} of {10}
          </span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          {!isFirstStep && (
            <button 
              type="button" 
              className={styles.prevBtn} 
              onClick={onPrev}
            >
              {prevButtonText}
            </button>
          )}
          <button 
            type="button" 
            className={styles.nextBtn} 
            onClick={() => {
              if (isLastStep) {
                onComplete && onComplete();
              } else {
                onNext();
              }
            }}
          >
            {isLastStep ? "Preview CV" : nextButtonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
