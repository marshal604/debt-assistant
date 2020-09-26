import { ReactNode } from 'react';

export interface ModalState {
  opened: boolean;
  classes: string[];
}

export interface ModalProps {
  useHeader?: boolean;
  header?: ReactNode;
  useFooter?: boolean;
  buttonName?: string;
  disabled?: boolean;
  useCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  cancel?: () => void;
  confirm?: () => void;
}

export interface ModalHeaderProps {
  collapse: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ModalFooterProps {
  collapse: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  useCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  confirm?: () => void;
  cancel?: () => void;
}
