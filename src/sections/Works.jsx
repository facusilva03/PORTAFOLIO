import { useState } from 'react';
import Seccion from '../components/Seccion';
import Reveal from '../components/Reveal';
import FlowDiagram from '../components/FlowDiagram';
import { WORKS } from '../data/works';
import { DIAGRAMAS } from '../data/diagramas';
import styles from './Works.module.css';

/* Un ref apunta a una decisión (dN), un obstáculo (oN) o al estado del caso. */
function resolverRef(caso, ref) {
    if (ref === 'estado') return { tipo: 'Estado', t: 'Dónde está hoy', d: caso.estado };
    const i = Number(ref.slice(1));
    return ref[0] === 'd'
        ? { tipo: 'Decisión', ...caso.decisiones[i] }
        : { tipo: 'Obstáculo', ...caso.obstaculos[i] };
}

const Works = () => {
    // Guardamos el proyecto y el nodo tocado. Si cambia el proyecto, el nodo
    // anterior ya no aplica y se vuelve al primero: se deduce al renderizar,
    // sin un effect que sincronice estados.
    const [sel, setSel] = useState({ proyecto: WORKS[0].id, nodo: null });

    const proyecto = WORKS.find((w) => w.id === sel.proyecto);
    const diagrama = DIAGRAMAS[proyecto.id];
    const nodo =
        (sel.nodo && diagrama.nodos.find((n) => n.id === sel.nodo)) ||
        diagrama.nodos.find((n) => n.refs);
    const detalles = (nodo.refs || []).map((r) => resolverRef(proyecto.caso, r));
    const vivo = proyecto.statusTipo === 'live';

    // Flechas izquierda/derecha entre pestañas, como pide el patrón de tabs.
    const alTeclear = (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const actual = WORKS.findIndex((w) => w.id === proyecto.id);
        const paso = e.key === 'ArrowRight' ? 1 : -1;
        const siguiente = WORKS[(actual + paso + WORKS.length) % WORKS.length];
        setSel({ proyecto: siguiente.id, nodo: null });
        document.getElementById(`tab-${siguiente.id}`)?.focus();
    };

    return (
        <Seccion id="works" eyebrow="03 · Proyectos" titulo="Lo que construí, explicado por dentro.">
            <Reveal className={styles.tabs} role="tablist" aria-label="Proyectos" onKeyDown={alTeclear}>
                {WORKS.map((w) => (
                    <button
                        key={w.id}
                        id={`tab-${w.id}`}
                        type="button"
                        role="tab"
                        aria-selected={w.id === proyecto.id}
                        aria-controls="panel-proyecto"
                        tabIndex={w.id === proyecto.id ? 0 : -1}
                        className={styles.tab}
                        onClick={() => setSel({ proyecto: w.id, nodo: null })}
                    >
                        <small>{w.id}</small>
                        {w.title}
                        {w.status && (
                            <span className={`${styles.punto} ${w.statusTipo === 'live' ? styles.vivo : styles.enCurso}`} aria-hidden="true" />
                        )}
                    </button>
                ))}
            </Reveal>

            <article id="panel-proyecto" role="tabpanel" aria-labelledby={`tab-${proyecto.id}`} className={styles.proyecto}>
                <div key={proyecto.id} className={styles.contenido}>
                    <header className={styles.cabecera}>
                        <div>
                            <p className={styles.categoria}>{proyecto.category}</p>
                            <h3>{proyecto.title}</h3>
                        </div>
                        {proyecto.status && (
                            <span className={`${styles.badge} ${vivo ? styles.badgeVivo : styles.badgeCurso}`}>
                                {vivo && <i aria-hidden="true" />}
                                {proyecto.status}
                            </span>
                        )}
                    </header>

                    <p className={styles.descripcion}>{proyecto.description}</p>

                    <ul className={styles.stack}>
                        {proyecto.stack.map((s) => <li key={s}>{s}</li>)}
                    </ul>

                    {(proyecto.live || proyecto.github) && (
                        <p className={styles.enlaces}>
                            {proyecto.live && (
                                <a href={proyecto.live} target="_blank" rel="noreferrer">Ver sitio ↗</a>
                            )}
                            {proyecto.github && (
                                <a href={proyecto.github} target="_blank" rel="noreferrer">Código en GitHub ↗</a>
                            )}
                        </p>
                    )}

                    <div className={styles.arquitectura}>
                        <div className={styles.diagrama}>
                            <p className={styles.leyenda}>{diagrama.titulo} · tocá cada parte</p>
                            <FlowDiagram
                                diagrama={diagrama}
                                nombre={proyecto.title}
                                seleccionado={nodo.id}
                                onSeleccionar={(n) => setSel({ proyecto: proyecto.id, nodo: n.id })}
                            />
                        </div>

                        <aside className={styles.detalle} aria-live="polite">
                            <div className={styles.bloque}>
                                <p className={styles.tipo}>Qué hace</p>
                                <h4>{nodo.titulo}</h4>
                                <p>{nodo.que}</p>
                            </div>
                            {detalles.map((d) => (
                                <div key={`${d.tipo}-${d.t}`} className={styles.bloque}>
                                    <p className={styles.tipo}>
                                        {d.tipo === 'Estado' ? 'Estado' : `Por qué · ${d.tipo.toLowerCase()}`}
                                    </p>
                                    <h4>{d.t}</h4>
                                    <p>{d.d}</p>
                                </div>
                            ))}
                        </aside>
                    </div>

                    {proyecto.caso.repoNota && <p className={styles.repoNota}>{proyecto.caso.repoNota}</p>}
                </div>
            </article>
        </Seccion>
    );
};

export default Works;
