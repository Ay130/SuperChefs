import { 
  serial, 
  varchar, 
  decimal, 
  timestamp, 
  integer, 
  text,
  pgTable,
  uniqueIndex,
  index
} from 'drizzle-orm/pg-core'

export const branches = pgTable('branches', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  location: varchar('location', { length: 255 }),
  managerName: varchar('manager_name', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
})

export const materials = pgTable('materials', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 100 }),
  unit: varchar('unit', { length: 50 }),
  minimumStock: decimal('minimum_stock', { precision: 10, scale: 2 }),
  reorderPoint: decimal('reorder_point', { precision: 10, scale: 2 }),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }),
  currentStock: decimal('current_stock', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  categoryIdx: index('materials_category_idx').on(table.category),
}))

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  contactPerson: varchar('contact_person', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  address: text('address'),
  status: varchar('status', { length: 50 }).default('Active'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const materialRequests = pgTable('material_requests', {
  id: serial('id').primaryKey(),
  requestId: varchar('request_id', { length: 50 }).notNull().unique(),
  branchId: integer('branch_id').notNull().references(() => branches.id),
  requestedBy: varchar('requested_by', { length: 255 }),
  status: varchar('status', { length: 50 }).default('Draft'),
  totalItems: integer('total_items').default(0),
  requestedDate: timestamp('requested_date').defaultNow(),
  requiredDate: timestamp('required_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  statusIdx: index('requests_status_idx').on(table.status),
  branchIdx: index('requests_branch_idx').on(table.branchId),
}))

export const materialRequestItems = pgTable('material_request_items', {
  id: serial('id').primaryKey(),
  requestId: integer('request_id').notNull().references(() => materialRequests.id, { onDelete: 'cascade' }),
  materialId: integer('material_id').notNull().references(() => materials.id),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
})

export const purchaseOrders = pgTable('purchase_orders', {
  id: serial('id').primaryKey(),
  poNumber: varchar('po_number', { length: 50 }).notNull().unique(),
  requestId: integer('request_id').references(() => materialRequests.id),
  supplierId: integer('supplier_id').notNull().references(() => suppliers.id),
  status: varchar('status', { length: 50 }).default('Draft'),
  totalAmount: decimal('total_amount', { precision: 15, scale: 2 }),
  createdBy: varchar('created_by', { length: 255 }),
  createdDate: timestamp('created_date').defaultNow(),
  deliveryDate: timestamp('delivery_date'),
  deliveryBranchId: integer('delivery_branch_id').references(() => branches.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  statusIdx: index('po_status_idx').on(table.status),
  supplierIdx: index('po_supplier_idx').on(table.supplierId),
}))

export const purchaseOrderItems = pgTable('purchase_order_items', {
  id: serial('id').primaryKey(),
  poId: integer('po_id').notNull().references(() => purchaseOrders.id, { onDelete: 'cascade' }),
  materialId: integer('material_id').notNull().references(() => materials.id),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
})

export const goodsReceived = pgTable('goods_received', {
  id: serial('id').primaryKey(),
  grNumber: varchar('gr_number', { length: 50 }).notNull().unique(),
  poId: integer('po_id').notNull().references(() => purchaseOrders.id),
  materialId: integer('material_id').notNull().references(() => materials.id),
  quantityReceived: decimal('quantity_received', { precision: 10, scale: 2 }),
  receivedDate: timestamp('received_date').defaultNow(),
  receivedBy: varchar('received_by', { length: 255 }),
  branchId: integer('branch_id').references(() => branches.id),
  status: varchar('status', { length: 50 }).default('Received'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  poIdx: index('gr_po_idx').on(table.poId),
}))

export const approvals = pgTable('approvals', {
  id: serial('id').primaryKey(),
  poId: integer('po_id').notNull().references(() => purchaseOrders.id),
  approvalBy: varchar('approval_by', { length: 255 }),
  approvalDate: timestamp('approval_date'),
  status: varchar('status', { length: 50 }).default('Pending'),
  comments: text('comments'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  branchId: integer('branch_id').notNull().references(() => branches.id),
  materialId: integer('material_id').notNull().references(() => materials.id),
  currentStock: decimal('current_stock', { precision: 10, scale: 2 }).default('0'),
  minimumStock: decimal('minimum_stock', { precision: 10, scale: 2 }),
  maximumStock: decimal('maximum_stock', { precision: 10, scale: 2 }),
  lastUpdated: timestamp('last_updated').defaultNow(),
}, (table) => ({
  branchMaterialUnique: uniqueIndex('inventory_branch_material_unique').on(table.branchId, table.materialId),
}))
