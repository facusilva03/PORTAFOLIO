import Seccion from '../components/Seccion';
import Reveal from '../components/Reveal';
import { SKILLS, PROYECTOS, EN_ESTUDIO } from '../data/skills';
import styles from './skills.module.css';

/* El nivel de cada skill sale de la evidencia, no de una autoevaluación:
   con proyecto detrás, solo de un entregable de la facultad, o todavía en
   estudio. Ver el criterio en src/data/skills.js. */
const enUsoReal = SKILLS.filter((s) => /[PLDW]/.test(s.uso));
const deLaCursada = SKILLS.filter((s) => s.uso === 'F');

const dondeSeUso = (uso) => [...uso].map((letra) => PROYECTOS[letra]).join(' · ');

const Nivel = ({ titulo, detalle, retraso, children }) => (
    <Reveal className={styles.nivel} retraso={retraso}>
        <div className={styles.cabecera}>
            <h3>{titulo}</h3>
            <p>{detalle}</p>
        </div>
        {children}
    </Reveal>
);

/* Acepta skills ({ name, featured }) o textos sueltos. */
const Texto = ({ items, apilado = false }) => (
    <ul className={`${styles.texto} ${apilado ? styles.apilado : ''}`}>
        {items.map((item) => {
            const { name, featured } = typeof item === 'string' ? { name: item, featured: false } : item;
            return <li key={name} className={featured ? styles.destacada : ''}>{name}</li>;
        })}
    </ul>
);

const Skills = () => (
    <Seccion id="skills" eyebrow="02 · Lo que sé hacer" titulo="Lo que uso, y dónde lo usé.">
        <div className={styles.niveles}>
            <Nivel titulo="En uso real" detalle="Con un proyecto que se puede abrir">
                <ul className={styles.grilla}>
                    {enUsoReal.map((s) => (
                        <li key={s.name} className={styles.item}>
                            <strong className={s.featured ? styles.destacada : ''}>{s.name}</strong>
                            <span>{dondeSeUso(s.uso)}</span>
                        </li>
                    ))}
                </ul>
            </Nivel>

            <Nivel titulo="De la cursada" detalle="Entregables de la facultad" retraso={0.06}>
                <Texto items={deLaCursada} />
            </Nivel>

            <Nivel titulo="En estudio" detalle="Todavía sin proyecto" retraso={0.1}>
                <Texto items={EN_ESTUDIO} apilado />
            </Nivel>
        </div>

        <Reveal as="p" className={styles.nota}>
            Los nombres en <span>violeta</span> son los de mayor dominio actual.
        </Reveal>
    </Seccion>
);

export default Skills;
