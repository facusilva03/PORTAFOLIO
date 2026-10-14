import Seccion from '../components/Seccion';
import Reveal from '../components/Reveal';
import { FORMACION } from '../data/skills';
import styles from './About.module.css';

const ESTUDIOS = [
    { titulo: 'Lic. en Sistemas de Información', lugar: 'Universidad Champagnat', fecha: '2025 — presente' },
    { titulo: 'Lic. en Ciberseguridad', lugar: 'UNDEF', fecha: '2026 — presente' },
];

const About = () => (
    <Seccion id="about" eyebrow="01 · Quién soy" titulo="Construir sistemas entendiendo cómo pueden romperse.">
        <div className={styles.columnas}>
            <Reveal className={styles.texto} retraso={0.16}>
                <p>Soy estudiante de Sistemas y Ciberseguridad, enfocado en el desarrollo de aplicaciones backend y el diseño de sistemas seguros.</p>
                <p>Me interesa entender cómo funcionan los sistemas en profundidad, cómo se construyen y cómo pueden ser vulnerados, para luego diseñarlos de forma más robusta.</p>
                {/* Lo que se afirma acá tiene que coincidir con lo que muestran
                    los proyectos: son Django y Laravel, no Node. */}
                <p>Hoy trabajo con Python y Django —tengo un sistema en producción, en uso diario— y con PHP y Laravel, siempre sobre bases de datos relacionales. En paralelo estoy profundizando en Java.</p>
            </Reveal>

            <Reveal as="aside" className={styles.lateral} retraso={0.24}>
                <div>
                    <h3 className={styles.rotulo}>Estudios</h3>
                    <ul className={styles.estudios}>
                        {ESTUDIOS.map((e) => (
                            <li key={e.titulo}>
                                <strong>{e.titulo}</strong>
                                <span>{e.lugar} · {e.fecha}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className={styles.rotulo}>De la cursada al entregable</h3>
                    <ul className={styles.formacion}>
                        {FORMACION.map((f) => (
                            <li key={f.materia}>
                                <strong>{f.materia}</strong>
                                <p>{f.resultado}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Reveal>
        </div>
    </Seccion>
);

export default About;
