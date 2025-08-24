export interface IBaseFormProps {
  defaultValues: (key: string) => any;
  onSubmit: (data: any, keyName: string) => void;
  isNextClick: boolean;
  setIsNextClick: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (sectionKey: string, changedData: any) => void;
}
