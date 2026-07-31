/* ==========================================================================
   CATÁLOGO DE PRODUCTOS — script.js
   --------------------------------------------------------------------------
   Índice:
   1. Datos de productos  (edítalos aquí para agregar/quitar productos)
   2. Configuración general (número de WhatsApp, etc.)
   3. Render del grid de productos
   4. Buscador en tiempo real
   5. Modal de producto
   6. Utilidades (año actual, formato de precio)
   ========================================================================== */

/* ---------- 1. DATOS DE PRODUCTOS ----------
   Para agregar un producto nuevo, copia un objeto y cambia sus valores.
   El campo "imagen" debe apuntar a un archivo dentro de la carpeta /img.
--------------------------------------------------------------------------- */
/* ---------- ANIMACIÓN AL HACER SCROLL ---------- */

// Se dispara cuando un elemento entra o sale de la pantalla.
// Al entrar agrega "is-visible" (aparece), al salir la quita (desaparece),
// así la animación se repite cada vez que el usuario sube o baja.
const observadorScroll = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        observadorScroll.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.15,      // se activa cuando ~15% del elemento es visible
    rootMargin: "0px 0px -40px 0px"
  }
);

/**
 * Marca un elemento para que se anime con el scroll y empieza a observarlo.
 * Si ya está visible en la pantalla, se muestra inmediatamente.
 * @param {HTMLElement} elemento
 */
function activarRevealEnScroll(elemento) {
  elemento.classList.add("reveal-on-scroll");

  const rect = elemento.getBoundingClientRect();
  const yaVisible = rect.top < window.innerHeight && rect.bottom > 0;

  if (yaVisible) {
    elemento.classList.add("is-visible");
    return;
  }

  observadorScroll.observe(elemento);
}

/* ================================================ */

  // ... tus 70 productos siguen aquí igual
