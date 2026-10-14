/*
  Cada skill lleva DÓNDE se usó. El nivel (en uso real / de la cursada /
  nociones básicas) no es una autoevaluación: sale de la evidencia que hay detrás.

    uso  Proyectos donde se usó, con una letra por proyecto (ver PROYECTOS),
         o 'F' si solo apareció en un entregable de la facultad.
    featured  "mayor dominio actual": solo donde hay algo concreto detrás.
    area      Solo la usa el comando `skills` de la terminal para agrupar el árbol
              (lenguajes, bases de datos, sistemas, redes, seguridad).

  REGLA: nada entra sin respaldo. PostgreSQL, Go, Node.js y TypeScript no
  están porque no hay nada hecho con ellos. Wireshark, tcpdump y nmap tampoco:
  no se usaron en ningún proyecto ni se están viendo, así que no figuran en
  ningún lado (ni siquiera como "en estudio"). En cambio el direccionamiento
  IP, las subredes, las máscaras, DHCP y el modelo OSI SÍ se están cursando en
  Redes I: van como 'F' (de la cursada), sin proyecto. C tiene nociones
  básicas y ningún proyecto: va en NOCIONES.

  El orden del array es el orden de lectura: lenguajes, bases de datos,
  sistemas, redes, seguridad.
*/
export const PROYECTOS = {
    P: 'Préstamos',
    L: 'LogiTrack',
    D: 'DeleitarTE',
    W: 'Portafolio',
};

export const SKILLS = [
    // Lenguajes
    { name: 'JavaScript / React', area: 'lenguajes', featured: true, uso: 'DW' },
    { name: 'Python / Django', area: 'lenguajes', featured: true, uso: 'P' },
    { name: 'PHP / Laravel', area: 'lenguajes', featured: true, uso: 'LD' },
    { name: 'SQL', area: 'lenguajes', featured: false, uso: 'L' },
    { name: 'HTML / CSS', area: 'lenguajes', featured: false, uso: 'DW' },
    { name: 'Java', area: 'lenguajes', featured: false, uso: 'F' },
    // Bases de datos
    { name: 'Diseño relacional (3FN)', area: 'bases de datos', featured: true, uso: 'L' },
    { name: 'Triggers y procedimientos', area: 'bases de datos', featured: true, uso: 'L' },
    { name: 'Transacciones e integridad', area: 'bases de datos', featured: false, uso: 'L' },
    { name: 'MariaDB · SQLite', area: 'bases de datos', featured: false, uso: 'PLD' },
    // Sistemas e infraestructura
    { name: 'Linux (Kali · Ubuntu Server)', area: 'sistemas', featured: true, uso: 'F' },
    { name: 'Active Directory', area: 'sistemas', featured: true, uso: 'F' },
    { name: 'Servicios de red (FTP · Apache · Squid)', area: 'sistemas', featured: false, uso: 'F' },
    { name: 'Virtualización', area: 'sistemas', featured: false, uso: 'F' },
    { name: 'Azure · Cloudflare', area: 'sistemas', featured: false, uso: 'P' },
    { name: 'Git · CI/CD', area: 'sistemas', featured: false, uso: 'PDW' },
    // Redes: lo que se cursa en Redes I (facultad)
    { name: 'Modelo OSI / TCP-IP', area: 'redes', featured: true, uso: 'F' },
    { name: 'Direccionamiento IP, subredes y máscaras', area: 'redes', featured: false, uso: 'F' },
    { name: 'DHCP', area: 'redes', featured: false, uso: 'F' },
    // Seguridad
    { name: 'OWASP Top 10 aplicado', area: 'seguridad', featured: true, uso: 'P' },
    { name: 'Auditoría de código', area: 'seguridad', featured: false, uso: 'P' },
    { name: 'Control de acceso y autenticación', area: 'seguridad', featured: false, uso: 'PL' },
    { name: 'Despliegue seguro y respaldos', area: 'seguridad', featured: false, uso: 'P' },
];

/* Conocimientos básicos, sin un solo proyecto que los use todavía. */
export const NOCIONES = [
    'C (nivel básico)',
];

/* Qué quedó construido en cada cátedra: el entregable, no la nota ni el año. */
export const FORMACION = [
    {
        materia: 'Base de Datos II',
        carrera: 'Lic. en Sistemas de Información · Universidad Champagnat',
        resultado:
            'LogiTrack: 19 tablas en tercera forma normal, dos triggers con reglas de negocio, un procedimiento almacenado y una vista, medido contra un seed de unos 16.000 registros.',
    },
    {
        materia: 'Sistemas Operativos II',
        carrera: 'Lic. en Sistemas de Información · Universidad Champagnat',
        resultado:
            'Servidor Ubuntu con Active Directory, FTP con chroot y proxy Apache/Squid. Después la misma infraestructura sobre Windows Server Core, administrada enteramente por PowerShell, sin interfaz gráfica.',
    },
    {
        materia: 'Redes I',
        carrera: 'Lic. en Sistemas de Información · Universidad Champagnat',
        resultado:
            'Documentación propia que cruza el modelo OSI/TCP-IP con las técnicas que operan en cada capa.',
    },
    {
        materia: 'Sistemas Operativos I · Arquitectura',
        carrera: 'Lic. en Ciberseguridad · UNDEF',
        resultado:
            'Representación binaria, hexadecimal, complemento a dos e IEEE-754: la base para leer memoria y entender qué pasa por debajo del código, no solo dentro de él.',
    },
];
