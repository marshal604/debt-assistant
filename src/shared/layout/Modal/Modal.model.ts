import { ReactNode } from 'react';

export interface ModalState {
  opened: boolean;
  classes: string[];
}

export interface ModalProps {
  body: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export interface ModalHeaderProps {
  collapse: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ModalFooterProps {
  collapse: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
