import Terminal from '../components/Terminal';
import styles from './Hero.module.css';

/* El nombre entra letra por letra. Las letras son aria-hidden y el <h1>
   lleva el nombre completo en aria-label, para que un lector de pantalla no
   deletree "F, A, C, U…". */
const Nombre = ({ texto, desde = 0, clase = '' }) => (
    <span className={`${styles.fila} ${clase}`} aria-hidden="true">
        {[...texto].map((letra, i) => (
            <span key={i} className={styles.letra} style={{ '--i': desde + i }}>
                {letra}
            </span>
        ))}
    </span>
);

const Hero = () => (
    <section id="home" className={styles.hero}>
        <div className={styles.contenedor}>
            <div>
                <p className={styles.eyebrow}>Software Developer focused on Systems &amp; Security</p>

                <h1 className={styles.nombre} aria-label="Facundo Silva">
                    <Nombre texto="FACUNDO" />
                    <Nombre texto="SILVA." desde={7} clase={styles.apellido} />
                </h1>

                <p className={styles.lead}>
                    Estudio Sistemas y Ciberseguridad. Tengo un sistema de préstamos{' '}
                    <b>en producción</b> y <b>audito mi propio código</b>.
                </p>

                <div className={styles.acciones}>
                    <a href="#contact" className={`${styles.boton} ${styles.principal}`}>
                        Contacto <span aria-hidden="true">→</span>
                    </a>
                    <a href="/cv-facundo-silva.pdf" download className={styles.boton}>
                        Descargar CV
                    </a>
                </div>

                {/* Solo el email: el teléfono personal en un sitio público e
                    indexable es un vector de spam e ingeniería social. */}
                <p className={styles.mail}>facusilva2003@gmail.com</p>
            </div>

            <Terminal />
        </div>
    </section>
);

export default Hero;
