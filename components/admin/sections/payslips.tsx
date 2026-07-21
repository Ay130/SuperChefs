'use client';

import { useState } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { PayslipPDF } from '@/components/payslip-pdf';
import { pdf } from '@react-pdf/renderer';

interface PayslipFormData {
  // Personal Information
  employeeId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;

  // Employment Details
  department: string;
  jobTitle: string;
  employmentType: string;
  dateOfEmployment: string;
  workLocation: string;

  // Contact Information
  phoneNumber: string;
  emailAddress: string;
  residentialAddress: string;

  // Salary Information (Earnings)
  basicSalary: number;
  transportAllowance: number;
  housingAllowance: number;
  feedingAllowance: number;
  otherAllowances: number;
  overtimeRate: number;

  // Deductions
  loanRepayment: number;
  salaryAdvance: number;
  damagesItems: number;
  tax: number;
  otherDeductions: number;

  // Payslip Details
  payMonth: string;
  payYear: string;
  paymentDate: string;
  generatedBy: string;
  approvedBy: string;
}

const initialFormData: PayslipFormData = {
  employeeId: '',
  firstName: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  maritalStatus: '',
  department: '',
  jobTitle: '',
  employmentType: '',
  dateOfEmployment: '',
  workLocation: '',
  phoneNumber: '',
  emailAddress: '',
  residentialAddress: '',
  basicSalary: 0,
  transportAllowance: 0,
  housingAllowance: 0,
  feedingAllowance: 0,
  otherAllowances: 0,
  overtimeRate: 0,
  loanRepayment: 0,
  salaryAdvance: 0,
  damagesItems: 0,
  tax: 0,
  otherDeductions: 0,
  payMonth: '',
  payYear: '',
  paymentDate: '',
  generatedBy: '',
  approvedBy: '',
};

