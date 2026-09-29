import { useEffect, useState } from 'react';
import styles from './Terminal.module.css';

/*
  Contenido de la terminal. Cada comando tiene que decir algo REAL y
  verificable — si dice cosas genéricas ("sudo hack") queda como adorno y
  resta en vez de sumar. Para actualizarlo (proyecto nuevo, otro foco),
  se edita solo este array: la animación no depende del contenido.
*/
const LINEAS = [
    {
        comando: 'whoami',
        salida: [{ texto: 'facundo silva · mendoza, argentina' }],
    },
    {
        comando: 'cat stack.txt',
        salida: [
            { texto: 'python · php · javascript · sql' },
            { texto: 'java · go', comentario: '# profundizando' },
        ],
    },
    {
        comando: './pago-diarios --status',
        salida: [{ texto: '● en producción', destacado: true, extra: 'django · azure · cloudflare' }],
    },
    {
        comando: 'echo $FOCUS',
        salida: [{ texto: 'application security' }],
    },
];

// Version en texto plano para lectores de pantalla: la animacion es
// aria-hidden, asi que el contenido real tiene que existir aparte.
const RESUMEN_ACCESIBLE = LINEAS
    .map((l) => `${l.comando}: ${l.salida.map((s) => s.texto).join(', ')}`)
    .join('. ');

const VELOCIDAD_TIPEO = 38;   // ms por caracter
const PAUSA_ANTES_SALIDA = 180;
const PAUSA_ENTRE_COMANDOS = 420;

/* Arma el estado visible de forma determinista, sin depender del anterior. */
function construirVisibles(indice, comandoParcial, mostrarSalida) {
    const completas = LINEAS.slice(0, indice).map((l) => ({
        ...l,
        comandoParcial: l.comando,
        mostrarSalida: true,
    }));
    return [...completas, { ...LINEAS[indice], comandoParcial, mostrarSalida }];
}

const TODAS_VISIBLES = LINEAS.map((l) => ({ ...l, comandoParcial: l.comando, mostrarSalida: true }));

/* Si el sistema pide menos movimiento, no animamos nada. */
const prefiereSinMovimiento = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Terminal = () => {
    // Estado inicial perezoso en vez de setState dentro del effect: así quien
    // pidió menos movimiento ve el contenido ya completo en el primer render,
    // sin un parpadeo vacío ni un render de más.
    const [visibles, setVisibles] = useState(() => (prefiereSinMovimiento() ? TODAS_VISIBLES : []));
    const [terminado, setTerminado] = useState(prefiereSinMovimiento);

    useEffect(() => {
        if (prefiereSinMovimiento()) return;

        let cancelado = false;
        const timers = [];
        const esperar = (ms) => new Promise((resolver) => timers.push(setTimeout(resolver, ms)));

        (async () => {
            for (let i = 0; i < LINEAS.length; i++) {
                const { comando } = LINEAS[i];
                for (let j = 1; j <= comando.length; j++) {
                    if (cancelado) return;
                    setVisibles(construirVisibles(i, comando.slice(0, j), false));
                    await esperar(VELOCIDAD_TIPEO);
                }
                if (cancelado) return;
                await esperar(PAUSA_ANTES_SALIDA);
                setVisibles(construirVisibles(i, comando, true));
                await esperar(PAUSA_ENTRE_COMANDOS);
            }
            if (!cancelado) setTerminado(true);
        })();

        // Sin esto quedan timers vivos si el componente se desmonta a mitad.
        return () => {
            cancelado = true;
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className={styles.wrap}>
            {/* Mismo borde violeta desplazado que tenía la foto, para no
                perder la identidad visual del resto del sitio. */}
            <div className={styles.offsetBorder} aria-hidden="true"></div>

            <div className={styles.terminal}>
                <div className={styles.barra} aria-hidden="true">
                    <span className={styles.punto}></span>
                    <span className={styles.punto}></span>
                    <span className={styles.punto}></span>
                    <span className={styles.tituloBarra}>facundo@portfolio</span>
                </div>

                <div className={styles.cuerpo} aria-hidden="true">
                    {visibles.map((linea, i) => (
                        <div key={linea.comando} className={styles.bloque}>
                            <p className={styles.lineaComando}>
                                <span className={styles.prompt}>$</span>
                                <span className={styles.comando}>{linea.comandoParcial}</span>
                                {/* El cursor vive en la línea que se está escribiendo,
                                    y al terminar todo queda fijo en la última. */}
                                {((!terminado && i === visibles.length - 1 && !linea.mostrarSalida) ||
                                    (terminado && i === LINEAS.length - 1)) && (
                                    <span className={styles.cursor}></span>
                                )}
                            </p>

                            {linea.mostrarSalida &&
                                linea.salida.map((s) => (
                                    <p
                                        key={s.texto}
                                        className={`${styles.salida} ${s.destacado ? styles.destacado : ''}`}
                                    >
                                        {s.texto}
                                        {s.extra && <span className={styles.extra}>{s.extra}</span>}
                                        {s.comentario && <span className={styles.comentario}>{s.comentario}</span>}
                                    </p>
                                ))}
                        </div>
                    ))}
                </div>

                <p className={styles.soloLectores}>{RESUMEN_ACCESIBLE}</p>
            </div>
        </div>
    );
};

export default Terminal;
