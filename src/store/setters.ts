import { Company, CustomResponse, LOCAL_STORAGE_KEY, PayslipData, Table } from "@/interface/app";
import { getPayslipData } from "./getters";


export const Response = (message: string, error = false) => ({ message, error });


export const savePayslipData = (data: PayslipData): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export const saveOrUpdateCompanyDetail = (value: string, label: string, id: number | null): CustomResponse => {
  label = label.trim();
  if (value.trim() === "") {
    return Response("Cannot save empty details.", true);
  }

  const payslip = getPayslipData();

  if (id) {
    // Updating an existing detail
    const c = payslip.companies.find(c => c.id === id);
    if (!c) {
      return Response("Company not found.", true);
    }
    c.value = value;
    c.label = label;
    c.updatedAt = Date.now();
    savePayslipData(payslip);
    return Response("Company detail updated successfully!", false);
  } else {
    // Adding a new detail
    id = Date.now();
    const newCompany: Company = {
      id,
      label: label || `Company ${payslip.companies.length || ''}`,
      value,
      createdAt: id,
      updatedAt: id,
      selectedAt: id,
      isSelected: false,
    };
    payslip.companies.push(newCompany);
    savePayslipData(payslip);
    return Response("Company detail added successfully!", false);
  }
};
export const saveOrUpdateEmployee = (value: string, label: string, id: number | null): CustomResponse => {
  label = label.trim();
  if (value.trim() === "") {
    return Response("Cannot save empty details.", true);
  }

  const payslip = getPayslipData();

  if (id) {
    // Updating an existing detail
    const c = payslip.employees.find(c => c.id === id);
    if (!c) {
      return Response("Employee not found.", true);
    }
    c.value = value;
    c.label = label;
    c.updatedAt = Date.now();
    savePayslipData(payslip);
    return Response("Employee detail updated successfully!", false);
  } else {
    // Adding a new detail
    id = Date.now();
    const newCompany: Company = {
      id,
      label: label || `Employee ${payslip.employees.length || ''}`,
      value,
      createdAt: id,
      updatedAt: id,
      selectedAt: id,
      isSelected: false,
    };
    payslip.employees.push(newCompany);
    savePayslipData(payslip);
    return Response("Employee detail added successfully!", false);
  }
};
export const saveOrUpdateTable = (value: string, label: string, id: number | null): CustomResponse => {
  label = label.trim();
  if (value.trim() === "") {
    return Response("Cannot save empty details.", true);
  }

  const payslip = getPayslipData();

  if (id) {
    // Updating an existing detail
    const c = payslip.tables.find(c => c.id === id);
    if (!c) {
      return Response("Table not found.", true);
    }
    c.value = value;
    c.label = label;
    c.updatedAt = Date.now();
    savePayslipData(payslip);
    return Response("Table detail updated successfully!", false);
  } else {
    // Adding a new detail
    id = Date.now();
    const newTable: Table = {
      id,
      label: label || `Table ${payslip.tables.length || ''}`,
      value,
      createdAt: id,
      updatedAt: id,
      selectedAt: id,
      isSelected: false,
    };
    payslip.tables.push(newTable);
    savePayslipData(payslip);
    return Response("Table detail added successfully!", false);
  }
};

export const deleteCompany = (id: number): CustomResponse => {
  const payslip = getPayslipData();
  const companyIndex = payslip.companies.findIndex(c => c.id === id);

  if (companyIndex === -1) {
    return Response("Company not found.", true);
  }

  payslip.companies.splice(companyIndex, 1);
  savePayslipData(payslip);

  return Response("Company deleted successfully!", false);
};
export const deleteEmployee = (id: number): CustomResponse => {
  const payslip = getPayslipData();
  const companyIndex = payslip.employees.findIndex(c => c.id === id);

  if (companyIndex === -1) {
    return Response("Employee not found.", true);
  }

  payslip.employees.splice(companyIndex, 1);
  savePayslipData(payslip);

  return Response("Employee deleted successfully!", false);
};
export const deleteTable = (id: number): CustomResponse => {
  const payslip = getPayslipData();
  const index = payslip.tables.findIndex(c => c.id === id);

  if (index === -1) {
    return Response("Table not found.", true);
  }

  payslip.tables.splice(index, 1);
  savePayslipData(payslip);

  return Response("Table deleted successfully!", false);
};
export const saveTables = (tables: Table[]): CustomResponse => {
  if (!Array.isArray(tables) || tables.length === 0) {
    return Response("No tables to save.", true);
  }
  const payslip = getPayslipData();
  payslip.tables = tables;
  savePayslipData(payslip);
  return Response("Tables saved successfully!", false);
}