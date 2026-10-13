import Seccion from '../components/Seccion';
import Reveal from '../components/Reveal';
import { SKILLS } from '../data/skills';
import styles from './skills.module.css';

const Skills = () => (
    <Seccion id="skills" eyebrow="02 · Lo que sé hacer" titulo="Skills por área, no por lista de lenguajes.">
        <div className={styles.grupos}>
            {SKILLS.map((grupo, i) => (
                <Reveal key={grupo.category} className={styles.grupo} retraso={i * 0.06}>
                    <h3 className={styles.categoria}>
                        {grupo.category}
                        <small>{grupo.items.length} skills</small>
                    </h3>
                    <ul className={styles.chips}>
                        {grupo.items.map((skill) => (
                            <li
                                key={skill.name}
                                className={`${styles.chip} ${skill.featured ? styles.destacado : ''}`}
                            >
                                {skill.name}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            ))}
        </div>

        <Reveal as="p" className={styles.nota}>
            Los chips en <span>violeta</span> son los de mayor dominio actual.
        </Reveal>
    </Seccion>
);

export default Skills;
