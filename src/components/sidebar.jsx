import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div>
        <h1 className={styles.logo}>Facu.</h1>
      </div>

      <nav>
        <ul className={styles.navList}>
          
          
          <li className={styles.navItem}>
            <a href="#home" className={`${styles.navAnchor} ${styles.active}`}>
              Home
            </a>
          </li>

          
          <li className={styles.navItem}>
            <a href="#about" className={styles.navAnchor}>
              About
            </a>
          </li>

          <li className={styles.navItem}>
            <a href="#services" className={styles.navAnchor}>
              Services
            </a>
          </li>

          <li className={styles.navItem}>
            <a href="#works" className={styles.navAnchor}>
              Works
            </a>
          </li>

          <li className={styles.navItem}>
            <a href="#blogs" className={styles.navAnchor}>
              Blogs
            </a>
          </li>

          <li className={styles.navItem}>
            <a href="#contact" className={styles.navAnchor}>
              Contact
            </a>
          </li>

        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.social}>
          <span>Be</span>
          <span>In</span>
        </div>
        <p>Copyright ©2026 Facundo Silva. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;