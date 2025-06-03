import { ComponentState } from "react";

export interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  report?: any;
  update: ComponentState;
  data: ComponentState;
  disable?: boolean;
  min?: number;
  max?: number;
}
