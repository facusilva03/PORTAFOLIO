import { useEffect, useRef, useState } from 'react';
import styles from './Terminal.module.css';

/*
  Terminal del Hero. Primero corre una intro animada; cuando termina, queda
  un prompt donde se puede escribir de verdad.

  La interactividad es PROGRESIVA a propósito: quien no escribe nada ve
  exactamente lo mismo que antes y no pierde nada. Quien escribe, encuentra
  atajos al contenido que de otro modo está más abajo en la página. Por eso
  el input nunca se enfoca solo — pedirle al visitante que interactúe antes
  de haberle dado una razón es lo que convierte esto en un adorno molesto.

  Todo corre en el navegador: no hay backend, no hay red, no hay nada que
  pueda fallar o quedar sin responder.

  Para actualizar el contenido se editan LINEAS (la intro) y COMANDOS. La
  regla es la misma de siempre: cada dato tiene que ser real y verificable.
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

/* Secciones a las que puede saltar `goto`, con el id real del DOM. */
const SECCIONES = ['about', 'skills', 'works', 'services', 'contact'];

/*
  Cada comando devuelve las líneas a imprimir y, si hace falta, una acción
  con efecto fuera de la terminal (scrollear, descargar). Mantener el efecto
  separado de la salida hace que agregar un comando no implique tocar el
  render.
*/
const COMANDOS = {
    help: {
        descripcion: 'esta lista',
        correr: () => ({
            lineas: [
                { texto: 'comandos disponibles:' },
                ...Object.entries(COMANDOS).map(([nombre, cmd]) => ({
                    texto: `  ${nombre.padEnd(11)}${cmd.descripcion}`,
                    tenue: true,
                })),
                { texto: '' },
                { texto: '  ↑ ↓ recorren los comandos que ya escribiste', tenue: true },
            ],
        }),
    },
    whoami: {
        descripcion: 'quién soy',
        correr: () => ({
            lineas: [
                { texto: 'facundo silva · mendoza, argentina' },
                { texto: 'lic. en sistemas de información (2° año) · universidad champagnat', tenue: true },
                { texto: 'lic. en ciberseguridad (1° año) · undef', tenue: true },
            ],
        }),
    },
    stack: {
        descripcion: 'con qué trabajo',
        correr: () => ({
            lineas: [
                { texto: 'en uso    python/django · php/laravel · javascript/react' },
                { texto: 'cursando  sql · java · c', tenue: true },
                { texto: 'sistemas  linux · active directory · redes · azure · cloudflare', tenue: true },
            ],
        }),
    },
    projects: {
        descripcion: 'qué construí',
        correr: () => ({
            lineas: [
                { texto: 'pago-diarios   ● en producción', destacado: true, extra: 'django · azure · cloudflare · ci/cd' },
                { texto: 'logitrack      ✓ entregado', extra: 'php · mariadb · 19 tablas en 3fn' },
                { texto: 'deleitarte     ◐ en desarrollo', extra: 'laravel · react · inertia' },
                { texto: 'portfolio      ● en línea', extra: 'react · vite' },
                { texto: '' },
                { texto: 'el detalle de cada uno está en works · probá: goto works', tenue: true },
            ],
        }),
    },
    formacion: {
        descripcion: 'qué quedó de cada cátedra',
        correr: () => ({
            lineas: [
                { texto: 'base de datos ii      logitrack · 3fn, triggers, procedimientos' },
                { texto: 'sistemas operativos   ubuntu + active directory + ftp + proxy' },
                { texto: '                      y la misma infra en windows server core', tenue: true },
                { texto: 'redes i               osi/tcp-ip cruzado con herramientas por capa' },
                { texto: 'arquitectura          binario, hex, complemento a 2, ieee-754' },
            ],
        }),
    },
    contact: {
        descripcion: 'cómo escribirme',
        correr: () => ({
            lineas: [
                { texto: 'email     facusilva2003@gmail.com' },
                { texto: 'linkedin  /in/facundo-silva-33a4b6342' },
                { texto: 'github    github.com/facusilva03' },
                { texto: '' },
                { texto: 'o el formulario de abajo · probá: goto contact', tenue: true },
            ],
        }),
    },
    cv: {
        descripcion: 'descargar el cv',
        correr: () => ({
            lineas: [{ texto: 'descargando cv-facundo-silva.pdf…', destacado: true }],
            accion: { tipo: 'descargar', valor: '/cv-facundo-silva.pdf' },
        }),
    },
    goto: {
        descripcion: 'ir a una sección',
        correr: (args) => {
            const destino = (args[0] || '').toLowerCase();
            if (!destino) {
                return { lineas: [{ texto: `uso: goto <${SECCIONES.join('|')}>`, tenue: true }] };
            }
            if (!SECCIONES.includes(destino)) {
                return { lineas: [{ texto: `sección desconocida: ${destino}`, error: true }] };
            }
            return {
                lineas: [{ texto: `→ ${destino}` }],
                accion: { tipo: 'ir', valor: destino },
            };
        },
    },
    sudo: {
        descripcion: '—',
        correr: () => ({
            lineas: [
                { texto: 'no hace falta: todo lo que está acá es público.' },
                { texto: 'lo que no es público no está acá.', tenue: true },
            ],
        }),
    },
    clear: {
        descripcion: 'limpiar la pantalla',
        correr: () => ({ lineas: [], accion: { tipo: 'limpiar' } }),
    },
};

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

    const [introVisible, setIntroVisible] = useState(true);
    const [historial, setHistorial] = useState([]);   // lo que se escribió y su salida
    const [entrada, setEntrada] = useState('');
    const [previos, setPrevios] = useState([]);       // comandos ya escritos, para ↑ ↓
    const [posicion, setPosicion] = useState(-1);     // dónde está el recorrido de ↑ ↓

    const inputRef = useRef(null);
    const cuerpoRef = useRef(null);

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

    // La salida crece hacia abajo; sin esto el prompt queda fuera de vista.
    useEffect(() => {
        if (cuerpoRef.current) {
            cuerpoRef.current.scrollTop = cuerpoRef.current.scrollHeight;
        }
    }, [historial, visibles]);

    const ejecutar = (textoCrudo) => {
        const texto = textoCrudo.trim();
        if (!texto) return;

        setPrevios((p) => [...p, texto]);
        setPosicion(-1);

        const [nombre, ...args] = texto.split(/\s+/);
        const comando = COMANDOS[nombre.toLowerCase()];

        if (!comando) {
            setHistorial((h) => [
                ...h,
                { comando: texto, lineas: [{ texto: `comando no encontrado: ${nombre}. probá "help".`, error: true }] },
            ]);
            return;
        }

        const { lineas, accion } = comando.correr(args);

        if (accion?.tipo === 'limpiar') {
            setIntroVisible(false);
            setHistorial([]);
            return;
        }

        setHistorial((h) => [...h, { comando: texto, lineas }]);

        if (accion?.tipo === 'ir') {
            document.getElementById(accion.valor)?.scrollIntoView({ behavior: 'smooth' });
        }
        if (accion?.tipo === 'descargar') {
            // Un <a> temporal evita abrir una pestaña y respeta el atributo download.
            const enlace = document.createElement('a');
            enlace.href = accion.valor;
            enlace.download = '';
            enlace.click();
        }
    };

    const alPresionar = (evento) => {
        if (evento.key === 'Enter') {
            ejecutar(entrada);
            setEntrada('');
            return;
        }
        // ↑ ↓ recorren lo ya escrito, como en una shell de verdad.
        if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown') {
            if (!previos.length) return;
            evento.preventDefault();
            const siguiente =
                evento.key === 'ArrowUp'
                    ? Math.min(posicion + 1, previos.length - 1)
                    : posicion - 1;
            setPosicion(siguiente);
            setEntrada(siguiente < 0 ? '' : previos[previos.length - 1 - siguiente]);
        }
    };

    const renderSalida = (s, clave) => (
        <p
            key={clave}
            className={[
                styles.salida,
                s.destacado ? styles.destacado : '',
                s.tenue ? styles.tenue : '',
                s.error ? styles.error : '',
            ].filter(Boolean).join(' ')}
        >
            {s.texto}
            {s.extra && <span className={styles.extra}>{s.extra}</span>}
            {s.comentario && <span className={styles.comentario}>{s.comentario}</span>}
        </p>
    );

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

                <div
                    className={styles.cuerpo}
                    ref={cuerpoRef}
                    // Clic en cualquier parte lleva el foco al input, como en
                    // una terminal real. Solo cuando ya hay prompt.
                    onClick={() => terminado && inputRef.current?.focus()}
                >
                    <div aria-hidden="true">
                        {introVisible && visibles.map((linea, i) => (
                            <div key={linea.comando} className={styles.bloque}>
                                <p className={styles.lineaComando}>
                                    <span className={styles.prompt}>$</span>
                                    <span className={styles.comando}>{linea.comandoParcial}</span>
                                    {/* Mientras escribe, el cursor vive en la línea en curso. */}
                                    {!terminado && i === visibles.length - 1 && !linea.mostrarSalida && (
                                        <span className={styles.cursor}></span>
                                    )}
                                </p>

                                {linea.mostrarSalida &&
                                    linea.salida.map((s) => renderSalida(s, s.texto))}
                            </div>
                        ))}

                        {/* Lo que escribió quien está mirando */}
                        {historial.map((entradaHist, i) => (
                            <div key={`${entradaHist.comando}-${i}`} className={styles.bloque}>
                                <p className={styles.lineaComando}>
                                    <span className={styles.prompt}>$</span>
                                    <span className={styles.comando}>{entradaHist.comando}</span>
                                </p>
                                {entradaHist.lineas.map((s, j) => renderSalida(s, `${i}-${j}`))}
                            </div>
                        ))}
                    </div>

                    {/* El prompt aparece recién cuando la intro terminó, para
                        no competir con ella mientras se escribe sola. */}
                    {terminado && (
                        <div className={styles.bloque}>
                            {historial.length === 0 && (
                                <p className={styles.pista} aria-hidden="true">
                                    escribí <span className={styles.pistaAccent}>help</span> y enter
                                </p>
                            )}
                            <p className={styles.lineaComando}>
                                <span className={styles.prompt} aria-hidden="true">$</span>
                                <label className={styles.soloLectores} htmlFor="terminal-input">
                                    Escribí un comando. Probá help para ver la lista.
                                </label>
                                <input
                                    id="terminal-input"
                                    ref={inputRef}
                                    className={styles.input}
                                    value={entrada}
                                    onChange={(e) => setEntrada(e.target.value)}
                                    onKeyDown={alPresionar}
                                    // Sin autoFocus a propósito: al cargar robaría el
                                    // scroll y abriría el teclado en el teléfono.
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                />
                            </p>
                        </div>
                    )}
                </div>

                {/* La salida de los comandos se anuncia a los lectores de
                    pantalla; la intro ya existe como texto más abajo. */}
                <p className={styles.soloLectores} aria-live="polite">
                    {historial.length > 0 &&
                        historial[historial.length - 1].lineas.map((l) => l.texto).join('. ')}
                </p>

                <p className={styles.soloLectores}>{RESUMEN_ACCESIBLE}</p>
            </div>
        </div>
    );
};

export default Terminal;
