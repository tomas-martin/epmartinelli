import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { Product } from '../../lib/types';

const Products = () => {
  const { profile } = useAuth();
  const isManager = profile?.role === 'owner' || profile?.role === 'admin';
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    sku: '',
    price: '',
    min_stock: '2',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('name');
    if (data) setProducts(data as Product[]);
  };

  const filtered = products.filter((p) => {
    const matchSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ? true : filter === 'active' ? p.active : !p.active;
    return matchSearch && matchFilter;
  });

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', description: '', category: '', sku: '', price: '', min_stock: '2' });
    setShowForm(true);
    setError('');
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      category: p.category,
      sku: p.sku,
      price: String(p.price),
      min_stock: String(p.min_stock),
    });
    setShowForm(true);
    setError('');
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      sku: form.sku.trim().toUpperCase(),
      price: parseFloat(form.price) || 0,
      min_stock: parseInt(form.min_stock) || 2,
    };

    if (editing) {
      const { error: err } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editing.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase
        .from('products')
        .insert({ ...payload, stock: 0 });
      if (err) { setError(err.message); setSaving(false); return; }
    }

    setSaving(false);
    setShowForm(false);
    loadProducts();
  };

  const toggleActive = async (p: Product) => {
    if (!isManager) return;
    await supabase.from('products').update({ active: !p.active }).eq('id', p.id);
    loadProducts();
  };

  const getStockStatus = (p: Product) => {
    if (p.stock === 0) return { label: 'Sin stock', cls: 'stock-out' };
    if (p.stock <= p.min_stock) return { label: `Stock bajo (${p.stock})`, cls: 'stock-low' };
    return { label: `${p.stock}`, cls: 'stock-ok' };
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Productos</h2>
        {isManager && (
          <button className="btn btn-primary" onClick={openNew}>
            <i className="bi bi-plus"></i> Nuevo producto
          </button>
        )}
      </div>

      <div className="admin-card mb-4">
        <div className="admin-card-body">
          <div className="row g-2 align-items-end">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre, SKU o categoría..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value as any)}>
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {showForm && isManager && (
        <div className="admin-card mb-4">
          <div className="admin-card-header">
            <h5 className="mb-0">{editing ? 'Editar producto' : 'Nuevo producto'}</h5>
          </div>
          <div className="admin-card-body">
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre *</label>
                  <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">SKU/Código *</label>
                  <input className="form-control" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Categoría</label>
                  <input className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Precio de venta $</label>
                  <input type="number" step="0.01" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Stock mínimo</label>
                  <input type="number" className="form-control" value={form.min_stock} onChange={(e) => setForm({ ...form, min_stock: e.target.value })} />
                </div>
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-header">
          <h5 className="mb-0">
            {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
          </h5>
        </div>
        <div className="admin-card-body p-0">
          {filtered.length === 0 ? (
            <p className="text-muted p-3 mb-0">No se encontraron productos.</p>
          ) : (
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    {isManager && <th>Acciones</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => {
                    const status = getStockStatus(p);
                    const priceDisplay = '$' + Number(p.price).toLocaleString('es-AR', { minimumFractionDigits: 2 });
                    const activeLabel = p.active ? 'Activo' : 'Inactivo';
                    const activeClass = p.active ? 'bg-success' : 'bg-secondary';
                    const btnClass = p.active ? 'btn-outline-warning' : 'btn-outline-success';
                    const iconClass = p.active ? 'bi-x-circle' : 'bi-check-circle';
                    return (
                      <tr key={p.id}>
                        <td><code>{p.sku}</code></td>
                        <td>{p.name}</td>
                        <td>{p.category || '—'}</td>
                        <td>{priceDisplay}</td>
                        <td>
                          <span className={'stock-badge ' + status.cls}>{status.label}</span>
                        </td>
                        <td>
                          <span className={'badge ' + activeClass}>
                            {activeLabel}
                          </span>
                        </td>
                        {isManager && (
                          <td>
                            <div className="d-flex gap-1">
                              <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(p)}>
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className={'btn btn-sm ' + btnClass}
                                onClick={() => toggleActive(p)}
                              >
                                <i className={'bi ' + iconClass}></i>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;