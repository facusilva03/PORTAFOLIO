import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const ENLACES = [
    { id: 'home', etiqueta: 'Home' },
    { id: 'about', etiqueta: 'About' },
    { id: 'skills', etiqueta: 'Skills' },
    { id: 'works', etiqueta: 'Works' },
    { id: 'now', etiqueta: 'Ahora' },
    { id: 'contact', etiqueta: 'Contact' },
];

/* Una franja angosta alrededor del centro de la pantalla: la sección que la
   cruza es la "activa". Más fiable que un umbral cuando las secciones son
   de alturas muy distintas. */
const OPCIONES = { rootMargin: '-45% 0px -50% 0px' };

const Nav = () => {
    const [activa, setActiva] = useState('home');
    const [abierto, setAbierto] = useState(false);

    useEffect(() => {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((e) => {
                if (e.isIntersecting) setActiva(e.target.id);
            });
        }, OPCIONES);

        ENLACES.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observador.observe(el);
        });
        return () => observador.disconnect();
    }, []);

    return (
        <header className={styles.nav}>
            <div className={styles.barra}>
                <a className={styles.logo} href="#home">
                    facundo<b>@</b>portfolio
                </a>

                <button
                    type="button"
                    className={styles.boton}
                    aria-expanded={abierto}
                    aria-controls="menu-principal"
                    onClick={() => setAbierto((a) => !a)}
                >
                    {abierto ? 'Cerrar' : 'Menú'}
                </button>

                <nav
                    id="menu-principal"
                    aria-label="Principal"
                    className={`${styles.enlaces} ${abierto ? styles.abierto : ''}`}
                >
                    {ENLACES.map(({ id, etiqueta }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={activa === id ? styles.activo : ''}
                            aria-current={activa === id ? 'true' : undefined}
                            onClick={() => setAbierto(false)}
                        >
                            {etiqueta}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Nav;
