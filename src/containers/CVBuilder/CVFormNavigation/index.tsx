import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./CVFormNavigation.module.scss";

interface CVFormNavigationProps {
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  showSkip?: boolean;
  nextButtonText?: string;
  prevButtonText?: string;
  onComplete?: () => void;
  totalSteps: number;
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
  currentStep,
  totalSteps,
}: CVFormNavigationProps) {
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);

  const handleNext = () => {
    setNextDisabled(true);
    setTimeout(() => setNextDisabled(false), 400);
    if (isLastStep) {
      onComplete && onComplete();
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    setPrevDisabled(true);
    setTimeout(() => setPrevDisabled(false), 400);
    onPrev();
  };

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
              disabled={nextDisabled || prevDisabled}
            >
              Skip &gt;&gt;
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <span className={styles.stepText}>
            Step {currentStep} of {totalSteps}
          </span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          {!isFirstStep && (
            <button 
              type="button" 
              className={styles.prevBtn} 
              onClick={handlePrev}
              disabled={prevDisabled}
            >
              {prevButtonText}
            </button>
          )}
          <button 
            type="button" 
            className={styles.nextBtn} 
            onClick={handleNext}
            disabled={nextDisabled}
          >
            {isLastStep ? "Preview CV" : nextButtonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