const productos = [
  {
    id: 1,
    nombre: "Puntera Ovalada con Malla Negra",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look elegante y agresivo con esta puntera ovalada en acabado negro con malla interna.\n Su diseño sobrio combina perfecto con cualquier estilo, manteniendo una apariencia deportiva sin alterar el sonido.🚗✨\n✅ Forma: Ovalada ⚫\n✅ Acabado: Negro ahumado 🖤\n✅ Diseño: Con malla interna\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal 💥\nEstilo elegante y deportivo en tono oscuro\n📲 Escríbenos para más información o instalación",
    precio: 90000,
    imagen: "img/1.png"
  },
  {
    id: 2,
    nombre: "Cola de Pato con Malla Negra",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo más agresivo y elegante con esta puntera tipo cola de pato en acabado negro.\n Su diseño con malla interna aporta un look deportivo tipo OEM+ o racing. 🚗🔥 \n ✅ Diseño: Cola de pato 🦆\n✅ Acabado: Negro ahumado ⚫\n✅ Detalle: Malla interna deportiva 🔳\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Alta resistencia al calor\n✅ Instalación universal\n💥 Estilo deportivo con presencia fuerte y elegante\n📲 Escríbenos para más información o instalación",
    precio: 105000,
    imagen: "img/2.png"
  },
  {
    id: 3,
    nombre: "Resonador MJ Mufflers Sesgo Tornasol",
    categoria: "Punteras",
    descripcion: "Estilo racing con efecto titanio quemado que roba miradas.\n✅ Diseño sesgado (salida inclinada)\n✅ Punta tornasol 🌈 (azul/dorado)\n✅ Acero inoxidable de alta resistencia\n✅ Sonido agresivo pero refinado 🔊\n✅ Alta durabilidad ante temperaturas extremas\n💥 Perfecto para builds deportivos premium\n📲 Contáctanos y arma tu sistema de escape a tu medida",
    precio: 0,
    imagen: "img/3.png"
  },
  {
    id: 4,
    nombre: "Puntera Akrapovic 4.0” Carbono + Dorado",
    categoria: "Punteras",
    descripcion: "Acabado premium con fibra de carbono y punta dorada que resalta al máximo.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Medida: 4.0”\n✅ Acabado: Carbono + dorado 🟡\n✅ Material: Alta calidad\n✅ Resistente al calor\n✅ Instalación con abrazadera\n✅ Tipo: Decorativa\n🔥 Look exclusivo y llamativo\n📲 Contáctanos para cotizar",
    precio: 0,
    imagen: "img/4.png"
  },
  {
    id: 5,
    nombre: "Resonador MJ Mufflers 3.25” Plateado Tipo HKS",
    categoria: "Punteras",
    descripcion: "Diseño clásico con acabado pulido tipo espejo.\n✅ Diámetro: 3.25”\n✅ Acabado plateado pulido ✨\n✅ Acero inoxidable\n✅ Sonido limpio y elegante 🔊\n✅ Máximo flujo de escape\n💥 Ideal para setups OEM+ o deportivos\n📲 Contáctanos para disponibilidad",
    precio: 15000,
    imagen: "img/5.png"
  },
  {
    id: 6,
    nombre: "Resonador MJ Mufflers 3.25” Morado Tipo HKS",
    categoria: "Punteras",
    descripcion: "Color vibrante para un look totalmente diferente.\n✅ Diámetro: 3.25”\n✅ Acabado morado brillante 💜\n✅ Acero inoxidable\n✅ Sonido deportivo con presencia\n✅ Excelente control de ruido\n💥 Perfecto para proyectos personalizados\n📲 Escríbenos para cotizar",
    precio: 210000,
    imagen: "img/6.png"
  },
  {
    id: 7,
    nombre: "Resonador MJ Mufflers 3.25” Negro Tipo HKS",
    categoria: "Punteras",
    descripcion: "Estilo elegante y agresivo con acabado completamente negro.\n✅ Diámetro: 3.25”\n✅ Acabado negro satinado 🖤\n✅ Acero inoxidable de alta calidad\n✅ Sonido deportivo limpio y profundo 🔊\n✅ Reduce resonancia sin afectar el rendimiento\n💥 Perfecto para un look stealth y sonido balanceado\n📲 Contáctanos para precio",
    precio: 15000,
    imagen: "img/7.png"
  },
  {
    id: 8,
    nombre: "Puntera Akrapovic Brillante (Carbono)",
    categoria: "Punteras",
    descripcion: "Acabado brillante en fibra de carbono que resalta el diseño y da un look más premium.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Acabado: Carbono brillante ✨\n✅ Material: Acero inoxidable\n✅ Resistente al calor\n✅ Instalación sencilla con abrazadera\n✅ Tipo: Decorativa\n💎 Elegancia y deportividad en una sola pieza\n📲 Contáctanos para precio y disponibilidad",
    precio: 15000,
    imagen: "img/8.png"
  },
  {
    id: 9,
    nombre: "Puntera MJ Morada 4.0” (Fibra de Carbono)",
    categoria: "Punteras",
    descripcion: "Puntera deportiva estilo MJ con acabado en fibra de carbono y detalles tornasol morado/azul que le dan un look único y agresivo.\n✅ Medida: 4.0 pulgadas 🔥\n✅ Diseño: Tipo MJ deportivo\n✅ Acabado: Fibra de carbono + tornasol morado/azul 🟣🔵\n✅ Material: Acero inoxidable de alta calidad\n✅ Alta resistencia al calor\n✅ Sistema con abrazadera (fácil instalación)\n✅ Tipo: Decorativa\n💥 Ideal para quienes quieren destacar con un estilo racing premium\n📲 Contáctanos para precio, disponibilidad e instalación",
    precio: 15000,
    imagen: "img/9.png"
  },
  {
    id: 10,
    nombre: "Puntera tipo BMW – Dorada",
    categoria: "Punteras",
    descripcion: "Diseño exclusivo con interior dorado que resalta y le da un toque premium a tu vehículo.\n✅ Diseño: Tipo BMW / M 🔥\n✅ Acabado: Fibra de carbono + dorado 🟡\n✅ Material: Alta calidad resistente al calor\n✅ Instalación con abrazadera\n✅ Tipo: Decorativa\n✨ Ideal para destacar con estilo único\n📲 Contáctanos para más información o compra",
    precio: 15000,
    imagen: "img/10.png"
  },
  {
    id: 11,
    nombre: "Puntera Akrapovic Doble Salida 4.0” Carbono Camuflado",
    categoria: "Punteras",
    descripcion: "Diseño exclusivo tipo carbono forjado con acabado tipo “camuflaje”.\n✅ Diseño: Doble salida tipo Akrapovic 🔥\n✅ Medida: 4.0” cada salida\n✅ Acabado: Carbono forjado ⚫\n✅ Estilo único y moderno\n✅ Alta resistencia al calor\n✅ Instalación con abrazadera\n✅ Tipo: Decorativa\n💥 Look racing premium diferente a lo convencional\n📲 Contáctanos para cotizar",
    precio: 15000,
    imagen: "img/11.png"
  },
  {
    id: 12,
    nombre: "Puntera Akrapovic 4.0” Negra Mate Perforada",
    categoria: "Punteras",
    descripcion: "Diseño agresivo con acabado negro mate y perforaciones internas para look racing.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Medida: 4.0”\n✅ Acabado: Negro mate ⚫\n✅ Detalle: Interior perforado 🕳️\n✅ Material resistente al calor\n✅ Instalación sencilla\n✅ Tipo: Decorativa\n💯 Ideal para un estilo más radical\n📲 Contáctanos para más información o compra",
    precio: 15000,
    imagen: "img/12.png"
  },
  {
    id: 13,
    nombre: "Puntera Akrapovic 4.0” Carbono Brillante",
    categoria: "Punteras",
    descripcion: "Acabado brillante en fibra de carbono para un look más elegante y premium.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Medida: 4.0”\n✅ Acabado: Carbono brillante ✨\n✅ Material: Acero inoxidable\n✅ Alta resistencia\n✅ Instalación con abrazadera\n✅ Tipo: Decorativa\n💎 Perfecta para destacar con elegancia\n📲 Contáctanos para precio y entrega",
    precio: 15000,
    imagen: "img/13.png"
  },
  {
    id: 14,
    nombre: "Puntera Akrapovic Camuflada Dorada",
    categoria: "Punteras",
    descripcion: "Versión premium con acabado camuflado y detalles dorados que resaltan a simple vista.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Acabado: Carbono camuflado + dorado 🟡\n✅ Material: Acero inoxidable\n✅ Alta resistencia al calor\n✅ Fácil instalación\n✅ Tipo: Decorativa\n✨ Perfecta para un estilo exclusivo y llamativo\n📲 Contáctanos para cotizar o agendar instalación",
    precio: 15000,
    imagen: "img/14.png"
  },
  {
    id: 15,
    nombre: "Resonador MJ Mufflers 3.25” Tornasol Tipo HKS",
    categoria: "Punteras",
    descripcion: "Acabado tipo titanio quemado para un estilo racing único.\n✅ Diámetro: 3.25”\n✅ Punta tornasol (azul/dorado) 🌈\n✅ Acero inoxidable\n✅ Sonido agresivo pero controlado 🔊\n✅ Alta resistencia al calor\n💥 Ideal para destacar en cualquier build\n📲 Disponible bajo pedido",
    precio: 15000,
    imagen: "img/15.png"
  },
  {
    id: 16,
    nombre: "Puntera tipo BMW – Azul",
    categoria: "Punteras",
    descripcion: "Estilo deportivo inspirado en la línea M, con aro azul que resalta y acabado carbono.\n✅ Diseño: Tipo BMW / M Performance 🔥\n✅ Acabado: Fibra de carbono + azul 🔵\n✅ Material: Acero inoxidable\n✅ Alta resistencia al calor\n✅ Fácil instalación\n✅ Tipo: Decorativa\n💯 Perfecta para un look racing moderno\n📲 Contáctanos para cotizar o agendar instalación",
    precio: 15000,
    imagen: "img/16.png"
  },
  {
    id: 17,
    nombre: "Puntera Akrapovic 4.0” Carbono + Morado (Titanium Style)",
    categoria: "Punteras",
    descripcion: "Versión deportiva con efecto tornasol morado tipo titanio.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Medida: 4.0”\n✅ Acabado: Carbono + morado 🟣\n✅ Efecto quemado tipo titanio\n✅ Alta resistencia al calor\n✅ Instalación rápida\n✅ Tipo: Decorativa\n💜 Estilo racing premium\n📲 Contáctanos para disponibilidad",
    precio: 15000,
    imagen: "img/17.png"
  },
  {
    id: 18,
    nombre: "Resonador MJ Mufflers Sesgo Morado",
    categoria: "Punteras",
    descripcion: "Diseño inclinado con un acabado llamativo que destaca al instante.\n✅ Diseño sesgado (salida inclinada)\n✅ Punta en acabado morado 💜\n✅ Cuerpo en acero inoxidable\n✅ Sonido deportivo profundo y limpio 🔊\n✅ Mejora la estética y el flujo del escape\n💥 Ideal para quienes buscan un look agresivo y diferente\n📲 Contáctanos para cotizar el tuyo hoy mismo",
    precio: 15000,
    imagen: "img/18.png"
  },
  {
    id: 19,
    nombre: "Resonador MJ Mufflers Sesgo Plateado",
    categoria: "Punteras",
    descripcion: "Elegancia clásica con diseño deportivo.\n✅ Diseño sesgado (salida inclinada)\n✅ Acabado plateado pulido ✨\n✅ Fabricado en acero inoxidable\n✅ Sonido balanceado y eficiente 🔊\n✅ Excelente flujo de gases\n💥 Ideal para proyectos discretos pero con estilo\n📲 Contáctanos para más información y disponibilidad",
    precio: 15000,
    imagen: "img/19.png"
  },
  {
    id: 20,
    nombre: "Puntera Akrapovic Mate (Fibra de Carbono)",
    categoria: "Punteras",
    descripcion: "Puntera deportiva tipo Akrapovic con acabado mate en fibra de carbono, perfecta para un look elegante y agresivo.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Acabado: Fibra de carbono mate 🖤\n✅ Material: Acero inoxidable + carbono\n✅ Alta resistencia al calor\n✅ Sistema con abrazadera\n✅ Tipo: Decorativa\n💥 Ideal para un estilo limpio y deportivo\n📲 Contáctanos para precio, disponibilidad e instalación",
    precio: 15000,
    imagen: "img/20.png"
  },
  {
    id: 21,
    nombre: "Botella MJ Mufflers Corta",
    categoria: "Punteras",
    descripcion: "Resonador compacto ideal para mejorar el sonido sin ocupar mucho espacio.\n✅ Material: Acero inoxidable\n✅ Tamaño: Corto\n✅ Sonido más deportivo y definido 🔊\n✅ Reduce ruido metálico\n💥 Perfecta para setups donde hay poco espacio o quieres un sonido más agresivo\n📲 Contáctanos para precio",
    precio: 15000,
    imagen: "img/21.png"
  },
  {
    id: 22,
    nombre: "Puntera Akrapovic Camuflada (Carbono)",
    categoria: "Punteras",
    descripcion: "Diseño exclusivo tipo camuflaje en fibra de carbono, diferente y llamativo para destacar.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Acabado: Carbono camuflado ⚫\n✅ Material: Alta calidad resistente al calor\n✅ Instalación con abrazadera\n✅ Tipo: Decorativa\n💯 Look único y deportivo\n📲 Contáctanos para más información o compra",
    precio: 15000,
    imagen: "img/22.png"
  },
  {
    id: 23,
    nombre: "Botella MJ Mufflers Larga",
    categoria: "Punteras",
    descripcion: "Máxima reducción de ruido sin perder el tono deportivo.\n✅ Material: Acero inoxidable\n✅ Tamaño: Largo\n✅ Mayor control de sonido\n✅ Manejo óptimo de resonancia\n💥 Perfecta para quienes buscan sonido fino, profundo y sin molestia\n📲 Escríbenos para cotizar",
    precio: 15000,
    imagen: "img/23.png"
  },
  {
    id: 24,
    nombre: "Puntera tipo BMW – Negra (fibra de carbono)",
    categoria: "Punteras",
    descripcion: "Puntera deportiva estilo BMW M con acabado en fibra de carbono y aro oscuro, ideal para un look premium y agresivo.\n✅ Diseño: Tipo BMW / M Performance 🔥\n✅ Acabado: Fibra de carbono + negro 🖤\n✅ Material: Acero inoxidable + recubrimiento carbono\n✅ Alta resistencia al calor 🔥\n✅ Ajuste con abrazadera\n✅ Tipo: Decorativa\n💥 Perfecta para un estilo deportivo elegante\n📲 Contáctanos para precio, disponibilidad e instalación",
    precio: 15000,
    imagen: "img/24.png"
  },
  {
    id: 25,
    nombre: "Puntera Akrapovic Doble Salida 4.0” Carbono Brillante",
    categoria: "Punteras",
    descripcion: "Versión con acabado brillante para un look más fino y llamativo.\n✅ Diseño: Doble salida tipo Akrapovic 🔥\n✅ Medida: 4.0” cada salida\n✅ Acabado: Carbono brillante ✨\n✅ Material premium\n✅ Resistente al calor\n✅ Instalación sencilla\n✅ Tipo: Decorativa\n💎 Perfecta para un estilo elegante y deportivo\n📲 Contáctanos para más información",
    precio: 15000,
    imagen: "img/25.png"
  },
  {
    id: 26,
    nombre: "Puntera Akrapovic 4.0” Fibra de Carbono (Gris/Clásica)",
    categoria: "Punteras",
    descripcion: "Puntera deportiva tipo Akrapovic en fibra de carbono con diseño elegante y moderno.\n✅ Diseño: Tipo Akrapovic 🔥\n✅ Medida: 4.0”\n✅ Acabado: Fibra de carbono gris 🖤\n✅ Material: Acero inoxidable + carbono\n✅ Alta resistencia al calor\n✅ Instalación con abrazadera\n✅ Tipo: Decorativa\n💥 Estilo OEM+ deportivo y limpio\n📲 Contáctanos para precio y disponibilidad",
    precio: 15000,
    imagen: "img/26.png"
  },
  {
    id: 27,
    nombre: "Doble salida sesgo – Negra",
    categoria: "Punteras",
    descripcion: "Puntera deportiva de doble salida con corte en sesgo y acabado negro, ideal para un estilo agresivo y elegante.\n✅ Diseño: Doble salida sesgada 🔥\n✅ Acabado: Negro brillante 🖤\n✅ Material: Acero inoxidable\n✅ Alta resistencia al calor y corrosión\n✅ Tipo: Decorativa (no modifica sonido)\n✅ Instalación sencilla\n💥 Perfecta para un look deportivo más agresivo\n📲 Contáctanos para precio, disponibilidad e instalación",
    precio: 15000,
    imagen: "img/27.png"
  },
  {
    id: 28,
    nombre: "Doble salida redonda – Acero inoxidable",
    categoria: "Punteras",
    descripcion: "Puntera deportiva de doble salida redonda con acabado pulido tipo espejo, ideal para un look elegante y deportivo.\n✅ Diseño: Doble salida redonda 🔵🔵\n✅ Acabado: Acero inoxidable pulido ✨\n✅ Material: Alta calidad, resistente\n✅ Resistente al calor y corrosión 🔥\n✅ Tipo: Decorativa (no modifica sonido)\n✅ Instalación sencilla\n👌 Perfecta para un estilo limpio, clásico y deportivo\n📲 Contáctanos para precio, disponibilidad e instalación",
    precio: 15000,
    imagen: "img/28.png"
  },
  {
    id: 29,
    nombre: "Doble salida sesgo – Acero inoxidable",
    categoria: "Punteras",
    descripcion: "Versión clásica con acabado pulido tipo espejo, elegante y versátil para cualquier vehículo.\n✅ Diseño: Doble salida sesgada 🔥\n✅ Acabado: Cromado / acero pulido ✨\n✅ Material: Alta calidad\n✅ Resistente a la corrosión\n✅ Tipo: Decorativa\n✅ Instalación sencilla\n👌 Ideal para un look limpio y deportivo\n📲 Contáctanos para cotizar o agendar instalación",
    precio: 15000,
    imagen: "img/29.png"
  },
  {
    id: 30,
    nombre: "Cola de Pato Pequeña Plateada",
    categoria: "Punteras",
    descripcion: "Puntera compacta con diseño tipo cola de pato, ideal para quienes buscan un estilo discreto pero deportivo.\nSu acabado pulido le da un look limpio y elegante. 🚗💎\n✅ Diseño: Cola de pato compacta 🦆\n✅ Tamaño: Pequeño (ideal para espacios reducidos)\n✅ Acabado: Plateado espejo ✨\n✅ Material: Acero inoxidable\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente al calor\n✅ Instalación universal\n💥 Estilo sobrio con toque deportivo\n📲 Escríbenos para más info o instalación",
    precio: 15000,
    imagen: "img/30.png"
  },
  {
    id: 31,
    nombre: "Doble salida redonda – Tornasol",
    categoria: "Punteras",
    descripcion: "Diseño deportivo con acabado tornasol que cambia de color según la luz, ideal para un look llamativo y moderno.\n✅ Diseño: Doble salida redonda 🔵🔵\n✅ Acabado: Tornasol (azul, dorado, púrpura) 🌈\n✅ Material: Acero inoxidable\n✅ Alta resistencia al calor 🔥\n✅ Tipo: Decorativa\n✅ Instalación rápida\n💥 Ideal para destacar y darle un toque único a tu vehículo\n📲 Contáctanos para más información o compra",
    precio: 15000,
    imagen: "img/31.png"
  },
  {
    id: 32,
    nombre: "Puntera Cuadrada con Malla Tornasol",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look único y agresivo con esta puntera cuadrada en acabado tornasol con malla interna.\nSu diseño moderno resalta al instante y aporta un estilo deportivo sin modificar el sonido original. 🚗✨\n✅ Forma: Cuadrada 🔷\n✅ Acabado: Tornasol 🌈\n✅ Diseño: Con malla interna\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo deportivo moderno con acabado premium\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/32.png"
  },
  {
    id: 33,
    nombre: "Puntera 4.0 Sesgo Plateada",
    categoria: "Punteras",
    descripcion: "Un diseño clásico en gran tamaño que aporta elegancia y presencia a tu vehículo.\nPerfecta para un look limpio pero deportivo. 🚗💨\n✅ Diámetro: 4.0\n✅ Acabado: Plateado ⚪\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo elegante con presencia deportiva\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/33.png"
  },
  {
    id: 34,
    nombre: "Doble salida cola de pato – Púrpura",
    categoria: "Punteras",
    descripcion: "Diseño deportivo con acabado púrpura intenso, ideal para un estilo más exclusivo y agresivo.\n✅ Diseño: Doble salida tipo cola de pato 🦆\n✅ Acabado: Púrpura metálico\n✅ Material: Acero inoxidable\n✅ Alta resistencia al calor 🔥\n✅ Tipo: Decorativa\n✅ Instalación rápida\n💯 Ideal para quienes buscan un look diferente y llamativo\n📲 Contáctanos para más información o compra",
    precio: 15000,
    imagen: "img/34.png"
  },
  {
    id: 35,
    nombre: "Cola de Pato Grande Plateada",
    categoria: "Punteras",
    descripcion: "Puntera amplia con diseño tipo cola de pato, ideal para darle mayor presencia a la parte trasera del vehículo.\nSu acabado pulido espejo ofrece un estilo limpio, elegante y deportivo. 🚗💎\n✅ Diseño: Cola de pato grande 🦆\n✅ Tamaño: Amplio (mayor presencia visual)\n✅ Acabado: Plateado espejo ✨\n✅ Material: Acero inoxidable\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Alta resistencia al calor\n✅ Instalación universal\n💥 Look deportivo elegante y llamativo\n📲 Escríbenos para más info o instalación",
    precio: 15000,
    imagen: "img/35.png"
  },
  {
    id: 36,
    nombre: "Puntera Ovalada Pequeña Tornasol",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un toque moderno con esta puntera ovalada compacta en acabado tornasol.\nSu efecto multicolor resalta con la luz, logrando un look llamativo y diferente. 🚗✨\n✅ Forma: Ovalada pequeña 🔵\n✅ Acabado: Tornasol 🌈\n✅ Diseño: Compacto y deportivo\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo moderno con efecto multicolor\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/36.png"
  },
  {
    id: 37,
    nombre: "Cola de Pato Pequeña Tornasol",
    categoria: "Punteras",
    descripcion: "Versión compacta con acabado tornasol que cambia de color según la luz, perfecta para destacar sin necesidad de una punta grande. 🚗🌈\n✅ Diseño: Cola de pato compacta 🦆\n✅ Tamaño: Pequeño\n✅ Acabado: Tornasol multicolor 🌈\n✅ Material: Acero inoxidable\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Alta resistencia al calor\n✅ Instalación universal\n💥 Look racing en tamaño compacto\n📲 Escríbenos para más info o instalación",
    precio: 15000,
    imagen: "img/37.png"
  },
  {
    id: 38,
    nombre: "Puntera 4.0 Sesgo Tornasol",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look imponente y moderno con esta puntera de gran diámetro en acabado tornasol. Su efecto multicolor cambia con la luz, logrando un estilo único y deportivo. 🚗✨\n✅ Diámetro: 4.0\n✅ Acabado: Tornasol 🌈\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo grande, llamativo y diferente\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/38.png"
  },
  {
    id: 39,
    nombre: "Doble salida sesgo – Tornasol",
    categoria: "Punteras",
    descripcion: "Diseño moderno con acabado tornasol que cambia de color según la luz, ideal para destacar.\n✅ Diseño: Doble salida sesgada 🔥\n✅ Acabado: Tornasol (azul, dorado, púrpura) 🌈\n✅ Material: Acero inoxidable\n✅ Resistente al calor 🔥\n✅ Tipo: Decorativa\n✅ Instalación rápida\n💯 Perfecta para un estilo único y llamativo\n📲 Contáctanos para más información o compra",
    precio: 15000,
    imagen: "img/39.png"
  },
  {
    id: 40,
    nombre: "Puntera Ovalada con Malla Plateada",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un acabado limpio y elegante con esta puntera ovalada en acero inoxidable pulido con malla interna. Ideal para un look clásico y deportivo. 🚗✨\n✅ Forma: Ovalada ⚪\n✅ Acabado: Plateado pulido ✨\n✅ Diseño: Con malla interna\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo clásico con acabado premium\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/40.png"
  },
  {
    id: 41,
    nombre: "Puntera Ovalada con Malla Tornasol",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un toque llamativo con esta puntera ovalada en acabado tornasol con malla interna. Su efecto multicolor resalta con la luz, logrando un look moderno y único. 🚗✨\n✅ Forma: Ovalada 🔵\n✅ Acabado: Tornasol 🌈\n✅ Diseño: Con malla interna\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo moderno con efecto multicolor impactante\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/41.png"
  },
  {
    id: 42,
    nombre: "Puntera 3.5 Sesgo Plateada",
    categoria: "Punteras",
    descripcion: "Diseño clásico y limpio que combina con cualquier vehículo, brindando un toque deportivo sin exagerar. 🚗💨\n✅ Diámetro: 3.5\n✅ Acabado: Plateado ⚪\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo elegante y versátil\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/42.png"
  },
  {
    id: 43,
    nombre: "Puntera Ovalada con Malla Morado",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo único con esta puntera ovalada en acabado tornasol morado con malla interna. Su tonalidad intensa le da un look exclusivo y deportivo. 🚗✨\n✅ Forma: Ovalada 🟣\n✅ Acabado: morado 💜\n✅ Diseño: Con malla interna\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo deportivo con personalidad única\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/43.png"
  },
  {
    id: 44,
    nombre: "Cola de Pato Grande Púrpura Tornasol",
    categoria: "Punteras",
    descripcion: "Versión premium con acabado púrpura tornasol que ofrece un efecto más intenso y exclusivo. Ideal para builds personalizados o tuning más agresivo. 🚗💜\n✅ Diseño: Cola de pato grande 🦆\n✅ Tamaño: Amplio\n✅ Acabado: Púrpura tornasol 💜🌈\n✅ Material: Acero inoxidable\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Alta resistencia al calor\n✅ Instalación universal\n💥 Look tuning premium, agresivo y único\n📲 Escríbenos para más info o instalación",
    precio: 15000,
    imagen: "img/44.png"
  },
  {
    id: 45,
    nombre: "Doble salida sesgo – Dorada",
    categoria: "Punteras",
    descripcion: "Diseño llamativo con acabado dorado, perfecto para un estilo premium y elegante.\n✅ Diseño: Doble salida sesgada 🔥\n✅ Acabado: Dorado metálico 🟡\n✅ Material: Acero inoxidable\n✅ Resistente al calor y desgaste\n✅ Tipo: Decorativa\n✅ Instalación sencilla\n✨ Ideal para destacar con un look exclusivo\n📲 Contáctanos para precio y disponibilidad",
    precio: 15000,
    imagen: "img/45.png"
  },
  {
    id: 46,
    nombre: "Puntera 3.5 Sesgo Tornasol",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo único con este acabado tornasol que cambia de color según la luz. Ideal para quienes buscan destacar con un look moderno y deportivo. 🚗✨\n✅ Diámetro: 3.5\n✅ Acabado: Tornasol 🌈\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Look llamativo con efecto multicolor\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/46.png"
  },
  {
    id: 47,
    nombre: "Cola de Pato con Malla Tornasol",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look agresivo y moderno con esta puntera tipo cola de pato con acabado tornasol. Su diseño ancho con malla interna resalta el estilo deportivo y mejora la estética trasera. 🚗✨\n✅ Diseño: Cola de pato 🦆\n✅ Acabado: Tornasol 🌈\n✅ Detalle: Malla interna deportiva 🔳\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Alta resistencia al calor\n✅ Instalación universal\n💥 Estilo racing con efecto multicolor impactante\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/47.png"
  },
  {
    id: 48,
    nombre: "Puntera 3.5 Sesgo Negra",
    categoria: "Punteras",
    descripcion: "Un look agresivo y moderno con acabado negro que le da presencia deportiva a tu vehículo. 🚗💣\n✅ Diámetro: 3.5\n✅ Acabado: Negro ⚫\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo deportivo oscuro y elegante\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/48.png"
  },
  {
    id: 49,
    nombre: "Puntera de Bus Tornasol",
    categoria: "Punteras",
    descripcion: "Puntera de gran tamaño diseñada especialmente para buses o vehículos de escape amplio. Su acabado tornasol brinda un estilo llamativo y moderno, ideal para destacar en carretera. 🚍🌈\n✅ Diseño: Tipo bus (boca amplia) 🚌\n✅ Tamaño: Grande (alto flujo visual y estético)\n✅ Acabado: Tornasol multicolor 🌈\n✅ Material: Acero inoxidable de alta resistencia\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Alta resistencia a temperaturas elevadas\n✅ Ideal para escapes grandes o adaptaciones\n💥 Estilo imponente y profesional para vehículos de mayor tamaño\n📲 Escríbenos para más info o instalación",
    precio: 15000,
    imagen: "img/49.png"
  },
  {
    id: 50,
    nombre: "Puntera Ovalada Pequeña Plateada",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look limpio y elegante con esta puntera ovalada compacta en acabado plateado pulido. Su diseño discreto es perfecto para un estilo sobrio y deportivo. 🚗✨\n✅ Forma: Ovalada pequeña ⚪\n✅ Acabado: Plateado pulido ✨\n✅ Diseño: Compacto y elegante\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo discreto con acabado premium\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/50.png"
  },
  {
    id: 51,
    nombre: "Doble salida cola de pato – Tornasol",
    categoria: "Punteras",
    descripcion: "Puntera deportiva de doble salida con acabado tornasol que cambia de color según la luz, ideal para un look llamativo y moderno. 🌈\n✅ Diseño: Doble salida tipo cola de pato 🦆\n✅ Acabado: Tornasol (efecto azul, dorado y púrpura)\n✅ Material: Acero inoxidable\n✅ Resistente al calor y corrosión 🔥\n✅ Tipo: Decorativa (no modifica sonido)\n✅ Instalación sencilla\n💥 Perfecta para destacar y darle un toque único a tu vehículo\n📲 Contáctanos para precio, disponibilidad e instalación",
    precio: 15000,
    imagen: "img/51.png"
  },
  {
    id: 52,
    nombre: "Cola de Pato Grande Tornasol",
    categoria: "Punteras",
    descripcion: "Diseño ancho con acabado tornasol que cambia de color según la luz. Perfecta para quienes buscan destacar con un estilo racing moderno. 🚗🌈\n✅ Diseño: Cola de pato grande 🦆\n✅ Tamaño: Amplio\n✅ Acabado: Tornasol multicolor 🌈\n✅ Material: Acero inoxidable\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo racing con efecto multicolor impactante\n📲 Escríbenos para más info o instalación",
    precio: 15000,
    imagen: "img/52.png"
  },
  {
    id: 53,
    nombre: "Puntera Ovalada Pequeña Morado",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo único con esta puntera ovalada pequeña en acabado tornasol morado. Su tonalidad intensa aporta personalidad y un look deportivo exclusivo. 🚗✨\n✅ Forma: Ovalada pequeña 🟣\n✅ Acabado: morado 💜\n✅ Diseño: Compacto y llamativo\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo deportivo con personalidad única\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/53.png"
  },
  {
    id: 54,
    nombre: "Doble salida sesgo – Púrpura",
    categoria: "Punteras",
    descripcion: "Puntera deportiva con acabado púrpura metálico, perfecta para un estilo exclusivo.\n✅ Diseño: Doble salida sesgada 🔥\n✅ Acabado: Púrpura brillante 🔮\n✅ Material: Acero inoxidable\n✅ Alta resistencia al calor\n✅ Tipo: Decorativa\n✅ Instalación rápida\n💥 Ideal para quienes buscan algo diferente\n📲 Contáctanos para más información",
    precio: 15000,
    imagen: "img/54.png"
  },
  {
    id: 55,
    nombre: "Puntera Redonda 3.5\" Acero Inoxidable Cromado",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo elegante y robusto con esta puntera redonda de 3.5\" en acabado cromado. Su diseño clásico y brillante resalta la apariencia del escape sin modificar el sonido original. 🚗✨\n✅ Diámetro: 3.5\"\n✅ Diseño: Redondo clásico 🔵\n✅ Acabado: Cromado brillante ✨\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas y corrosión\n✅ Instalación universal\n💥 Ideal para quienes buscan un look más grande, elegante y llamativo.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/55.png"
  },
  {
    id: 56,
    nombre: "Puntera 2.0\" Acero Inoxidable Cromado",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look limpio y elegante con esta puntera en acero inoxidable cromado. Su acabado brillante tipo espejo resalta al instante sin modificar el sonido original. 🚗✨\n✅ Diámetro: 2.0\"\n✅ Acabado: Cromado brillante ✨\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas y corrosión\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo clásico, elegante y atemporal.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/56.png"
  },
  {
    id: 57,
    nombre: "Puntera 2.75\" Sesgo Acero Pulido",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look limpio y elegante con esta puntera en acero pulido. Su acabado clásico resalta sin modificar el sonido original. 🚗✨\n✅ Diámetro: 2.75\"\n✅ Acabado: Acero Pulido ⚪\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo discreto pero elegante.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/57.png"
  },
  {
    id: 58,
    nombre: "Puntera 4.0\" Negra Acero Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look agresivo y sofisticado con esta puntera en acabado negro. Su diseño discreto y deportivo resalta sin modificar el sonido original. 🚗✨\n✅ Diámetro: 4.0\"\n✅ Acabado: Negro ⚫\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo grande, elegante y deportivo.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/58.png"
  },
  {
    id: 59,
    nombre: "Puntera 3.5\" Sesgo Morada",
    categoria: "Punteras",
    descripcion: "Acabado vibrante en tono morado que le da un toque diferente y personalizado a tu vehículo. 🚗✨\n✅ Diámetro: 3.5\"\n✅ Acabado: Morado 🟣\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para un estilo único y atrevido\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/59.png"
  },
  {
    id: 60,
    nombre: "Puntera 2.0\" Tornasol Acero Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un toque deportivo y llamativo con esta puntera en acabado tornasol. Su efecto multicolor resalta con la luz, logrando un look moderno sin modificar el sonido original. 🚗✨\n✅ Diámetro: 2.0\"\n✅ Acabado: Tornasol 🌈\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo compacto, moderno y diferente.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/60.png"
  },
  {
    id: 61,
    nombre: "Puntera Redonda 3.0\" Acero Inoxidable Cromado",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo elegante y limpio con esta puntera redonda de 3.0\" en acabado cromado. Su diseño clásico y brillante mejora la apariencia del escape sin modificar el sonido original. 🚗✨\n✅ Diámetro: 3.0\"\n✅ Diseño: Redondo clásico 🔵\n✅ Acabado: Cromado brillante ✨\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas y corrosión\n✅ Instalación universal\n💥 Ideal para un look elegante, moderno y atemporal.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/61.png"
  },
  {
    id: 62,
    nombre: "Puntera 3.0\" Sesgo Tornasol Acero Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo deportivo y moderno con esta puntera en acabado tornasol. Su efecto multicolor resalta con la luz, logrando un look llamativo sin modificar el sonido original. 🚗✨\n✅ Diámetro: 3.0\"\n✅ Acabado: Tornasol 🌈\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo deportivo más robusto y llamativo.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/62.png"
  },
  {
    id: 63,
    nombre: "Puntera Redonda 3.5\" Tornasol Acero Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo deportivo y llamativo con esta puntera redonda de 3.5\" en acabado tornasol. Su efecto multicolor cambia con la luz, logrando un look moderno sin modificar el sonido original. 🚗✨\n✅ Diámetro: 3.5\"\n✅ Diseño: Redondo clásico 🔵\n✅ Acabado: Tornasol 🌈\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas y corrosión\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo más grande, agresivo y llamativo.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/63.png"
  },
  {
    id: 64,
    nombre: "Puntera 4.0\" Tornasol Acero Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo deportivo y moderno con esta puntera en acabado tornasol multicolor. Su efecto cambia con la luz, logrando un look único sin modificar el sonido original. 🚗✨\n✅ Diámetro: 4.0\"\n✅ Acabado: Tornasol 🌈\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo grande, moderno y llamativo.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/64.png"
  },
  {
    id: 65,
    nombre: "Puntera Redonda 3.0\" Tornasol Acero Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo moderno y llamativo con esta puntera redonda de 3.0\" en acabado tornasol. Su efecto multicolor cambia con la luz, logrando un look deportivo sin modificar el sonido original. 🚗✨\n✅ Diámetro: 3.0\"\n✅ Diseño: Redondo clásico 🔵\n✅ Acabado: Tornasol 🌈\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas y corrosión\n✅ Instalación universal\n💥 Ideal para quienes buscan destacar con un estilo diferente y deportivo.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/65.png"
  },
  {
    id: 66,
    nombre: "Puntera 2.75\" Sesgo Negra Acero Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo agresivo y sofisticado con esta puntera en acabado negro. Su diseño moderno destaca sin modificar el sonido original. 🚗✨\n✅ Diámetro: 2.75\"\n✅ Acabado: Negro ⚫\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un look deportivo y elegante.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/66.png"
  },
  {
    id: 67,
    nombre: "Puntera 4.0\" Tornasol Morado Acero Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un look agresivo y llamativo con esta puntera en acabado tornasol morado. Su color vibrante resalta con la luz, logrando un estilo deportivo sin modificar el sonido original. 🚗✨\n✅ Diámetro: 4.0\"\n✅ Acabado: Tornasol Morado 🟣\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo grande, deportivo y llamativo.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/67.png"
  },
  {
    id: 68,
    nombre: "Puntera Redonda 2.0\" Morada",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo único y elegante con esta puntera en acabado morado. Su diseño moderno resalta al instante sin modificar el sonido original. 🚗✨\n✅ Diámetro: 2.0\"\n✅ Acabado: Morado 💜\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un estilo compacto, elegante y diferente.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/68.png"
  },
  {
    id: 69,
    nombre: "Puntera 3.5\" Sesgo Dorada",
    categoria: "Punteras",
    descripcion: "Un acabado dorado elegante que aporta un estilo exclusivo y refinado a tu vehículo, ideal para destacar con clase. 🚗🔥\n✅ Diámetro: 3.5\"\n✅ Acabado: Dorado 🟡\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Diseño: Corte sesgado\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Estilo premium con acabado brillante\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/69.png"
  },
  {
    id: 70,
    nombre: "Puntera 4.0\" Acero Pulido Inoxidable",
    categoria: "Punteras",
    descripcion: "Dale a tu vehículo un estilo elegante y limpio con esta puntera en acero pulido. Su acabado clásico brinda presencia sin modificar el sonido original. 🚗✨\n✅ Diámetro: 4.0\"\n✅ Acabado: Acero Pulido ⚪\n✅ Material: Acero inoxidable de alta calidad\n✅ Tipo: Puntera decorativa (NO modifica el sonido) 🚫🔊\n✅ Resistente a altas temperaturas\n✅ Instalación universal\n💥 Ideal para quienes buscan un look grande, elegante y atemporal.\n📲 Escríbenos para más información o instalación",
    precio: 15000,
    imagen: "img/70.png"
  }
];

