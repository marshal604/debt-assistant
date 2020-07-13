import { ReactNode } from 'react';

export interface CardProps {
  body: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}
