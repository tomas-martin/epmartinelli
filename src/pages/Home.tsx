import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, PRODUCTS, FAQ, GALLERY_IMAGES } from '../data/siteData';

const Home = () => {
  const [openFaq, setOpenFaq] = useState<string>('faq1');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryAutoplay, setGalleryAutoplay] = useState(true);
  const touchStartX = useRef(0);

  const goNext = () => setGalleryIndex((i) => (i + 1) % GALLERY_IMAGES.length);
  const goPrev = () => setGalleryIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  useEffect(() => {
    if (!galleryAutoplay) return;
    const id = setInterval(goNext, 4500);
    return () => clearInterval(id);
  }, [galleryAutoplay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) goPrev();
    else if (diff < -50) goNext();
  };

  return (
    <div>
      {/* Hero Slider */}
      <div
        className="hero-slider"
        style={{
          backgroundImage: 'url(/assets/images/slider/portada.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.45)',
          }}
        />
        <div className="single-slide">
          <div className="hero-content-one container" style={{ position: 'relative' }}>
            <div className="row">
              <div className="col-lg-10 ml-auto mr-auto">
                <div className="slider-text-info text-center">
                  <h1>
                    Soluciones <span>Ágiles</span> y Compromiso Permanente.
                  </h1>
                  <h3 className="text-white">
                    Sabemos de la importancia de la continuidad en los procesos productivos.
                  </h3>
                  <h2 className="text-white">Estamos en la industria</h2>
                  <div className="slider-button">
                    <a href="#nosotros" className="default-btn">Nosotros</a>
                    <a href="#contacto" className="primary-btn">Contacto</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiénes somos */}
      <div className="about-us-area section-ptb bg-light-grey" id="nosotros">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-us-content">
                <div className="about-section-title text-left">
                  <h4>QUIENES SOMOS</h4>
                  <h2>
                    Somos una empresa joven, <span>dinámica</span> y <br />
                    <span>comprometida</span>
                  </h2>
                </div>
                <p>
                  Nos dedicamos a la venta, reparación, mantenimiento y calibración de balanzas
                  y sistemas de pesaje.
                </p>
                <p>
                  Abarcamos equipos de alta precisión para laboratorios hasta básculas
                  industriales en todas sus capacidades.
                </p>
                <p>
                  Nuestra finalidad es conseguir un crecimiento continuo generando ambientes de
                  trabajo que nos inspiren a dar lo mejor, desarrollando junto a nuestros clientes
                  redes de trabajo sólidas con el fin de crear vínculos comunes y duraderos.
                </p>
                <p>
                  Nuestro propósito es posicionarnos como una empresa líder en la industria,
                  donde la atención personalizada, la calidad de los servicios brindados y el
                  compromiso con nuestros clientes nos hagan ser un referente en el sector.
                </p>
                <a href="#servicios" className="default-btn" style={{ marginTop: 16 }}>
                  Conocenos más
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-us-image">
                <img src="/assets/images/propias/wsp1.jpg" alt="E.P. Martinelli" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div className="provide-area section-ptb" id="servicios">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 ml-auto mr-auto">
              <div className="section-title">
                <h2>NUESTROS <span>SERVICIOS</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            {SERVICES.map((service) => (
              <div key={service.title} className="col-lg-4 col-md-6 col-12">
                <div className="provide-service mt--30">
                  <div className="provide-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <h5 className="provide-title">
                    {service.title}
                  </h5>
                  <div className="provide-contets">
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className="products-area section-ptb" id="products">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 ml-auto mr-auto">
              <div className="section-title">
                <h4>NUESTROS PRODUCTOS</h4>
                <h2>
                  Soluciones de <span>pesaje</span> para cada necesidad
                </h2>
                <p>
                  Contamos con distintas soluciones de pesaje para laboratorios, comercios e
                  industrias. Consultanos por disponibilidad, capacidades y opciones según tu
                  aplicación.
                </p>
              </div>
            </div>
          </div>
          <div className="row mt--30">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 mt--30">
                <div className={`product-card${product.highlight ? ' product-card-highlight' : ''}`}>
                  <div className="product-card-icon">
                    <span>{product.number}</span>
                  </div>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <Link to={product.href}>
                    {product.cta} <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt--50">
            <div className="col-lg-12 text-center">
              <Link to="/productos" className="primary-btn">
                Ver catálogo de productos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="frequently-ask-questions-area section-pt section-pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 ml-auto mr-auto">
              <div className="section-title">
                <h2>PREGUNTAS<span> FRECUENTES</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="faq-style-wrap" id="faq-five">
                {FAQ.map((item) => (
                  <div key={item.id} className="panel panel-default">
                    <div className="panel-heading bg-gray">
                      <h4 className="panel-title">
                        <a
                          role="button"
                          className={openFaq === item.id ? '' : 'collapsed'}
                          onClick={() => setOpenFaq(openFaq === item.id ? '' : item.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <span className="button-faq" /> {item.question}
                        </a>
                      </h4>
                    </div>
                    {openFaq === item.id && (
                      <div className="collapse show" role="tabpanel">
                        <div className="panel-body">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-inner-image">
                <div className="faq-inner-image-box">
                  <img
                    src="/assets/images/propias/wsp3.jpg"
                    alt="Calibración"
                    className="faq-inner-01"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galería de trabajos */}
      <div className="work-gallery-area section-pt bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 ml-auto mr-auto">
              <div className="section-title">
                <h2>EPMartinelli <span>TRABAJOS</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 ml-auto mr-auto">
              <div
                className="gallery-carousel"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setGalleryAutoplay(false)}
                onMouseLeave={() => setGalleryAutoplay(true)}
              >
                <div
                  className="gallery-carousel-track"
                  style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
                >
                  {GALLERY_IMAGES.map((img, i) => (
                    <div className="gallery-carousel-slide" key={i}>
                      <img src={img} alt={`Trabajo ${i + 1}`} />
                    </div>
                  ))}
                </div>

                <button
                  className="gallery-arrow gallery-arrow-prev"
                  onClick={goPrev}
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <button
                  className="gallery-arrow gallery-arrow-next"
                  onClick={goNext}
                  aria-label="Siguiente"
                >
                  ›
                </button>

                <div className="gallery-counter">
                  {galleryIndex + 1} / {GALLERY_IMAGES.length}
                </div>

                <div className="gallery-dots">
                  {GALLERY_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={i === galleryIndex ? 'active' : ''}
                      aria-label={`Imagen ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
