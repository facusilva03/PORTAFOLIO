import react from 'react';
import styles from './hero.module.css';
import photoProfile from '../assets/facundo-profile.png';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className={styles.heroContainer} id="home">

            <div className={styles.content}>
                <p className={styles.introText}>MY NAME IS </p>
                <h1 className={styles.name}>FACUNDO<span className={styles.lastName}>SILVA</span>
                </h1>
                <p className={styles.description}>
                    Full Stack Developer based in Argentina.
                    Transforming ideas into digital reality.
                </p>

                <button className={styles.ctaButton}>Contacto</button>

                <div className={styles.contactInfo}>
                    <span>+54 2616152411</span>
                    <span>facusilva2003@gmail.com</span>
                </div>
            </div>

            <div className={styles.imageContainer}>

                <div className={styles.heroCircle}></div>

                <img src={photoProfile} alt="Facundo Silva" className={styles.profileImage}/>

            </div>

            <div className={styles.socialBar}>

                <div className={styles.socialLine}></div>



                <a href="https://www.instagram.com/facu_silva/" target='_blank' className={styles.socialIcon}>
                    <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/facundo-silva-33a4b6342/" target='_blank' className={styles.socialIcon}>
                    <FaLinkedin />
                </a>
                <a href="https://github.com/facusilva03" target='_blank' className={styles.socialIcon}>
                    <FaGithub />
                </a>

            <div className={styles.socialLine}></div>
            </div>

        </section>
    );
}

export default Hero;
