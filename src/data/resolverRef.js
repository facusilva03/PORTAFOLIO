/*
  Un ref de diagramas.js apunta a una decisión (dN), un obstáculo (oN) o al
  estado del caso de estudio. Devuelve { tipo, t, d } con el texto listo.
*/
export default function resolverRef(caso, ref) {
    if (ref === 'estado') return { tipo: 'Estado', t: 'Dónde está hoy', d: caso.estado };
    const i = Number(ref.slice(1));
    return ref[0] === 'd'
        ? { tipo: 'Decisión', ...caso.decisiones[i] }
        : { tipo: 'Obstáculo', ...caso.obstaculos[i] };
}
