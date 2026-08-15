import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface MovementDisplay {
  id: string;
  created_at: string;
  product_name: string;
  type: 'entry' | 'exit';
  quantity: number;
  user_name: string;
}

const History = () => {
  const [movements, setMovements] = useState<MovementDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovements = async () => {
      const { data } = await supabase
        .from('stock_movements')
        .select(`
          *,
          product:products(name),
          user:profiles(display_name)
        `)
        .order('created_at', { ascending: false });

      if (data) {
        setMovements(
          data.map((m: any) => ({
            ...m,
            product_name: m.product?.name || '—',
            user_name: m.user?.display_name || '—',
          }))
        );
      }
      setLoading(false);
    };

    loadMovements();
  }, []);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Historial de movimientos</h2>
        <span className="text-muted">Todos los movimientos</span>
      </div>

      <div className="admin-card">
        <div className="admin-card-body p-0">
          {movements.length === 0 ? (
            <p className="text-muted p-3 mb-0">No hay movimientos registrados.</p>
          ) : (
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map((m) => {
                    const date = new Date(m.created_at);
                    const dateStr = date.toLocaleDateString('es-AR');
                    const timeStr = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
                    return (
                      <tr key={m.id}>
                        <td>{dateStr}</td>
                        <td>{timeStr}</td>
                        <td>{m.product_name}</td>
                        <td>
                          <span className={`badge ${m.type === 'entry' ? 'bg-success' : 'bg-danger'}`}>
                            {m.type === 'entry' ? 'Entrada' : 'Salida'}
                          </span>
                        </td>
                        <td className={m.type === 'entry' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                          {m.type === 'entry' ? '+' : '-'}{Math.abs(m.quantity)}
                        </td>
                        <td>{m.user_name}</td>
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

export default History;