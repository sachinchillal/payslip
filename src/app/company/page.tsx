"use client";

import { Company } from '@/interface/app';
import { getPayslipData } from '@/store/getters';
import { deleteCompany, saveOrUpdateCompanyDetail, savePayslipData } from '@/store/setters';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const sample = `
**Company Name:** Innovatech Solutions Ltd.

**Industry:** Information Technology & Services
 
- **Email:** contact@innovatech.example.com
- **Website:** www.innovatech.example.com
- **Phone:** (555) 123-9876
`;
const sample2 = `**ABCD Private Limited**

#300/3, Third Block, 30th X, 30th Main

XYZ III Stage, Place - 303030
`;

export default function CompanyDetailsEditor() {
  const [companies, setCompanies] = useState<Company[]>([]); // For populating the table
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null); // For selected company

  const [companyId, setCompanyId] = useState<number | null>(null); // For company ID if needed
  const [companyDetails, setCompanyDetails] = useState<string>(''); // Content of the textarea
  const [companyLabel, setCompanyLabel] = useState<string>(''); // For company label input
  const [editingCompanyIndex, setEditingCompanyIndex] = useState<number | null>(null); // For tracking which company is being edited

  const [statusMessage, setStatusMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const init = () => {
    const p = getPayslipData();
    setCompanies(p.companies);
    setSelectedCompany(p.companies.find(c => c.isSelected) || null);
  }
  const resetVariables = () => {
    setCompanyDetails('');
    setCompanyLabel('');
    setCompanyId(null);
    setEditingCompanyIndex(null);
  }

  useEffect(() => {
    init();
  }, []);



  // Helper to display status messages
  const showStatus = (message: string, type: 'success' | 'error') => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 6000);
  };

  const handleSaveDetails = () => {
    const res = saveOrUpdateCompanyDetail(companyDetails, companyLabel, companyId);
    showStatus(res.message, res.error ? 'error' : 'success');
    if (res.error) {
    } else {
      init();
      resetVariables();
    }
  };

  const handleClearDetails = () => {
    setCompanyDetails('');
    // Optionally, deselect company if textarea is cleared while editing selected company
    // if (editingCompanyIndex === selectedCompanyIndex) {
    //   handleSelectCompany(null);
    // }
    showStatus("Textarea cleared.", "success");
  };

  const handleViewSample = () => {
    resetVariables();
    setCompanyDetails(sample);
    setCompanyLabel('Sample Company Details');
    showStatus("Sample company details loaded.", "success");
  };
  const handleViewSample2 = () => {
    resetVariables();
    setCompanyDetails(sample2);
    setCompanyLabel('Sample Company Details 2');
    showStatus("Sample company details loaded.", "success");
  };

  const handleEditDetail = (c: Company, index: number) => {
    setCompanyId(c.id);
    setCompanyDetails(c.value);
    setCompanyLabel(c.label || '');
    setEditingCompanyIndex(index);
    showStatus(`Editing company #${index + 1}.`, "success");
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for better UX
  };

  const handleRemoveDetail = (c: Company) => {
    const res = deleteCompany(c.id);
    showStatus(res.message, res.error ? 'error' : 'success');
    if (!res.error) {
      init();
      resetVariables();
    }
  };

  const handleSelectCompany = (c: Company) => {
    companies.forEach(company => {
      company.isSelected = company.id === c.id; // Mark the selected company
    });
    setCompanies([...companies]); // Update state to trigger re-render
    const p = getPayslipData();
    p.companies = companies;
    savePayslipData(p);
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="tmax-w-6xl mx-auto">
        {/* Header and Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">Employee Details Editor</h1>
        </div>

        {/* Status Message Area */}
        {statusMessage && (
          <div
            className={`mb-4 p-3 rounded-md text-sm ${statusMessage.type === 'success'
              ? 'bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200'
              }`}
          >
            {statusMessage.message}
          </div>
        )}

        {/* Editor and Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side: Input Area */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
              {editingCompanyIndex !== null ? `Editing Company #${editingCompanyIndex + 1}` : 'Enter Company Details (Markdown)'}
            </h2>

            <textarea
              id="company-details"
              value={companyDetails}
              onChange={(e) => {
                setCompanyDetails(e.target.value);
                if (statusMessage) setStatusMessage(null);
              }}
              placeholder="Enter company details here. Use Markdown for formatting..."
              rows={15}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none resize-y bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
            {/* add input field to take label text */}
            <input
              type="text"
              id="company-label"
              value={companyLabel}
              onChange={(e) => { setCompanyLabel(e.target.value); }}
              placeholder="Enter company label here..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleSaveDetails}
                className="w-full sm:w-auto flex-grow px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {editingCompanyIndex !== null ? 'Update Detail' : 'Save Detail'}
              </button>
              <button
                onClick={handleClearDetails}
                className="w-full sm:w-auto flex-grow px-6 py-3 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Clear
              </button>
              <button
                onClick={handleViewSample}
                className="w-full sm:w-auto flex-grow px-6 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                View Sample
              </button>
              <button
                onClick={handleViewSample2}
                className="w-full sm:w-auto flex-grow px-6 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Sample 2
              </button>
            </div>
          </div>

          {/* Right Side: Preview Area */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Preview</h2>
            <div className="markdown prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none p-3 border border-gray-200 dark:border-gray-700 rounded-md h-96 overflow-y-auto bg-gray-50 dark:bg-gray-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{companyDetails}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Company Details Table - Placed after the editor/preview grid */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
            Stored Company Details
          </h2>
          {companies.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No company details saved yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-16">Select</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">#</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">Label</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details (Preview)</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">Created At</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">Updated At</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-40 sm:w-48">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {companies.map((c, index) => (
                    <tr
                      key={index} // Using index as key; for more complex scenarios, unique IDs are better.
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selectedCompany?.id === c.id ? 'bg-blue-50 dark:bg-blue-900/50 ring-2 ring-inset ring-blue-500 dark:ring-blue-600' : ''}`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="radio"
                          name="selectedCompany"
                          checked={c.isSelected}
                          onChange={() => handleSelectCompany(c)}
                          onClick={(e) => e.stopPropagation()} // Prevent row click if radio is clicked
                          className="form-radio h-4 w-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
                          aria-label={`Select company ${index + 1}`}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" onClick={() => handleSelectCompany(c)}>{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 cursor-pointer" onClick={() => handleSelectCompany(c)}>
                        <div className="max-w-xs sm:max-w-md md:max-w-lg truncate" title={c.label}>
                          {c.label || `Company Entry ${index + 1}`}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 cursor-pointer" onClick={() => handleSelectCompany(c)}>
                        <div className="max-w-xs sm:max-w-md md:max-w-lg truncate" title={c.value}>
                          {c.value.split('\n')[0].trim() || `Company Entry ${index + 1}`}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(c.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(c.updatedAt).toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditDetail(c, index); }}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2 sm:mr-3 transition-colors px-2 py-1 rounded hover:bg-indigo-100 dark:hover:bg-indigo-800/50"
                          title="Edit this detail"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemoveDetail(c); }}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-800/50"
                          title="Remove this detail"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
