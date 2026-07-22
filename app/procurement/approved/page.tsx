'use client';

export default function ApprovedPage() {
  const requests = [
    { id: 'REQ-2026-003', supplier: 'Flour Mills Nigeria', amount: '₦680,000', items: 3, approved: '2026-07-20', eta: '2026-07-25' },
    { id: 'REQ-2026-008', supplier: 'Golden Seafoods Ltd', amount: '₦450,000', items: 6, approved: '2026-07-19', eta: '2026-07-26' },
    { id: 'REQ-2026-009', supplier: 'Premium Spices Ltd', amount: '₦120,000', items: 2, approved: '2026-07-18', eta: '2026-07-23' },
  ];

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Approved Requests</h1>
        <p className="text-muted-foreground">All approved procurement requests awaiting delivery</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Request ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Supplier</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Items</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Approved Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">ETA</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{req.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{req.supplier}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{req.amount}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{req.items} items</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{req.approved}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{req.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
