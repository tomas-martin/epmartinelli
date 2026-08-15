import { useEffect, useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth, roleLabel, type UserRole } from '../../context/AuthContext';
import type { Profile } from '../../lib/types';

interface UserRow extends Profile {
  created_at: string;
}

const Users = () => {
  const { profile } = useAuth();
  const isOwner = profile?.role === 'owner';

  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    username: '',
    display_name: '',
    password: '',
    role: 'employee' as UserRole,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setUsers(data as UserRow[]);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  if (!isOwner) {
    return <Navigate to="/admin" replace />;
  }

  const openNew = () => {
    setForm({ username: '', display_name: '', password: '', role: 'employee' });
    setShowForm(true);
    setError('');
    setMessage('');
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    const { error: fnErr } = await supabase.functions.invoke('create-user', {
      body: {
        username: form.username.trim(),
        display_name: form.display_name.trim(),
        password: form.password,
        role: form.role,
      },
    });

    if (fnErr) {
      const detail = (fnErr as any)?.context?.data?.error || fnErr.message;
      setError(detail);
      setSaving(false);
      return;
    }

    setMessage(`Usuario "${form.display_name.trim()}" creado correctamente.`);
    setSaving(false);
    setShowForm(false);
    loadUsers();
  };

  const handleDelete = async (u: UserRow) => {
    if (!window.confirm(`¿Eliminar a "${u.display_name}"? Esta acción no se puede deshacer.`)) return;
    setError('');
    setMessage('');

    const { error: fnErr } = await supabase.functions.invoke('delete-user', {
      body: { id: u.id },
    });

    if (fnErr) {
      const detail = (fnErr as any)?.context?.data?.error || fnErr.message;
      setError(detail);
      return;
    }

    setMessage(`Usuario "${u.display_name}" eliminado.`);
    loadUsers();
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Usuarios</h2>
        {!showForm && (
          <button className="btn btn-primary" onClick={openNew}>
            <i className="bi bi-person-plus"></i> Nuevo usuario
          </button>
        )}
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {message && <div className="alert alert-success py-2">{message}</div>}

      {showForm && (
        <div className="admin-card mb-4">
          <div className="admin-card-header">
            <h5 className="mb-0">Nuevo administrador o empleado</h5>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleCreate}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Nombre de usuario *</label>
                  <input
                    className="form-control"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    placeholder="ej. juan"
                    required
                  />
                  <small className="text-muted">Se usará para iniciar sesión.</small>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Nombre completo *</label>
                  <input
                    className="form-control"
                    value={form.display_name}
                    onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                    placeholder="ej. Juan Pérez"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Contraseña *</label>
                  <input
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Rol</label>
                  <select
                    className="form-select"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                  >
                    <option value="employee">Empleado</option>
                    <option value="admin">Administrador</option>
                  </select>
                  <small className="text-muted">
                    {form.role === 'admin'
                      ? 'Puede administrar productos, stock y ver historial completo.'
                      : 'Ve productos, stock e historial. No puede crear usuarios.'}
                  </small>
                </div>
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Creando...' : 'Crear usuario'}
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
            {users.length} usuario{users.length !== 1 ? 's' : ''}
          </h5>
        </div>
        <div className="admin-card-body p-0">
          {users.length === 0 ? (
            <p className="text-muted p-3 mb-0">No hay usuarios registrados.</p>
          ) : (
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Creado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td><code>{u.username}</code></td>
                      <td>{u.display_name}</td>
                      <td>
                        <span className={'badge ' + (u.role === 'owner' ? 'bg-primary' : u.role === 'admin' ? 'bg-info' : 'bg-secondary')}>
                          {roleLabel(u.role)}
                        </span>
                      </td>
                      <td>{new Date(u.created_at).toLocaleDateString('es-AR')}</td>
                      <td>
                        {u.role !== 'owner' && u.id !== profile?.id && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(u)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </td>
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

export default Users;