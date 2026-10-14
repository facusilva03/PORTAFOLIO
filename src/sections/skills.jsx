import Seccion from '../components/Seccion';
import Reveal from '../components/Reveal';
import { SKILLS, PROYECTOS, NOCIONES } from '../data/skills';
import styles from './skills.module.css';

/* El nivel de cada skill sale de la evidencia, no de una autoevaluación:
   con proyecto detrás, solo de un entregable de la facultad, o apenas
   nociones básicas. Ver el criterio en src/data/skills.js. */
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

/* Una skill por renglón: el nombre y, a la derecha, dónde se usó. Sirve igual para
   las de proyectos (con qué proyecto) y para las de la cursada (en qué materia). */
const Lista = ({ skills, detalle }) => (
    <ul className={styles.grilla}>
        {skills.map((s) => (
            <li key={s.name} className={styles.item}>
                <strong className={s.featured ? styles.destacada : ''}>{s.name}</strong>
                <span>{detalle(s)}</span>
            </li>
        ))}
    </ul>
);

/* Texto suelto, uno por renglón (hoy solo "Nociones básicas"). */
const Texto = ({ items }) => (
    <ul className={`${styles.texto} ${styles.apilado}`}>
        {items.map((nombre) => <li key={nombre}>{nombre}</li>)}
    </ul>
);

const Skills = () => (
    <Seccion id="skills" eyebrow="02 · Lo que sé hacer" titulo="Lo que uso, y dónde lo usé.">
        <div className={styles.niveles}>
            <Nivel titulo="En uso real" detalle="Con un proyecto que se puede abrir">
                <Lista skills={enUsoReal} detalle={(s) => dondeSeUso(s.uso)} />
            </Nivel>

            <Nivel titulo="De la cursada" detalle="Lo que vi o estoy viendo en la facultad" retraso={0.06}>
                <Lista skills={deLaCursada} detalle={(s) => s.cursada} />
            </Nivel>

            <Nivel titulo="Nociones básicas" detalle="Todavía sin proyecto" retraso={0.1}>
                <Texto items={NOCIONES} />
            </Nivel>
        </div>

        <Reveal as="p" className={styles.nota}>
            Los nombres en <span>violeta</span> son los de mayor dominio actual.
        </Reveal>
    </Seccion>
);

export default Skills;
