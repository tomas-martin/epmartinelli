import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const Nosotros = () => (
  <div>
    <Breadcrumb title="Nosotros" current="Nosotros" />

    <main className="page-content">
      {/* Quiénes somos */}
      <div className="about-us-area section-ptb">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-us-content">
                <div className="about-section-title text-left">
                  <h4>QUIENES SOMOS</h4>
                  <h2>
                    Somos una empresa joven, <span>dinámica</span> y{' '}
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
                  trabajo que nos inspiren a dar lo mejor, desarrollando junto a nuestros
                  clientes redes de trabajo sólidas con el fin de crear vínculos comunes y
                  duraderos.
                </p>
                <p>
                  Nuestro propósito es posicionarnos como una empresa líder en la industria,
                  donde la atención personalizada, la calidad de los servicios brindados y el
                  compromiso con nuestros clientes nos hagan ser un referente en el sector.
                </p>
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

      {/* Valores / Diferenciales */}
      <div className="about-us-area section-ptb bg-light-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 ml-auto mr-auto">
              <div className="section-title">
                <h4>POR QUÉ ELEGIRNOS</h4>
                <h2>Nuestros <span>diferenciales</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service mt--35">
                <h3>Atención personalizada</h3>
                <p>
                  Trabajamos junto al cliente para entender sus necesidades y brindar
                  soluciones adecuadas a cada proceso.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service mt--35">
                <h3>Calidad y trazabilidad</h3>
                <p>
                  Ofrecemos historial y trazabilidad de los servicios realizados en cada
                  equipo, acompañando cada intervención con documentación.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service mt--35">
                <h3>Compromiso continuo</h3>
                <p>
                  Entendemos la importancia de la continuidad productiva. Por eso brindamos
                  respuestas rápidas y soluciones duraderas.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service mt--35">
                <h3>Certificaciones oficiales</h3>
                <p>
                  Realizamos calibraciones con pesos patrón certificados por INTI y
                  acreditados en OAA para normas de calidad.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service mt--35">
                <h3>Cobertura completa</h3>
                <p>
                  Desde equipos de laboratorio hasta básculas industriales, cubrimos toda
                  la cadena de pesaje.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service mt--35">
                <h3>Experiencia en la industria</h3>
                <p>
                  Conocemos los procesos productivos y los desafíos que implican. Eso nos
                  permite acompañar a nuestros clientes con criterio técnico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galería rápida */}
      <div className="work-gallery-area section-ptb">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 ml-auto mr-auto">
              <div className="section-title">
                <h2>Nuestro <span>trabajo</span></h2>
              </div>
            </div>
          </div>
          <div className="row no-gutters">
            {[
              '/assets/images/propias/wsp2.jpg',
              '/assets/images/propias/trabajo4.jpg',
              '/assets/images/propias/trabajo2.jpg',
              '/assets/images/propias/trabajo1.jpg',
            ].map((img, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="gallery-box">
                  <img src={img} alt={`Trabajo ${i + 1}`} style={{ width: '100%', display: 'block', height: 250, objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="row mt--50">
            <div className="col-12 text-center">
              <Link to="/contacto" className="primary-btn">Contactanos</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Nosotros;
