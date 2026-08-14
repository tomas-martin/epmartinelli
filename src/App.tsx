import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/"          element={<Home />} />
      <Route path="/nosotros"  element={<Nosotros />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/contacto"  element={<Contacto />} />
      <Route path="*"          element={<NotFound />} />
    </Routes>
    <Footer />
  </>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
