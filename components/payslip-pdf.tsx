import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface PayslipData {
  employeeId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  department: string;
  jobTitle: string;
  employmentType: string;
  dateOfEmployment: string;
  workLocation: string;
  phoneNumber: string;
  emailAddress: string;
  residentialAddress: string;
  basicSalary: number;
  transportAllowance: number;
  housingAllowance: number;
  feedingAllowance: number;
  otherAllowances: number;
  overtimeRate: number;
  loanRepayment: number;
  salaryAdvance: number;
  damagesItems: number;
  tax: number;
  otherDeductions: number;
  payMonth: string;
  payYear: string;
  paymentDate: string;
  generatedBy: string;
  approvedBy: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: 1,
    paddingBottom: 15,
    borderBottomColor: '#22C55E',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A18',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#22C55E',
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#22C55E',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  col: {
    flex: 1,
    paddingRight: 10,
  },
  label: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: '#000',
  },
  twoCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summary: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    fontSize: 11,
  },
  summaryLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  summaryValue: {
    fontWeight: 'bold',
    color: '#000',
  },
  netPay: {
    backgroundColor: '#22C55E',
    color: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 3,
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: 1,
    borderTopColor: '#ddd',
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
  },
  signature: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signatureBox: {
    alignItems: 'center',
  },
  signatureLine: {
    borderTop: 1,
    borderTopColor: '#000',
    width: 120,
    marginTop: 20,
    marginBottom: 5,
  },
});

export function PayslipPDF({ data }: { data: PayslipData }) {
  const totalEarnings =
    data.basicSalary +
    data.transportAllowance +
    data.housingAllowance +
    data.feedingAllowance +
    data.otherAllowances +
    data.overtimeRate;

  const totalDeductions =
    data.loanRepayment +
    data.salaryAdvance +
    data.damagesItems +
    data.tax +
    data.otherDeductions;

  const netPay = totalEarnings - totalDeductions;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SUPERCHEFS LIMITED</Text>
          <Text style={styles.subtitle}>EMPLOYEE PAYSLIP</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Employee ID</Text>
              <Text style={styles.value}>{data.employeeId || 'N/A'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>
                {data.firstName} {data.lastName}
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>{data.gender || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.value}>{data.dateOfBirth || 'N/A'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Marital Status</Text>
              <Text style={styles.value}>{data.maritalStatus || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Employment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EMPLOYMENT DETAILS</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Department</Text>
              <Text style={styles.value}>{data.department || 'N/A'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Job Title</Text>
              <Text style={styles.value}>{data.jobTitle || 'N/A'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Employment Type</Text>
              <Text style={styles.value}>{data.employmentType || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Date of Employment</Text>
              <Text style={styles.value}>{data.dateOfEmployment || 'N/A'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Work Location</Text>
              <Text style={styles.value}>{data.workLocation || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{data.phoneNumber || 'N/A'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>{data.emailAddress || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Residential Address</Text>
              <Text style={styles.value}>{data.residentialAddress || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Earnings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SALARY INFORMATION (EARNINGS)</Text>
          <View style={styles.twoCol}>
            <View>
              <Text style={styles.label}>Basic Salary (N)</Text>
              <Text style={styles.value}>{data.basicSalary.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.label}>Transport Allowance (N)</Text>
              <Text style={styles.value}>{data.transportAllowance.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.label}>Housing Allowance (N)</Text>
              <Text style={styles.value}>{data.housingAllowance.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.twoCol}>
            <View>
              <Text style={styles.label}>Feeding Allowance (N)</Text>
              <Text style={styles.value}>{data.feedingAllowance.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.label}>Other Allowances (N)</Text>
              <Text style={styles.value}>{data.otherAllowances.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.label}>Overtime Rate (N)</Text>
              <Text style={styles.value}>{data.overtimeRate.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Deductions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEDUCTIONS</Text>
          <View style={styles.twoCol}>
            <View>
              <Text style={styles.label}>Loan Repayment (N)</Text>
              <Text style={styles.value}>{data.loanRepayment.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.label}>Salary Advance (N)</Text>
              <Text style={styles.value}>{data.salaryAdvance.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.label}>Damages/Broken Items (N)</Text>
              <Text style={styles.value}>{data.damagesItems.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.twoCol}>
            <View>
              <Text style={styles.label}>Tax (N)</Text>
              <Text style={styles.value}>{data.tax.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.label}>Other Deductions (N)</Text>
              <Text style={styles.value}>{data.otherDeductions.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Earnings (N)</Text>
            <Text style={styles.summaryValue}>{totalEarnings.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Deductions (N)</Text>
            <Text style={styles.summaryValue}>{totalDeductions.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.netPay]}>
            <Text style={styles.summaryLabel}>NET PAY (N)</Text>
            <Text style={styles.summaryValue}>{netPay.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payslip Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAYSLIP DETAILS</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Pay Month</Text>
              <Text style={styles.value}>{data.payMonth || 'N/A'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Pay Year</Text>
              <Text style={styles.value}>{data.payYear || 'N/A'}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Payment Date</Text>
              <Text style={styles.value}>{data.paymentDate || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Signatures */}
        <View style={styles.signature}>
          <View style={styles.signatureBox}>
            <Text style={{ fontSize: 9, marginBottom: 5 }}>Generated by (HR)</Text>
            <Text style={{ fontSize: 9, marginBottom: 5 }}>{data.generatedBy || '_________________'}</Text>
            <View style={styles.signatureLine} />
            <Text style={{ fontSize: 8, color: '#666' }}>Date: {new Date().toLocaleDateString()}</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={{ fontSize: 9, marginBottom: 5 }}>Approved by (Accountant)</Text>
            <Text style={{ fontSize: 9, marginBottom: 5 }}>{data.approvedBy || '_________________'}</Text>
            <View style={styles.signatureLine} />
            <Text style={{ fontSize: 8, color: '#666' }}>Date: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            This is an electronically generated payslip. It does not require a signature. Please
            retain for your records.
          </Text>
          <Text style={{ marginTop: 10 }}>Superchefs Limited - HR Management System</Text>
        </View>
      </Page>
    </Document>
  );
}
