import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/siteData';

const Productos = () => (
  <div>
    <main className="page-content">
      {/* Intro Header Banner */}
      <div className="product-catalog-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 ml-auto mr-auto text-center">
              <div className="product-catalog-intro">
                <span className="product-catalog-badge">CATÁLOGO DE PRODUCTOS</span>
                <h1>
                  Soluciones de <span>Pesaje</span> Industrial y Precisión
                </h1>
                <p>
                  Equipos de alta confiabilidad para laboratorios, comercios e industrias.
                  La disponibilidad, capacidad y configuración se definen a la medida de tus procesos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catálogo Grid */}
      <div className="product-catalog-area section-ptb">
        <div className="container">
          <div className="row d-flex align-items-stretch">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 col-12 d-flex align-items-stretch mb--30" id={product.id}>
                <div className={`product-catalog-item${product.highlight ? ' product-card-highlight' : ''}`}>
                  <div className="product-card-top">
                    <div className="product-card-icon">
                      <i className={`bi ${product.icon}`}></i>
                    </div>
                    <span className="product-card-number">{product.number}</span>
                  </div>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <ul className="product-item-features">
                    {product.items.map((item) => (
                      <li key={item}>
                        <i className="bi bi-check2-circle"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-card-cta-btn"
                  >
                    <i className="bi bi-whatsapp"></i> {product.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA inferior de Asesoramiento */}
      <div className="product-cta-banner-area section-pb-90">
        <div className="container">
          <div className="product-cta-card">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="product-cta-content">
                  <span className="product-cta-badge">ASESORAMIENTO TÉCNICO</span>
                  <h2>¿No encontrás el equipo que <span>necesitás</span>?</h2>
                  <p>
                    Contamos con acceso a una amplia gama de soluciones de pesaje.
                    Contanos tu aplicación y te ayudamos a seleccionar el equipo ideal o evaluar tus balanzas actuales.
                  </p>
                  <div className="product-cta-actions">
                    <a
                      href="https://wa.me/2613463459?text=Hola,%20necesito%20asesoramiento%20sobre%20un%20equipo%20de%20pesaje"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="primary-btn"
                    >
                      <i className="bi bi-whatsapp"></i> Hablar con un Asesor
                    </a>
                    <Link to="/#contacto" className="default-btn">
                      Enviar Mensaje
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="product-cta-image">
                  <img
                    src="/assets/images/propias/asesoramiento.jpg"
                    alt="Asesoramiento técnico en pesaje"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Productos;
