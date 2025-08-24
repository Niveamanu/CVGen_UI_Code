export interface ICVBuilderContext {
  cvData: Record<string, any>;
  isLoading: boolean;
  handleSaveDraft: () => void;
  handleBack: () => void;
  handlePrevious: () => void;
  handleNext: (data: any, keyName: string, isDraftSave?: boolean) => void;
  handleStateChange: (data: any, keyName: string) => void;
  handleComplete: () => Promise<void>;
  handlePreview: () => void;
  handleCloseModal: () => void;
  handleDownload: () => void;
  handleStepClick: (stepId: number) => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  steps: Array<{
    id: number;
    title: string;
    completed: boolean;
    keyName: string;
  }>;
  isNextClick: boolean;
  setIsNextClick: React.Dispatch<React.SetStateAction<boolean>>;
  isPreviewModalOpen: boolean;
  setIsPreviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileName: string | null;
  isDownload: boolean;
  setIsDownload: React.Dispatch<React.SetStateAction<boolean>>;
  isBase64Request: boolean;
  setIsBase64Request: React.Dispatch<React.SetStateAction<boolean>>;
  isSavingDraft: boolean;
  setIsSavingDraft: React.Dispatch<React.SetStateAction<boolean>>;
  completedSteps: {
    total: number;
    progressPercentage: number;
  };
}
