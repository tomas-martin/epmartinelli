import { Link } from 'react-router-dom';

const NotFound = () => (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '60px 20px',
    }}
  >
    <h1 style={{ fontSize: 120, color: '#42b6f5', lineHeight: 1, margin: 0 }}>404</h1>
    <h2 style={{ marginTop: 16 }}>Página no encontrada</h2>
    <p style={{ color: '#666', maxWidth: 400, marginTop: 12 }}>
      La página que buscás no existe o fue removida.
    </p>
    <Link to="/" className="primary-btn" style={{ marginTop: 30 }}>
      Volver al inicio
    </Link>
  </div>
);

export default NotFound;
