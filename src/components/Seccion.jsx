import Reveal from './Reveal';
import styles from './Seccion.module.css';

/* Marco común de cada sección: el eyebrow numerado y el título grande. */
const Seccion = ({ id, eyebrow, titulo, children }) => (
    <section id={id} className={styles.seccion}>
        <div className={styles.contenedor}>
            <Reveal as="p" className={styles.eyebrow}>{eyebrow}</Reveal>
            <Reveal as="h2" retraso={0.08} className={styles.titulo}>{titulo}</Reveal>
            {children}
        </div>
    </section>
);

export default Seccion;
