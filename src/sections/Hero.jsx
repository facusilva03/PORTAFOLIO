import styles from './Hero.module.css';
import Terminal from '../components/Terminal';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className={styles.heroContainer} id="home">

            {/* ── COLUMNA IZQUIERDA: texto ── */}
            <div className={styles.content}>

                {/* Eyebrow: texto pequeño encima del nombre */}
                <p className={styles.introText}>Software Developer focused on Systems & Security</p>

                {/* Nombre principal: negro puro para máximo contraste */}
                <h1 className={styles.name}>
                    FACUNDO
                    {/* El apellido va en un <span> separado para poder darle
                        el color violeta sin afectar al resto del <h1> */}
                    <span className={styles.lastName}>SILVA.</span>
                </h1>

                <p className={styles.description}>
                    Transforming ideas into digital reality.
                    Based in Mendoza, Argentina.
                </p>

                <a href="#contact" className={styles.ctaButton}>Contacto</a>

                {/* Solo el email: el teléfono personal en un sitio público e
                    indexable es un vector de spam e ingeniería social. Para
                    contactarlo están el formulario y LinkedIn. */}
                <div className={styles.contactInfo}>
                    <span>facusilva2003@gmail.com</span>
                </div>
            </div>

            {/* ── COLUMNA DERECHA: terminal ──
                Antes había una foto de perfil. La terminal dice lo mismo que
                diría la foto ("este soy yo") pero además muestra en qué trabaja,
                sin ocupar más espacio. El borde violeta desplazado se conserva
                dentro del propio componente. */}
            <div className={styles.imageContainer}>
                <Terminal />
            </div>

            {/* ── BARRA LATERAL: íconos sociales ── */}
            <div className={styles.socialBar}>
                <div className={styles.socialLine}></div>

                <a href="https://www.instagram.com/facu_silva/" target='_blank' rel="noreferrer" className={styles.socialIcon}>
                    <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/facundo-silva-33a4b6342/" target='_blank' rel="noreferrer" className={styles.socialIcon}>
                    <FaLinkedin />
                </a>
                <a href="https://github.com/facusilva03" target='_blank' rel="noreferrer" className={styles.socialIcon}>
                    <FaGithub />
                </a>

                <div className={styles.socialLine}></div>
            </div>

        </section>
    );
};

export default Hero;
