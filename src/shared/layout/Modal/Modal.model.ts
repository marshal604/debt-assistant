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
  customizeButton?: ReactNode;
  cancel?: () => void;
  confirm?: () => void;
}

export interface ModalHeaderProps {
  collapse: (callback?: () => void) => void;
}

export interface ModalFooterProps {
  collapse: (callback?: () => void) => void;
  useCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  confirm?: () => void;
  cancel?: () => void;
}
