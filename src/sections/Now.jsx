import Seccion from '../components/Seccion';
import Reveal from '../components/Reveal';
import styles from './Now.module.css';

/*
  Solo entra lo que se puede comprobar hoy: el TP de Java existe en la
  máquina, la ruta de ciberseguridad vive en un repositorio y Redes I es una
  materia que Facu está cursando (lo dijo él: direccionamiento IP, hosts,
  subredes, máscaras, DHCP y las capas del modelo OSI).
*/
const AHORA = [
    {
        area: 'Java · POO',
        titulo: 'Inventario de un laboratorio de ciberseguridad',
        texto: 'Trabajo práctico de la facultad: máquinas Linux y Windows con sus puertos y servicios. Java con SQLite por JDBC, separado en DAO, vistas y controladores.',
        estado: 'en curso',
    },
    {
        area: 'Ciberseguridad',
        titulo: 'Ruta de estudio propia, documentada en un repositorio',
        texto: 'Fundamentos de Linux terminado: procesos, almacenamiento y labs aislados. Ahora, redes: el modelo OSI/TCP-IP aplicado a seguridad.',
        estado: '02 · redes',
    },
    {
        area: 'Redes I',
        titulo: 'Redes, en la facultad',
        texto: 'Direccionamiento IP, hosts, subredes y máscaras, DHCP y todas las capas del modelo OSI.',
        estado: 'cursando',
    },
];

const Now = () => (
    <Seccion id="now" eyebrow="04 · Ahora" titulo="En qué estoy trabajando hoy.">
        <ul className={styles.lista}>
            {AHORA.map((a, i) => (
                <Reveal as="li" key={a.titulo} className={styles.fila} retraso={i * 0.08}>
                    <span className={styles.area}>{a.area}</span>
                    <div>
                        <h3>{a.titulo}</h3>
                        <p>{a.texto}</p>
                    </div>
                    <span className={styles.estado}>{a.estado}</span>
                </Reveal>
            ))}
        </ul>
    </Seccion>
);

export default Now;
