# Catálogo de Productos

Sitio estático tipo catálogo/vitrina de productos. Sin base de datos, sin registro de usuarios, sin sistema de inventario. Hecho con **HTML5 + CSS3 + JavaScript puro** (la única dependencia externa es Font Awesome, solo para íconos).

## Estructura del proyecto

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── img/
│   └── (imágenes de los productos)
└── README.md
```

## Cómo agregar / editar / quitar productos

Todo el catálogo vive en un solo lugar: el arreglo `productos` al inicio de `js/script.js`. No necesitas tocar el HTML.

```js
{
  id: 7,
  nombre: "Nombre del producto",
  categoria: "Categoría",
  descripcion: "Descripción breve y atractiva.",
  precio: 50000,
  imagen: "img/producto-7.jpg"
}
```

1. Agrega la imagen del producto dentro de la carpeta `img/`.
2. Copia un objeto dentro del arreglo `productos`, cámbiale el `id` (que no se repita) y completa los demás campos.
3. Guarda — el buscador, el contador del hero y el modal se actualizan solos, no hay que tocar nada más.

Para quitar un producto, simplemente borra su objeto del arreglo.

## Configurar el número de WhatsApp

En `js/script.js`, dentro del objeto `CONFIG`, cambia:

```js
const CONFIG = {
  whatsappNumero: "573001234567", // tu número en formato internacional, sin "+" ni espacios
  moneda: "COP"
};
```

Cada botón "Consultar disponibilidad" arma automáticamente un mensaje de WhatsApp con el nombre del producto.

## Imágenes de ejemplo

Las imágenes incluidas en `img/` son marcadores de posición en SVG para que el sitio funcione y se vea completo desde el primer momento. Reemplázalas por fotos reales de los productos (formato `.jpg`, `.png` o `.webp`, idealmente en proporción 4:3 y no más de 300–500 KB para que cargue rápido).

## Publicar en GitHub Pages

1. Sube esta carpeta a un repositorio de GitHub (puede ser la raíz del repo).
2. En el repositorio, ve a **Settings → Pages**.
3. En "Build and deployment", selecciona la rama (por ejemplo `main`) y la carpeta `/ (root)`.
4. Guarda. En un par de minutos GitHub te dará un enlace público tipo:
   `https://tu-usuario.github.io/nombre-del-repo/`

No se necesita servidor, base de datos ni build step: es HTML/CSS/JS plano.

## Probar en local

Puedes simplemente abrir `index.html` en el navegador. Si prefieres un servidor local (recomendado para evitar restricciones del navegador con `fetch`/módulos, aunque aquí no se usan):

```bash
# Con Python
python -m http.server 8080

# Con la extensión Live Server de VS Code
# clic derecho sobre index.html → "Open with Live Server"
```
