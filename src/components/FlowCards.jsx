import { useCallback, useEffect, useRef, useState } from 'react';
import resolverRef from '../data/resolverRef';
import styles from './FlowCards.module.css';

const prefiereSinMovimiento = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/*
  El mismo flujo que el diagrama, pero para el teléfono: una tarjeta por
  pieza, en el orden del recorrido, que se pasan deslizando hacia los costados.

  Un diagrama con nodos y líneas no se lee en 320px, y tocar piezas diminutas
  tampoco funciona con el dedo. Acá cada pieza ocupa casi todo el ancho.

  Deslizar no lo puede hacer quien navega con teclado o con un lector de
  pantalla, así que además hay botones anterior/siguiente.
*/
const FlowCards = ({ diagrama, caso, nombre }) => {
    const pista = useRef(null);
    const tarjetas = useRef([]);
    const [activa, setActiva] = useState(0);
    const total = diagrama.nodos.length;

    // La tarjeta que está más cerca del centro de la pista es la "activa".
    const alDeslizar = useCallback(() => {
        const el = pista.current;
        if (!el) return;
        const centro = el.scrollLeft + el.clientWidth / 2;
        let mejor = 0;
        let distancia = Infinity;
        tarjetas.current.forEach((t, i) => {
            if (!t) return;
            const d = Math.abs(t.offsetLeft + t.offsetWidth / 2 - centro);
            if (d < distancia) {
                distancia = d;
                mejor = i;
            }
        });
        setActiva(mejor);
    }, []);

    // Las tarjetas tienen alturas muy distintas. Sin esto la pista toma la
    // altura de la más alta y las demás quedan con un hueco enorme debajo.
    // Se ajusta directo en el DOM: no hace falta un estado para esto.
    useEffect(() => {
        const el = pista.current;
        const tarjeta = tarjetas.current[activa];
        if (!el || !tarjeta) return;

        const ajustar = () => { el.style.height = `${tarjeta.offsetHeight}px`; };
        ajustar();

        const observador = new ResizeObserver(ajustar);
        observador.observe(tarjeta);
        return () => observador.disconnect();
    }, [activa]);

    const ir = (indice) => {
        const t = tarjetas.current[indice];
        if (!t || !pista.current) return;
        const el = pista.current;
        // Las tarjetas encajan alineadas al inicio, con el scroll-padding de la pista.
        const relleno = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
        el.scrollTo({
            left: t.offsetLeft - relleno,
            behavior: prefiereSinMovimiento() ? 'auto' : 'smooth',
        });
    };

    return (
        <div className={styles.cartas}>
            <div
                ref={pista}
                className={styles.pista}
                onScroll={alDeslizar}
                role="region"
                aria-label={`Pasos de ${nombre}, deslizá hacia los costados`}
                tabIndex={0}
            >
                {diagrama.nodos.map((n, i) => (
                    <article
                        key={n.id}
                        ref={(el) => { tarjetas.current[i] = el; }}
                        className={`${styles.tarjeta} ${i === activa ? styles.activa : ''}`}
                        aria-label={`Paso ${i + 1} de ${total}: ${n.titulo}`}
                    >
                        <p className={styles.paso}>Paso {i + 1} de {total}</p>
                        <h4>{n.titulo}</h4>
                        <p className={styles.sub}>{n.sub}</p>
                        <p className={styles.que}>{n.que}</p>

                        {(n.refs || []).map((r) => {
                            const d = resolverRef(caso, r);
                            return (
                                <div key={`${d.tipo}-${d.t}`} className={styles.porque}>
                                    <p className={styles.tipo}>
                                        {d.tipo === 'Estado' ? 'Estado' : `Por qué · ${d.tipo.toLowerCase()}`}
                                    </p>
                                    <h5>{d.t}</h5>
                                    <p>{d.d}</p>
                                </div>
                            );
                        })}
                    </article>
                ))}
            </div>

            <div className={styles.controles}>
                <button
                    type="button"
                    className={styles.flecha}
                    onClick={() => ir(activa - 1)}
                    disabled={activa === 0}
                    aria-label="Paso anterior"
                >
                    ←
                </button>

                <div className={styles.puntos} aria-hidden="true">
                    {diagrama.nodos.map((n, i) => (
                        <span key={n.id} className={i === activa ? styles.puntoActivo : styles.punto} />
                    ))}
                </div>

                <button
                    type="button"
                    className={styles.flecha}
                    onClick={() => ir(activa + 1)}
                    disabled={activa === total - 1}
                    aria-label="Paso siguiente"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default FlowCards;
