import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, SERVICES, PRODUCTS, FAQ, GALLERY_IMAGES } from '../data/siteData';

const Home = () => {
  const [openFaq, setOpenFaq] = useState<string>('faq1');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      const res = await fetch('http://www.epmartinelli.com.ar/mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      setContactStatus(res.ok ? 'success' : 'error');
    } catch {
      setContactStatus('error');
    }
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
        </div>
        <div className="banner-area">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-lg-12">
                {/* Galería simple con navegación */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <div
                    style={{
                      display: 'flex',
                      transition: 'transform 0.4s ease',
                      transform: `translateX(-${galleryIndex * 100}%)`,
                    }}
                  >
                    {GALLERY_IMAGES.map((img, i) => (
                      <div
                        key={i}
                        style={{ minWidth: '100%', height: 400, overflow: 'hidden' }}
                      >
                        <img
                          src={img}
                          alt={`Trabajo ${i + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Botones de navegación */}
                  <button
                    onClick={() => setGalleryIndex((galleryIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
                    style={navBtnStyle('left')}
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setGalleryIndex((galleryIndex + 1) % GALLERY_IMAGES.length)}
                    style={navBtnStyle('right')}
                    aria-label="Siguiente"
                  >
                    ›
                  </button>
                  {/* Dots */}
                  <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
                    {GALLERY_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        style={{
                          width: 10, height: 10, borderRadius: '50%', border: 'none',
                          background: i === galleryIndex ? '#42b6f5' : 'rgba(255,255,255,0.6)',
                          cursor: 'pointer', padding: 0,
                        }}
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
    {/* Contacto */}
      <div className="contact-us-area section-ptb bg-light-grey" id="contacto">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 ml-auto mr-auto">
              <div className="section-title">
                <h4>CONTACTO</h4>
                <h2>Contactanos y <span>conversemos</span></h2>
                <p>
                  Completá el formulario y nos comunicamos a la brevedad. También podés
                  escribirnos por WhatsApp o llamarnos directamente.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt--50">
            <div className="col-lg-7">
              <div className="contact-form-warp">
                <form onSubmit={handleContactSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-box">
                        <input
                          type="text"
                          name="name"
                          placeholder="Nombre Completo *"
                          value={contactForm.name}
                          onChange={handleContactChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-box">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email *"
                          value={contactForm.email}
                          onChange={handleContactChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-box">
                        <textarea
                          name="message"
                          placeholder="Mensaje... *"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="contact-submit-btn">
                    <button type="submit" className="default-btn" disabled={contactStatus === 'sending'}>
                      {contactStatus === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>
                    {contactStatus === 'success' && (
                      <p className="form-messege" style={{ color: '#10c45c', marginTop: 10 }}>
                        ✓ Mensaje enviado correctamente. ¡Gracias!
                      </p>
                    )}
                    {contactStatus === 'error' && (
                      <p className="form-messege" style={{ color: '#e74c3c', marginTop: 10 }}>
                        Hubo un error al enviar. Escribinos directamente a{' '}
                        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="contact-info-wrap">
                <div className="single-contact-info">
                  <div className="contact-icon">
                    <i className="bi bi-map" />
                  </div>
                  <div className="contact-info-dec">
                    <h3>Ubicación</h3>
                    <p>{COMPANY.location}</p>
                  </div>
                </div>
                <div className="single-contact-info">
                  <div className="contact-icon">
                    <i className="bi bi-phone" />
                  </div>
                  <div className="contact-info-dec">
                    <h3>Teléfono</h3>
                    <p>
                      <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
                    </p>
                  </div>
                </div>
                <div className="single-contact-info">
                  <div className="contact-icon">
                    <i className="bi bi-envelop" />
                  </div>
                  <div className="contact-info-dec">
                    <h3>Email</h3>
                    <p>
                      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                    </p>
                  </div>
                </div>
                <div className="single-contact-info">
                  <div className="contact-icon">
                    <i className="bi bi-whatsapp" />
                  </div>
                  <div className="contact-info-dec">
                    <h3>WhatsApp</h3>
                    <p>
                      <a
                        href={`https://wa.me/${COMPANY.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {COMPANY.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const navBtnStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  [side]: 16,
  transform: 'translateY(-50%)',
  background: 'rgba(66,182,245,0.85)',
  border: 'none',
  color: '#fff',
  fontSize: 32,
  width: 44,
  height: 44,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
});

export default Home;
