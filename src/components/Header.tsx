import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY, NAV_LINKS } from '../data/siteData';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return location.pathname === '/';
    return location.pathname === href;
  };

  return (
    <header className="header-area inner-header">
      {/* Top bar */}
      <div className="header-top-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-info-top">
                <ul>
                  <li>
                    <a href={`mailto:${COMPANY.email}`}>
                      <i className="bi bi-envelop" /> {COMPANY.email}
                    </a>
                  </li>
                  <li>
                    <a href={`https://wa.me/${COMPANY.phone}`} target="_blank" rel="noopener noreferrer">
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
                  <div className="col-6 col-lg-3">
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

                  <div className="col-6 col-lg-9">
                    <div className="header-right-wrap">
                      <div className="main-menu">
                        <nav className="main-navigation">
                          <ul>
                            {NAV_LINKS.map((link) => (
                              <li
                                key={link.href}
                                className={isActive(link.href) ? 'active' : ''}
                              >
                                <Link to={link.href}>{link.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                      <div className="mobile-menu d-lg-none">
                        <button
                          className={`mobile-menu-toggle${mobileOpen ? ' open' : ''}`}
                          onClick={() => setMobileOpen(!mobileOpen)}
                          aria-label="Menú"
                          aria-expanded={mobileOpen}
                        >
                          <span />
                          <span />
                          <span />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {mobileOpen && (
                  <nav className="mobile-navigation d-lg-none">
                    <ul>
                      {NAV_LINKS.map((link) => (
                        <li
                          key={link.href}
                          className={isActive(link.href) ? 'active' : ''}
                        >
                          <Link to={link.href} onClick={() => setMobileOpen(false)}>
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
    </header>
  );
};

export default Header;