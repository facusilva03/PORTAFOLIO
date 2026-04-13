import React, { useEffect, useState } from 'react';
import styles from './sidebar.module.css';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'works',    label: 'Works' },
  { id: 'services', label: 'Services' },
  { id: 'contact',  label: 'Contact' },
];

const Sidebar = () => {
  const [activeId, setActiveId] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <aside className={styles.sidebar}>

      <div>
        <h1 className={styles.logo}>F.</h1>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navList}>
          {NAV_ITEMS.map(({ id, label }, index) => (
            <React.Fragment key={id}>
              {index > 0 && <li className={styles.dot}></li>}
              <li className={styles.navItem}>
                <a
                  href={`#${id}`}
                  className={`${styles.navAnchor} ${activeId === id ? styles.active : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        © 2026 Facundo Silva
      </div>

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Abrir menú"
      >
        <span />
        <span />
        <span />
      </button>

    </aside>
  );
};

export default Sidebar;
