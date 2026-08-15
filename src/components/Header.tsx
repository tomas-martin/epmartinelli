import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY, NAV_LINKS } from '../data/siteData';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header-area inner-header">
      {/* Top bar */}
      <div className="header-top-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-7 col-12">
              <div className="contact-info-top">
                <ul>
                  <li>
                    <a href={`mailto:${COMPANY.email}`}>
                      <i className="bi bi-envelop" /> {COMPANY.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${COMPANY.phone}`}>
                      &nbsp;&nbsp;&nbsp;<i className="bi bi-phone" /> {COMPANY.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="header-bottom-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-bottom-wrap">
                <div className="row align-items-center">
                  <div className="col-lg-3">
                    <div className="logo-area">
                      <Link to="/">
                        <img src="/assets/images/logo/logo-big.png" alt={COMPANY.name} />
                      </Link>
                    </div>
                    <div className="logo-area-movil">
                      <Link to="/">
                        <img src="/assets/images/logo/logo.png" alt={COMPANY.name} />
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-9">
                    <div className="main-menu">
                      <nav className="main-navigation">
                        <ul>
                          {NAV_LINKS.map((link) => (
                            <li
                              key={link.href}
                              className={location.pathname === link.href ? 'active' : ''}
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className="col">
                    <div className="mobile-menu d-block d-lg-none">
                      <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                        aria-label="Menú"
                      >
                        <span style={{ display: 'block', width: 25, height: 2, background: '#fff', margin: '5px 0' }} />
                        <span style={{ display: 'block', width: 25, height: 2, background: '#fff', margin: '5px 0' }} />
                        <span style={{ display: 'block', width: 25, height: 2, background: '#fff', margin: '5px 0' }} />
                      </button>
                      {mobileOpen && (
                        <nav
                          style={{
                            position: 'absolute', top: '100%', left: 0, right: 0,
                            background: '#031b38', zIndex: 999, padding: '16px',
                          }}
                        >
                          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {NAV_LINKS.map((link) => (
                              <li key={link.href} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <Link
                                  to={link.href}
                                  style={{ color: '#fff', textDecoration: 'none' }}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;