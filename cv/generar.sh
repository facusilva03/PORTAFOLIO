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
