import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import ProyectoDetalle from '../components/ProyectoDetalle';
import styles from './Works.module.css';

/*
  span: cuántas columnas ocupa la card en el grid de 3 cols.
  size: controla variaciones de padding/tipografía — 'lg' | 'md' | 'sm'.
  status: badge opcional (en desarrollo, live, etc.)
  statusTipo: 'live' pinta el badge en verde; sin él queda ámbar (en curso).
  github: null cuando el repo es privado. Un botón que promete código y
          devuelve un 404 resta más de lo que suma — en ese caso se explica
          en caso.repoNota, que el panel muestra en el pie.
  caso: contenido del panel de detalle. Lo que va acá tiene que ser
        verificable contra el código o contra lo que pasó de verdad —
        si no se puede sostener en una entrevista, no entra.
*/
const WORKS = [
    {
        id: '01',
        category: 'Gestión · Fintech',
        title: 'Sistema de Préstamos',
        description:
            'Gestión de préstamos con cuotas diarias, en producción y en uso real bajo dominio propio. Django y SQLite, con cálculo de amortización en Decimal, acceso restringido por lista de correos autorizados, respaldos cifrados automáticos e integración continua que bloquea el despliegue si fallan los tests.',
        stack: ['Python', 'Django', 'SQLite', 'Azure', 'Cloudflare', 'GitHub Actions'],
        github: null,
        live: null,
        span: 2,
        size: 'lg',
        status: 'En producción',
        statusTipo: 'live',
        caso: {
            resumen:
                'Empezó como reemplazo de una planilla de Excel y terminó siendo un despliegue completo: hosting, dominio propio, control de acceso por identidad, respaldos cifrados y CI. Es el proyecto donde más aprendí, y casi todo lo aprendí rompiendo cosas.',
            problema:
                'Los préstamos se llevaban en una planilla. Cada cuota se calculaba a mano, no quedaba registro de quién cobró qué ni cuándo, y un error de tipeo se arrastraba sin que nadie lo notara. Además existía en una sola computadora: quien cobraba en la calle no podía consultar ni registrar nada hasta volver a casa.',
            decisiones: [
                {
                    t: 'Decimal, nunca float',
                    d: 'La plata no se representa con punto flotante: 0.1 + 0.2 no da 0.3. Todo el cálculo de amortización usa Decimal, que opera en base 10 y no arrastra ese error a lo largo de decenas de cuotas.',
                },
                {
                    t: 'SQLite en vez de un motor aparte',
                    d: 'Lo usan dos personas. Un Postgres administrado sumaba un servicio más para mantener y pagar sin resolver ningún problema que existiera de verdad. Si la escala cambia, migrar es un trabajo acotado; anticiparlo hoy era complejidad sin uso.',
                },
                {
                    t: 'El acceso se corta antes del login',
                    d: 'En vez de exponer el formulario de login a internet y confiar solo en la contraseña, hay una lista de correos autorizados por delante de la aplicación. Quien no está en la lista no llega ni a ver la pantalla de login; la contraseña pasa a ser la segunda barrera, no la única.',
                },
                {
                    t: 'Los respaldos copian, no sincronizan',
                    d: 'La subida a la nube usa copy y no sync. sync deja el destino idéntico al origen: si un archivo desaparece de la máquina, también desaparece del respaldo. copy solo agrega. Ningún respaldo viejo se borra solo, y esa fue una condición explícita del proyecto.',
                },
            ],
            obstaculos: [
                {
                    t: 'La base de datos vivía justo donde el deploy la iba a borrar',
                    d: 'En el hosting elegido, la carpeta de la aplicación se reescribe entera en cada publicación, y la base estaba adentro. El primer deploy después de cargar datos reales se los habría llevado puestos. Apareció al revisar qué rutas persisten, antes de migrar nada: la base y los archivos subidos se movieron a la partición que sobrevive los despliegues.',
                },
                {
                    t: 'El plan gratuito no permitía dominio propio',
                    d: 'Me enteré del límite recién al intentar enlazar el dominio. En vez de pagar el salto de plan, puse un Worker de Cloudflare adelante que recibe el dominio y reescribe la cabecera Host hacia la dirección original del hosting. El dominio funciona y el costo sigue en cero.',
                },
                {
                    t: 'La dirección original del hosting salteaba el control de acceso',
                    d: 'Revisando el despliegue encontré que entrando por la URL que da el hosting se llegaba al login sin pasar por la lista de correos: el control estaba en el dominio, no en la aplicación. Lo cerré con un secreto compartido en una cabecera que el proxy agrega y la aplicación exige. El middleware falla cerrado: si el secreto no está configurado en producción, bloquea en vez de dejar pasar.',
                },
                {
                    t: 'Una auditoría con IA que había que verificar, no creer',
                    d: 'Sometí el código a una auditoría asistida por IA y revisé cada hallazgo contra el código antes de tocar nada. De nueve reportados, cuatro eran defectos reales —entre ellos un fallo de control de acceso en el panel de administración, donde un usuario podía asociar registros de otro—, dos estaban sobredimensionados y uno, marcado como crítico, era un falso positivo. Los reales se corrigieron con tests de regresión que fallan si el arreglo se revierte.',
                },
            ],
            estado:
                'En producción bajo dominio propio y en uso diario. Respaldos cifrados automáticos hacia la nube, integración continua que corre los tests en cada push y bloquea el despliegue si alguno falla, y revisión semanal de dependencias con vulnerabilidades conocidas.',
            repoNota:
                'No publico el enlace ni el repositorio: la aplicación maneja datos reales de clientes y el acceso está limitado a una lista de correos autorizados. Puedo mostrar el código y recorrer el despliegue en una entrevista.',
        },
    },
    {
        id: '02',
        category: 'Gestión · Logística',
        title: 'LogiTrack',
        description:
            'Proyecto universitario de Base de Datos II. Gestión de cadena logística terrestre en PHP puro, sin frameworks y sin JavaScript: cuatro roles con dashboards diferenciados, trazabilidad completa del envío y reglas de negocio automatizadas en el motor sobre 19 tablas en 3FN.',
        stack: ['PHP 8', 'MariaDB', 'PDO', 'MVC', 'POO', 'SQL'],
        github: null,
        live: null,
        span: 1,
        size: 'md',
        status: null,
        caso: {
            resumen:
                'Proyecto de Base de Datos II en la Universidad Champagnat. Administra el ciclo completo de un envío, desde que entra a la sucursal hasta que se entrega. Escrito sin frameworks y sin JavaScript a propósito: toda la lógica y toda la seguridad viven en el servidor y en la base.',
            problema:
                'Una empresa de logística terrestre coordina vehículos, choferes, paquetes, sucursales y clientes al mismo tiempo, y cada uno de esos actores ve una parte distinta del sistema. El desafío no era mostrar datos, sino sostener la trazabilidad de cada envío y la consistencia de los datos cuando una operación falla por la mitad.',
            decisiones: [
                {
                    t: 'Las reglas de negocio viven en el motor, no en la aplicación',
                    d: 'Un trigger propaga el estado "Demorado" a todos los envíos de un viaje apenas se registra un incidente, y un procedimiento almacenado cierra el viaje liberando chofer y vehículo en una sola transacción atómica. Puesta ahí, la regla se cumple aunque el cambio entre por una vía que no sea la aplicación.',
                },
                {
                    t: 'Toda la seguridad del lado del servidor',
                    d: 'No hay JavaScript, así que ninguna validación del cliente puede funcionar como única barrera. PDO con consultas preparadas en cada query, password_hash() para las credenciales, session_regenerate_id() contra Session Fixation y expiración de sesión a los 30 minutos con renovación por actividad.',
                },
                {
                    t: 'Lista blanca para el ordenamiento dinámico',
                    d: 'PDO no puede parametrizar palabras reservadas como ASC o DESC, y ese es justo el punto donde una tabla ordenable se convierte en una inyección. El controlador valida contra una lista blanca antes de construir la query.',
                },
                {
                    t: 'Transacciones ACID en las operaciones críticas',
                    d: 'Crear un envío, dar de alta personal y cerrar un viaje tocan varias tablas cada uno. Van con beginTransaction/commit/rollBack para que una caída de conexión no deje registros a medias.',
                },
                {
                    t: 'Probado con volumen, no con datos de juguete',
                    d: 'El seed carga unos 16.000 registros —800 clientes, 2.000 envíos, 500 viajes, 150 choferes— para medir las consultas contra algo parecido a la operación real. Sobre eso se agregaron índices compuestos en el historial de estados y una vista con los JOINs del dashboard ya resueltos.',
                },
                {
                    t: 'Seguimiento público sin exponer datos personales',
                    d: 'Cualquiera con el número de tracking puede consultar el estado sin iniciar sesión, pero esa vista devuelve el estado del envío y nada más: los datos del destinatario no salen por ahí.',
                },
            ],
            obstaculos: [
                {
                    t: 'El legajo no se podía generar en un solo INSERT',
                    d: 'El formato final del legajo (EMP-0001) depende del ID que la base todavía no asignó al momento de insertar. Se resolvió en tres pasos dentro de la misma transacción: INSERT con un identificador temporal único, lectura del lastInsertId() y UPDATE con el formato definitivo.',
                },
                {
                    t: 'El mismo cliente entraba dos veces',
                    d: 'Al registrar un envío se creaba un cliente nuevo aunque ya existiera. Se aplicó find-or-create por DNI dentro de la transacción del envío: si existe se reutiliza, si no se crea, y ante un fallo no queda ninguno de los dos a medias.',
                },
                {
                    t: 'La máquina de estados ensuciaba el historial',
                    d: 'El flujo original permitía transiciones ambiguas y el historial terminaba siendo imposible de consultar con confianza. Se depuró a un flujo lineal inequívoco, y las consultas del dashboard pasaron a resolverse con subconsultas sobre MAX(id_hist).',
                },
            ],
            estado:
                'Terminado y entregado. 19 tablas en tercera forma normal, cuatro roles con permisos granulares, un trigger, un procedimiento almacenado, una vista SQL e índices compuestos. Es el proyecto donde más trabajé el diseño relacional y la automatización a nivel de motor.',
            repoNota: 'Repositorio privado por tratarse de un trabajo académico entregado.',
        },
    },
    {
        id: '03',
        category: 'Web · Gastronomía',
        title: 'DeleitarTE',
        description:
            'Aplicación web para un servicio artesanal de tardes de té en Mendoza: sitio público con los paquetes y panel interno para gestionar reservas con estados y trazabilidad. Laravel 12 con React e Inertia, Tailwind y MariaDB.',
        stack: ['Laravel 12', 'PHP 8.4', 'React', 'Inertia.js', 'Tailwind CSS', 'MariaDB'],
        github: null,
        live: null,
        span: 1,
        size: 'md',
        status: 'En desarrollo',
        caso: {
            resumen:
                'Aplicación para un emprendimiento real de tardes de té en Mendoza. El sitio público muestra los paquetes; detrás hay un flujo de reservas con estados para que las dueñas dejen de coordinar todo de memoria.',
            problema:
                'Las reservas se coordinaban enteramente por WhatsApp: consulta, disponibilidad, seña y confirmación mezcladas en una misma conversación. No quedaba registro de en qué punto estaba cada pedido ni de quién lo había movido, y las reglas del negocio —mínimo de personas, una semana de anticipación— dependían de que alguien se acordara.',
            decisiones: [
                {
                    t: 'Sin carrito de compras, a propósito',
                    d: 'No es una tienda: cada evento tiene mínimo de personas, siete días de anticipación y coordinación de fecha. Un carrito prometería una compra inmediata que el negocio no puede cumplir. En su lugar hay enlaces a WhatsApp con el mensaje ya armado según el paquete elegido, que es como el negocio vende de verdad.',
                },
                {
                    t: 'Inertia en lugar de una API separada',
                    d: 'Permite usar React en el frontend sin montar una API REST aparte ni manejar tokens: el backend entrega las props directamente a los componentes. Un proyecto de este tamaño no justifica dos aplicaciones desplegadas y versionadas por separado.',
                },
                {
                    t: 'El historial de la reserva es parte del modelo',
                    d: 'Un observer intercepta el cambio de estado de cada reserva y registra estado anterior, estado nuevo, qué usuario lo hizo y desde qué IP. Si alguien pregunta por qué una reserva se canceló, la respuesta está en los datos y no en la memoria de nadie.',
                },
            ],
            obstaculos: [
                {
                    t: 'El canal de venta del negocio rompía el renderizado del sitio',
                    d: 'React con Inertia sin SSR arma la página en el navegador, así que el HTML inicial llega casi vacío. Los bots que generan las vistas previas de WhatsApp no ejecutan JavaScript: el link compartido salía en blanco, justo en el canal por el que el negocio vende. Entender que la causa era la arquitectura elegida y no un error de código cambió la planificación del despliegue, porque la solución —SSR de Inertia— necesita un proceso Node corriendo de forma permanente y eso descarta el hosting compartido.',
                },
            ],
            estado:
                'En desarrollo. El sitio público está armado y el flujo de reservas —pendiente de revisión, aprobada, seña pendiente, confirmada— está modelado en la base con su historial; implementar los controladores de ese flujo es lo que sigue.',
            repoNota:
                'El repositorio todavía no es público: es el sistema de un cliente real y está en desarrollo activo.',
        },
    },
    {
        id: '04',
        category: 'Frontend · Dev Tools',
        title: 'Portfolio Personal',
        description:
            'Este mismo sitio. React y Vite con CSS Modules para aislar estilos por componente, sin backend: el formulario de contacto sale por un servicio externo y el despliegue es automático en cada push.',
        stack: ['React', 'Vite', 'CSS Modules', 'JavaScript', 'Vercel'],
        github: 'https://github.com/facusilva03/PORTAFOLIO',
        live: 'https://portafolio-omega-opal.vercel.app',
        span: 2,
        size: 'md',
        status: null,
        caso: {
            resumen:
                'Diseñado y construido desde cero, sin plantilla. La decisión de fondo fue no agregar nada que no estuviera resolviendo un problema real, empezando por el backend que no tiene.',
            problema:
                'Necesitaba un lugar propio donde mostrar en qué trabajo, que se pudiera actualizar rápido y que no costara nada mantener ni dejara superficie expuesta por el solo hecho de existir.',
            decisiones: [
                {
                    t: 'Estático, sin backend',
                    d: 'No hay nada que persistir ni sesiones que administrar: el contenido cambia cuando yo edito el código. Un backend agregaría superficie de ataque y costo mensual a cambio de nada. El formulario de contacto sale por un servicio externo, sin servidor propio que mantener.',
                },
                {
                    t: 'Sin teléfono personal en la página',
                    d: 'Un número en un sitio público e indexable es un vector de spam y de ingeniería social. Para contactarme están el formulario y LinkedIn, que puedo cortar si hace falta.',
                },
                {
                    t: 'Una terminal en lugar de una foto de perfil',
                    d: 'La foto decía "este soy yo" y nada más. La terminal dice lo mismo y además muestra en qué trabajo, en el mismo espacio. Lo que escribe es real y verificable, no decorado.',
                },
                {
                    t: 'Accesible por defecto, no como agregado',
                    d: 'La animación de la terminal está oculta a los lectores de pantalla y el contenido real existe aparte como texto. Quien tiene activado "reducir movimiento" en su sistema ve todo escrito de entrada, sin animación.',
                },
            ],
            obstaculos: [
                {
                    t: 'Bugs que solo aparecieron en una pantalla de verdad',
                    d: 'La terminal heredaba el centrado de texto del hero, y el borde desplazado 8px se salía de la pantalla a 360px de ancho. Ninguno de los dos se veía achicando la ventana del navegador en la computadora: aparecieron al tomar capturas reales en tamaño de teléfono.',
                },
            ],
            estado:
                'En línea. Cada push a la rama principal lo vuelve a desplegar, con verificación de estilo y compilación antes de subir.',
        },
    },
];