export function PayslipsSection() {
  const [formData, setFormData] = useState<PayslipFormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const totalEarnings =
    formData.basicSalary +
    formData.transportAllowance +
    formData.housingAllowance +
    formData.feedingAllowance +
    formData.otherAllowances +
    formData.overtimeRate;

  const totalDeductions =
    formData.loanRepayment +
    formData.salaryAdvance +
    formData.damagesItems +
    formData.tax +
    formData.otherDeductions;

  const netPay = totalEarnings - totalDeductions;

  const handleSaveRecord = () => {
    console.log('Saving employee record:', formData);
    alert('Employee record saved successfully!');
  };

  const handleGeneratePayslip = async () => {
    if (!formData.firstName || !formData.lastName) {
      alert('Please fill in employee name first');
      return;
    }
    setIsGenerating(true);
    try {
      const doc = <PayslipPDF data={formData} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.firstName}_${formData.lastName}_Payslip_${formData.payMonth}_${formData.payYear}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating payslip PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearForm = () => {
    if (window.confirm('Clear all form data?')) {
      setFormData(initialFormData);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Employee Record & Payslip Form</h2>
        <p className="text-foreground">
          Enter employee details, salary components, deductions and generate payslip
        </p>
      </div>

      <form className="space-y-6">
        {/* A. PERSONAL INFORMATION */}
        <div className="bg-white border-l-4 border-l-blue-500 p-6 rounded-lg">
          <h3 className="text-sm font-bold text-blue-600 mb-4">A. PERSONAL INFORMATION</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Employee ID *
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                placeholder="Auto-generated"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>
        </div>

        {/* B. EMPLOYMENT DETAILS */}
        <div className="bg-green-50 border-l-4 border-l-green-500 p-6 rounded-lg">
          <h3 className="text-sm font-bold text-green-600 mb-4">B. EMPLOYMENT DETAILS</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select department</option>
                <option value="bakery">Bakery</option>
                <option value="restaurant">Restaurant</option>
                <option value="admin">Administration</option>
                <option value="logistics">Logistics</option>
                <option value="hr">Human Resources</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Job Title / Position *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Enter job title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Employment Type *
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Date of Employment *
              </label>
              <input
                type="date"
                name="dateOfEmployment"
                value={formData.dateOfEmployment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Work Location
              </label>
              <input
                type="text"
                name="workLocation"
                value={formData.workLocation}
                onChange={handleInputChange}
                placeholder="Enter location"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* C. CONTACT INFORMATION */}
        <div className="bg-orange-50 border-l-4 border-l-orange-500 p-6 rounded-lg">
          <h3 className="text-sm font-bold text-orange-600 mb-4">C. CONTACT INFORMATION</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Email Address *
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Residential Address *
              </label>
              <input
                type="text"
                name="residentialAddress"
                value={formData.residentialAddress}
                onChange={handleInputChange}
                placeholder="Enter full address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* D. SALARY INFORMATION (EARNINGS) */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 border-l-4 border-l-gray-500 p-6 rounded-lg">
              <h3 className="text-sm font-bold text-gray-600 mb-4">D. SALARY INFORMATION (EARNINGS)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Basic Salary (N)
                  </label>
                  <input
                    type="number"
                    name="basicSalary"
                    value={formData.basicSalary || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Transport Allowance (N)
                  </label>
                  <input
                    type="number"
                    name="transportAllowance"
                    value={formData.transportAllowance || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Housing Allowance (N)
                  </label>
                  <input
                    type="number"
                    name="housingAllowance"
                    value={formData.housingAllowance || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Feeding Allowance (N)
                  </label>
                  <input
                    type="number"
                    name="feedingAllowance"
                    value={formData.feedingAllowance || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Other Allowances (N)
                  </label>
                  <input
                    type="number"
                    name="otherAllowances"
                    value={formData.otherAllowances || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Overtime Rate (N)
                  </label>
                  <input
                    type="number"
                    name="overtimeRate"
                    value={formData.overtimeRate || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* E. DEDUCTIONS */}
            <div className="bg-pink-50 border-l-4 border-l-pink-500 p-6 rounded-lg mt-6">
              <h3 className="text-sm font-bold text-pink-600 mb-4">E. DEDUCTIONS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Loan Repayment (N)
                  </label>
                  <input
                    type="number"
                    name="loanRepayment"
                    value={formData.loanRepayment || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Salary Advance (N)
                  </label>
                  <input
                    type="number"
                    name="salaryAdvance"
                    value={formData.salaryAdvance || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Damages / Broken Items (N)
                  </label>
                  <input
                    type="number"
                    name="damagesItems"
                    value={formData.damagesItems || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Tax (N)</label>
                  <input
                    type="number"
                    name="tax"
                    value={formData.tax || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-foreground mb-1 block">
                    Other Deductions (N)
                  </label>
                  <input
                    type="number"
                    name="otherDeductions"
                    value={formData.otherDeductions || ''}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* F. SUMMARY */}
          <div className="bg-blue-50 border-l-4 border-l-blue-500 p-6 rounded-lg h-fit">
            <h3 className="text-sm font-bold text-blue-600 mb-6">F. SUMMARY</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-foreground mb-1">Total Earnings (N)</p>
                <p className="text-2xl font-bold text-foreground">
                  {totalEarnings.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-foreground mb-1">Total Deductions (N)</p>
                <p className="text-2xl font-bold text-foreground">
                  {totalDeductions.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-xs text-green-700 mb-1">NET PAY (N)</p>
                <p className="text-3xl font-bold text-green-700">
                  {netPay.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* G. PAYSLIP DETAILS */}
        <div className="bg-blue-50 border-l-4 border-l-blue-500 p-6 rounded-lg">
          <h3 className="text-sm font-bold text-blue-600 mb-4">G. PAYSLIP DETAILS</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Pay Month *
              </label>
              <select
                name="payMonth"
                value={formData.payMonth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Pay Year *</label>
              <select
                name="payYear"
                value={formData.payYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Payment Date
              </label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Generated by (HR)
              </label>
              <input
                type="text"
                name="generatedBy"
                value={formData.generatedBy}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Approved By (Accountant)
              </label>
              <input
                type="text"
                name="approvedBy"
                value={formData.approvedBy}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center pt-6">
          <div className="flex gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleSaveRecord}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              <span>Save Employee Record</span>
            </button>
            <button
              type="button"
              onClick={handleGeneratePayslip}
              disabled={isGenerating}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              <span>{isGenerating ? 'Generating...' : 'Generate Payslip'}</span>
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-400 text-white rounded-lg font-medium hover:bg-gray-500 transition"
            >
              <span>Clear Form</span>
            </button>
          </div>
          <button
            type="button"
            onClick={handleGeneratePayslip}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Download Payslip (PDF)</span>
          </button>
        </div>

        <p className="text-center text-xs text-foreground text-opacity-60 pt-4">
          All fields marked with * are required.
        </p>
      </form>
    </div>
  );
}
