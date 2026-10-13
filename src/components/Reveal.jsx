import useReveal from '../hooks/useReveal';
import styles from './Reveal.module.css';

/* Hace aparecer el contenido (fade + subida) al llegar a pantalla.
   `retraso` en segundos escalona varios elementos seguidos. */
const Reveal = ({ as = 'div', retraso = 0, className = '', children, ...resto }) => {
    const [ref, visible] = useReveal();
    const Etiqueta = as;

    return (
        <Etiqueta
            ref={ref}
            className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
            style={{ '--retraso': `${retraso}s` }}
            {...resto}
        >
            {children}
        </Etiqueta>
    );
};

export default Reveal;