const Works = () => {
    // null = ningún panel abierto. Guardamos el proyecto entero y no el id
    // para no tener que buscarlo de nuevo en cada render.
    const [proyectoAbierto, setProyectoAbierto] = useState(null);

    return (
        <section className={styles.worksSection} id="works">

            <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Lo que construí</p>
                <h2 className={styles.sectionTitle}>Works</h2>
            </div>

            <div className={styles.grid}>
                {WORKS.map((work) => (
                    <article
                        key={work.id}
                        className={`${styles.card} ${styles[`span${work.span}`]} ${styles[`size${work.size.charAt(0).toUpperCase() + work.size.slice(1)}`]}`}
                    >
                        {/* Fila superior: número + badge de estado */}
                        <div className={styles.cardTop}>
                            <span className={styles.cardNumber}>{work.id}</span>
                            {work.status && (
                                <span
                                    className={`${styles.statusBadge} ${work.statusTipo === 'live' ? styles.statusBadgeLive : ''}`}
                                >
                                    {work.status}
                                </span>
                            )}
                        </div>

                        {/* Categoría */}
                        <p className={styles.cardCategory}>{work.category}</p>

                        {/* Título */}
                        <h3 className={styles.cardTitle}>{work.title}</h3>

                        {/* Descripción */}
                        <p className={styles.cardDesc}>{work.description}</p>

                        {/* Stack */}
                        <div className={styles.stackRow}>
                            {work.stack.map((tech) => (
                                <span key={tech} className={styles.stackPill}>{tech}</span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className={styles.linksRow}>
                            {/* La card entera no es clickeable a propósito: ya
                                contiene links, y anidar un botón alrededor de
                                ellos rompe la navegación por teclado. */}
                            <button
                                type="button"
                                className={`${styles.linkBtn} ${styles.linkBtnCaso}`}
                                onClick={() => setProyectoAbierto(work)}
                                aria-label={`Ver el caso completo de ${work.title}`}
                            >
                                <span>Ver el caso</span>
                                <FaArrowRight size={11} />
                            </button>

                            {work.github && (
                                <a
                                    href={work.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.linkBtn}
                                >
                                    <FaGithub size={13} />
                                    <span>GitHub</span>
                                </a>
                            )}
                            {work.live && (
                                <a
                                    href={work.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`${styles.linkBtn} ${styles.linkBtnLive}`}
                                >
                                    <FaExternalLinkAlt size={11} />
                                    <span>Live</span>
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {proyectoAbierto && (
                <ProyectoDetalle
                    proyecto={proyectoAbierto}
                    onCerrar={() => setProyectoAbierto(null)}
                />
            )}

        </section>
    );
};

export default Works;
