import { useId } from 'react';
import styles from './FlowDiagram.module.css';

/* Medidas de la grilla (en unidades del viewBox): celda y nodo. */
const CELDA_W = 190;
const CELDA_H = 104;
const NODO_W = 150;
const NODO_H = 64;
const COLUMNAS = 3;

const prefiereSinMovimiento = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Punto del borde del nodo `a` en dirección al nodo `b`: así la línea sale de
   la caja y no de su centro. */
function puntoDeBorde(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const tx = dx ? NODO_W / 2 / Math.abs(dx) : Infinity;
    const ty = dy ? NODO_H / 2 / Math.abs(dy) : Infinity;
    const t = Math.min(tx, ty);
    return { x: a.x + dx * t, y: a.y + dy * t };
}

/*
  Diagrama de cómo funciona un sistema. Cada nodo se puede tocar (o activar
  con Enter / Espacio): el padre decide qué mostrar. Los paquetes que viajan
  por las líneas son decoración y no se dibujan si el sistema pide menos
  movimiento.
*/
const FlowDiagram = ({ diagrama, nombre, seleccionado, onSeleccionar }) => {
    const uid = useId().replace(/:/g, '');
    const animar = !prefiereSinMovimiento();
    const filas = Math.max(...diagrama.nodos.map((n) => n.fila)) + 1;

    const centro = {};
    diagrama.nodos.forEach((n) => {
        centro[n.id] = { x: n.col * CELDA_W + CELDA_W / 2, y: n.fila * CELDA_H + CELDA_H / 2 };
    });

    return (
        <svg
            viewBox={`0 0 ${CELDA_W * COLUMNAS} ${CELDA_H * filas}`}
            className={styles.svg}
            role="group"
            aria-label={`Diagrama interactivo de ${nombre}`}
        >
            {diagrama.enlaces.map(([desde, hasta], i) => {
                const p1 = puntoDeBorde(centro[desde], centro[hasta]);
                const p2 = puntoDeBorde(centro[hasta], centro[desde]);
                return (
                    <path
                        key={`${desde}-${hasta}`}
                        id={`${uid}-e${i}`}
                        className={styles.enlace}
                        d={`M${p1.x} ${p1.y}L${p2.x} ${p2.y}`}
                    />
                );
            })}

            {diagrama.nodos.map((n) => {
                const x = n.col * CELDA_W + (CELDA_W - NODO_W) / 2;
                const y = n.fila * CELDA_H + (CELDA_H - NODO_H) / 2;
                const activar = () => onSeleccionar(n);
                return (
                    <g
                        key={n.id}
                        className={`${styles.nodo} ${seleccionado === n.id ? styles.seleccionado : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-label={`${n.titulo}: ${n.sub}`}
                        aria-pressed={seleccionado === n.id}
                        onClick={activar}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                activar();
                            }
                        }}
                    >
                        <rect x={x} y={y} width={NODO_W} height={NODO_H} rx="10" />
                        <text x={x + NODO_W / 2} y={y + 27} textAnchor="middle">{n.titulo}</text>
                        <text className={styles.sub} x={x + NODO_W / 2} y={y + 46} textAnchor="middle">{n.sub}</text>
                    </g>
                );
            })}

            {animar && diagrama.enlaces.map((_, i) => (
                <circle key={i} r="4" className={i === 0 ? styles.paqueteVivo : styles.paquete}>
                    <animateMotion dur={`${1.8 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.55}s`}>
                        <mpath href={`#${uid}-e${i}`} />
                    </animateMotion>
                </circle>
            ))}
        </svg>
    );
};

export default FlowDiagram;
