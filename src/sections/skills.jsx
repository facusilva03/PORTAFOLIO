import styles from './skills.module.css';

/*
  Las categorías están por ÁREA, no por lenguaje. El perfil no es "sé estos
  lenguajes" sino "entiendo estos sistemas", que es lo que corresponde a
  alguien que apunta a seguridad de aplicaciones.

  `featured` significa "mayor dominio actual" — lo dice la nota al pie — así
  que solo va donde hay algo concreto detrás: un proyecto que se puede abrir,
  una infraestructura que se armó, un entregable de cátedra. Lo que está en
  curso entra sin destacar. Node.js y Docker salieron de la lista por no
  tener nada que los respalde.
*/
const SKILLS = [
    {
        category: 'Lenguajes',
        items: [
            { name: 'JavaScript / React', featured: true },
            { name: 'Python / Django', featured: true },
            { name: 'PHP / Laravel', featured: true },
            { name: 'SQL', featured: false },
            { name: 'C', featured: false },
            { name: 'Java', featured: false },
            { name: 'HTML / CSS', featured: false },
        ],
    },
    {
        category: 'Bases de datos',
        items: [
            { name: 'Diseño relacional (3FN)', featured: true },
            { name: 'Triggers y procedimientos', featured: true },
            { name: 'Transacciones e integridad', featured: false },
            { name: 'MariaDB · SQLite · PostgreSQL', featured: false },
        ],
    },
    {
        category: 'Redes',
        items: [
            { name: 'Modelo OSI / TCP-IP', featured: true },
            { name: 'Direccionamiento y subnetting', featured: false },
            { name: 'Análisis de tráfico', featured: false },
            { name: 'Wireshark · tcpdump · nmap', featured: false },
        ],
    },
    {
        category: 'Sistemas e infraestructura',
        items: [
            { name: 'Linux (Kali · Ubuntu Server)', featured: true },
            { name: 'Active Directory', featured: true },
            { name: 'Servicios de red (FTP · Apache · Squid)', featured: false },
            { name: 'Virtualización', featured: false },
            { name: 'Azure · Cloudflare', featured: false },
            { name: 'Git · CI/CD', featured: false },
        ],
    },
    {
        category: 'Seguridad',
        items: [
            { name: 'OWASP Top 10 aplicado', featured: true },
            { name: 'Auditoría de código', featured: false },
            { name: 'Control de acceso y autenticación', featured: false },
            { name: 'Despliegue seguro y respaldos', featured: false },
        ],
    },
];

/*
  Lo que diferencia un portfolio de estudiante no es la lista de materias
  —todos cursan lo mismo— sino qué quedó construido en cada una. Por eso
  acá va la cátedra junto al entregable, no la nota ni el año.
*/
const FORMACION = [
    {
        materia: 'Base de Datos II',
        carrera: 'Lic. en Sistemas de Información · Universidad Champagnat',
        resultado:
            'LogiTrack: 19 tablas en tercera forma normal, triggers de auditoría, procedimientos almacenados y vistas, medido contra un seed de unos 16.000 registros.',
    },
    {
        materia: 'Sistemas Operativos II',
        carrera: 'Lic. en Sistemas de Información · Universidad Champagnat',
        resultado:
            'Servidor Ubuntu con Active Directory, FTP con chroot y proxy Apache/Squid. Después la misma infraestructura sobre Windows Server Core, administrada enteramente por PowerShell, sin interfaz gráfica.',
    },
    {
        materia: 'Redes I',
        carrera: 'Lic. en Sistemas de Información · Universidad Champagnat',
        resultado:
            'Documentación propia que cruza el modelo OSI/TCP-IP con las técnicas y herramientas que operan en cada capa, de ARP spoofing a los tipos de escaneo de nmap.',
    },
    {
        materia: 'Sistemas Operativos I · Arquitectura',
        carrera: 'Lic. en Ciberseguridad · UNDEF',
        resultado:
            'Representación binaria, hexadecimal, complemento a dos e IEEE-754: la base para leer memoria y entender qué pasa por debajo del código, no solo dentro de él.',
    },
];

