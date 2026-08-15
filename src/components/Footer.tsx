import { Link } from 'react-router-dom';
import { COMPANY, SERVICES } from '../data/siteData';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-area bg-light-grey section-pt" id="contacto">
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
                          <Link to="/#servicios">{s.title}</Link>
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
                        <a href={`https://wa.me/${COMPANY.phone}`} target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-whatsapp" style={{ color: '#25D366' }} /> {COMPANY.phone}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Contacto rápido */}
                <div className="col-lg-3 col-md-6">
                  <div className="footer-info mt--60">
                    <div className="footer-title">
                      <h3>CONTACTANOS</h3>
                    </div>
                    <ul className="social">
                      <li>
                        <a href={`mailto:${COMPANY.email}`} aria-label="Email">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-10 6L2 7" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://wa.me/${COMPANY.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className="footer-bottom">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-12">
                  <div className="footer-bottom-inner text-center">
                    <p>
                      Copyright &copy; {year} <a href="#">{COMPANY.copyright}</a>. Todos los derechos reservados.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="footer-bottom-admin text-end">
                    <Link to="/admin" className="btn btn-sm mt-3">
                      <i className="bi bi-shield-check" style={{ color: '#42b6f5' }} /> Panel Admin
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin button now inside footer-bottom, removed separate div */}

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
