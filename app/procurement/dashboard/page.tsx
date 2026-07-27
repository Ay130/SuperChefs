'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Eye, Edit, Trash2, CheckCircle, X } from 'lucide-react'
import { Modal, ConfirmDialog } from '@/components/procurement/modals'

export default function DashboardPage() {
  const router = useRouter()
  const [materials, setMaterials] = useState<any[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [branches, setBranches] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)
  const [branchName, setBranchName] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('All')

  // Modal states
  const [addMaterialModal, setAddMaterialModal] = useState(false)
  const [addSupplierModal, setAddSupplierModal] = useState(false)
  const [addBranchModal, setAddBranchModal] = useState(false)
  const [editModal, setEditModal] = useState<{ type: 'material' | 'supplier' | 'branch' | null; item: any }>({ type: null, item: null })
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string | null; id: number | null; name: string }>({ type: null, id: null, name: '' })

  // Form states
  const [newMaterial, setNewMaterial] = useState({ name: '', category: '', unit: '', unit_price: '' })
  const [newSupplier, setNewSupplier] = useState({ name: '', contact_person: '', phone: '', email: '', address: '', status: 'Active' })
  const [newBranch, setNewBranch] = useState({ name: '', location: '', manager_name: '', phone: '', email: '' })

  useEffect(() => {
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
    setLoading(false)
    // Initialize with mock data
    setMaterials([
      { id: 1, name: 'Flour (Baking)', category: 'Dry Goods', unit: 'kg', current_stock: 320, minimum_stock: 100, unit_price: 250 },
      { id: 2, name: 'Sugar', category: 'Sweetening', unit: 'kg', current_stock: 250, minimum_stock: 80, unit_price: 300 },
      { id: 3, name: 'Butter', category: 'Dairy', unit: 'kg', current_stock: 120, minimum_stock: 50, unit_price: 1500 },
      { id: 4, name: 'Eggs', category: 'Dairy', unit: 'Units', current_stock: 600, minimum_stock: 200, unit_price: 50 },
    ])
    setSuppliers([
      { id: 1, name: 'Flour Mills Nigeria', contact_person: 'Adebayo Okafor', phone: '+234 701 111 2222', email: 'sales@flourmills.com', address: 'Ilupeju, Lagos', status: 'Active' },
      { id: 2, name: 'Golden Seafoods Ltd', contact_person: 'Mrs. Amara Okeke', phone: '+234 702 333 4444', email: 'orders@goldenseafood.com', address: 'Victoria Island, Lagos', status: 'Active' },
    ])
    setBranches([
      { id: 1, name: 'Lagos Branch', location: 'Lagos', manager_name: 'Asha Bella', phone: '+234 701 234 5678', email: 'asha@superchefs.com' },
      { id: 2, name: 'Abuja Branch', location: 'Abuja', manager_name: 'Tunde Ahmed', phone: '+234 702 345 6789', email: 'tunde@superchefs.com' },
    ])
    setRequests([
      { id: 1, requestId: 'PRQ-00032', date: '14/05/2024', branch: 'Lagos Branch', dept: 'Production', items: 5, status: 'Draft' },
      { id: 2, requestId: 'PRQ-00031', date: '13/05/2024', branch: 'Abuja Branch', dept: 'Kitchen', items: 8, status: 'Pending Approval' },
      { id: 3, requestId: 'PRQ-00030', date: '12/05/2024', branch: 'Kano Branch', dept: 'Store', items: 3, status: 'Approved' },
    ])
  }

  const getStockStatus = (current: number, minimum: number) => {
    if (current > minimum) return { label: 'Active', color: 'text-green-600 bg-green-50' }
    if (current > minimum * 0.5) return { label: 'Low', color: 'text-yellow-600 bg-yellow-50' }
    return { label: 'Critical', color: 'text-red-600 bg-red-50' }
  }

  // Material handlers
  const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.category && newMaterial.unit) {
      const material = {
        id: Math.max(...materials.map(m => m.id), 0) + 1,
        ...newMaterial,
        current_stock: 0,
        minimum_stock: 100,
        unit_price: parseFloat(newMaterial.unit_price) || 0
      }
      setMaterials([...materials, material])
      setNewMaterial({ name: '', category: '', unit: '', unit_price: '' })
      setAddMaterialModal(false)
    }
  }

  const handleEditMaterial = (material: any) => {
    const updatedMaterials = materials.map(m => m.id === material.id ? material : m)
    setMaterials(updatedMaterials)
    setEditModal({ type: null, item: null })
  }

  const handleDeleteMaterial = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id))
    setDeleteConfirm({ type: null, id: null, name: '' })
  }

  // Supplier handlers
  const handleAddSupplier = () => {
    if (newSupplier.name && newSupplier.contact_person) {
      const supplier = {
        id: Math.max(...suppliers.map(s => s.id), 0) + 1,
        ...newSupplier
      }
      setSuppliers([...suppliers, supplier])
      setNewSupplier({ name: '', contact_person: '', phone: '', email: '', address: '', status: 'Active' })
      setAddSupplierModal(false)
    }
  }

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter(s => s.id !== id))
    setDeleteConfirm({ type: null, id: null, name: '' })
  }

  // Branch handlers
  const handleAddBranch = () => {
    if (newBranch.name && newBranch.location) {
      const branch = {
        id: Math.max(...branches.map(b => b.id), 0) + 1,
        ...newBranch
      }
      setBranches([...branches, branch])
      setNewBranch({ name: '', location: '', manager_name: '', phone: '', email: '' })
      setAddBranchModal(false)
    }
  }

  const handleDeleteBranch = (id: number) => {
    setBranches(branches.filter(b => b.id !== id))
    setDeleteConfirm({ type: null, id: null, name: '' })
  }

  // Request handlers
  const handleApproveRequest = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
  }

  const handleRejectRequest = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Rejected' } : r))
  }

  const filteredRequests = statusFilter === 'All' 
    ? requests 
    : requests.filter(r => r.status === statusFilter)

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Overview of procurement activities {branchName && `- ${branchName}`}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Total Requests</p>
            <p className="text-3xl font-bold text-slate-900">{requests.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Pending Approval</p>
            <p className="text-3xl font-bold text-amber-600">{requests.filter(r => r.status === 'Pending Approval').length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Approved</p>
            <p className="text-3xl font-bold text-green-600">{requests.filter(r => r.status === 'Approved').length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Completed</p>
            <p className="text-3xl font-bold text-blue-600">{requests.filter(r => r.status === 'Completed').length}</p>
          </div>
        </div>

        {/* Recent Requests with Filters */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Requests</h2>
            <div className="flex gap-2">
              {['All', 'Draft', 'Pending Approval', 'Approved', 'Completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
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
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{req.requestId}</td>
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
                    <td className="px-6 py-4 flex gap-2">
                      {req.status === 'Pending Approval' && role === 'data-team' && (
                        <>
                          <button
                            onClick={() => handleApproveRequest(req.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectRequest(req.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Materials Section */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Materials (Inventory)</h2>
            {role === 'data-team' && (
              <button
                onClick={() => setAddMaterialModal(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2"
              >
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
                {materials.map((m) => {
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
                            <button
                              onClick={() => setEditModal({ type: 'material', item: m })}
                              className="p-1 hover:bg-orange-100 rounded"
                            >
                              <Edit size={16} className="text-orange-600" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'material', id: m.id, name: m.name })}
                              className="p-1 hover:bg-red-100 rounded"
                            >
                              <Trash2 size={16} className="text-red-600" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suppliers Section */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Suppliers</h2>
            {role === 'data-team' && (
              <button
                onClick={() => setAddSupplierModal(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={16} /> Add Supplier
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 p-6">
            {suppliers.map((s) => (
              <div key={s.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <h4 className="font-semibold text-slate-900 mb-3">{s.name}</h4>
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <p><strong>Contact:</strong> {s.contact_person}</p>
                  <p><strong>Phone:</strong> {s.phone}</p>
                  <p><strong>Email:</strong> {s.email}</p>
                  <p className="pt-2"><strong>Status:</strong> <span className="text-green-600">● {s.status}</span></p>
                </div>
                {role === 'data-team' && (
                  <div className="flex gap-2 pt-3 border-t">
                    <button
                      onClick={() => setEditModal({ type: 'supplier', item: s })}
                      className="flex-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ type: 'supplier', id: s.id, name: s.name })}
                      className="flex-1 px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Branches Section */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Branches</h2>
            {role === 'data-team' && (
              <button
                onClick={() => setAddBranchModal(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2"
              >
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
                {branches.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{b.name}</td>
                    <td className="px-6 py-4 text-slate-700">{b.location}</td>
                    <td className="px-6 py-4 text-slate-700">{b.manager_name}</td>
                    <td className="px-6 py-4 text-slate-700">{b.phone}</td>
                    <td className="px-6 py-4 text-slate-700 text-xs">{b.email}</td>
                    <td className="px-6 py-4 flex gap-2">
                      {role === 'data-team' && (
                        <>
                          <button
                            onClick={() => setEditModal({ type: 'branch', item: b })}
                            className="p-1 hover:bg-blue-100 rounded"
                          >
                            <Edit size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'branch', id: b.id, name: b.name })}
                            className="p-1 hover:bg-red-100 rounded"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Material Modal */}
      <Modal
        isOpen={addMaterialModal}
        onClose={() => setAddMaterialModal(false)}
        title="Add New Material"
        onSave={handleAddMaterial}
        saveLabel="Add Material"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Material Name</label>
            <input
              type="text"
              value={newMaterial.name}
              onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
              placeholder="e.g., Flour"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <input
              type="text"
              value={newMaterial.category}
              onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
              placeholder="e.g., Dry Goods"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
            <input
              type="text"
              value={newMaterial.unit}
              onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
              placeholder="e.g., kg"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Unit Price</label>
            <input
              type="number"
              value={newMaterial.unit_price}
              onChange={(e) => setNewMaterial({ ...newMaterial, unit_price: e.target.value })}
              placeholder="₦0"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>

      {/* Add Supplier Modal */}
      <Modal
        isOpen={addSupplierModal}
        onClose={() => setAddSupplierModal(false)}
        title="Add New Supplier"
        onSave={handleAddSupplier}
        saveLabel="Add Supplier"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Supplier Name</label>
            <input
              type="text"
              value={newSupplier.name}
              onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
              placeholder="e.g., Flour Mills Nigeria"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
            <input
              type="text"
              value={newSupplier.contact_person}
              onChange={(e) => setNewSupplier({ ...newSupplier, contact_person: e.target.value })}
              placeholder="Name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input
              type="text"
              value={newSupplier.phone}
              onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
              placeholder="+234..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={newSupplier.email}
              onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>

      {/* Add Branch Modal */}
      <Modal
        isOpen={addBranchModal}
        onClose={() => setAddBranchModal(false)}
        title="Add New Branch"
        onSave={handleAddBranch}
        saveLabel="Add Branch"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Branch Name</label>
            <input
              type="text"
              value={newBranch.name}
              onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
              placeholder="e.g., Lagos Branch"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input
              type="text"
              value={newBranch.location}
              onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
              placeholder="City"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Manager Name</label>
            <input
              type="text"
              value={newBranch.manager_name}
              onChange={(e) => setNewBranch({ ...newBranch, manager_name: e.target.value })}
              placeholder="Manager name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input
              type="text"
              value={newBranch.phone}
              onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
              placeholder="+234..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={newBranch.email}
              onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
              placeholder="email@superchefs.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal.type !== null}
        onClose={() => setEditModal({ type: null, item: null })}
        title={`Edit ${editModal.type === 'material' ? 'Material' : editModal.type === 'supplier' ? 'Supplier' : 'Branch'}`}
        onSave={() => {
          if (editModal.type === 'material') handleEditMaterial(editModal.item)
          setEditModal({ type: null, item: null })
        }}
        saveLabel="Update"
      >
        {editModal.item && (
          <div className="space-y-4">
            {editModal.type === 'material' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Material Name</label>
                  <input
                    type="text"
                    value={editModal.item.name}
                    onChange={(e) => setEditModal({ ...editModal, item: { ...editModal.item, name: e.target.value } })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editModal.item.category}
                    onChange={(e) => setEditModal({ ...editModal, item: { ...editModal.item, category: e.target.value } })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.type !== null}
        onClose={() => setDeleteConfirm({ type: null, id: null, name: '' })}
        title={`Delete ${deleteConfirm.type}`}
        message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
        onConfirm={() => {
          if (deleteConfirm.type === 'material') handleDeleteMaterial(deleteConfirm.id!)
          else if (deleteConfirm.type === 'supplier') handleDeleteSupplier(deleteConfirm.id!)
          else if (deleteConfirm.type === 'branch') handleDeleteBranch(deleteConfirm.id!)
        }}
        confirmLabel="Delete"
        isDangerous={true}
      />
    </div>
  )
}
