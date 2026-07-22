'use client';

import { Download } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { title: 'Monthly Spending Report', date: 'July 2026', format: 'PDF', size: '2.4 MB' },
    { title: 'Supplier Performance Report', date: 'Q3 2026', format: 'Excel', size: '1.8 MB' },
    { title: 'Material Usage Analysis', date: 'July 2026', format: 'PDF', size: '3.1 MB' },
    { title: 'Procurement Efficiency Report', date: 'YTD 2026', format: 'PDF', size: '4.2 MB' },
  ];

  const stats = [
    { label: 'Total Spent (YTD)', value: '₦12.4M', change: '+18%' },
    { label: 'Avg Processing Time', value: '3.2 days', change: '-0.5 days' },
    { label: 'Supplier Count', value: '24', change: '+3' },
    { label: 'Requests Completed', value: '486', change: '+42%' },
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Reports & Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-xs text-green-600">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Reports */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold text-foreground">Available Reports</h2>
        </div>
        <div className="space-y-2">
          {reports.map((report, idx) => (
            <div key={idx} className="flex items-center justify-between px-6 py-4 border-b border-border hover:bg-muted/50 transition">
              <div>
                <p className="font-medium text-foreground">{report.title}</p>
                <p className="text-sm text-muted-foreground">{report.date} • {report.format} • {report.size}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
