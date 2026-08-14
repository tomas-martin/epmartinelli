import { useState } from 'react';
import type { FormEvent } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { COMPANY } from '../data/siteData';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const Contacto = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://www.epmartinelli.com.ar/mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <Breadcrumb title="Contacto" current="Contacto" />

      <main className="page-content">
        <div className="contact-page-map">
          <div className="contact-us-area box-contact">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="contact-us-inner">

                    {/* Formulario */}
                    <div className="contact-form-area">
                      <div className="contact-form-warp">
                        <div className="section-title-two" style={{ marginBottom: 30 }}>
                          <h2>Contactanos</h2>
                          <p>Completá el formulario y nos comunicamos a la brevedad.</p>
                        </div>

                        <form id="contact-form" onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="input-box">
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Nombre Completo *"
                                  value={form.name}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="input-box">
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email *"
                                  value={form.email}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-box">
                                <textarea
                                  name="message"
                                  placeholder="Mensaje... *"
                                  value={form.message}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="contact-submit-btn">
                            <button
                              type="submit"
                              className="default-btn"
                              disabled={status === 'sending'}
                            >
                              {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                            {status === 'success' && (
                              <p className="form-messege" style={{ color: '#10c45c', marginTop: 10 }}>
                                ✓ Mensaje enviado correctamente. ¡Gracias!
                              </p>
                            )}
                            {status === 'error' && (
                              <p className="form-messege" style={{ color: '#e74c3c', marginTop: 10 }}>
                                Hubo un error al enviar. Por favor escribinos directamente a{' '}
                                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
                              </p>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Info de contacto */}
                    <div className="contact-info-wrap" style={{ marginTop: 50 }}>
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="single-contact-info">
                            <div className="contact-icon">
                              <i className="bi bi-map" />
                            </div>
                            <div className="contact-info-dec">
                              <h3>Ubicación</h3>
                              <p>{COMPANY.location}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
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
                        </div>
                        <div className="col-lg-4 col-md-6">
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
                        </div>
                      </div>
                    </div>

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

export default Contacto;
