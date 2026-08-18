import { useState, type FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { signIn, user, profile } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user && profile) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const err = await signIn(username.trim(), password);
    if (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="text-center mb-2">
          <Link to="/" className="btn-back-home">
            <i className="bi bi-arrow-left"></i> Volver al sitio principal
          </Link>
        </div>

        <div className="admin-login-header">
          <img src="/assets/images/logo/logo.png" alt="E.P. Martinelli" />
          <h4>Panel de Administración</h4>
          <p className="text-muted small mb-0">Ingresá tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
                required
                autoFocus
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar al Panel'}
          </button>
        </form>

        <div className="text-center mt-4 pt-2 border-top">
          <Link to="/" className="text-decoration-none text-muted small">
            <i className="bi bi-house-door me-1"></i> Ir a la página de inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;