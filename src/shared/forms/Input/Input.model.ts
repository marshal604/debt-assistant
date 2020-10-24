export interface InputProps<T> {
  inputType: InputType;
  config: InputConfig;
  value: T;
  label?: string;
  change?: (value: any) => void;
  noMargin?: boolean;
}

export enum InputType {
  Input = 1,
  Textarea
}

export interface InputConfig {
  placeholder: string;
  type: string;
  id?: string;
  [key: string]: any;
}
