import { useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import styles from './ProyectoDetalle.module.css';

/*
  Panel de detalle de un proyecto. Se abre desde una card de Works.

  Por qué un panel y no una página aparte: el sitio no tiene router, y
  agregarlo solo para esto obligaría a resolver rutas en el hosting. El
  panel cubre el mismo objetivo — contar el proyecto en profundidad —
  sin sumar una dependencia.

  El foco es lo delicado acá: quien navega con teclado tiene que quedar
  encerrado dentro del panel mientras está abierto, y volver al botón
  que lo abrió cuando se cierra. Eso se maneja abajo a mano.
*/
const ProyectoDetalle = ({ proyecto, onCerrar }) => {
    const panelRef = useRef(null);
    const botonCerrarRef = useRef(null);

    useEffect(() => {
        // Guardamos quién tenía el foco para devolvérselo al cerrar.
        const elementoPrevio = document.activeElement;

        botonCerrarRef.current?.focus();

        // Sin esto la página de atrás sigue scrolleando bajo el panel.
        const overflowPrevio = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const alPresionarTecla = (evento) => {
            if (evento.key === 'Escape') {
                onCerrar();
                return;
            }

            if (evento.key !== 'Tab') return;

            // Trampa de foco: al llegar al último elemento, Tab vuelve al
            // primero, y Shift+Tab desde el primero salta al último.
            const enfocables = panelRef.current?.querySelectorAll(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
            if (!enfocables?.length) return;

            const primero = enfocables[0];
            const ultimo = enfocables[enfocables.length - 1];

            if (evento.shiftKey && document.activeElement === primero) {
                evento.preventDefault();
                ultimo.focus();
            } else if (!evento.shiftKey && document.activeElement === ultimo) {
                evento.preventDefault();
                primero.focus();
            }
        };

        document.addEventListener('keydown', alPresionarTecla);

        return () => {
            document.removeEventListener('keydown', alPresionarTecla);
            document.body.style.overflow = overflowPrevio;
            elementoPrevio?.focus?.();
        };
    }, [onCerrar]);

    const { caso } = proyecto;

    return (
        <div
            className={styles.fondo}
            // Click fuera cierra. El check de target evita que un click que
            // empieza dentro y termina fuera cierre sin querer.
            onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
        >
            <div
                className={styles.panel}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="detalle-titulo"
            >
                <button
                    className={styles.cerrar}
                    onClick={onCerrar}
                    ref={botonCerrarRef}
                    aria-label="Cerrar detalle del proyecto"
                >
                    <FaTimes />
                </button>

                <header className={styles.encabezado}>
                    <p className={styles.categoria}>{proyecto.category}</p>
                    <h2 className={styles.titulo} id="detalle-titulo">{proyecto.title}</h2>
                    <p className={styles.resumen}>{caso.resumen}</p>

                    <div className={styles.stackRow}>
                        {proyecto.stack.map((tech) => (
                            <span key={tech} className={styles.stackPill}>{tech}</span>
                        ))}
                    </div>
                </header>

                <div className={styles.cuerpo}>
                    <section className={styles.bloque}>
                        <h3 className={styles.subtitulo}>El problema</h3>
                        <p className={styles.parrafo}>{caso.problema}</p>
                    </section>

                    <section className={styles.bloque}>
                        <h3 className={styles.subtitulo}>Decisiones de diseño</h3>
                        <ul className={styles.lista}>
                            {caso.decisiones.map((item) => (
                                <li key={item.t} className={styles.item}>
                                    <strong className={styles.itemTitulo}>{item.t}</strong>
                                    <span className={styles.itemTexto}>{item.d}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Lo que más enseña de un proyecto es dónde se rompió.
                        Si un proyecto no tiene obstáculos cargados, el bloque
                        simplemente no aparece. */}
                    {caso.obstaculos?.length > 0 && (
                        <section className={styles.bloque}>
                            <h3 className={styles.subtitulo}>Qué se rompió y cómo se resolvió</h3>
                            <ul className={styles.lista}>
                                {caso.obstaculos.map((item) => (
                                    <li key={item.t} className={styles.item}>
                                        <strong className={styles.itemTitulo}>{item.t}</strong>
                                        <span className={styles.itemTexto}>{item.d}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section className={styles.bloque}>
                        <h3 className={styles.subtitulo}>Estado actual</h3>
                        <p className={styles.parrafo}>{caso.estado}</p>
                    </section>
                </div>

                <footer className={styles.pie}>
                    {/* Cuando el repo es privado no hay botón que mostrar, así
                        que el pie explica por qué en vez de quedar vacío. */}
                    {caso.repoNota && (
                        <p className={styles.repoNota}>{caso.repoNota}</p>
                    )}

                    {proyecto.github && (
                        <a href={proyecto.github} target="_blank" rel="noreferrer" className={styles.linkBtn}>
                            <FaGithub size={13} />
                            <span>Ver código</span>
                        </a>
                    )}
                    {proyecto.live && (
                        <a
                            href={proyecto.live}
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.linkBtn} ${styles.linkBtnLive}`}
                        >
                            <FaExternalLinkAlt size={11} />
                            <span>Ver en vivo</span>
                        </a>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default ProyectoDetalle;
