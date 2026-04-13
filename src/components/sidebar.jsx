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

  return (
    <aside className={styles.sidebar}>

      <div>
        <h1 className={styles.logo}>F.</h1>
      </div>

      <nav>
        <ul className={styles.navList}>
          {NAV_ITEMS.map(({ id, label }, index) => (
            <React.Fragment key={id}>
              {index > 0 && <li className={styles.dot}></li>}
              <li className={styles.navItem}>
                <a
                  href={`#${id}`}
                  className={`${styles.navAnchor} ${activeId === id ? styles.active : ''}`}
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

    </aside>
  );
};

export default Sidebar;
