'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Download, Eye, Edit, Trash2, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [materials, setMaterials] = useState<any[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [branches, setBranches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)
  const [branchName, setBranchName] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication
    const authenticated = localStorage.getItem('authenticated')
    const userRole = localStorage.getItem('procurement_role')
    const userBranch = localStorage.getItem('branch_name')
    
    if (!authenticated || !userRole) {
      router.push('/procurement')
      return
    }

    setRole(userRole)
    setBranchName(userBranch)
    fetchAllData()
  }, [router])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [matRes, supRes, brRes] = await Promise.all([
        fetch('/api/procurement/materials'),
        fetch('/api/procurement/suppliers'),
        fetch('/api/procurement/branches')
      ])
      
      if (matRes.ok) setMaterials(await matRes.json())
      if (supRes.ok) setSuppliers(await supRes.json())
      if (brRes.ok) setBranches(await brRes.json())
    } catch (error) {
      console.error('[v0] Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (current: number, minimum: number) => {
    if (current > minimum) return { label: 'Active', color: 'text-green-600 bg-green-50' }
    if (current > minimum * 0.5) return { label: 'Low', color: 'text-yellow-600 bg-yellow-50' }
    return { label: 'Critical', color: 'text-red-600 bg-red-50' }
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Overview of procurement activities</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm" />
            </div>
            <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm">
              <option>14 May - 20 May 2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Total Requests</p>
            <p className="text-3xl font-bold text-slate-900">32</p>
            <p className="text-xs text-slate-500 mt-2">↑ 8% this month</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Pending Approval</p>
            <p className="text-3xl font-bold text-amber-600">8</p>
            <p className="text-xs text-slate-500 mt-2">Awaiting review</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Approved</p>
            <p className="text-3xl font-bold text-green-600">15</p>
            <p className="text-xs text-slate-500 mt-2">Ready to order</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Completed</p>
            <p className="text-3xl font-bold text-blue-600">9</p>
            <p className="text-xs text-slate-500 mt-2">✓ Delivered</p>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Requests</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Request ID</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Branch</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Department</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Items</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'PRQ-00032', date: '14/05/2024', branch: 'Lagos Branch', dept: 'Production', items: 5, status: 'Draft' },
                  { id: 'PRQ-00031', date: '13/05/2024', branch: 'Abuja Branch', dept: 'Kitchen', items: 8, status: 'Pending Approval' },
                  { id: 'PRQ-00030', date: '12/05/2024', branch: 'Kano Branch', dept: 'Store', items: 3, status: 'Approved' },
                  { id: 'PRQ-00029', date: '10/05/2024', branch: 'Lagos Branch', dept: 'Bakery', items: 12, status: 'Completed' }
                ].map((req, i) => (
                  <tr key={i} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{req.id}</td>
                    <td className="px-6 py-4 text-slate-700">{req.date}</td>
                    <td className="px-6 py-4 text-slate-700">{req.branch}</td>
                    <td className="px-6 py-4 text-slate-700">{req.dept}</td>
                    <td className="px-6 py-4 text-slate-700">{req.items}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                        req.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-700' :
                        req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Materials Inventory Section */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Materials (Inventory)</h2>
            {role === 'data-team' && (
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2">
                <Plus size={16} /> Add Material
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Material Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Category</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Unit</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Current Stock</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Min Stock</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Unit Price</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.length > 0 ? materials.map((m: any) => {
                  const current = parseFloat(m.current_stock || 0)
                  const minimum = parseFloat(m.minimum_stock || 0)
                  const status = getStockStatus(current, minimum)
                  return (
                    <tr key={m.id} className="border-b hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{m.name}</td>
                      <td className="px-6 py-4 text-slate-700">{m.category}</td>
                      <td className="px-6 py-4 text-slate-700">{m.unit}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{m.current_stock}</td>
                      <td className="px-6 py-4 text-slate-700">{m.minimum_stock}</td>
                      <td className="px-6 py-4 text-slate-700">₦{m.unit_price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="p-1 hover:bg-blue-100 rounded"><Eye size={16} className="text-blue-600" /></button>
                        {role === 'data-team' && (
                          <>
                            <button className="p-1 hover:bg-orange-100 rounded"><Edit size={16} className="text-orange-600" /></button>
                            <button className="p-1 hover:bg-red-100 rounded"><Trash2 size={16} className="text-red-600" /></button>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                }) : (
                  <tr><td colSpan={8} className="px-6 py-8 text-center text-slate-500">Loading materials...</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suppliers Section */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Suppliers</h2>
            {role === 'data-team' && (
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2">
                <Plus size={16} /> Add Supplier
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 p-6">
            {suppliers.length > 0 ? suppliers.map((s: any) => (
              <div key={s.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <h4 className="font-semibold text-slate-900 mb-3">{s.name}</h4>
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <p><strong>Contact:</strong> {s.contact_person}</p>
                  <p><strong>Phone:</strong> {s.phone}</p>
                  <p><strong>Email:</strong> {s.email}</p>
                  <p className="pt-2"><strong>Status:</strong> <span className="text-green-600">● {s.status}</span></p>
                </div>
                <div className="flex gap-2 pt-3 border-t">
                  {role === 'data-team' && (
                    <>
                      <button className="flex-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">Edit</button>
                      <button className="flex-1 px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100">Delete</button>
                    </>
                  )}
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-8 text-slate-500">Loading suppliers...</div>
            )}
          </div>
        </div>

        {/* Branches Section */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Branches</h2>
            {role === 'data-team' && (
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2">
                <Plus size={16} /> Add Branch
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Branch Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Location</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Manager</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Phone</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {branches.length > 0 ? branches.map((b: any) => (
                  <tr key={b.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{b.name}</td>
                    <td className="px-6 py-4 text-slate-700">{b.location}</td>
                    <td className="px-6 py-4 text-slate-700">{b.manager_name}</td>
                    <td className="px-6 py-4 text-slate-700">{b.phone}</td>
                    <td className="px-6 py-4 text-slate-700 text-xs">{b.email}</td>
                    <td className="px-6 py-4 flex gap-2">
                      {role === 'data-team' && (
                        <>
                          <button className="p-1 hover:bg-blue-100 rounded"><Edit size={16} className="text-blue-600" /></button>
                          <button className="p-1 hover:bg-red-100 rounded"><Trash2 size={16} className="text-red-600" /></button>
                        </>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading branches...</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
