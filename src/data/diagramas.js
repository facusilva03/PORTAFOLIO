/*
  Un diagrama por proyecto: cómo funciona el sistema, en nodos que se pueden
  tocar. Cada nodo tiene dos textos:

    que   Qué hace esa pieza, en una línea.
    refs  Por qué está así: apunta a las decisiones (dN), los obstáculos (oN)
          y/o al estado de src/data/works.js, por posición. dN = decisiones[N],
          oN = obstaculos[N].

  Los textos de "que" resumen lo que dice el caso de estudio de cada proyecto.
  Si el caso cambia, revisar que el diagrama siga diciendo lo mismo.

  col (0-2) y fila posicionan el nodo en la grilla. enlaces son pares de ids
  entre los que viaja un paquete animado.
*/
export const DIAGRAMAS = {
    '01': {
        titulo: 'Recorrido de una petición',
        nodos: [
            { id: 'V', col: 0, fila: 0, titulo: 'Visitante', sub: 'dominio propio', que: 'Entra por el dominio propio, no por la dirección que da el hosting.' },
            { id: 'A', col: 1, fila: 0, titulo: 'Acceso', sub: 'lista de correos', que: 'Filtra por una lista de correos autorizados antes de que aparezca el login.', refs: ['d2'] },
            { id: 'W', col: 2, fila: 0, titulo: 'Worker', sub: 'Cloudflare', que: 'Recibe el dominio y reescribe la cabecera Host hacia el hosting.', refs: ['o1'] },
            { id: 'R', col: 0, fila: 1, titulo: 'Respaldos', sub: 'cifrados · copy', que: 'Sube copias cifradas de la base a la nube de forma automática.', refs: ['d3'] },
            { id: 'S', col: 1, fila: 1, titulo: 'SQLite', sub: 'sobrevive al deploy', que: 'Guarda los datos en la partición que sobrevive a cada despliegue.', refs: ['d1', 'o0'] },
            { id: 'D', col: 2, fila: 1, titulo: 'Django', sub: 'Azure · Decimal', que: 'La aplicación: calcula la amortización en Decimal y exige el secreto que agrega el proxy.', refs: ['o2', 'd0'] },
            { id: 'AU', col: 1, fila: 2, titulo: 'Auditoría', sub: 'con IA, verificada', que: 'Revisión del código asistida por IA, verificada hallazgo por hallazgo.', refs: ['o3'] },
            { id: 'CI', col: 2, fila: 2, titulo: 'GitHub Actions', sub: 'tests · bloquea deploy', que: 'Corre los tests en cada push y bloquea el despliegue si alguno falla.', refs: ['estado'] },
        ],
        enlaces: [['V', 'A'], ['A', 'W'], ['W', 'D'], ['D', 'S'], ['S', 'R'], ['AU', 'CI'], ['CI', 'D']],
    },
    '02': {
        titulo: 'De la sesión a la base de datos',
        nodos: [
            { id: 'U', col: 0, fila: 0, titulo: 'Usuario', sub: '4 roles · sesión', que: 'Cada uno de los cuatro roles entra a su propio dashboard.', refs: ['d1'] },
            { id: 'C', col: 1, fila: 0, titulo: 'Controlador PHP', sub: 'lista blanca', que: 'Recibe cada pedido, valida del lado del servidor y arma las consultas con PDO.', refs: ['d2'] },
            { id: 'P', col: 2, fila: 0, titulo: 'Tracking público', sub: 'solo el estado', que: 'Cualquiera con el número de tracking consulta el estado sin iniciar sesión.', refs: ['d5'] },
            { id: 'T', col: 1, fila: 1, titulo: 'Transacción', sub: 'ACID', que: 'Crear un envío, dar de alta personal o cerrar un viaje: se completa todo o no se guarda nada.', refs: ['d3', 'o0', 'o1'] },
            { id: 'M', col: 2, fila: 1, titulo: 'MariaDB', sub: 'trigger · proc · vista', que: '19 tablas en 3FN. Dos triggers, un procedimiento y una vista aplican reglas en el motor.', refs: ['d0', 'o2', 'o3'] },
            { id: 'SD', col: 2, fila: 2, titulo: 'Seed', sub: '~16.000 registros', que: 'Carga de datos para medir las consultas contra un volumen parecido al real.', refs: ['d4'] },
        ],
        enlaces: [['U', 'C'], ['P', 'C'], ['C', 'T'], ['T', 'M'], ['M', 'SD']],
    },
    '03': {
        titulo: 'De la visita a la reserva',
        nodos: [
            { id: 'V', col: 0, fila: 0, titulo: 'Visitante', sub: 'sitio público', que: 'Ve los paquetes de tardes de té en el sitio público.' },
            { id: 'S', col: 1, fila: 0, titulo: 'React + Inertia', sub: 'renderiza en cliente', que: 'Laravel entrega los datos directo a los componentes React, sin API aparte.', refs: ['d1', 'o0'] },
            { id: 'WA', col: 2, fila: 0, titulo: 'WhatsApp', sub: 'mensaje ya armado', que: 'El pedido sale como mensaje de WhatsApp ya armado según el paquete elegido.', refs: ['d0'] },
            { id: 'PN', col: 0, fila: 1, titulo: 'Panel interno', sub: 'en desarrollo', que: 'Donde se gestionan las reservas. Los controladores de este flujo son lo próximo a implementar.' },
            { id: 'RS', col: 1, fila: 1, titulo: 'Reserva', sub: 'con estados', que: 'Pasa por pendiente de revisión, aprobada, seña pendiente y confirmada.', refs: ['estado'] },
            { id: 'HI', col: 2, fila: 1, titulo: 'Historial', sub: 'estado · usuario · IP', que: 'Registra cada cambio de estado de la reserva.', refs: ['d2'] },
        ],
        enlaces: [['V', 'S'], ['S', 'WA'], ['PN', 'RS'], ['RS', 'HI']],
    },
    '04': {
        titulo: 'Cómo llega y cómo se publica',
        nodos: [
            { id: 'V', col: 0, fila: 0, titulo: 'Visitante', sub: 'navegador', que: 'Recibe un sitio estático: no hay servidor propio detrás.' },
            { id: 'S', col: 1, fila: 0, titulo: 'Sitio estático', sub: 'sin backend', que: 'React y Vite con CSS Modules. El contenido cambia cuando se edita el código.', refs: ['d0', 'd1'] },
            { id: 'E', col: 2, fila: 0, titulo: 'EmailJS', sub: 'formulario externo', que: 'El formulario de contacto sale por un servicio externo.', refs: ['d0'] },
            { id: 'B', col: 0, fila: 1, titulo: 'Pantalla real', sub: '360 px', que: 'Los cambios se revisan con capturas reales en tamaño de teléfono.', refs: ['o0'] },
            { id: 'T', col: 1, fila: 1, titulo: 'Terminal', sub: 'accesible', que: 'Intro animada y después un prompt real con comandos que llevan a cada sección.', refs: ['d2', 'd3'] },
            { id: 'P', col: 2, fila: 1, titulo: 'Vercel', sub: 'deploy en cada push', que: 'Cada push a la rama principal vuelve a desplegar el sitio.', refs: ['estado'] },
        ],
        enlaces: [['V', 'S'], ['S', 'E'], ['S', 'T'], ['P', 'S'], ['B', 'T']],
    },
};
