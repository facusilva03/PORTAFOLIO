import React from "react";
import styles from "./about.module.css";
import photoprofile from '../assets/about.jpg';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaDownload } from "react-icons/fa";

const About = () => {
    return (
        <section className={styles.aboutSection} id="about">

{/* --- COLUMNA IZQUIERDA: FOTO Y PERFIL --- */}
            <div className={styles.profileColumn}>
                <p className={styles.greeting}>Nice to meet you!</p>
                <h2 className={styles.tittle}>WELCOME TO...</h2>

                <div className={styles.imageWrapper}>
                <img src={photoprofile} alt="Profile" className={styles.profileImage}/>
                </div>


            <h3 className={styles.name}>FACUNDO SILVA</h3>
            <p className={styles.role}>
                <span className={styles.highlight}>Full Stack Developer</span> based in Argentina.
            </p>

            <a href="#" className={styles.cvButton}>
                Download CV <FaDownload className={styles.icondownload} />
            </a>
            </div>

{/* --- COLUMNA DERECHA: INFO Y BIO --- */}

<div className={styles.infoColumn}>

{/* Grilla de Datos de Contacto */}


<div className={styles.contactGrid}>
    <div className={styles.contactItem}>
        <FaPhoneAlt className={styles.icon}/> <span>+54 261 615 2411</span>
        
    </div>
    <div className={styles.contactItem}>
        <FaEnvelope className={styles.icon}/> <span>facusilva2003@gmail.com</span>
    </div>
    <div className={styles.contactItem}>
        <FaMapMarkerAlt className={styles.icon}/> <span>Mendoza, Argentina</span>
    </div>
    <div className={styles.contactItem}>
        <FaCalendarAlt className={styles.icon}/> <span>22 years</span>
    </div>


<hr className={styles.divider} />
{/* Estadísticas */}

<div className={styles.statsGrid}>
    <div className={styles.statItem}>
        <span className={styles.statNumber}>2+</span>
        <span className={styles.statLabel}>Years <br />experience...</span>
    </div>
    <div className={styles.statItem}>
        <span className={styles.statNumber}>5+</span>
        <span className={styles.statLabel}>Projects <br />completed...</span>
    </div>
</div>

{/* Biografía */}
<p className={styles.bioText}>
Hola! Soy Facundo Silva, un desarrollador apasionado por crear soluciones digitales 
que combinan diseño y funcionalidad. Me especializo en el desarrollo web completo, 
desde la base de datos hasta la interfaz de usuario. Siempre buscando aprender 
nuevas tecnologías para llevar mis proyectos al siguiente nivel.
</p>

{/* Caja de Cita (Quote) */}

<div className={styles.quoteBox}>
  <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, ratione iure? Ducimus mollitia beatae eaque maxime excepturi aperiam magni adipisci iste, dolorum vitae modi eius, placeat debitis error ipsam illum!
  </p>

</div>

</div>

</div>


</section>
    );
};

export default About;