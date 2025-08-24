import React, { Suspense, useMemo } from "react";
import {
  buttonHover,
  cardHover,
  scaleTransitions,
  staggerContainer,
  staggerItem,
  stepTransition,
} from "@/utils/animations";
import { cvBuilderContext } from "@/contexts/cv-builder.context";
import {
  PersonalDetailsForm,
  FlourishSiteAffiliationsForm,
  HospitalAffiliationsForm,
  ResearchAffiliationsForm,
  EducationForm,
  LicensesCertificationsForm,
  PublicationsForm,
  ProfessionalExperienceForm,
  ProfessionalActiveMembershipsForm,
  PsychometricRatingScalesExperienceForm,
  ClinicalResearchTrialsForm,
  TrainingForm,
  AchievementsAwardsForm,
} from "@/components/CVForms";
import SkeletonCVBuilder from "@/components/Skeleton/SkeletonCVBuilder";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./CVBuilder.module.scss";
import SkeletonCVForm from "@/components/Skeleton/SkeletonCVForm";
import CVFormNavigation from "./CVFormNavigation";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function () {
  const {
    handlePrevious,
    handleNext,
    handleStateChange,
    handleComplete,
    cvData,
    isLoading,
    currentStep,
    setCurrentStep,
    steps,
    isNextClick,
    setIsNextClick,
  } = cvBuilderContext();

  const lookup = useMemo(
    () => ({
      1: PersonalDetailsForm,
      2: FlourishSiteAffiliationsForm,
      3: HospitalAffiliationsForm,
      4: ResearchAffiliationsForm,
      5: EducationForm,
      6: LicensesCertificationsForm,
      7: PublicationsForm,
      8: ProfessionalExperienceForm,
      9: ProfessionalActiveMembershipsForm,
      10: PsychometricRatingScalesExperienceForm,
      11: ClinicalResearchTrialsForm,
      12: TrainingForm,
      13: AchievementsAwardsForm,
    }),
    []
  );
  const DynamicScreen = useMemo(() => {
    return lookup[currentStep as keyof typeof lookup];
  }, [currentStep, lookup]);

  if (isLoading) {
    return <SkeletonCVBuilder />;
  }
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Header />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Form */}
        <motion.div
          id="cv-form-content"
          className={styles.mainContent}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="p-4"
              style={{
                minHeight: "-webkit-fill-available",
              }}
              variants={stepTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Suspense fallback={<SkeletonCVForm />}>
                <DynamicScreen
                  isNextClick={isNextClick}
                  setIsNextClick={setIsNextClick}
                  onSubmit={handleNext}
                  defaultValues={(data: string) => {
                    if (data === "Personal Information") {
                      return {
                        ...cvData["Personal Information"],
                        Languages: cvData["Languages"] || [],
                      };
                    }
                    return cvData[data as keyof typeof cvData] || [];
                  }}
                  onChange={handleStateChange}
                />
              </Suspense>
            </motion.div>
          </AnimatePresence>

          <CVFormNavigation
            onNext={() => {
              setIsNextClick(true);
            }}
            onPrev={handlePrevious}
            onSkip={() => setCurrentStep(currentStep + 1)}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === steps.length}
            showSkip={currentStep < steps.length}
            onComplete={handleComplete}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
