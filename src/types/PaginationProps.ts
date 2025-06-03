import { ComponentState } from "react";

export interface PaginationProps {
  setData: ComponentState;
  setLoading: ComponentState;
  pageUrl: string;
  color?: string;
  refresh: number;
}
