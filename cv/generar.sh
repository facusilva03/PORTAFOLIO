#!/bin/sh
# Genera public/cv-facundo-silva.pdf a partir de cv/cv.html.
#
# Hace tres cosas: imprime el HTML a PDF con Chromium, borra del PDF los
# metadatos que deja el navegador (su user-agent) y reescribe el archivo
# completo, porque exiftool solo AGREGA una revisión y dejaría los metadatos
# viejos recuperables dentro del archivo.
#
# Requiere: chromium, exiftool, mutool.
set -eu
cd "$(dirname "$0")/.."

# GUARDA (2026-11-17): public/cv-facundo-silva.pdf es el CV de soporte técnico
# que Facu eligió y quedó FIJO. cv/cv.html es el diseño anterior y ya no
# coincide con ese PDF: correr este script lo pisaría con la versión vieja.
# Para regenerar a propósito: FORZAR=1 ./cv/generar.sh (primero hay que pasar
# el contenido del PDF actual a cv/cv.html).
if [ "${FORZAR:-}" != "1" ]; then
    echo "public/cv-facundo-silva.pdf está fijo y cv/cv.html quedó desactualizado." >&2
    echo "Si de verdad querés regenerarlo: FORZAR=1 ./cv/generar.sh" >&2
    exit 1
fi

for cmd in chromium exiftool mutool; do
    command -v "$cmd" >/dev/null || { echo "Falta $cmd" >&2; exit 1; }
done

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

chromium --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=8000 --print-to-pdf="$tmp/cv.pdf" cv/cv.html 2>/dev/null

exiftool -q -overwrite_original -Creator="" -Producer="" -Author="Facundo Silva" "$tmp/cv.pdf"
mutool clean -gg "$tmp/cv.pdf" public/cv-facundo-silva.pdf

paginas=$(pdfinfo public/cv-facundo-silva.pdf | awk '/^Pages:/ {print $2}')
echo "public/cv-facundo-silva.pdf generado ($paginas página/s)"
[ "$paginas" = "1" ] || { echo "AVISO: el CV ya no entra en una página" >&2; exit 1; }