/*
  Las soft skills tienen una estructura diferente a las técnicas:
  además del nombre, tienen una descripción corta que contextualiza
  por qué esa habilidad es relevante para el perfil.
  Esto las hace más creíbles — no es solo una palabra, es una afirmación.
*/
const SOFT_SKILLS = [
    {
        name: 'Resolución de problemas',
        description: 'Capacidad de descomponer problemas complejos en partes manejables y encontrar soluciones concretas.',
    },
    {
        name: 'Aprendizaje autónomo',
        description: 'Aprendí la mayor parte de lo que sé de forma autodidacta, buscando recursos, experimentando y iterando.',
    },
    {
        name: 'Pensamiento crítico',
        description: 'Antes de implementar, analizo el problema desde distintos ángulos — especialmente relevante en seguridad.',
    },
    {
        name: 'Atención al detalle',
        description: 'En desarrollo y en seguridad, los errores viven en los detalles. Un carácter mal puesto puede ser una vulnerabilidad.',
    },
    {
        name: 'Pensamiento analítico',
        description: 'Entender cómo funciona un sistema antes de modificarlo — base del desarrollo backend y del análisis de seguridad.',
    },
];

const Skills = () => {
    return (
        <section className={styles.skillsSection} id="skills">

            <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Lo que sé hacer</p>
                <h2 className={styles.sectionTitle}>Skills</h2>
            </div>

            {/* ── SKILLS TÉCNICAS ── */}
            <div className={styles.list}>
                {SKILLS.map((group) => (
                    <div key={group.category} className={styles.categoryRow}>
                        <div className={styles.categoryLabel}>
                            <span className={styles.categoryName}>{group.category}</span>
                            <span className={styles.categoryCount}>{group.items.length} skills</span>
                        </div>
                        <div className={styles.pillsCol}>
                            <div className={styles.pillsRow}>
                                {group.items.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className={`${styles.pill} ${skill.featured ? styles.pillFeatured : ''}`}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className={styles.footnote}>
                Las skills en <span className={styles.footnoteAccent}>violeta</span> son las de mayor dominio actual.
            </p>

            {/* ── FORMACIÓN APLICADA ── */}
            <div className={styles.softHeader}>
                <p className={styles.softEyebrow}>De la cursada al entregable</p>
                <h3 className={styles.softTitle}>Formación aplicada</h3>
            </div>

            <div className={styles.formacionList}>
                {FORMACION.map((item) => (
                    <div key={item.materia} className={styles.formacionRow}>
                        <div className={styles.formacionMateria}>
                            <span className={styles.formacionNombre}>{item.materia}</span>
                            <span className={styles.formacionCarrera}>{item.carrera}</span>
                        </div>
                        <p className={styles.formacionResultado}>{item.resultado}</p>
                    </div>
                ))}
            </div>

            {/* ── SOFT SKILLS ── */}
            <div className={styles.softHeader}>
                <p className={styles.softEyebrow}>Más allá del código</p>
                <h3 className={styles.softTitle}>Habilidades personales</h3>
            </div>

            {/*
              Grid de 5 cards — una por soft skill.
              Cada card tiene un número decorativo, el nombre
              y una descripción corta.
              El número usa un contador CSS automático:
              counter-increment en cada card y content: counter()
              en el ::before. Así no hay que escribir "01", "02", etc
              a mano — si reordenás las cards, los números se actualizan solos.
            */}
            <div className={styles.softGrid}>
                {SOFT_SKILLS.map((skill, index) => (
                    <div key={skill.name} className={styles.softCard}>
                        {/*
                          String.padStart(2, '0') formatea el número:
                          0 → "01", 1 → "02", etc.
                          index + 1 porque los índices de array empiezan en 0.
                        */}
                        <span className={styles.softNumber}>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <h4 className={styles.softName}>{skill.name}</h4>
                        <p className={styles.softDesc}>{skill.description}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Skills;
