import styles from './services.module.css';

const SERVICES = [
    {
        number: '01',
        tag: 'Backend',
        title: 'APIs & Lógica de negocio',
        description:
            'Desarrollo de APIs REST funcionales, escalables y bien documentadas. Arquitectura limpia, manejo de errores y enfoque en rendimiento desde el diseño.',
        techs: ['Node.js', 'Express', 'REST'],
    },
    {
        number: '02',
        tag: 'Databases',
        title: 'Modelado & Diseño de bases de datos',
        description:
            'Diseño de esquemas relacionales optimizados para integridad y eficiencia. Estructuras que se adaptan al dominio del negocio y escalan con él.',
        techs: ['PostgreSQL', 'SQL'],
    },
    {
        number: '03',
        tag: 'Security',
        title: 'Seguridad en aplicaciones web',
        description:
            'Implementación de buenas prácticas basadas en OWASP Top 10: validación de inputs, protección contra XSS, SQLi y autenticación segura.',
        techs: ['OWASP Top 10', 'Web Security', 'Kali Linux'],
    },
    {
        number: '04',
        tag: 'Full Stack',
        title: 'Aplicaciones web completas',
        description:
            'De la idea al producto terminado. Frontend en React integrado con backend Node.js y base de datos PostgreSQL, listo para producción.',
        techs: ['React', 'Node.js', 'PostgreSQL'],
    },
];

const Services = () => {
    return (
        <section className={styles.servicesSection} id="services">

            <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Qué ofrezco</p>
                <h2 className={styles.sectionTitle}>Services</h2>
            </div>

            <div className={styles.grid}>
                {SERVICES.map((service) => (
                    <article key={service.number} className={styles.card}>

                        {/* Número decorativo absoluto — esquina superior derecha */}
                        <span className={styles.cardNumber}>{service.number}</span>

                        {/* Tag de categoría */}
                        <p className={styles.cardTag}>{service.tag}</p>

                        {/* Título */}
                        <h3 className={styles.cardTitle}>{service.title}</h3>

                        {/* Descripción */}
                        <p className={styles.cardDesc}>{service.description}</p>

                        {/* Pills de tecnología */}
                        <div className={styles.techRow}>
                            {service.techs.map((tech) => (
                                <span key={tech} className={styles.techPill}>{tech}</span>
                            ))}
                        </div>

                    </article>
                ))}
            </div>

        </section>
    );
};

export default Services;
