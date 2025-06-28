"use client";

export default function Home() {
  return (<div>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Payslip Generation Guide</h1>

      <div className="space-y-6">
        {/* <!-- Step 1 --> */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Step 1: Company Details</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Enter company details.</li>
            <li>Select one company from the list.</li>
          </ul>
        </div>

        {/* <!-- Step 2 --> */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Step 2: Employee Information</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Add employee-related information.</li>
            <li>Select one employee from the list.</li>
          </ul>
        </div>

        {/* <!-- Step 3 --> */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Step 3: Amount Details</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Add table information for the selected employee.</li>
            <li>Select the records belonging to the chosen employee.</li>
          </ul>
        </div>

        {/* <!-- Step 4 --> */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Step 4: Generate Payslip</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Preview the generated payslip.</li>
            <li>Click on the <strong>&quot;Print&quot;</strong> button or use your browser&apos;s print feature to generate a hard copy.</li>
          </ul>
        </div>

        {/* <!-- Note --> */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300 p-4 rounded">
          <p><strong>Note:</strong> All information is stored locally in your browser, and no data is sent to a server or database.</p>
        </div>
      </div>
    </div>

  </div>
  );
}
