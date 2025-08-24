import React from "react";
import { motion } from "framer-motion";
import styles from "./CVBuilder.module.scss";
import { cvBuilderContext } from "@/contexts/cv-builder.context";
import {
  cardHover,
  scaleTransitions,
  staggerContainer,
  staggerItem,
} from "@/utils/animations";

export default function Sidebar() {
  const { completedSteps, steps, currentStep, handleStepClick } =
    cvBuilderContext();
  return (
    <motion.div
      className={styles.sidebar}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <motion.div
        className={styles.progressCard}
        {...scaleTransitions}
        transition={{ duration: 0.3, delay: 0.5 }}
        {...cardHover}
      >
        <h3>Overall CV Completion</h3>
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progress}
            initial={{ width: 0 }}
            animate={{ width: `${completedSteps.progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <motion.span
          className={styles.progressText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          key={completedSteps.progressPercentage}
        >
          {`${completedSteps.progressPercentage}%`}
        </motion.span>
      </motion.div>

      <motion.div
        className={styles.stepsContainer}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className={styles.stepsList}>
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              id={`cv-step-${step.id}`}
              className={`${styles.stepItem} ${
                step.id === currentStep ? styles.active : ""
              } ${step.completed ? styles.completed : ""}`}
              onClick={() => handleStepClick(step.id)}
              variants={staggerItem}
              custom={index}
              whileHover={{
                x: 5,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              animate={{
                color:
                  step.id === currentStep
                    ? "var(--primary-color, #007bff)"
                    : "transparent",
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className={styles.stepNumber}
                animate={{
                  scale: step.id === currentStep ? 1.1 : 1,
                  rotate: step.completed ? [0, 360] : 0,
                }}
                transition={{
                  duration: step.completed ? 0.5 : 0.3,
                  ease: "easeInOut",
                }}
              >
                {step.completed ? (
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.57825 15.642L19.2202 6L20.5005 7.28025L9.57825 18.2025L4.5 13.1257L5.78025 11.8455L9.57825 15.642Z"
                      fill="white"
                    />
                  </svg>
                ) : step.id < 10 ? (
                  `0${step.id}`
                ) : (
                  step.id
                )}
              </motion.div>
              <motion.span
                className={styles.stepTitle}
                animate={{
                  color:
                    step.id === currentStep
                      ? "var(--white, #ffffff)"
                      : "var(--dark, #333333)",
                }}
                transition={{ duration: 0.2 }}
              >
                {step.title}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
