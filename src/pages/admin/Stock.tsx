import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { Product } from '../../lib/types';

const Stock = () => {
  const { profile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out' | 'ok'>('all');
  const [selectedId, setSelectedId] = useState<string>('');
  const [quantity, setQuantity] = useState('');
  const [movementType, setMovementType] = useState<'entry' | 'exit'>('entry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('name');
    if (data) setProducts(data as Product[]);
  };

  const filtered = products.filter((p) => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ? true
      : filter === 'low' ? (p.stock > 0 && p.stock <= p.min_stock)
      : filter === 'out' ? p.stock === 0
      : p.stock > p.min_stock;
    return matchSearch && matchFilter;
  });

  const getStockStatus = (p: Product) => {
    if (p.stock === 0) return { label: 'Sin stock', cls: 'stock-out' };
    if (p.stock <= p.min_stock) return { label: `Stock bajo (${p.stock})`, cls: 'stock-low' };
    return { label: `${p.stock}`, cls: 'stock-ok' };
  };

  const handleMovement = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedId || !quantity) return;

    const qty = parseInt(quantity);
    if (qty <= 0) { setError('La cantidad debe ser mayor a 0'); return; }

    setProcessing(true);
    setError('');
    setMessage('');

    const product = products.find(p => p.id === selectedId);
    if (!product) { setError('Producto no encontrado'); setProcessing(false); return; }

    if (movementType === 'exit' && qty > product.stock) {
      setError(`No hay suficiente stock. Disponible: ${product.stock}`);
      setProcessing(false);
      return;
    }

    const newStock = movementType === 'entry'
      ? product.stock + qty
      : product.stock - qty;

    const { error: movErr } = await supabase
      .from('stock_movements')
      .insert({
        product_id: selectedId,
        quantity: movementType === 'exit' ? -qty : qty,
        type: movementType,
        user_id: profile?.id,
      });

    if (movErr) { setError(movErr.message); setProcessing(false); return; }

    const { error: updErr } = await supabase
      .from('products')
      .update({ stock: newStock, updated_at: new Date().toISOString() })
      .eq('id', selectedId);

    if (updErr) { setError(updErr.message); setProcessing(false); return; }

    const typeLabel = movementType === 'entry' ? 'agregó' : 'retiró';
    setMessage(`${profile?.display_name} ${typeLabel} ${qty} unidades de ${product.name}`);
    setQuantity('');
    setProcessing(false);
    loadProducts();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Gestión de Stock</h2>
      </div>

      {/* Filtros y búsqueda */}
      <div className="admin-card mb-4">
        <div className="admin-card-body">
          <div className="row g-2 align-items-end">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value as any)}>
                <option value="all">Todos</option>
                <option value="ok">Stock normal</option>
                <option value="low">Stock bajo</option>
                <option value="out">Sin stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de movimiento */}
      <div className="admin-card mb-4">
        <div className="admin-card-header">
          <h5 className="mb-0">Registrar movimiento</h5>
        </div>
        <div className="admin-card-body">
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {message && <div className="alert alert-success py-2">{message}</div>}
          <form onSubmit={handleMovement}>
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label">Producto</label>
                <select
                  className="form-select"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  required
                >
                  <option value="">Seleccionar producto...</option>
                  {filtered.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku}) — Stock: {p.stock}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">Tipo</label>
                <select
                  className="form-select"
                  value={movementType}
                  onChange={(e) => setMovementType(e.target.value as 'entry' | 'exit')}
                >
                  <option value="entry">Entrada (+)</option>
                  <option value="exit">Salida (-)</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100" disabled={processing}>
                  {processing ? 'Procesando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Listado de productos */}
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
                    <th>Stock actual</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => {
                    const status = getStockStatus(p);
                    return (
                      <tr key={p.id}>
                        <td><code>{p.sku}</code></td>
                        <td>{p.name}</td>
                        <td>{p.category || '—'}</td>
                        <td className="fw-bold">{p.stock}</td>
                        <td>
                          <span className={`stock-badge ${status.cls}`}>{status.label}</span>
                        </td>
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

export default Stock;