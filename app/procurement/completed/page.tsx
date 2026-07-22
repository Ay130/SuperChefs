'use client';

export default function CompletedPage() {
  const requests = [
    { id: 'REQ-2026-004', supplier: 'Heritage Foods', amount: '₦240,000', items: 12, completed: '2026-07-19', cost: '₦242,500' },
    { id: 'REQ-2026-010', supplier: 'Flour Mills Nigeria', amount: '₦680,000', items: 5, completed: '2026-07-17', cost: '₦678,000' },
    { id: 'REQ-2026-011', supplier: 'Golden Seafoods', amount: '₦450,000', items: 8, completed: '2026-07-15', cost: '₦451,200' },
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Completed Requests</h1>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left text-sm font-medium">Request ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Supplier</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Items</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Est. Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actual Cost</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Completed</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{req.id}</td>
                <td className="px-6 py-4">{req.supplier}</td>
                <td className="px-6 py-4">{req.items}</td>
                <td className="px-6 py-4">{req.amount}</td>
                <td className="px-6 py-4">{req.cost}</td>
                <td className="px-6 py-4">{req.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
