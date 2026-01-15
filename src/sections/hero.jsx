import react from 'react';
import styles from './hero.module.css';


const Hero = () => {
    return (
        <section className={styles.heroContainer}>
            <div className={styles.content}>
                <p className={styles.introText}>MY NAME IS </p>
                <h1 className={styles.name}>FACUNDO<span className={styles.lastName}>SILVA</span> </h1>
                <p className={styles.description}>Full Stack Developer based in Argentina </p>

                <button className={styles.ctaButtom}>Contacto</button>

                <div className={styles.contactInfo}>
                    <span>+54 2616152411</span>
                    <span>facusilva2003@gmail.com</span>
                </div>
            </div>

            <div className={styles.imageContainer}></div>
                <div className={styles.circleDecorator}></div>
        </section>
    );
}

export default Hero;
