import styles from './skills.module.css';

const SKILLS = [
    {
        category: 'Frontend',
        items: [
            { name: 'React', featured: true },
            { name: 'JavaScript', featured: true },
            { name: 'HTML / CSS', featured: false },
        ],
    },
    {
        category: 'Backend & Databases',
        items: [
            { name: 'Node.js', featured: true },
            { name: 'REST APIs', featured: true },
            { name: 'PostgreSQL', featured: false },
            { name: 'SQL', featured: false },
        ],
    },
    {
        category: 'Security',
        items: [
            { name: 'Linux (Kali)', featured: true },
            { name: 'Networking Basics', featured: true },
            { name: 'OWASP Top 10', featured: false },
            { name: 'Web Security', featured: false },
        ],
    },
    {
        category: 'Tools',
        items: [
            { name: 'Git', featured: true },
            { name: 'Docker', featured: false },
        ],
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
