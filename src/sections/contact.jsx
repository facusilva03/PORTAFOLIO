import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './contact.module.css';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

emailjs.sendForm(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  formRef.current,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        formRef.current.reset();
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <section id="contact" className={styles.contact}>

      <div className={styles.header}>
        <span className={styles.eyebrow}>Contacto</span>
        <h2 className={styles.title}>Hablemos</h2>
      </div>

      <div className={styles.card}>

        {/* Panel izquierdo */}
        <div className={styles.left}>

          <div className={styles.badge}>
            <span className={styles.dot}></span>
            Disponible para proyectos
          </div>

          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>&lt;24h</span>
              <span className={styles.statLabel}>Tiempo de respuesta</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>2</span>
              <span className={styles.statLabel}>Proyectos activos</span>
            </div>
          </div>

          <hr className={styles.divider} />

          <div className={styles.emailBlock}>
            <span className={styles.emailLabel}>Email directo</span>
            <a href="mailto:facusilva03@gmail.com" className={styles.emailValue}>
              facusilva03@gmail.com
            </a>
          </div>

          <div className={styles.socials}>
            <a
              href="https://github.com/facusilva03"
              target="_blank"
              rel="noreferrer"
              className={styles.pill}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/facundo-silva-33a4b6342/"
              target="_blank"
              rel="noreferrer"
              className={styles.pill}
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/facu_silva/"
              target="_blank"
              rel="noreferrer"
              className={styles.pill}
            >
              Instagram
            </a>
          </div>

        </div>

        {/* Formulario derecho */}
        <div className={styles.right}>
          <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.field}>
              <label className={styles.label}>Nombre</label>
              <input
                type="text"
                name="from_name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="from_email"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tipo de servicio</label>
              <select name="service_type" className={styles.input} required>
                <option value="">Seleccioná una opción</option>
                <option value="APIs & Lógica de negocio">APIs &amp; Lógica de negocio</option>
                <option value="Diseño de bases de datos">Diseño de bases de datos</option>
                <option value="Seguridad en aplicaciones web">Seguridad en aplicaciones web</option>
                <option value="Aplicación web completa">Aplicación web completa</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Mensaje</label>
              <textarea
                name="message"
                className={styles.textarea}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar mensaje'}
            </button>

            {success && (
              <p className={styles.msgSuccess}>
                ¡Mensaje enviado! Te respondo en menos de 24hs.
              </p>
            )}
            {error && (
              <p className={styles.msgError}>
                Hubo un error. Intentá de nuevo o escribime directo.
              </p>
            )}

          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
