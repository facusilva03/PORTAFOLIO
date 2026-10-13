import { useEffect, useRef, useState } from 'react';

const prefiereSinMovimiento = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const OPCIONES = { threshold: 0.12 };

/*
  Devuelve [ref, visible]: visible pasa a true la primera vez que el elemento
  entra en pantalla y ahí se queda (no vuelve a ocultarse).

  Quien pidió menos movimiento lo ve visible desde el primer render, sin
  parpadeo: el estado inicial es perezoso en vez de un setState dentro del
  effect.
*/
export default function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(prefiereSinMovimiento);

    useEffect(() => {
        const el = ref.current;
        if (visible || !el) return;

        const observador = new IntersectionObserver(([entrada]) => {
            if (entrada.isIntersecting) {
                setVisible(true);
                observador.disconnect();
            }
        }, OPCIONES);

        observador.observe(el);
        return () => observador.disconnect();
    }, [visible]);

    return [ref, visible];
}