/* ---------- 2. CONFIGURACIÓN GENERAL ---------- */
const CONFIG = {
  // Número de WhatsApp al que llegarán las consultas (formato internacional, sin "+" ni espacios)
  whatsappNumero: "573012290989",
  moneda: "COP",

  // IMPORTANTE: una vez publiques el sitio en GitHub Pages, pega aquí la URL base
  // (con "/" al final), por ejemplo: "https://tu-usuario.github.io/proyectoGeo/"
  // Esto permite que el mensaje de WhatsApp incluya el enlace de la imagen del
  // producto, y WhatsApp mostrará automáticamente una vista previa de la foto
  // dentro del chat. Si lo dejas vacío (""), el mensaje se envía solo con texto.
  urlBase: "https://reyes2005reyes.github.io/Catalogo/"
};

/* ---------- ANIMACIÓN AL HACER SCROLL ---------- */

// Se dispara cuando un elemento entra o sale de la pantalla.
// Al entrar agrega "is-visible" (aparece), al salir la quita (desaparece),
// así la animación se repite cada vez que el usuario sube o baja.


/* ---------- 3. RENDER DEL GRID DE PRODUCTOS ---------- */
const grid = document.getElementById("productGrid");
const estadoVacio = document.getElementById("estadoVacio");
const contadorResultados = document.getElementById("contadorResultados");
const totalProductosEl = document.getElementById("totalProductos");
const paginacionEl = document.getElementById("paginacion");

