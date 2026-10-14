# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Para qué es

Portafolio profesional de Facundo Silva, estudiante de Sistemas y Ciberseguridad con rumbo a AppSec / Web Pentesting. Lo leen reclutadores y entrevistadores técnicos: cada línea tiene que sostenerse en una entrevista. Repo público (`facusilva03/PORTAFOLIO`), desplegado en Vercel: https://portafolio-omega-opal.vercel.app

## Comandos

- Instalar: `npm install` (`node_modules` no viaja al re-clonar). `.nvmrc` pide Node 18; acá corre Node 24.
- `npm run dev` (:5173) · `npm run build` · `npm run preview` · `npm run lint`.
- **ESLint no detecta un componente de JSX sin definir** (`<Lista />` sin `const Lista`): lint y build pasan y la página se rompe entera. Siempre abrir el sitio en un navegador (las pruebas con Selenium miran la consola) antes de dar un cambio por bueno.
- No hay framework de tests. La verificación es lint + build + manejar el sitio en un navegador real.
- **CV:** el fuente es `cv/cv.html` y el PDF público es `public/cv-facundo-silva.pdf` (lo descargan el botón del Hero y el comando `cv` de la terminal). Para regenerarlo: `./cv/generar.sh` (necesita chromium, exiftool y mutool; además limpia los metadatos del navegador). Dos columnas (barra lateral clara con foto + columna principal), diseño propio. Tiene que seguir entrando en **una página**, no lleva teléfono (este PDF es público) y el único enlace es "Mi portafolio": sin GitHub ni LinkedIn, por decisión suya. Lleva la edad (23) y la foto (`cv/foto.png`). El "Acerca de mí" va en tono personal (proactivo, con ganas de aprender) y sin jerga: también se usa para trabajos locales presenciales. Se probaron y descartaron: una columna tipo Harvard y la línea de tiempo de puntos del CV viejo.
- Navegador para probar (verificado en esta máquina): **Selenium** con `/usr/bin/chromium` y `/usr/bin/chromedriver`, en modo headless. El paquete de Playwright está roto (le falta el driver).
- Pruebas en teléfono con Selenium: el gesto `touch` de CDP **no hace nada** en este Chromium sin pantalla; usar `gestureSourceType: 'mouse'` (ejercita el mismo scroll-snap). Un dedo real en un teléfono real no se puede probar acá. Cuidado con los selectores `[class*="_pista_"]`: la terminal también tiene una clase `pista`; usar roles o `aria-label`.
- Para frenar el dev server usar `kill <pid>`, nunca `pkill -f vite` (mata la shell de la sesión).
- Al probar el formulario, **reemplazar `window.fetch`** antes de enviar: las claves reales de EmailJS están en `.env` y un envío de prueba mandaría un mail de verdad.
- Revisar siempre a 360 px y a 1440 px. El scroll suave (`scroll-behavior: smooth`) hace que una captura tomada justo después de un `scrollTo` salga a medio camino: desactivarlo en la prueba o esperar.

## Arquitectura

Una sola página sin router. `src/App.jsx` arma `Nav`, las secciones (`Hero, About, Skills, Works, Now, Contact`) y `Footer`. Navegación por anclas (`#home … #contact`).

- **Estilos:** CSS Modules por componente + tokens en `src/index.css` (`--accent`, `--bg`…). Tema oscuro con un solo acento violeta; verde solo para "en producción/en línea", ámbar solo para "en desarrollo". Sin Tailwind en uso (`public/tailwind.css` es un resto sin importar).
- **El contenido vive en `src/data/`**, no en el JSX: `works.js` (proyectos y sus casos de estudio), `diagramas.js` (diagramas), `skills.js` (skills, formación aplicada y lo que está "en estudio").
- **Works ↔ diagramas:** cada nodo de `diagramas.js` apunta al caso de `works.js` **por posición**: `d2` = `decisiones[2]`, `o0` = `obstaculos[0]`, `estado`. Si se reordena o se agrega una decisión/obstáculo, hay que revisar los diagramas. El texto "que" de cada nodo resume el caso: si el caso cambia, que el diagrama siga diciendo lo mismo.
- **Teléfono (≤640px):** el diagrama se oculta y `FlowCards` muestra una tarjeta por nodo, que se desliza con `scroll-snap`, más botones anterior/siguiente (quien navega con teclado no puede deslizar). **El orden del array `nodos` en `diagramas.js` es el orden de las tarjetas**: ponerlo en el orden del recorrido. Entre 641 y 900px sigue el diagrama, con su propio scroll interno.
- **Terminal** (`components/Terminal.jsx`): intro que se escribe sola y después un prompt real. Todo corre en el navegador. El input nunca se enfoca solo, respeta `prefers-reduced-motion` y su contenido existe como texto para lectores de pantalla. Los comandos `goto` usan los `id` reales de las secciones (`SECCIONES`). El comando `skills [área]` imprime el árbol de skills leyendo de `src/data/skills.js` (misma fuente que la sección Skills, así no se contradicen); filtra por el inicio de cualquier palabra del área (`skills bases`, `skills estudio`). **Las ayudas de la terminal van con palabras separadas por espacios, nunca `<a|b|c>`**: una palabra larga sin espacios no se puede partir y ensancha la terminal en el teléfono.
- **`Reveal` / `useReveal`:** hace aparecer el contenido al llegar a pantalla. `Reveal` ya usa un `ref` interno: no pasarle otro `ref` por props (lo pisa y el contenido queda invisible).
- **Contacto:** `contact.jsx` envía con `@emailjs/browser` desde el cliente. Claves en `.env`: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Los `name` de los campos (`from_name`, `from_email`, `service_type`, `message`) los usa la plantilla de EmailJS: no renombrarlos.

