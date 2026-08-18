import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth, roleLabel } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Inicio', icon: 'bi bi-grid-1x2-fill', ownerOnly: false },
  { to: '/admin/productos', label: 'Productos', icon: 'bi bi-box-seam-fill', ownerOnly: false },
  { to: '/admin/stock', label: 'Stock', icon: 'bi bi-archive-fill', ownerOnly: false },
  { to: '/admin/historial', label: 'Historial', icon: 'bi bi-clock-history', ownerOnly: false },
  { to: '/admin/usuarios', label: 'Usuarios', icon: 'bi bi-people-fill', ownerOnly: true },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const { profile, signOut } = useAuth();

  const visibleItems = NAV_ITEMS.filter((item) => !item.ownerOnly || profile?.role === 'owner');

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h5>Panel Admin</h5>
      </div>
      <nav className="admin-sidebar-nav">
        <ul>
          {visibleItems.map((item) => (
            <li key={item.to} className={pathname === item.to ? 'active' : ''}>
              <NavLink to={item.to}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="admin-sidebar-footer">
        <Link to="/" className="btn-sidebar-home">
          <i className="bi bi-globe"></i>
          <span>Volver al sitio web</span>
        </Link>
        <div className="admin-user-info mt-2">
          <i className="bi bi-person-circle"></i>
          <div>
            <strong>{profile?.display_name}</strong>
            <small>{roleLabel(profile?.role)}</small>
          </div>
        </div>
        <button className="btn btn-sm w-100 mt-2" onClick={signOut} style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}>
          <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;