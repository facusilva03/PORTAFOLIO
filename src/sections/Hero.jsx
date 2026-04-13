import styles from './Hero.module.css';
import photoProfile from '../assets/facundo-profile.png';
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

                <div className={styles.contactInfo}>
                    <span>+54 2616152411</span>
                    <span>facusilva2003@gmail.com</span>
                </div>
            </div>

            {/* ── COLUMNA DERECHA: foto con efecto offset ── */}
            <div className={styles.imageContainer}>

                {/*
                    offsetWrap es el "padre relativo" (position: relative).
                    Dentro viven DOS hijos con position: absolute:
                      1. offsetBorder  → el rectángulo violeta, desplazado
                      2. offsetPhoto   → la foto encima, en la posición 0,0
                    El padre necesita dimensiones explícitas porque sus hijos
                    están fuera del flujo normal (absolute), así que no lo expanden.
                */}
                <div className={styles.offsetWrap}>

                    {/* Borde decorativo: solo tiene un border, sin fondo.
                        Está desplazado 12px hacia abajo y a la derecha
                        para crear la ilusión de profundidad. */}
                    <div className={styles.offsetBorder}></div>

                    {/* Foto: encima del borde, en la esquina superior izquierda.
                        object-fit: cover hace que la imagen llene el contenedor
                        sin deformarse, recortando los bordes si es necesario. */}
                    <img
                        src={photoProfile}
                        alt="Facundo Silva"
                        className={styles.offsetPhoto}
                    />
                </div>
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
