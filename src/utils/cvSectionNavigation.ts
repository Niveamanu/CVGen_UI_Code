/**
 * Utility functions for CV Builder section navigation
 */

/**
 * Normalize a section title for URL parameter use
 * Removes special characters and converts to lowercase
 */
export const normalizeSectionTitle = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
};

/**
 * Generate a CV Builder URL with section parameter
 */
export const getCVBuilderSectionURL = (sectionTitle: string): string => {
  const normalizedSection = normalizeSectionTitle(sectionTitle);
  return `/cv-builder?section=${normalizedSection}`;
};

/**
 * Available CV sections with their normalized names
 */
export const CV_SECTIONS = [
  { id: 1, title: "Personal Information", urlParam: "personalinformation" },
  {
    id: 2,
    title: "Flourish Site Affiliations",
    urlParam: "flourishsiteaffiliations",
  },
  { id: 3, title: "Hospital Affiliations", urlParam: "hospitalaffiliations" },
  { id: 4, title: "Research Affiliations", urlParam: "researchaffiliations" },
  { id: 5, title: "Education", urlParam: "education" },
  {
    id: 6,
    title: "Licenses & Certifications",
    urlParam: "licensescertifications",
  },
  { id: 7, title: "Publications", urlParam: "publications" },
  {
    id: 8,
    title: "Professional Experience",
    urlParam: "professionalexperience",
  },
  {
    id: 9,
    title: "Professional Active Memberships",
    urlParam: "professionalactivememberships",
  },
  {
    id: 10,
    title: "Psychometric Rating/ Scales Experience",
    urlParam: "psychometricratingscalesexperience",
  },
  {
    id: 11,
    title: "Clinical Research Trials Conducted",
    urlParam: "clinicalresearchtrialsconducted",
  },
  { id: 12, title: "Training", urlParam: "training" },
  { id: 13, title: "Achievements or Awards", urlParam: "achievementsorawards" },
] as const;

/**
 * Find section by title or URL parameter
 */
export const findSection = (titleOrParam: string) => {
  const normalized = normalizeSectionTitle(titleOrParam);
  return CV_SECTIONS.find(
    (section) =>
      section.urlParam === normalized ||
      normalizeSectionTitle(section.title) === normalized
  );
};
