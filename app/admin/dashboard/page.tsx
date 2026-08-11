'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProcurementWorkspace } from '@/components/admin/procurement-workspace';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('superchefs_admin_token');
    if (!token) router.push('/admin/login');
    else setIsAuthenticated(true);
    setLoading(false);
  }, [router]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#f8faf9]"><div className="h-10 w-10 animate-pulse rounded-full bg-[#007c46]" /></div>;
  if (!isAuthenticated) return null;

  return <ProcurementWorkspace onLogout={() => { localStorage.removeItem('superchefs_admin_token'); router.push('/admin/login'); }} />;
}
