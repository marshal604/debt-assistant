export interface ToggleProps {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  change?: (checked: boolean) => void;
}
