export interface TextModalProps {
  disabled?: boolean;
  cancel?: () => void;
  buttonName?: string;
  confirm?: (value: string) => void;
  change?: (value: string) => void;
  title?: string;
  value?: string;
  label?: string;
  placeholder?: string;
}

export interface TextModalState {
  text: string;
}