const PRODUCTOS_POR_PAGINA = 4; // <-- cambia este número si quieres más o menos por página
let paginaActual = 1;
let listaFiltradaActual = productos;

/**
 * Formatea un número como precio en pesos colombianos.
 * @param {number} valor
 * @returns {string}
 */
function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: CONFIG.moneda,
    maximumFractionDigits: 0
  }).format(valor);
}

/**
 * Construye el mensaje de WhatsApp precargado para un producto.
 * Si CONFIG.urlBase está configurada, agrega el enlace público de la imagen
 * al final del mensaje: WhatsApp genera automáticamente una vista previa de
 * esa foto dentro del chat cuando el mensaje se envía.
 * @param {object} producto
 * @returns {string} URL de wa.me
 */
function construirEnlaceWhatsapp(producto) {
  let mensaje = `Hola, quisiera consultar disponibilidad de: ${producto.nombre}`;

  if (CONFIG.urlBase) {
    const urlImagen = new URL(producto.imagen, CONFIG.urlBase).href;
    mensaje += `\n${urlImagen}`;
  }

  return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Crea el elemento DOM de una tarjeta de producto.
 * @param {object} producto
 * @param {number} indice
 * @returns {HTMLElement}
 */
function crearTarjeta(producto, indice) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.style.animationDelay = `${Math.min(indice * 0.06, 0.6)}s`;

  card.innerHTML = `
    <div class="card-media" data-id="${producto.id}">
      <span class="card-index">N.º ${String(producto.id).padStart(3, "0")}</span>
      <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
      <span class="card-expand" aria-hidden="true"><i class="fa-solid fa-expand"></i></span>
    </div>
    <div class="card-body">
      <span class="card-category">${producto.categoria}</span>
      <h3 class="card-title">${producto.nombre}</h3>
      <p class="card-desc"></p>
      <div class="card-footer">
        <span class="card-price">${formatearPrecio(producto.precio)}<span>Precio</span></span>
        <a class="card-contact" href="${construirEnlaceWhatsapp(producto)}" target="_blank" rel="noopener" aria-label="Consultar ${producto.nombre} por WhatsApp">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>
    </div>
  `;

  card.querySelector(".card-desc").textContent = producto.descripcion;

  card.querySelector(".card-media").addEventListener("click", () => abrirModal(producto));

  return card;
}

