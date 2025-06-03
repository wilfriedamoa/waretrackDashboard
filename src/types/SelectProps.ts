import { ComponentState } from "react";

export interface SelectProps {
  data: Array<any>;
  name: string;
  label: string;
  report?: any;
  update: ComponentState;
  state: ComponentState;
  disable?: boolean;
  fieldNames: Array<string>;
  id?: string;
}
