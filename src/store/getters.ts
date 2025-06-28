import { Company, INIT_PAYSLIP_DATA, LOCAL_STORAGE_KEY, PayslipData } from "@/interface/app";


export const getPayslipData = (): PayslipData => {
  // if (typeof window === 'undefined') {
  //   return INIT_PAYSLIP_DATA;
  // }
  const existingDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (existingDataString) {
    try {
      const parsedData = JSON.parse(existingDataString);
      return parsedData;
    } catch (error) {
      console.error(error);
    }
  }
  return INIT_PAYSLIP_DATA;
}

export const getCompanies = (): Company[] => {
  return getPayslipData().companies;
}
