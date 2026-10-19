# La fórmula del alquimista

Laboratorio interactivo de alcanos para la **Feria de Ciencia y Tecnología 2026**, Centro Escolar INSA.

La interfaz se inspira en la experiencia visual de Minecraft: piedra, inventario, aldeano clérigo, soporte de pociones, antorchas, portal, libros, gemas y XP. Los gráficos SVG se incluyen dentro del proyecto, por lo que no necesitas descargar imágenes adicionales.

## Contenido conservado

- **Códice del alquimista:** introducción, nomenclatura IUPAC, prefijos, tabla de alcanos, propiedades y aplicaciones.
- **Nombrar estructuras:** ejercicios por nivel, con selección múltiple o respuesta escrita.
- **Formar estructuras:** constructor de alcanos con enlaces sencillos, ramificaciones y validación química. Se pueden construir cadenas desde **1 carbono** (metano).
- **Prueba del alquimista:** 10 preguntas por ronda, explicaciones y sistema de XP.
- **XP persistente:** la experiencia se conserva en el navegador mediante almacenamiento local.

Los datos de química y los ejercicios originales están en `src/data/` y no fueron sustituidos por contenido ornamental.

## Instalar y ejecutar en Windows

Requiere Node.js compatible con Vite 8 (se recomienda Node.js 22.12 o posterior).

Abre la carpeta `Alcanos` en Visual Studio Code y ejecuta:

```powershell
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente `http://localhost:5173/`.

Para compilar:

```powershell
npm run build
```

Los archivos listos para publicar aparecerán en `dist/`.

## Actualizar GitHub Pages

El proyecto mantiene `.github/workflows/deploy.yml` y `base: '/Alcanos/'` en `vite.config.js`.

Si ya tienes el repositorio `iamdvix/Alcanos` clonado, reemplaza los archivos del proyecto original por los del ZIP **sin borrar su carpeta `.git`**, y ejecuta:

```powershell
npm install
git add .
git commit -m "Rediseñar laboratorio con temática Minecraft"
git push origin main
```

GitHub Actions ejecutará la compilación y publicación. La dirección pública del proyecto es:

`https://iamdvix.github.io/Alcanos/`

El parámetro `?utm_source=chatgpt.com` no forma parte del enlace permanente.

## Organización

- `src/App.vue`: inventario de navegación, cambio de pantallas y barra de XP.
- `src/components/HomeView.vue`: selección de estaciones y portada.
- `src/components/AlchemyScene.vue`: ilustración SVG del aldeano y el laboratorio.
- `src/components/Decor.vue`: atmósfera y partículas.
- `src/components/InfoSection.vue`: códice científico original.
- `src/components/NameGame.vue`, `BuildGame.vue`, `QuizGame.vue`: juegos existentes.
- `src/style.css`: identidad visual y adaptación a distintas pantallas.
- `src/data/`: generadores de desafíos, nomenclatura, preguntas y sprites.

### Nota de diseño

Los dibujos pixelados son gráficos originales inspirados en Minecraft, no una colección de texturas extraídas del videojuego. Su uso no requiere enlaces a servidores de imágenes externos. Las animaciones se reducen automáticamente cuando el usuario así lo configura en su dispositivo.
