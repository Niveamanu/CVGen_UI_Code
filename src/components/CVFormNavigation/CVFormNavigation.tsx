import React from "react";
import { motion } from "framer-motion";
import styles from "./CVFormNavigation.module.scss";

interface CVFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  showSkip?: boolean;
  nextButtonText?: string;
  prevButtonText?: string;
  progressPercentage?: number;
  cvData?: Record<string, any>;
  onComplete?: (cvData: Record<string, any>) => void;
}

export default function CVFormNavigation({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  onSkip, 
  isFirstStep = false,
  isLastStep = false,
  showSkip = false,
  nextButtonText = "Next",
  prevButtonText = "Prev",
  progressPercentage = 0,
  cvData = {},
  onComplete
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
        {/* <div className={styles.stepIndicator}>
          <span className={styles.stepText}>
            Step {currentStep} of {totalSteps}
          </span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div> */}

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
                // Check completion percentage for Complete button
                if (progressPercentage >= 1) {
                  console.log("=== CV COMPLETION - ENTIRE CV DATA ===");
                  console.log("CV Data Object:", cvData);
                  console.log("CV Data Keys:", Object.keys(cvData));
                  
                  // Log each section individually for better readability
                  Object.entries(cvData).forEach(([sectionName, sectionData]) => {
                    console.log(`--- ${sectionName} ---`);
                    console.log(sectionData);
                  });
                  
                  console.log("=== END CV DATA ===");
                  
                  // Call onComplete function if provided
                  if (onComplete) {
                    onComplete(cvData);
                  } else {
                    alert("CV completed successfully! Check console for complete CV data.");
                  }
                } else {
                  alert(`Please complete all sections first. Current completion: ${progressPercentage}%`);
                }
              } else {
                onNext();
              }
            }}
          >
            {isLastStep ? "Complete" : nextButtonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
