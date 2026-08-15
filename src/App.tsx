import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import NotFound from './pages/NotFound';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import Stock from './pages/admin/Stock';
import History from './pages/admin/History';
import Users from './pages/admin/Users';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const AppRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/productos" element={<AdminLayout><AdminProducts /></AdminLayout>} />
        <Route path="/admin/stock" element={<AdminLayout><Stock /></AdminLayout>} />
        <Route path="/admin/historial" element={<AdminLayout><History /></AdminLayout>} />
        <Route path="/admin/usuarios" element={<AdminLayout><Users /></AdminLayout>} />
      </Routes>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
