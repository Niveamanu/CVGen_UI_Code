import {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ICVBuilderContext } from "./types";
import styles from "@/containers/CVBuilder/CVBuilder.module.scss";
import { pageTransitions } from "@/utils/animations";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FlourishSteps } from "./constants";

export const postContextDefaultValue: ICVBuilderContext = {
  cvData: {},
  isLoading: true,
  handleSaveDraft: () => {},
  handleBack: () => {},
  handlePrevious: () => {},
  handleNext: () => {},
  handleStateChange: () => {},
  handleComplete: () => Promise.resolve(),
  handlePreview: () => {},
  handleCloseModal: () => {},
  handleDownload: () => {},
  handleStepClick: (stepId: number) => {},
  currentStep: 1,
  setCurrentStep: () => {},
  steps: FlourishSteps,
  isNextClick: false,
  setIsNextClick: () => {},
  isPreviewModalOpen: false,
  setIsPreviewModalOpen: () => {},
  fileName: null,
  isDownload: false,
  setIsDownload: () => {},
  isBase64Request: false,
  setIsBase64Request: () => {},
  isSavingDraft: false,
  setIsSavingDraft: () => {},
  completedSteps: {
    total: 0,
    progressPercentage: 0,
  },
};
const sectionFieldMap: Record<
  string,
  { type: "object" | "array" | "custom"; fields?: string[] }
> = {
  "Personal Information": {
    type: "object",
    fields: [
      "First Name",
      "Last Name",
      "Business Email Address",
      "Degree Title",
      "Certifications",
      "Business Number",
    ],
  },
  Languages: { type: "array", fields: ["Language Name"] },
  "Flourish Site Affiliations": {
    type: "array",
    fields: ["Site Name", "CTMS Site Name", "City", "State"],
  },
  "Hospital Affiliations": {
    type: "array",
    fields: ["Hospital Name", "From Date", "city", "state"],
  },
  "Research Affiliations": {
    type: "array",
    fields: ["institutionName", "position", "start"],
  },
  Education: {
    type: "array",
    fields: [
      "startYear",
      "endYear",
      "degree",
      "universityName",
      "city",
    ],
  },
  "Licenses & Certifications": { type: "custom" },
  // 'License': { type: 'array', fields: ["licenseName", "issuingAuthority", "issueDate", "licenseNumber"] },
  // 'Certifications': { type: 'array', fields: ["certificateTitle", "issuingOrganization", "issueDate", "expiryDate", "certificationId"] },
  Publications: {
    type: "array",
    fields: [
      "Publications / Presentations",
      "Authors",
      "Journal / Source",
      "Publication Date",
    ],
  },
  "Professional Experience": {
    type: "array",
    fields: [
      "Job Title",
      "Organization/Hospital Name",
      "Start Date",
      "End Date",
      "City",
      "State",
    ],
  },
  "Professional Active Memberships": {
    type: "array",
    fields: ["Organization Name"],
  },
  "Psychometric Rating/Scales Experiences": {
    type: "array",
    fields: ["Scale / Rating Name"],
  },
  "Clinical Research Trials Conducted": {
    type: "array",
    fields: [
      "Trial Title",
      "Trial ID / Registration Number",
      "Role / Position",
      "Start Date",
      "End Date",
    ],
  },
  Training: {
    type: "array",
    fields: [
      "Training Program / Course Name",
      "Institution / Provider",
      "Start",
    ],
  },
  "Achievements or Awards": {
    type: "array",
    fields: ["Award / Achievement Name"],
  },
      };
  

interface ICVBuilderComposition {
  CVMainArea: React.FC<{ children?: React.ReactNode }>;
  // FormArea: React.FC<{ children?: React.ReactNode }>;
  // FormNavigator: React.FC<{ children?: React.ReactNode }>;
  // CVHeader: React.FC<{ children?: React.ReactNode }>;
}

const CVBuilderContext = createContext<ICVBuilderContext>(
  postContextDefaultValue
);

