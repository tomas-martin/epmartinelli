import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Inicio', icon: 'bi bi-house' },
  { to: '/admin/productos', label: 'Productos', icon: 'bi bi-box' },
  { to: '/admin/stock', label: 'Stock', icon: 'bi bi-archive' },
  { to: '/admin/historial', label: 'Historial', icon: 'bi bi-clock-history' },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const { profile, signOut } = useAuth();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h5>Panel Admin</h5>
      </div>
      <nav className="admin-sidebar-nav">
        <ul>
          {NAV_ITEMS.map((item) => (
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
        <div className="admin-user-info">
          <i className="bi bi-person-circle"></i>
          <div>
            <strong>{profile?.display_name}</strong>
            <small>{profile?.role === 'owner' ? 'Dueño' : 'Empleado'}</small>
          </div>
        </div>
        <button className="btn btn-sm btn-outline-light w-100 mt-2" onClick={signOut}>
          <i className="bi bi-box-arrow-right"></i> Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;