import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/siteData';

const Productos = () => (
  <div>
    <main className="page-content">
      {/* Intro */}
      <div className="breadcrumb-area section-ptb bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 ml-auto mr-auto text-center">
              <div className="section-title product-catalog-intro">
                <h4>CATÁLOGO</h4>
                <h2>Nuestros <span>productos</span></h2>
                <p>
                  Soluciones de pesaje para diferentes aplicaciones. La disponibilidad,
                  capacidad y configuración se define según las necesidades de cada cliente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catálogo */}
      <div className="product-catalog-area section-ptb">
        <div className="container">
          <div className="row">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 mb--30" id={product.id}>
                <div className={`product-catalog-item${product.highlight ? ' product-card-highlight' : ''}`}>
                  <div className="product-card-icon">
                    <i className={`bi ${product.icon}`}></i>
                  </div>
                  <span className="product-card-number">{product.number}</span>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <ul>
                    {product.items.map((item) => (
                      <li key={item}>
                        <i className="bi bi-check-circle"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to={product.href} className="default-btn product-card-cta">
                    {product.cta}
                    <i className="bi bi-arrow-right-rounded"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA inferior */}
      <div className="about-us-area section-ptb bg-light-grey">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-us-content">
                <div className="about-section-title text-left">
                  <h4>ASESORAMIENTO</h4>
                  <h2>¿No encontrás lo que <span>necesitás</span>?</h2>
                </div>
                <p>
                  Contamos con acceso a una amplia gama de equipos y soluciones de pesaje.
                  Si no encontrás el producto que buscás en nuestro catálogo, contanos tu
                  aplicación y te orientamos.
                </p>
                <p>
                  También podemos evaluar el estado de tus equipos actuales y recomendarte
                  la mejor alternativa según tu proceso productivo.
                </p>
                <Link to="/#contacto" className="default-btn" style={{ marginTop: 16 }}>
                  Consultar ahora
                  <i className="bi bi-arrow-right-rounded"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-us-image">
                <img
                  src="/assets/images/propias/asesoramiento.jpg"
                  alt="Asesoramiento"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Productos;
