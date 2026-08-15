import { Link } from 'react-router-dom';
import { COMPANY, SERVICES } from '../data/siteData';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-area bg-light-grey section-pt">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-top pt--80 pb--120">
              <div className="row">

                {/* Logo */}
                <div className="col-lg-3 col-md-6">
                  <div className="footer-info mt--40">
                    <div className="footer-logo">
                      <Link to="/">
                        <img src="/assets/images/logo/logo.png" alt={COMPANY.name} />
                      </Link>
                    </div>
                    <p className="footer-text-info" />
                  </div>
                </div>

                {/* Servicios */}
                <div className="col-lg-3 col-md-6">
                  <div className="footer-info mt--60">
                    <div className="footer-title">
                      <h3>SERVICIOS</h3>
                    </div>
                    <ul className="footer-list">
                      {SERVICES.map((s) => (
                        <li key={s.title}>
                          <Link to="/servicios">{s.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contacto */}
                <div className="col-lg-3 col-md-6">
                  <div className="footer-info mt--60">
                    <div className="footer-title">
                      <h3>CONTACTO</h3>
                    </div>
                    <ul className="footer-list">
                      <li>{COMPANY.location}</li>
                      <li>
                        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                      </li>
                      <li>
                        <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
                      </li>
                      <li>
                        <a href="https://wa.me/${COMPANY.phone}" target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-whatsapp" style={{ color: '#25D366' }} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Redes */}
                <div className="col-lg-3 col-md-6">
                  <div className="footer-info mt--60">
                    <div className="footer-title">
                      <h3>REDES SOCIALES</h3>
                    </div>
                    <ul className="social">
                      <li>
                        <a href="#" aria-label="Facebook">
                          <i className="bi bi-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="Instagram">
                          <i className="bi bi-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="YouTube">
                          <i className="bi bi-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className="footer-bottom">
              <div className="row">
                <div className="col-lg-12">
                  <div className="footer-bottom-inner text-center">
                    <p>
                      Copyright &copy; {year} <a href="#">{COMPANY.copyright}</a>. Todos los derechos reservados.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-footer-btn">
              <a href="/admin" className="btn btn-sm btn-outline-secondary mt-3">
                <i className="bi bi-shield-check"></i> Panel Admin
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
