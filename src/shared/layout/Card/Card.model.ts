import { ReactNode } from 'react';

export interface CardProps {
  body: ReactNode;
  classes?: string[];
  header?: ReactNode;
  footer?: ReactNode;
}
