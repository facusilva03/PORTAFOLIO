import styles from './About.module.css';
import { FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaDownload, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const About = () => {
    return (
        <section className={styles.aboutSection} id="about">

            <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Quién soy</p>
                <h2 className={styles.sectionTitle}>About me</h2>
            </div>

            <div className={styles.columns}>

                {/* ── COLUMNA IZQUIERDA ── */}
                <div className={styles.colLeft}>

                    <div className={styles.avatar}>FS</div>
                    <h3 className={styles.name}>Facundo Silva</h3>
                    <p className={styles.role}>Software Dev · Security</p>

                    {/* Bloque 1: datos de contacto.
                        Sin teléfono: un número personal en un sitio público e
                        indexable es un vector de spam e ingeniería social, y
                        además no se puede dar de baja como un formulario.
                        Para contactarme están el email, el formulario y LinkedIn. */}
                    <div className={styles.contactItem}>
                        <div className={styles.contactIcon}><FaEnvelope size={10} /></div>
                        <span>facusilva2003@gmail.com</span>
                    </div>
                    <div className={styles.contactItem}>
                        <div className={styles.contactIcon}><FaMapMarkerAlt size={10} /></div>
                        <span>Mendoza, Argentina</span>
                    </div>
                    <div className={styles.contactItem}>
                        <div className={styles.contactIcon}><FaCalendarAlt size={10} /></div>
                        <span>22 años</span>
                    </div>

                    <div className={styles.leftDivider}></div>

                    {/*
                        Bloque 2: redes sociales como links.
                        Usan el mismo patrón visual que contactItem
                        pero son <a> con href reales y tienen hover
                        que ilumina el ícono — indica que son clickeables.
                        target="_blank" abre en nueva pestaña.
                        rel="noreferrer" es buena práctica de seguridad:
                        evita que la página destino acceda a window.opener.
                    */}
                    <a
                        href="https://github.com/facusilva03"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.socialItem}
                    >
                        <div className={styles.contactIcon}><FaGithub size={11} /></div>
                        <span>github.com/facusilva03</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/facundo-silva-33a4b6342/"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.socialItem}
                    >
                        <div className={styles.contactIcon}><FaLinkedin size={11} /></div>
                        <span>LinkedIn</span>
                    </a>
                    <a
                        href="https://www.instagram.com/facu_silva/"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.socialItem}
                    >
                        <div className={styles.contactIcon}><FaInstagram size={11} /></div>
                        <span>Instagram</span>
                    </a>

                    <div className={styles.leftDivider}></div>

                    <a 
                      href="/cv-facundo-silva.pdf" 
                      download="CURRICULUM VITAE.pdf"
                      className={styles.cvBtn}
                    >
                      Descargar CV <FaDownload size={10} />
                    </a>
                </div>

                {/* ── COLUMNA DERECHA ── */}
                <div className={styles.colRight}>

                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>2+</span>
                            <span className={styles.statLbl}>Años exp.</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>2</span>
                            {/* "Proyectos reales" se leía como una contradicción
                                con las 4 cards de Works. Son 2 los que están en
                                uso por otras personas; los otros dos son míos. */}
                            <span className={styles.statLbl}>Proyectos en uso real</span>
                        </div>
                    </div>

                    <div className={styles.bio}>
                        <p>Soy estudiante de Sistemas y Ciberseguridad, enfocado en el desarrollo de aplicaciones backend y el diseño de sistemas seguros.</p>
                        <p>Me interesa entender cómo funcionan los sistemas en profundidad, cómo se construyen y cómo pueden ser vulnerados, para luego diseñarlos de forma más robusta.</p>
                        {/* Esta frase decía "Actualmente trabajo con Node.js", y
                            ninguno de mis proyectos es Node: son Django y Laravel.
                            Lo que se afirma acá tiene que coincidir con lo que
                            muestran los proyectos, o la primera pregunta de una
                            entrevista lo desarma. */}
                        <p>Hoy trabajo con Python y Django —tengo un sistema en producción, en uso diario— y con PHP y Laravel, siempre sobre bases de datos relacionales. En paralelo estoy profundizando en Java y Go.</p>
                    </div>

                    <hr className={styles.divider} />

                    <p className={styles.timelineTitle}>Educación</p>

                    <div className={styles.timelineItem}>
                        <div className={styles.tlLeft}>
                            <div className={styles.tlDot}></div>
                            <div className={styles.tlLine}></div>
                        </div>
                        <div className={styles.tlBody}>
                            <p className={styles.tlDegree}>Lic. en Sistemas de Información</p>
                            <p className={styles.tlSchool}>Universidad Champagnat</p>
                            <p className={styles.tlDate}>2025 — Presente</p>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.tlLeft}>
                            <div className={styles.tlDot}></div>
                        </div>
                        <div className={styles.tlBody}>
                            <p className={styles.tlDegree}>Lic. en Ciberseguridad</p>
                            <p className={styles.tlSchool}>Universidad de Defensa Nacional (UNDEF)</p>
                            <p className={styles.tlDate}>2026 — Presente</p>
                        </div>
                    </div>

                    <blockquote className={styles.quoteBox}>
                        "Software Developer focused on Systems &amp; Security."
                    </blockquote>

                </div>
            </div>

        </section>
    );
};

export default About;
