import React from "react";

export const PersonalDetailsForm = React.lazy(
  () => import("./PersonalDetailsForm")
);
export const FlourishSiteAffiliationsForm = React.lazy(
  () => import("./FlourishSiteAffiliationsForm")
);
export const HospitalAffiliationsForm = React.lazy(
  () => import("./HospitalAffiliationsForm")
);
export const ResearchAffiliationsForm = React.lazy(
  () => import("./ResearchAffiliationsForm")
);
export const EducationForm = React.lazy(() => import("./EducationForm"));
export const LicensesCertificationsForm = React.lazy(
  () => import("./LicensesCertificationsForm")
);
export const PublicationsForm = React.lazy(() => import("./PublicationsForm"));
export const ProfessionalExperienceForm = React.lazy(
  () => import("./ProfessionalExperienceForm")
);
export const ProfessionalActiveMembershipsForm = React.lazy(
  () => import("./ProfessionalActiveMembershipsForm")
);
export const PsychometricRatingScalesExperienceForm = React.lazy(
  () => import("./PsychometricRatingScalesExperienceForm")
);
export const ClinicalResearchTrialsForm = React.lazy(
  () => import("./ClinicalResearchTrialsForm")
);
export const TrainingForm = React.lazy(() => import("./TrainingForm"));
export const AchievementsAwardsForm = React.lazy(
  () => import("./AchievementsAwardsForm")
);

export type { IBaseFormProps } from "./types";