## Decisiones cerradas

- Sitio **estático, sin backend propio**. No proponer uno. Datos vivos solo con `fetch` a la API de GitHub desde el navegador (hoy no vale la pena: casi todos sus repos son privados).
- La terminal se queda: es lo que ningún otro portafolio tiene. Quieta (sin inclinarse) y grande.
- Sin sección Services (decisión del 2026-10-13), sin Instagram y sin teléfono en el sitio.
- Proyectos con **el mismo formato**: un diagrama de cómo funciona, y al tocar cada parte se explica qué hace y por qué.

## Reglas de contenido

- **Skills en tres niveles (decisión 2026-10-14):** *en uso real* (con proyecto: cada skill nombra dónde se usó, con una letra por proyecto en `uso`), *de la cursada* (`uso: 'F'`, solo un entregable de la facultad) y *nociones básicas* (`NOCIONES`: hoy solo C, sin proyecto). El área `redes` solo la usa el comando `skills` de la terminal para agrupar. El nivel sale de la evidencia, nunca de una autoevaluación: no hay barras ni porcentajes. Se descartaron los chips, una matriz skill × proyecto (en 360px solo se veía una columna) y un árbol tipo terminal (el texto se cortaba). En el teléfono cada skill va en una sola línea con el proyecto (o la materia) a la derecha. **"De la cursada" usa los mismos renglones que "En uso real"** (nombre + materia en `cursada`): se probó texto corrido separado por espacios y se veía desparejo en el celular real.
- **Skills solo con evidencia.** PostgreSQL y Go salieron por no tener nada detrás; GitFlow se queda porque DeleitarTE tiene `develop`, `feature/*`, `hotfix/*` y `release/*`. **nmap, Wireshark y tcpdump no figuran en ningún lado** (sitio, terminal ni CV): Facu confirmó que no los usó en ningún proyecto ni los está viendo, así que ni siquiera van como "en estudio". **Direccionamiento IP, subredes, máscaras, hosts, DHCP y las capas del modelo OSI sí figuran**: los está cursando en Redes I (nivel *de la cursada*, sin proyecto, y en la sección Ahora). No confundir las herramientas con los conceptos de redes: ya se sacaron por error y hubo que volver a ponerlos.
- Toda tecnología, logro o cifra tiene que poder señalarse en un repo real. Nada inventado: ni métricas, ni "disponible", ni tiempos de respuesta. Lo que no tiene respaldo se saca.
- Antes de editar About, Works, Skills o la terminal, **verificar la afirmación contra el código** (skill `verificar-afirmaciones`). Ya se corrigieron así: "un trigger" (son dos), "sin JavaScript" (hay un mapa con Leaflet) y un procedimiento que decía hacer algo que no hacía.
- Repo privado → `github: null` y el motivo en `caso.repoNota`. Verificar visibilidad (`gh repo view`) antes de linkear.
- `LOGITRACK` es público con datos ficticios; el original con datos quedó privado (`logitrakc-privado`).

## Reglas de UI

- Sobrio (skill `ui-sobrio`): sin tarjetas de estadísticas ni métricas de relleno.
- Accesible (skill `accesibilidad-responsive`): foco visible, `prefers-reduced-motion`, probado a 360 px. El diagrama no se achica en mobile: conserva ancho y scrollea dentro de su tarjeta.

## No se toca sin que lo pida

- `.env` y sus claves.
- El teléfono personal: no vuelve al sitio **ni al CV público**. (El CV viejo, con teléfono, quedó en el historial de git; ver el commit que lo reemplazó.)
- Los textos de los casos de estudio: se editan con evidencia, no por estética.

## Pendientes conocidos

- Go se sacó del sitio (2026-10-13) porque no hay nada hecho en Go que lo respalde. Vuelve cuando exista algo concreto (un repo, una herramienta chica).
- `src/assets/` conserva imágenes sin usar (a propósito: `facundo-profile.png` puede volver en About).
- Skills (`skills.js`) y la terminal dicen "seed de unos 16.000 registros": es verdad de la base original, pero el repo público de LogiTrack trae un seed mínimo.
