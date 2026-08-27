import styles from './Works.module.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

/*
  span: cuántas columnas ocupa la card en el grid de 3 cols.
  size: controla variaciones de padding/tipografía — 'lg' | 'md' | 'sm'.
  status: badge opcional (en desarrollo, live, etc.)
*/
const WORKS = [
    {
        id: '01',
        category: 'Frontend · Dev Tools',
        title: 'Portfolio Personal',
        description:
            'Este mismo sitio. Diseñado y construido desde cero con React y Vite, usando CSS Modules para mantener estilos aislados por componente. Enfocado en tipografía limpia, paleta oscura y progresión visual consistente entre secciones.',
        stack: ['React', 'Vite', 'CSS Modules', 'JavaScript'],
        github: 'https://github.com/facusilva03',
        live: null,
        span: 2,
        size: 'lg',
        status: null,
    },
    {
        id: '02',
        category: 'Web · Gastronomía',
        title: 'DeleitarTE',
        description:
            'Sitio web para un espacio de tardes de té. Actualmente en reestructuración: nueva arquitectura con PHP en el backend, JavaScript para la interacción del lado cliente y gestión de dependencias con Composer.',
        stack: ['PHP', 'JavaScript', 'Composer', 'HTML / CSS'],
        github: 'https://github.com/facusilva03',
        live: null,
        span: 1,
        size: 'md',
        status: 'En reestructuración',
    },
    {
        id: '03',
        category: 'Gestión · Logística',
        title: 'LogiTrack',
        description:
            'Sistema de gestión de cadena logística terrestre desarrollado en PHP puro con arquitectura MVC y MariaDB. Maneja envíos, viajes, choferes y clientes con 4 roles distintos, trazabilidad de estados y GPS, stored procedures y triggers de auditoría. Seguridad reforzada con prepared statements, sesiones con timeout y baja lógica en todos los CRUD.',
        stack: ['PHP', 'MariaDB', 'PDO', 'MVC', 'SQL'],
        github: 'https://github.com/facusilva03/LOGITRACK',
        live: null,
        span: 2,
        size: 'md',
        status: null,
    },
    {
        id: '04',
        category: 'Gestión · Fintech',
        title: 'Sistema de Préstamos',
        description:
            'Aplicación de escritorio/local para gestionar préstamos personales con amortización francesa, pensada para reemplazar una planilla de Excel/VBA. Construida con Django y SQLite, con vista de cobranza para marcar cuotas pagadas, backups automáticos y cálculo financiero exacto usando Decimal en vez de floats.',
        stack: ['Python', 'Django', 'SQLite', 'Tailwind CSS'],
        github: 'https://github.com/facusilva03/SISTEMA-PRESTAMOS-',
        live: null,
        span: 1,
        size: 'md',
        status: null,
    },
];

const Works = () => {
    return (
        <section className={styles.worksSection} id="works">

            <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Lo que construí</p>
                <h2 className={styles.sectionTitle}>Works</h2>
            </div>

            <div className={styles.grid}>
                {WORKS.map((work) => (
                    <article
                        key={work.id}
                        className={`${styles.card} ${styles[`span${work.span}`]} ${styles[`size${work.size.charAt(0).toUpperCase() + work.size.slice(1)}`]}`}
                    >
                        {/* Fila superior: número + badge de estado */}
                        <div className={styles.cardTop}>
                            <span className={styles.cardNumber}>{work.id}</span>
                            {work.status && (
                                <span className={styles.statusBadge}>{work.status}</span>
                            )}
                        </div>

                        {/* Categoría */}
                        <p className={styles.cardCategory}>{work.category}</p>

                        {/* Título */}
                        <h3 className={styles.cardTitle}>{work.title}</h3>

                        {/* Descripción */}
                        <p className={styles.cardDesc}>{work.description}</p>

                        {/* Stack */}
                        <div className={styles.stackRow}>
                            {work.stack.map((tech) => (
                                <span key={tech} className={styles.stackPill}>{tech}</span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className={styles.linksRow}>
                            {work.github && (
                                <a
                                    href={work.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.linkBtn}
                                >
                                    <FaGithub size={13} />
                                    <span>GitHub</span>
                                </a>
                            )}
                            {work.live && (
                                <a
                                    href={work.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`${styles.linkBtn} ${styles.linkBtnLive}`}
                                >
                                    <FaExternalLinkAlt size={11} />
                                    <span>Live</span>
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>

        </section>
    );
};

export default Works;
