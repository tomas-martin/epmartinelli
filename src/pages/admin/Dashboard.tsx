import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { Product, StockMovement } from '../../lib/types';

interface DashboardStats {
  totalProducts: number;
  lowStock: (Product & { stock_status: 'low' | 'out' })[];
  recentMovements: (StockMovement & { product_name: string; user_name: string })[];
}

const Dashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('active', true);

    if (!products) { setLoading(false); return; }

    const totalProducts = products.length;
    const lowStock = products
      .filter((p: Product) => p.stock <= p.min_stock)
      .map((p: Product) => ({
        ...p,
        stock_status: (p.stock === 0 ? 'out' : 'low') as 'low' | 'out',
      }))
      .sort((a, b) => a.stock - b.stock);

    const { data: movements } = await supabase
      .from('stock_movements')
      .select(`
        *,
        product:products(name),
        user:profiles(display_name)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    const recentMovements = (movements || []).map((m: any) => ({
      ...m,
      product_name: m.product?.name || '—',
      user_name: m.user?.display_name || '—',
    }));

    setStats({ totalProducts, lowStock, recentMovements });
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>;
  }

  if (!stats) return <p className="text-danger">Error al cargar datos.</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Inicio</h2>
        <span className="text-muted">
          {profile?.display_name} ({profile?.role === 'owner' ? 'Dueño' : 'Empleado'})
        </span>
      </div>

      {/* Resumen */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="admin-card">
            <div className="admin-card-body">
              <h6>Productos totales</h6>
              <h3>{stats.totalProducts}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="admin-card admin-card-warning">
            <div className="admin-card-body">
              <h6>Stock bajo</h6>
              <h3>{stats.lowStock.filter(s => s.stock_status === 'low').length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="admin-card admin-card-danger">
            <div className="admin-card-body">
              <h6>Sin stock</h6>
              <h3>{stats.lowStock.filter(s => s.stock_status === 'out').length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Advertencias de stock bajo */}
      {stats.lowStock.length > 0 && (
        <div className="admin-card mb-4">
          <div className="admin-card-header">
            <h5 className="mb-0">Alertas de stock</h5>
          </div>
          <div className="admin-card-body">
            {stats.lowStock.map((p) => (
              <div key={p.id} className={`stock-alert ${p.stock_status === 'out' ? 'stock-out' : 'stock-low'}`}>
                <span className="stock-alert-icon">
                  {p.stock_status === 'out' ? '🔴' : '⚠️'}
                </span>
                <div className="stock-alert-info">
                  <strong>{p.name}</strong>
                  <span>
                    {p.stock_status === 'out'
                      ? 'Sin stock'
                      : `Stock bajo — quedan ${p.stock} unidades`
                    }
                  </span>
                </div>
                <Link to="/admin/stock" className="btn btn-sm btn-outline-primary">Ir a Stock</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Últimos movimientos */}
      <div className="admin-card">
        <div className="admin-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Últimos movimientos</h5>
          <Link to="/admin/historial" className="btn btn-sm btn-outline-primary">Ver todo</Link>
        </div>
        <div className="admin-card-body p-0">
          {stats.recentMovements.length === 0 ? (
            <p className="text-muted p-3 mb-0">No hay movimientos registrados.</p>
          ) : (
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentMovements.map((m) => (
                    <tr key={m.id}>
                      <td>{new Date(m.created_at).toLocaleString('es-AR')}</td>
                      <td>{m.product_name}</td>
                      <td>
                        <span className={`badge ${m.type === 'entry' ? 'bg-success' : 'bg-danger'}`}>
                          {m.type === 'entry' ? 'Entrada' : 'Salida'}
                        </span>
                      </td>
                      <td className={m.type === 'entry' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                        {m.type === 'entry' ? '+' : '-'}{m.quantity}
                      </td>
                      <td>{m.user_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;