/**
 * Dibuja en el grid una lista de productos dada.
 * @param {object[]} lista
 */
function renderizarProductos(lista) {
  listaFiltradaActual = lista;

  const totalPaginas = Math.max(1, Math.ceil(lista.length / PRODUCTOS_POR_PAGINA));
  if (paginaActual > totalPaginas) paginaActual = totalPaginas;

  const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const listaPagina = lista.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

  grid.innerHTML = "";

  if (lista.length === 0) {
    estadoVacio.hidden = false;
  } else {
    estadoVacio.hidden = true;
    listaPagina.forEach((producto, indice) => {
      const tarjeta = crearTarjeta(producto, indice);
      grid.appendChild(tarjeta);
      activarRevealEnScroll(tarjeta);
    });
  }

  if (lista.length === 0) {
    contadorResultados.textContent = "";
  } else {
    contadorResultados.textContent = `${lista.length} de ${productos.length} productos`;
  }

  renderizarPaginacion(totalPaginas);
}

/**
 * Dibuja los botones de "Anterior", números de página y "Siguiente".
 * Si hay muchas páginas, las comprime con puntos suspensivos
 * (ej: « 1 2 3 … 9 »), para que no se vea saturado.
 * @param {number} totalPaginas
 */
function renderizarPaginacion(totalPaginas) {
  paginacionEl.innerHTML = "";

  if (totalPaginas <= 1) return; // no hace falta paginación si cabe en una sola página

  const irAPagina = (numero) => {
    paginaActual = numero;
    renderizarProductos(listaFiltradaActual);
    document.getElementById("coleccion").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Botón "Anterior"
  const btnAnterior = document.createElement("button");
  btnAnterior.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  btnAnterior.setAttribute("aria-label", "Página anterior");
  btnAnterior.disabled = paginaActual === 1;
  btnAnterior.addEventListener("click", () => irAPagina(paginaActual - 1));
  paginacionEl.appendChild(btnAnterior);

  const agregarBotonNumero = (numero) => {
    const btn = document.createElement("button");
    btn.textContent = numero;
    if (numero === paginaActual) btn.classList.add("is-active");
    btn.addEventListener("click", () => irAPagina(numero));
    paginacionEl.appendChild(btn);
  };

  const agregarPuntos = () => {
    const span = document.createElement("span");
    span.className = "pagination-dots";
    span.textContent = "…";
    paginacionEl.appendChild(span);
  };

  const rango = calcularRangoPaginas(paginaActual, totalPaginas);
  rango.forEach((item) => {
    if (item === "...") {
      agregarPuntos();
    } else {
      agregarBotonNumero(item);
    }
  });

  // Botón "Siguiente"
  const btnSiguiente = document.createElement("button");
  btnSiguiente.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  btnSiguiente.setAttribute("aria-label", "Página siguiente");
  btnSiguiente.disabled = paginaActual === totalPaginas;
  btnSiguiente.addEventListener("click", () => irAPagina(paginaActual + 1));
  paginacionEl.appendChild(btnSiguiente);
}

/**
 * Calcula qué números de página mostrar, comprimiendo con "..." cuando
 * hay muchas páginas. Ejemplo con 9 páginas y estando en la página 5:
 * [1, "...", 4, 5, 6, "...", 9]
 * @param {number} actual
 * @param {number} total
 * @returns {(number|string)[]}
 */
function calcularRangoPaginas(actual, total) {
  const VENTANA = 1; // cuántas páginas mostrar a cada lado de la actual

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const paginas = new Set([1, total, actual]);
  for (let i = actual - VENTANA; i <= actual + VENTANA; i++) {
    if (i > 1 && i < total) paginas.add(i);
  }

  const ordenadas = Array.from(paginas).sort((a, b) => a - b);
  const resultado = [];

  ordenadas.forEach((numero, indice) => {
    if (indice > 0 && numero - ordenadas[indice - 1] > 1) {
      resultado.push("...");
    }
    resultado.push(numero);
  });

  return resultado;
}

/* ---------- 4. BUSCADOR EN TIEMPO REAL ---------- */
const inputBuscador = document.getElementById("buscador");
const seccionVideos = document.getElementById("videos");

inputBuscador.addEventListener("input", (evento) => {
  const termino = evento.target.value.trim().toLowerCase();

  const filtrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(termino) ||
    producto.categoria.toLowerCase().includes(termino)
  );

  paginaActual = 1;
  renderizarProductos(filtrados);
  seccionVideos.hidden = termino !== "" && filtrados.length >= 0;
});

