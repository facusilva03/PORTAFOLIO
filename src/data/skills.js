/*
  Cada skill lleva DÓNDE se usó. El nivel (en uso real / de la cursada / en
  estudio) no es una autoevaluación: sale de la evidencia que hay detrás.

    uso  Proyectos donde se usó, con una letra por proyecto (ver PROYECTOS),
         o 'F' si solo apareció en un entregable de la facultad.
    featured  "mayor dominio actual": solo donde hay algo concreto detrás.

  REGLA: nada entra sin respaldo. PostgreSQL, Go, Node.js y TypeScript no
  están porque no hay nada hecho con ellos. C, Wireshark, tcpdump, nmap y el
  subnetting se estudiaron pero no hay ningún proyecto que los use: van en
  EN_ESTUDIO, no como skills.

  El orden del array es el orden de lectura: lenguajes, bases de datos,
  sistemas, seguridad.
*/
export const PROYECTOS = {
    P: 'Préstamos',
    L: 'LogiTrack',
    D: 'DeleitarTE',
    W: 'Portafolio',
};

export const SKILLS = [
    // Lenguajes
    { name: 'JavaScript / React', featured: true, uso: 'DW' },
    { name: 'Python / Django', featured: true, uso: 'P' },
    { name: 'PHP / Laravel', featured: true, uso: 'LD' },
    { name: 'SQL', featured: false, uso: 'L' },
    { name: 'HTML / CSS', featured: false, uso: 'DW' },
    { name: 'Java', featured: false, uso: 'F' },
    // Bases de datos
    { name: 'Diseño relacional (3FN)', featured: true, uso: 'L' },
    { name: 'Triggers y procedimientos', featured: true, uso: 'L' },
    { name: 'Transacciones e integridad', featured: false, uso: 'L' },
    { name: 'MariaDB · SQLite', featured: false, uso: 'PLD' },
    // Sistemas e infraestructura
    { name: 'Linux (Kali · Ubuntu Server)', featured: true, uso: 'F' },
    { name: 'Active Directory', featured: true, uso: 'F' },
    { name: 'Servicios de red (FTP · Apache · Squid)', featured: false, uso: 'F' },
    { name: 'Modelo OSI / TCP-IP', featured: true, uso: 'F' },
    { name: 'Virtualización', featured: false, uso: 'F' },
    { name: 'Azure · Cloudflare', featured: false, uso: 'P' },
    { name: 'Git · CI/CD', featured: false, uso: 'PDW' },
    // Seguridad
    { name: 'OWASP Top 10 aplicado', featured: true, uso: 'P' },
    { name: 'Auditoría de código', featured: false, uso: 'P' },
    { name: 'Control de acceso y autenticación', featured: false, uso: 'PL' },
    { name: 'Despliegue seguro y respaldos', featured: false, uso: 'P' },
];

/* Estudiado, sin un solo proyecto que lo use todavía. */
export const EN_ESTUDIO = [
    'C (nivel básico)',
    'Redes: nmap, Wireshark y subnetting',
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
            'Documentación propia que cruza el modelo OSI/TCP-IP con las técnicas y herramientas que operan en cada capa, de ARP spoofing a los tipos de escaneo de nmap.',
    },
    {
        materia: 'Sistemas Operativos I · Arquitectura',
        carrera: 'Lic. en Ciberseguridad · UNDEF',
        resultado:
            'Representación binaria, hexadecimal, complemento a dos e IEEE-754: la base para leer memoria y entender qué pasa por debajo del código, no solo dentro de él.',
    },
];
