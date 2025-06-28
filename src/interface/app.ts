// Interface

interface Info {
  id: number;
  label: string;
  value: string; // The markdown/details
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
  selectedAt: number; // timestamp
  isSelected: boolean; // Optional, used for selection in UI
}
export interface Company extends Info {
  ts?: number;
}
export interface Employee extends Info {
  ts?: number;
}
export interface Table extends Info {
  ts?: number;
}

export interface PayslipData {
  companies: Company[];
  employees: Employee[];
  tables: Table[];
}

export interface CustomResponse {
  message: string;
  error: boolean;
}

// Constants
export const INIT_PAYSLIP_DATA: PayslipData = {
  companies: [],
  employees: [],
  tables: [],
}
export const LOCAL_STORAGE_KEY = 'payslip';
