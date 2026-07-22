'use client';

import { Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

      <div className="max-w-2xl space-y-6">
        {/* Company Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
              <input type="text" defaultValue="Superchefs Limited" className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input type="email" defaultValue="procurement@superchefs.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input type="tel" defaultValue="+234 701 234 5678" className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
            </div>
          </div>
        </div>

        {/* Approval Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Approval Workflow</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Approval Required for Amounts Above (₦)</label>
              <input type="number" defaultValue="500000" className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="notify" defaultChecked className="w-4 h-4" />
              <label htmlFor="notify" className="text-sm text-foreground">
                Send email notifications on request submissions
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="auto" defaultChecked className="w-4 h-4" />
              <label htmlFor="auto" className="text-sm text-foreground">
                Auto-approve requests below ₦100,000
              </label>
            </div>
          </div>
        </div>

        {/* Report Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Report Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Report Frequency</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-background">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Reports To</label>
              <input type="email" placeholder="manager@superchefs.com" className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </main>
  );
}