/* ---------- 5. MODAL DE PRODUCTO ---------- */
const modalOverlay = document.getElementById("modalOverlay");
const modalImagen = document.getElementById("modalImagen");
const modalCategoria = document.getElementById("modalCategoria");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalPrecio = document.getElementById("modalPrecio");
const modalWhatsapp = document.getElementById("modalWhatsapp");
const modalClose = document.getElementById("modalClose");

function abrirModal(producto) {
  modalImagen.src = producto.imagen;
  modalImagen.alt = producto.nombre;
  modalCategoria.textContent = producto.categoria;
  modalTitulo.textContent = producto.nombre;
  modalDescripcion.textContent = producto.descripcion;
  modalPrecio.textContent = formatearPrecio(producto.precio);
  modalWhatsapp.href = construirEnlaceWhatsapp(producto);

  modalOverlay.classList.add("is-open");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  modalOverlay.classList.remove("is-open");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", cerrarModal);

// Cerrar al hacer clic fuera de la tarjeta del modal
modalOverlay.addEventListener("click", (evento) => {
  if (evento.target === modalOverlay) cerrarModal();
});

// Cerrar con la tecla Escape
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && modalOverlay.classList.contains("is-open")) {
    cerrarModal();
  }
});

/* ---------- VIDEOS DE PRODUCTOS ---------- */
const videos = [
  { id: 1, titulo: "Punteras carbono MJ", producto: "Punteras carbono MJ",  poster: "videos/portada1.png", src: "videos/video1.mp4" },
  { id: 2, titulo: "Silenciador válvula dobles", producto: "Silenciador válvula dobles", poster: "videos/portada2.png", src: "videos/video2.mp4" },
  { id: 3, titulo: "Silenciador de alto flujo", producto: "Silenciador de alto flujo", poster: "videos/portada3.png", src: "videos/video3.mp4" },
  { id: 4, titulo: "Silenciador válvula sencillo", producto: "Silenciador válvula sencillo", poster: "videos/portada4.png", src: "videos/video4.mp4" }
];

