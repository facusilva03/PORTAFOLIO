import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>

      {/* Logo — solo letra inicial */}
      <div>
        <h1 className={styles.logo}>F.</h1>
      </div>

      {/* Nav vertical con puntos separadores */}
      <nav>
        <ul className={styles.navList}>

          <li className={styles.navItem}>
            <a href="#home" className={`${styles.navAnchor} ${styles.active}`}>Home</a>
          </li>

          <li className={styles.dot}></li>

          <li className={styles.navItem}>
            <a href="#about" className={styles.navAnchor}>About</a>
          </li>

          <li className={styles.dot}></li>

          <li className={styles.navItem}>
            <a href="#skills" className={styles.navAnchor}>Skills</a>
          </li>

          <li className={styles.dot}></li>

          <li className={styles.navItem}>
            <a href="#works" className={styles.navAnchor}>Works</a>
          </li>

          <li className={styles.dot}></li>

          <li className={styles.navItem}>
            <a href="#services" className={styles.navAnchor}>Services</a>
          </li>

          <li className={styles.dot}></li>

          <li className={styles.navItem}>
            <a href="#contact" className={styles.navAnchor}>Contact</a>
          </li>

        </ul>
      </nav>

      {/* Copyright rotado */}
      <div className={styles.footer}>
        © 2026 Facundo Silva
      </div>

    </aside>
  );
};

export default Sidebar;
