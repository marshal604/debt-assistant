export interface InputProps {
  inputType: InputType;
  config: InputConfig;
  value: any;
  label: string;
}

export enum InputType {
  Input = 1,
  Textarea,
}

export interface InputConfig {
  placeholder: string;
  type: string;
  id?: string;
  [key: string]: any;
}