const videoGrid = document.getElementById("videoGrid");
const modalVideoOverlay = document.getElementById("modalVideoOverlay");
const modalVideo = document.getElementById("modalVideo");
const modalVideoTitulo = document.getElementById("modalVideoTitulo");
const modalVideoClose = document.getElementById("modalVideoClose");
const modalVideoWhatsapp = document.getElementById("modalVideoWhatsapp"); 

function crearTarjetaVideo(video) {
  const card = document.createElement("article");
  card.className = "video-card";

  card.innerHTML = `
    <div class="video-thumb">
      <img src="${video.poster}" alt="${video.titulo}" loading="lazy">
      <span class="video-play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
      <a class="video-contact" href="${construirEnlaceWhatsappVideo(video)}" target="_blank" rel="noopener" aria-label="Consultar ${video.producto} por WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
      </a>
    </div>
    <div class="video-info">
      <h3></h3>
    </div>
  `;

  card.querySelector(".video-info h3").textContent = video.titulo;

  // El clic en la miniatura abre el modal; el botón de WhatsApp no debe abrirlo
  card.querySelector(".video-thumb").addEventListener("click", (evento) => {
    if (evento.target.closest(".video-contact")) return;
    abrirModalVideo(video);
  });

  return card;
}

/**
 * Construye el enlace de WhatsApp para consultar el producto mostrado en un video.
 * Incluye el link del video (si hay urlBase configurada) para que WhatsApp
 * muestre una vista previa.
 * @param {object} video
 * @returns {string}
 */
