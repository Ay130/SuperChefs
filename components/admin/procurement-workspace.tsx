'use client';

import { useMemo, useState } from 'react';
import {
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Store,
  Truck,
  Upload,
  Users,
  X,
} from 'lucide-react';

const materials = [
  ['Butter', 'Carton', 10, '150 kg', 2, '30 kg', 12, '180 kg', 2, '30 kg'],
  ['Egg', 'Crate', 15, '450 pcs', 5, '150 pcs', 20, '600 pcs', 10, '300 pcs'],
  ['Mince Meat', 'kg', 25, '25 kg', 10, '10 kg', 35, '35 kg', 5, '5 kg'],
  ['Fillet', 'kg', 20, '20 kg', 5, '5 kg', 25, '25 kg', 3, '3 kg'],
  ['Premix (Full Bag)', 'Bag', 8, '8 bag', 2, '2 bag', 10, '10 bag', 2, '2 bag'],
  ['Bun', 'Pack', 50, '50 pack', 10, '10 pack', 60, '60 pack', 10, '10 pack'],
  ['Cheese', 'kg', 12, '12 kg', 3, '3 kg', 15, '15 kg', 5, '5 kg'],
  ['Sausage', 'Pack', 30, '30 pack', 5, '5 pack', 35, '35 pack', 8, '8 pack'],
  ['Mayonnaise', 'Pack', 20, '20 pack', 5, '5 pack', 25, '25 pack', 5, '5 pack'],
  ['Ketchup', 'Pack', 25, '25 pack', 5, '5 pack', 30, '30 pack', 5, '5 pack'],
  ['Mustard', 'Pack', 15, '15 pack', 3, '3 pack', 18, '18 pack', 3, '3 pack'],
  ['Tartar Sauce', 'Pack', 10, '10 pack', 2, '2 pack', 12, '12 pack', 2, '2 pack'],
  ['Chicken', 'kg', 40, '40 kg', 10, '10 kg', 50, '50 kg', 15, '15 kg'],
  ['Oil (Vegetable)', 'Litre', 40, '40 L', 10, '10 L', 50, '50 L', 10, '10 L'],
  ['Sugar', 'kg', 30, '30 kg', 10, '10 kg', 40, '40 kg', 10, '10 kg'],
  ['Salt', 'kg', 20, '20 kg', 5, '5 kg', 25, '25 kg', 5, '5 kg'],
  ['Disposable Pack', 'Pack', 100, '100 pack', 20, '20 pack', 120, '120 pack', 20, '20 pack'],
] as const;

const navItems = [
  ['Dashboard', LayoutDashboard], ['New Request', Plus], ['All Requests', FileText], ['My Requests', ShoppingCart],
  ['Drafts', FileText], ['Materials (Master)', Package], ['Suppliers', Users], ['Goods Received', Store],
  ['Inventory', SlidersHorizontal], ['Approvals', Check], ['Reports & Analytics', Truck], ['Settings', Settings],
] as const;

