'use client';

import { CheckCircle, XCircle } from 'lucide-react';

export default function ForApprovalPage() {
  const requests = [
    { id: 'REQ-2026-002', requester: 'Ade Williams', amount: '₦320,000', items: 8, submitted: '2026-07-21', reason: 'Wheat flour supplies' },
    { id: 'REQ-2026-006', requester: 'Chioma Obi', amount: '₦890,000', items: 4, submitted: '2026-07-17', reason: 'Oil and seasonings' },
    { id: 'REQ-2026-007', requester: 'Tunde Ahmed', amount: '₦145,000', items: 3, submitted: '2026-07-16', reason: 'Equipment maintenance' },
  ];

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">For Approval</h1>
        <p className="text-muted-foreground">Review and approve pending procurement requests</p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{req.id}</h3>
                <p className="text-sm text-muted-foreground mb-2">Requested by: {req.requester}</p>
                <p className="text-sm text-muted-foreground">{req.reason}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{req.amount}</p>
                <p className="text-sm text-muted-foreground">{req.items} items</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">Submitted: {req.submitted}</p>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm">
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
