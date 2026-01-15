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
          <li className={`${styles.navItem} ${styles.accent}`}>Home</li>
          <li className={`${styles.navItem} ${styles.hoverAccent}`}>About</li>
          <li className={`${styles.navItem} ${styles.hoverAccent}`}>Services</li>
          <li className={`${styles.navItem} ${styles.hoverAccent}`}>Works</li>
          <li className={`${styles.navItem} ${styles.hoverAccent}`}>Blogs</li>
          <li className={`${styles.navItem} ${styles.hoverAccent}`}>Contact</li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.social}>
          <span className={styles.hoverAccent}>Be</span>
          <span className={styles.hoverAccent}>In</span>
        </div>
        <p>Copyright ©2026 Facundo Silva. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;