function SelectBox({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return <button className={`flex items-center justify-between gap-5 border border-slate-300 bg-white px-3 py-2 text-left text-[12px] text-slate-800 ${wide ? 'min-w-64' : 'min-w-40'}`}><span>{children}</span><ChevronDown className="h-4 w-4 shrink-0" /></button>;
}

export function ProcurementWorkspace({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState('New Request');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const totalNeeded = useMemo(() => Object.values(quantities).reduce((sum, value) => sum + value, 105), [quantities]);

  return (
    <div className="flex h-screen min-w-[1000px] bg-[#f8faf9] text-[#101d18]">
      <aside className={`${sidebarOpen ? 'w-[205px]' : 'w-0'} shrink-0 overflow-hidden bg-[#003d2b] text-white transition-all`}>
        <div className="flex h-[66px] items-center gap-2 border-b border-white/10 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-black text-[#005c3b]">S</div>
          <div><div className="text-[17px] font-bold leading-none">Superchefs</div><div className="text-[9px] tracking-[3px] text-emerald-200">GROUP</div></div>
        </div>
        <nav className="space-y-1 px-3 py-5">
          {navItems.map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-[12px] font-semibold ${active === label ? 'bg-[#00a85a] text-white' : 'text-emerald-50 hover:bg-white/10'}`}><Icon className="h-4 w-4" />{label}</button>)}
        </nav>
        <button onClick={onLogout} className="mt-auto flex items-center gap-3 px-6 py-5 text-[12px] font-semibold"><LogOut className="h-4 w-4" />Logout</button>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-[66px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5">
          <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu className="h-5 w-5" /></button><h1 className="text-xl font-bold tracking-tight">{active === 'New Request' ? 'NEW PROCUREMENT REQUEST' : active.toUpperCase()}</h1>{active === 'New Request' && <span className="bg-[#dff1e5] px-2 py-1 text-[11px] font-bold text-[#12633e]">EXCEL LIKE</span>}</div>
          <div className="flex items-center gap-5"><Bell className="h-5 w-5" /><div className="flex items-center gap-2"><div className="h-8 w-8 rounded-full bg-slate-200" /><div className="text-[11px] font-bold">Aisha Bello<div className="text-[9px] font-normal text-slate-500">Procurement Officer</div></div><ChevronDown className="h-4 w-4" /></div></div>
        </header>

        <div className="flex-1 overflow-auto p-5">
          {active === 'New Request' ? <NewRequest quantities={quantities} setQuantities={setQuantities} totalNeeded={totalNeeded} submitted={submitted} setSubmitted={setSubmitted} /> : <ListView active={active} />}
        </div>
        <footer className="flex h-10 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-5 text-[10px] text-slate-600"><span>© 2024 Superchefs Group. All rights reserved.</span><span>Procurement Management System&nbsp;&nbsp; v1.0</span></footer>
      </main>
    </div>
  );
}

function NewRequest({ quantities, setQuantities, totalNeeded, submitted, setSubmitted }: { quantities: Record<number, number>; setQuantities: React.Dispatch<React.SetStateAction<Record<number, number>>>; totalNeeded: number; submitted: boolean; setSubmitted: (value: boolean) => void }) {
  return <>
    <div className="mb-4 grid grid-cols-5 gap-4">
      <label className="text-[11px] font-bold">Branch <span className="text-red-500">*</span><SelectBox>LeKki Branch</SelectBox></label><label className="text-[11px] font-bold">Week<SelectBox wide>Week 32 (05 Aug - 11 Aug 2024)</SelectBox></label><label className="text-[11px] font-bold">Department<SelectBox>Production</SelectBox></label><label className="text-[11px] font-bold">Request Date<div className="mt-1 flex items-center justify-between border border-slate-300 bg-white px-3 py-2 text-[12px] font-normal">05/08/2024 <FileText className="h-4 w-4" /></div></label><label className="text-[11px] font-bold">Purpose / Reason<SelectBox wide>Production - daily requirement</SelectBox></label>
    </div>
    <div className="mb-3 flex justify-end gap-3"><button className="flex items-center gap-2 border border-[#7da994] bg-white px-4 py-2 text-[12px] font-bold text-[#12633e]"><Upload className="h-4 w-4" />Import from Excel</button><button className="flex items-center gap-2 bg-[#007c46] px-5 py-2 text-[12px] font-bold text-white"><Package className="h-4 w-4" />View Material Master</button></div>
    {submitted && <div className="mb-3 flex items-center gap-2 border border-emerald-300 bg-emerald-50 px-3 py-2 text-[12px] text-emerald-800"><Check className="h-4 w-4" />Request submitted successfully.</div>}
    <div className="overflow-hidden border border-slate-300 bg-white"><table className="w-full border-collapse text-[12px]"><thead><tr className="text-center font-bold"><th rowSpan={2} className="border-r border-slate-300 px-3">#</th><th rowSpan={2} className="border-r border-slate-300 px-3">MATERIAL</th><th rowSpan={2} className="border-r border-slate-300 px-3">UNIT</th><th colSpan={2} className="border-r border-slate-300 bg-[#e7f5eb] py-2">OPENING STOCK</th><th colSpan={2} className="border-r border-slate-300 bg-[#e5f0fc] text-[#154788]">RECEIVED</th><th colSpan={2} className="border-r border-slate-300 bg-[#fff6dc]">CLOSING STOCK</th><th rowSpan={2} className="border-r border-slate-300 bg-[#f1f4f2] px-4">QTY NEEDED<br/><span className="font-normal">(TO REQUEST)</span></th><th rowSpan={2} className="bg-[#e7f5eb] px-4">EQUIVALENT (AUTO)<br/><span className="font-normal">(STANDARD UNIT)</span></th></tr><tr className="text-[11px]"><th className="border-t border-r border-slate-300 bg-[#e7f5eb] py-1">QTY</th><th className="border-t border-r border-slate-300 bg-[#e7f5eb]">EQUIVALENT</th><th className="border-t border-r border-slate-300 bg-[#e5f0fc] py-1 text-[#154788]">QTY</th><th className="border-t border-r border-slate-300 bg-[#e5f0fc] text-[#154788]">EQUIVALENT</th><th className="border-t border-r border-slate-300 bg-[#fff6dc] py-1">QTY</th><th className="border-t border-r border-slate-300 bg-[#fff6dc]">EQUIVALENT</th></tr></thead><tbody>{materials.map((row, index) => <tr key={row[0]} className="text-center hover:bg-slate-50"><td className="border-t border-r border-slate-200 py-1.5">{index + 1}</td><td className="border-t border-r border-slate-200 px-3 text-left">{row[0]}</td><td className="border-t border-r border-slate-200">{row[1]}</td><td className="border-t border-r border-slate-200">{row[2]}</td><td className="border-t border-r border-slate-200">{row[3]}</td><td className="border-t border-r border-slate-200">{row[4]}</td><td className="border-t border-r border-slate-200">{row[5]}</td><td className="border-t border-r border-slate-200">{row[6]}</td><td className="border-t border-r border-slate-200">{row[7]}</td><td className="border-t border-r border-slate-200 px-2"><input aria-label={`Quantity needed for ${row[0]}`} type="number" value={quantities[index] ?? row[8]} onChange={(e) => setQuantities((current) => ({ ...current, [index]: Number(e.target.value) }))} className="w-full border border-slate-200 px-2 py-1 text-center outline-none focus:border-[#007c46]" /></td><td className="border-t border-slate-200 font-semibold text-[#12633e]">{row[9]}</td></tr>)}<tr className="bg-slate-50 text-center font-bold"><td colSpan={3} className="border-t border-slate-300 px-3 py-3 text-left">TOTAL</td><td className="border-t border-slate-300">400</td><td className="border-t border-slate-300">400.00</td><td className="border-t border-slate-300">107</td><td className="border-t border-slate-300">107.00</td><td className="border-t border-slate-300">507</td><td className="border-t border-slate-300">507.00</td><td className="border-t border-slate-300">{totalNeeded}</td><td className="border-t border-slate-300">{totalNeeded}.00 (auto)</td></tr></tbody></table></div>
    <div className="mt-6 flex items-center justify-between"><button className="flex items-center gap-2 border border-[#7da994] bg-white px-16 py-2 text-[12px] font-bold text-[#12633e]"><FileText className="h-4 w-4" />Save Draft</button><div className="flex gap-3"><button onClick={() => setQuantities({})} className="flex items-center gap-2 border border-slate-300 bg-white px-10 py-2 text-[12px] font-bold"><RefreshCw className="h-4 w-4" />Clear</button><button onClick={() => setSubmitted(true)} className="flex items-center gap-2 bg-[#007c46] px-14 py-2 text-[12px] font-bold text-white"><Send className="h-4 w-4" />Submit Request</button></div></div>
  </>;
}

function ListView({ active }: { active: string }) {
  const rows = active === 'Suppliers' ? [['ABC Foods Ltd', 'Mr. John Doe', '0803 123 4567', 'info@abcfoods.com', 'Active'], ['Fresh Supplies Co.', 'Mrs. Funke James', '0802 987 6543', 'info@freshsupplies.com', 'Active'], ['Bakers World', 'Mr. David Oho', '0809 456 7690', 'david@bakersworld.com', 'Active']] : materials.slice(0, 8).map((row, index) => [`PR-0002${4 - index}`, '05/08/2024', 'Lekki Branch', index % 2 ? 'Bakery' : 'Production', index % 2 ? 'Approved' : 'Pending Approval']);
  return <div className="border border-slate-300 bg-white"><div className="flex items-center justify-between border-b border-slate-200 p-4"><div className="flex items-center gap-3"><div className="flex items-center border border-slate-300 px-3 py-2"><Search className="mr-2 h-4 w-4 text-slate-400" /><input className="w-64 text-[12px] outline-none" placeholder={`Search ${active.toLowerCase()}...`} /></div><SelectBox>All Statuses</SelectBox></div><button className="flex items-center gap-2 bg-[#007c46] px-4 py-2 text-[12px] font-bold text-white"><Plus className="h-4 w-4" />Add {active === 'Suppliers' ? 'Supplier' : 'Material'}</button></div><table className="w-full text-left text-[12px]"><thead className="bg-[#f0f6f2] font-bold"><tr>{(active === 'Suppliers' ? ['#', 'Supplier Name', 'Contact Person', 'Phone', 'Email', 'Status', 'Actions'] : ['Request No.', 'Date', 'Branch', 'Department', 'Status', 'Total Items', 'Total Equivalent', 'Actions']).map((h) => <th key={h} className="border-b border-slate-200 px-4 py-3">{h}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className="border-b border-slate-100"><td className="px-4 py-3">{active === 'Suppliers' ? index + 1 : row[0]}</td>{row.slice(1).map((cell, cellIndex) => <td key={cellIndex} className={`px-4 py-3 ${cell === 'Active' || cell === 'Approved' ? 'font-semibold text-[#13804b]' : ''}`}>{cell}</td>)}<td className="px-4 py-3 text-[#13804b]">•••</td></tr>)}</tbody></table><div className="flex justify-between p-4 text-[11px] text-slate-500">Showing 1 to {rows.length} entries <span>‹ &nbsp; <b className="bg-[#007c46] px-2 py-1 text-white">1</b> &nbsp; 2 &nbsp; 3 &nbsp; ›</span></div></div>;
}

export function ProcurementPlaceholder({ title }: { title: string }) { return <div className="flex min-h-[500px] items-center justify-center border border-dashed border-slate-300 bg-white"><div className="text-center"><CircleHelp className="mx-auto mb-3 h-8 w-8 text-[#007c46]" /><h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-sm text-slate-500">This procurement workspace is ready for your next workflow.</p></div></div>; }
