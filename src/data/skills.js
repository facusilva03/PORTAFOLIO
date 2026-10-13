/*
  Skills por ÁREA, no por lenguaje: el perfil no es "sé estos lenguajes" sino
  "entiendo estos sistemas", que es lo que corresponde a alguien que apunta a
  seguridad de aplicaciones.

  featured significa "mayor dominio actual" y solo va donde hay algo concreto
  detrás: un proyecto que se puede abrir, una infraestructura que se armó, un
  entregable de cátedra. Lo que está en curso entra sin destacar. Node.js y
  Docker salieron de la lista por no tener nada que los respalde.
*/
export const SKILLS = [
    {
        category: 'Lenguajes',
        items: [
            { name: 'JavaScript / React', featured: true },
            { name: 'Python / Django', featured: true },
            { name: 'PHP / Laravel', featured: true },
            { name: 'SQL', featured: false },
            { name: 'C', featured: false },
            { name: 'Java', featured: false },
            { name: 'HTML / CSS', featured: false },
        ],
    },
    {
        category: 'Bases de datos',
        items: [
            { name: 'Diseño relacional (3FN)', featured: true },
            { name: 'Triggers y procedimientos', featured: true },
            { name: 'Transacciones e integridad', featured: false },
            { name: 'MariaDB · SQLite · PostgreSQL', featured: false },
        ],
    },
    {
        category: 'Redes',
        items: [
            { name: 'Modelo OSI / TCP-IP', featured: true },
            { name: 'Direccionamiento y subnetting', featured: false },
            { name: 'Análisis de tráfico', featured: false },
            { name: 'Wireshark · tcpdump · nmap', featured: false },
        ],
    },
    {
        category: 'Sistemas e infraestructura',
        items: [
            { name: 'Linux (Kali · Ubuntu Server)', featured: true },
            { name: 'Active Directory', featured: true },
            { name: 'Servicios de red (FTP · Apache · Squid)', featured: false },
            { name: 'Virtualización', featured: false },
            { name: 'Azure · Cloudflare', featured: false },
            { name: 'Git · CI/CD', featured: false },
        ],
    },
    {
        category: 'Seguridad',
        items: [
            { name: 'OWASP Top 10 aplicado', featured: true },
            { name: 'Auditoría de código', featured: false },
            { name: 'Control de acceso y autenticación', featured: false },
            { name: 'Despliegue seguro y respaldos', featured: false },
        ],
    },
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
