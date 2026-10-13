import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Seccion from '../components/Seccion';
import Reveal from '../components/Reveal';
import styles from './contact.module.css';

const EMAIL = 'facusilva2003@gmail.com';

const Contact = () => {
    // 'idle' | 'enviando' | 'ok' | 'error': un solo estado en vez de tres
    // booleanos que se pueden contradecir.
    const [estado, setEstado] = useState('idle');
    const [copiado, setCopiado] = useState(false);

    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 1600);
        } catch {
            // Sin permiso de portapapeles el email igual está a la vista.
        }
    };

    const enviar = (e) => {
        e.preventDefault();
        // El formulario sale del evento: guardarlo antes del await, porque
        // currentTarget vuelve a ser null cuando el evento termina.
        const formulario = e.currentTarget;
        setEstado('enviando');

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formulario,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setEstado('ok');
                formulario.reset();
            })
            .catch(() => setEstado('error'));
    };

    return (
        <Seccion id="contact" eyebrow="05 · Contacto" titulo="Hablemos de tu sistema.">
            <div className={styles.columnas}>
                <Reveal className={styles.izquierda} retraso={0.1}>
                    <p className={styles.intro}>
                        Si tenés un proyecto, una pregunta sobre alguno de los que mostré, o querés
                        que revise algo, escribime.
                    </p>

                    <ul className={styles.vias}>
                        <li className={styles.via}>
                            <span>
                                <small>Email</small>
                                {EMAIL}
                            </span>
                            <button type="button" onClick={copiar}>
                                {copiado ? 'copiado ✓' : 'copiar'}
                            </button>
                        </li>
                        <li>
                            <a
                                className={styles.via}
                                href="https://www.linkedin.com/in/facundo-silva-33a4b6342/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span><small>LinkedIn</small>facundo-silva</span>
                                <span aria-hidden="true">↗</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.via}
                                href="https://github.com/facusilva03"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span><small>GitHub</small>facusilva03</span>
                                <span aria-hidden="true">↗</span>
                            </a>
                        </li>
                    </ul>
                </Reveal>

                <Reveal as="form" onSubmit={enviar} className={styles.form} retraso={0.18}>
                    <div className={styles.fila}>
                        <div className={styles.campo}>
                            <label htmlFor="from_name">Nombre</label>
                            <input id="from_name" type="text" name="from_name" autoComplete="name" required />
                        </div>
                        <div className={styles.campo}>
                            <label htmlFor="from_email">Email</label>
                            <input id="from_email" type="email" name="from_email" autoComplete="email" required />
                        </div>
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="service_type">Tipo de consulta</label>
                        <select id="service_type" name="service_type" required defaultValue="">
                            <option value="" disabled>Seleccioná una opción</option>
                            <option>Backend y lógica de negocio</option>
                            <option>Diseño de bases de datos</option>
                            <option>Seguridad en aplicaciones web</option>
                            <option>Aplicación web completa</option>
                            <option>Otra consulta</option>
                        </select>
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="message">Mensaje</label>
                        <textarea id="message" name="message" required />
                    </div>

                    <div className={styles.envio}>
                        <button type="submit" className={styles.enviar} disabled={estado === 'enviando'}>
                            {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'} <span aria-hidden="true">→</span>
                        </button>
                        <p className={styles.mensaje} role="status">
                            {estado === 'ok' && '¡Mensaje enviado! Te respondo a la brevedad.'}
                            {estado === 'error' && (
                                <span className={styles.error}>
                                    Hubo un error. Intentá de nuevo o escribime directo a {EMAIL}.
                                </span>
                            )}
                        </p>
                    </div>
                </Reveal>
            </div>
        </Seccion>
    );
};

export default Contact;
