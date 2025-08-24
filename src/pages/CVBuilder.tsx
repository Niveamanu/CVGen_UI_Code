import CVBuilderMain from '@/containers/CVBuilder';
import { CVBuilderProvider } from "@/contexts/cv-builder.context";
import { CVPreviewModal } from "@/containers/CVPreviewModal";

export default function CVBuilder() {
  return (
      <CVBuilderProvider>
        <CVBuilderProvider.CVMainArea>
          <CVBuilderMain />
          <CVPreviewModal />
        </CVBuilderProvider.CVMainArea>
      </CVBuilderProvider>
  );
}