const CVBuilderProvider: React.FC<{ children?: React.ReactNode }> &
  ICVBuilderComposition = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [cvData, setCvData] = useState<Record<string, any>>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [steps, setSteps] = useState<{
    id: number;
    title: string;
    completed: boolean;
    keyName: string;
}[]>(FlourishSteps);
  const [currentStep, setCurrentStep] = useState(1);
  const [isNextClick, setIsNextClick] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [isBase64Request, setIsBase64Request] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("CVBuilder - location.state:", location.state, isLoading);
  const validateRequiredField = (
    val: Record<string, any>,
    fields: string[]
  ) => {
    const invalidFields: string[] = [];
    const isValid = fields.every((field) => {
      const value = val[field];
      let valid = false;
      if (Array.isArray(value)) {
        valid = value.length > 0;
      } else if (typeof value === "string") {
        valid = value.trim().length > 0;
      } else {
        valid = value !== undefined && value !== null && value !== "";
      }
      if (!valid) {
        invalidFields.push(field);
      }
      return valid;
    });
    if (!isValid) {
      console.warn("Invalid/missing required fields:", invalidFields);
    }
    return isValid;
  };

  const validateRequiredArrayField = (
    val: Record<string, any>[],
    fields: string[]
  ) => {
    if (!Array.isArray(val) || val.length === 0) {
      console.warn("Array is empty or not an array");
      return false;
    }
    let allValid = true;
    val.forEach((item, idx) => {
      const invalidFields: string[] = [];
      fields.forEach((field) => {
        const value = item[field];
        let valid = false;
        if (Array.isArray(value)) {
          valid = value.length > 0;
        } else if (typeof value === "string") {
          valid = value.trim().length > 0;
        } else {
          valid = value !== undefined && value !== null && value !== "";
        }
        if (!valid) {
          invalidFields.push(field);
        }
      });
      if (invalidFields.length > 0) {
        allValid = false;
        console.warn(
          `Invalid/missing required fields in item ${idx}:`,
          invalidFields
        );
      }
    });
    return allValid;
  };

  useEffect(() => {
    if (location.state) {
      // Handle both uploaded CV data and existing CV data for editing
      const uploadedCVData = location.state?.uploadedCVData || {};
      const existingCVData = location.state?.cvData || {};
      const isEditing = location.state?.isEditing || false;
      
      setFileName(location.state?.fileName || null);
      
      // If we have uploaded CV data (from file upload)
      if (location.state.uploadedCVData && location.state.fileName) {
        setCvData(uploadedCVData?.data || {});
        toast.success(
          `CV "${fileName}" processed successfully! Forms have been pre-populated with extracted information.`
        );
      }
      // If we have existing CV data (from editing draft)
      else if (existingCVData && Object.keys(existingCVData).length > 0) {
        setCvData(existingCVData);
        if (isEditing) {
          toast.success(
            `Draft CV loaded successfully! Forms have been pre-populated with existing information.`
          );
        }
      }

      // Use either uploaded data or existing data for processing
      const apiData = uploadedCVData?.["data"] || existingCVData;

      if (apiData && Object.keys(apiData).length > 0) {
        // Parse degree titles and create credentials
        const degreeTitles = Array.isArray(
          apiData["Personal Information"]?.["Degree Title"]
        )
          ? apiData["Personal Information"]["Degree Title"]
          : (apiData["Personal Information"]?.["Degree Title"] || "")
              .split(",")
              .map((title: string) => title.trim())
              .filter((title: string) => title.length > 0);

        const credentials =
          degreeTitles.length > 0 ? degreeTitles.join(", ") : "";

        // Create Full Name from individual name fields
        const fullName = [
          apiData["Personal Information"]?.["First Name"] || "",
          apiData["Personal Information"]?.["Middle Name"] || "",
          apiData["Personal Information"]?.["Last Name"] || "",
        ]
          .filter((name) => name.trim())
          .join(" ");

        setCvData({
          "Personal Information": {
            "First Name": apiData["Personal Information"]?.["First Name"] || "",
            "Middle Name": apiData["Personal Information"]?.["Middle Name"] || "",
            "Last Name": apiData["Personal Information"]?.["Last Name"] || "",
            "Degree Title": degreeTitles,
            Credentials: credentials,
            "Full Name": fullName,
            Certifications:
              apiData["Personal Information"]?.["Certifications"] || "",
            "Business Number":
              apiData["Personal Information"]?.["Business Number"] || "",
            "Business Email Address":
              apiData["Personal Information"]?.["Business Email Address"] || "",
          },
          "Flourish Site Affiliations":
            apiData["Flourish Site Affiliations"] || [],
          "Hospital Affiliations": apiData["Hospital Affiliations"] || [],
          "Research Affiliations": apiData["Research Affiliations"] || [],
          Education: apiData["Education"] || [],
          "Licenses & Certifications": {
            licenses: apiData["License"] || [],
            certifications: apiData["Certifications"] || [],
          },
          Publications: apiData["Publications"] || [],
          "Professional Experience": apiData["Professional Experience"] || [],
          "Professional Active Memberships":
            apiData["Professional Active Memberships"] || [],
          "Psychometric Rating/Scales Experiences":
            apiData["Psychometric Rating/Scales Experiences"] || [],
          "Clinical Research Trials Conducted":
            apiData["Clinical Research Trials Conducted"] || [],
          Training: apiData["Training"] || [],
          "Achievements or Awards": apiData["Achievements or Awards"] || [],
          Languages: apiData["Languages"] || [],
        });

        // Validate and set step completion for both uploaded and existing CV data
        if (Object.keys(apiData).length > 0) {
          (async () => {
            setTimeout(() => {
              const validateLicensesCertifications = (val: any) => {
                const licensesValid = validateRequiredArrayField(val.License, [
                  "licenseName",
                  "issuingAuthority",
                  "issueDate",
                  "licenseNumber",
                ]);
                const certificationsValid = validateRequiredArrayField(
                  val.Certifications,
                  ["certificateTitle", "issuingOrganization", "issueDate"]
                );
                return licensesValid && certificationsValid;
              };

              setSteps((prevSteps) => {
                const updatedSteps = prevSteps.map((step) => {
                  const section = step.keyName;
                  const config = sectionFieldMap[section];
                  const sectionData = apiData[section];
                  let completed = false;
                  if (config && sectionData) {
                    if (config.type === "object") {
                      completed = validateRequiredField(
                        sectionData,
                        config.fields!
                      );
                    } else if (config.type === "array") {
                      completed = validateRequiredArrayField(
                        sectionData,
                        config.fields!
                      );
                    }
                  } else if (section === "Licenses & Certifications") {
                    completed = validateLicensesCertifications(apiData);
                  }
                  if (!completed) {
                    console.warn(
                      `Section '${section}' is incomplete or missing required fields.`
                    );
                  }
                  return { ...step, completed };
                });
                const firstIncomplete = updatedSteps.find(
                  (step) => !step.completed
                );
                if (firstIncomplete) {
                  setCurrentStep(firstIncomplete.id);
                  setTimeout(() => {
                    const stepElement = document.getElementById(
                      `cv-step-${firstIncomplete.id}`
                    );
                    if (stepElement) {
                      stepElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }, 1400);
                }
                return updatedSteps;
              });
            }, 1000);
          })();
        }
      }
      
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    const sectionParam = searchParams.get('section');
    if (sectionParam) {
      const matchingStep = steps.find(step => 
        step.title.toLowerCase().replace(/[^a-z0-9]/g, '') === 
        sectionParam.toLowerCase().replace(/[^a-z0-9]/g, '')
      );
      
      if (matchingStep) {
        console.log('Matching step found:', matchingStep);
        setCurrentStep(matchingStep.id);
        setIsPreviewModalOpen(false); // Don't keep modal open, just navigate to step
        
        setTimeout(() => {
          const stepElement = document.getElementById(`cv-step-${matchingStep.id}`);
          if (stepElement) {
            stepElement.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      } else {
        console.log('No matching step found for section:', sectionParam);
        console.log('Available steps:', steps.map(step => step.title));
      }

      // Remove section query parameter from URL after processing
      const currentParams = new URLSearchParams(searchParams);
      if (currentParams.has('section')) {
        currentParams.delete('section');
        navigate({ search: currentParams.toString() }, { replace: true });
      }
    }
  }, [searchParams, steps, navigate]);
  const handleStateChange = (data: any, keyName: string) => {
    if (keyName) {
      // Transform the data if it's Personal Information to add computed fields
      let transformedData = data;
      if (keyName === "Personal Information") {
        // Convert Degree Title array to Credentials string
        const degreeTitles = data["Degree Title"] || [];
        const credentials =
          degreeTitles.length > 0 ? degreeTitles.join(", ") : "";

        // Create Full Name from individual name fields
        const fullName = [
          data["First Name"] || "",
          data["Middle Name"] || "",
          data["Last Name"] || "",
        ]
          .filter((name) => name.trim())
          .join(" ");

        transformedData = {
          ...data,
          Credentials: credentials,
          "Full Name": fullName,
        };

        console.log("Transformed data:", transformedData);
      }

      setCvData((prev) => {
        const newCvData = {
          ...prev,
          [keyName]: transformedData,
        };

        // If this is Personal Information and it contains Languages, also store Languages separately
        if (keyName === "Personal Information" && data.Languages) {
          newCvData["Languages"] = data.Languages;
        }

        return newCvData;
      });

      if (steps.find(step => step.id === currentStep && step.completed)) {
        setSteps(prev => prev.map(step =>
          step.id === currentStep ? { ...step, completed: false } : step
        ));
      }
    }
  };

  const handleNext = (
    data: any,
    keyName: string,
    isDraftSave: boolean = false
  ) => {
    if (keyName) {
      // Transform the data if it's Personal Information to add computed fields
      let transformedData = data;
      if (keyName === "Personal Information") {
        // Convert Degree Title array to Credentials string
        const degreeTitles = data["Degree Title"] || [];
        const credentials =
          degreeTitles.length > 0 ? degreeTitles.join(", ") : "";

        // Create Full Name from individual name fields
        const fullName = [
          data["First Name"] || "",
          data["Middle Name"] || "",
          data["Last Name"] || "",
        ]
          .filter((name) => name.trim())
          .join(" ");

        transformedData = {
          ...data,
          Credentials: credentials,
          "Full Name": fullName,
        };
      }

      setCvData((prev) => {
        const newCvData = {
          ...prev,
          [keyName]: transformedData,
          ...(keyName === "Personal Information"
            ? { Languages: data.Languages || [] }
            : {}),
        };
        return newCvData;
      });

      const index = steps.findIndex((step) => step.keyName === keyName);
      if (index !== -1) {
        setSteps((prev) =>
          prev.map((step, i) =>
            i === index ? { ...step, completed: true } : step
          )
        );
      }
    }

    // Only navigate to next step if not saving draft
    if (!isDraftSave && currentStep < steps.length) {
      // Mark current step as completed with animation
      // setSteps(prev => prev.map(step =>
      //   step.id === currentStep ? { ...step, completed: true } : step
      // ));
      setCurrentStep(currentStep + 1);
      const stepElement = document.getElementById(`cv-step-${currentStep + 1}`);
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      const stepElement = document.getElementById(`cv-step-${currentStep + 1}`);
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleBack = () => {
    navigate("/create-cv");
  };

  const handleSaveDraft = async () => {
    try {
      setIsSavingDraft(true);
    } catch (error) {
      console.error("Error saving CV draft:", error);
      alert("Error saving draft. Please check console for details.");
    }
  };


  const completedSteps = useMemo(() => {
    const total = steps.filter((step) => step.completed).length
    const progressPercentage = Math.round((total / steps.length) * 100);
    return { total, progressPercentage };
  }, [steps]);

  const handleComplete = async () => {
    try {
      // Automatically open the preview when Complete is clicked
      setIsPreviewModalOpen(true);
      
      // Set the base64 request to trigger PDF generation and API call
      setIsBase64Request(true);
      
      toast.success("CV completed successfully! Opening preview...");
    } catch (error) {
      console.error("Error completing CV:", error);
      toast.error("Error completing CV. Please try again.");
    }
  };

  const handlePreview = useCallback(() => {
    setIsPreviewModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsPreviewModalOpen(false);
    // Clear the section query parameter when closing modal
    const currentParams = new URLSearchParams(searchParams);
    if (currentParams.has("section")) {
      currentParams.delete("section");
      navigate({ search: currentParams.toString() }, { replace: true });
    }
  }, [searchParams]);

  const handleDownload = useCallback(() => {
    setIsDownload(true);
  }, []);

  const handleStepClick = useCallback((stepId: number) => {
    setCurrentStep(stepId);
  }, []);


  const memoizedValue = useMemo(
    () => ({
      isLoading,
      cvData,
      handleStepClick,
      handleDownload,
      handleCloseModal,
      handlePreview,
      handleComplete,
      handleSaveDraft,
      handleBack,
      handlePrevious,
      handleNext,
      handleStateChange,
      currentStep,
      setCurrentStep,
      steps,
      isNextClick,
      setIsNextClick,
      isPreviewModalOpen,
      setIsPreviewModalOpen,
      fileName,
      isDownload,
      setIsDownload,
      isBase64Request,
      setIsBase64Request,
      isSavingDraft,
      setIsSavingDraft,
      completedSteps
    }),
    [
      isLoading,
      cvData,
      currentStep,
      setCurrentStep,
      steps,
      isNextClick,
      setIsNextClick,
      isPreviewModalOpen,
      setIsPreviewModalOpen,
      fileName,
      isDownload,
      setIsDownload,
      isBase64Request,
      setIsBase64Request,
      isSavingDraft,
      setIsSavingDraft,
      handleComplete,
      handleSaveDraft,
      handleBack,
      handlePrevious,
      handleNext,
      handleStateChange,
      handleStepClick,
      handleDownload,
      handleCloseModal,
      handlePreview,
      completedSteps
    ]
  );

  return (
    <CVBuilderContext.Provider value={memoizedValue}>
      {children}
    </CVBuilderContext.Provider>
  );
};

CVBuilderProvider.CVMainArea = ({ children }) => {
  return (
    <motion.div className={styles.cvBuilderPage} {...pageTransitions}>
      <Header />
      {children}
    </motion.div>
  );
};

const cvBuilderContext = () => {
  const context = useContext(CVBuilderContext);
  if (!context) {
    throw new Error(
      "CVBuilder compound components cannot be rendered outside the CVBuilder component"
    );
  }
  return context;
};
export { CVBuilderContext, CVBuilderProvider, cvBuilderContext };
