'use client';

import { useEffect, useState } from 'react';
import { ContactInquiry } from '@/lib/types';
import { Loader, CheckCircle } from 'lucide-react';

export function InquiriesSection() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        const res = await fetch('/api/inquiries');
        const data = await res.json();
        setInquiries(data);
      } catch (error) {
        console.error('Error loading inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInquiries();
  }, []);

  const handleMarkResponded = async (id: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'PUT' });
      setInquiries(
        inquiries.map((i) =>
          i.id === id ? { ...i, responded: true } : i
        )
      );
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Contact Inquiries</h2>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-lg border border-border p-8 text-center">
          <p className="text-muted-foreground">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-foreground">{inquiry.name}</h3>
                  <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                  <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                </div>
                {inquiry.responded ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Responded
                  </span>
                ) : (
                  <button
                    onClick={() => handleMarkResponded(inquiry.id)}
                    className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition"
                  >
                    Mark Responded
                  </button>
                )}
              </div>
              <p className="text-foreground">{inquiry.message}</p>
              <p className="text-xs text-muted-foreground mt-4">
                {new Date(inquiry.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