function construirEnlaceWhatsappVideo(video) {
  let mensaje = `Hola, vi el video de: ${video.producto} y quisiera consultar disponibilidad`;

  if (CONFIG.urlBase) {
    const urlVideo = new URL(video.src, CONFIG.urlBase).href;
    mensaje += `\n${urlVideo}`;
  }

  return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

function abrirModalVideo(video) {
  modalVideo.src = video.src;
  modalVideoTitulo.textContent = video.titulo;
  modalVideoWhatsapp.href = construirEnlaceWhatsappVideo(video);
  modalVideoOverlay.classList.add("is-open");
  modalVideoOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalVideo.play();
}

function cerrarModalVideo() {
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modalVideoOverlay.classList.remove("is-open");
  modalVideoOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalVideoClose.addEventListener("click", cerrarModalVideo);
modalVideoOverlay.addEventListener("click", (evento) => {
  if (evento.target === modalVideoOverlay) cerrarModalVideo();
});
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && modalVideoOverlay.classList.contains("is-open")) {
    cerrarModalVideo();
  }
});

/* ---------- 6. UTILIDADES ---------- */

// Año actual en el footer
document.getElementById("anioActual").textContent = new Date().getFullYear();

// Contador de productos en el badge del hero
totalProductosEl.textContent = String(productos.length).padStart(2, "0");

// Primer render al cargar la página
renderizarProductos(productos);

videos.forEach((video) => {
  const tarjeta = crearTarjetaVideo(video);
  videoGrid.appendChild(tarjeta);
  activarRevealEnScroll(tarjeta);
});