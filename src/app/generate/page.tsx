"use client";

import { Company, Employee, INIT_PAYSLIP_DATA, Table } from "@/interface/app";
import { getPayslipData } from "@/store/getters";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export default function GenerateSlip() {
  const [p, setP] = useState(INIT_PAYSLIP_DATA);
  const [company, setCompany] = useState<Company | null>(null); // For company name
  const [employee, setEmployee] = useState<Employee | null>(null); // For employee name
  const [selectedTables, setSelectedTables] = useState<Table[]>([]); // For populating the table

  const init = () => {
    const p = getPayslipData();
    const company = p.companies.find(c => c.isSelected);
    setCompany(company || null);
    setSelectedTables(p.tables.filter(t => t.isSelected).sort((a, b) => a.selectedAt - b.selectedAt));
    const employee = p.employees.find(e => e.isSelected);
    setEmployee(employee || null);
    setP(p);
  }


  useEffect(() => {
    init();
  }, []);
  return (
    <div className="flex flex-col justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      {
        selectedTables.length > 0 ? (
          <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            {selectedTables.map((table) => (
              <div key={table.id} className="page-break-before markdown prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none p-3 border border-gray-200 dark:border-gray-700 rounded-md overflow-y-auto bg-gray-50 dark:bg-gray-700">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{company?.value || "Company Details not selected"}</ReactMarkdown>
                <br />
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{employee?.value || "Employee Details not selected"}</ReactMarkdown>
                <br />
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{table.value}</ReactMarkdown>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-8">No tables selected.</p>
        )
      }

    </div>
  );
}