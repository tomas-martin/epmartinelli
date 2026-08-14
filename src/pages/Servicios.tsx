import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { SERVICES, FAQ } from '../data/siteData';
import { useState } from 'react';

const Servicios = () => {
  const [openFaq, setOpenFaq] = useState<string>('faq1');

  return (
    <div>
      <Breadcrumb title="Nuestros Servicios" current="Servicios" />

      <main className="page-content">
        {/* Listado de servicios */}
        <div className="provide-area section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 ml-auto mr-auto">
                <div className="section-title-two">
                  <h2>Lo que <span>ofrecemos</span></h2>
                  <p>
                    Brindamos soluciones integrales para el pesaje industrial, desde la venta
                    y el servicio técnico hasta la calibración y certificación de equipos.
                  </p>
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
                    <h5 className="provide-title">{service.title}</h5>
                    <div className="provide-contets">
                      <p>{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Por qué elegirnos */}
        <div className="about-us-area section-ptb bg-light-grey">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about-us-content">
                  <div className="about-section-title text-left">
                    <h4>NUESTRO ENFOQUE</h4>
                    <h2>
                      Soluciones <span>ágiles</span> y compromiso <span>permanente</span>
                    </h2>
                  </div>
                  <p>
                    Sabemos de la importancia de la continuidad en los procesos productivos.
                    Por eso nos aseguramos de brindar respuestas rápidas, presenciales y de
                    calidad.
                  </p>
                  <p>
                    Cada intervención queda registrada para garantizar la trazabilidad del
                    historial de cada equipo, dándole a nuestros clientes la tranquilidad de
                    contar con información documentada.
                  </p>
                  <Link to="/contacto" className="default-btn" style={{ marginTop: 16 }}>
                    Solicitar servicio
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-us-image">
                  <img src="/assets/images/propias/soporte_tecnico.png" alt="Servicio técnico" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="frequently-ask-questions-area section-ptb">
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
                <div className="faq-style-wrap">
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
                        <div className="collapse show">
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
                      src="/assets/images/propias/calibrar.jpg"
                      alt="Calibración"
                      className="faq-inner-01"
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
};

export default Servicios;
