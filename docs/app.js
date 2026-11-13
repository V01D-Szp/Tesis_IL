// Construye la página principal y las páginas de detalle a partir de bitacora.js

(function () {
  "use strict";

  const ICONOS = {
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    code: '<path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    doc: '<path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 12h6M9 16h6M14 3v4h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    data: '<ellipse cx="12" cy="6" rx="7" ry="2.8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    book: '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5c-.8 0-1.5-.7-1.5-1.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>',
    arrowL: '<path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    arrowR: '<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  };

  function icono(nombre, clase) {
    return '<svg class="' + (clase || "icono") + '" viewBox="0 0 24 24" aria-hidden="true">' + ICONOS[nombre] + "</svg>";
  }

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Texto con `código` y etiqueta inicial "Tema:" en negrita
  function formatear(texto, conEtiqueta) {
    let html = escapar(texto).replace(/`([^`]+)`/g, "<code>$1</code>");
    if (conEtiqueta) {
      html = html.replace(/^([^:]{2,40}):\s/, "<strong>$1:</strong> ");
    }
    return html;
  }

  function clasificar(url) {
    if (/sharepoint\.com\/:v:/.test(url)) return { clase: "video", etiqueta: "Video", icono: "play", fuente: "SharePoint institucional" };
    if (/youtube\.com|youtu\.be/.test(url)) return { clase: "youtube", etiqueta: "Video", icono: "play", fuente: "YouTube" };
    if (/github\.io/.test(url)) return { clase: "enlace", etiqueta: "Página web", icono: "link", fuente: "GitHub Pages" };
    if (/github\.com/.test(url)) return { clase: "enlace", etiqueta: "Código", icono: "code", fuente: "GitHub" };
    if (/arxiv\.org/.test(url)) return { clase: "enlace", etiqueta: "Artículo", icono: "doc", fuente: "arXiv" };
    if (/huggingface\.co\/datasets/.test(url)) return { clase: "enlace", etiqueta: "Dataset", icono: "data", fuente: "Hugging Face" };
    if (/huggingface\.co\/spaces/.test(url)) return { clase: "enlace", etiqueta: "Visualizador", icono: "eye", fuente: "Hugging Face" };
    if (/huggingface\.co\/docs|docs\./.test(url)) return { clase: "enlace", etiqueta: "Documentación", icono: "book", fuente: dominio(url) };
    if (/huggingface\.co/.test(url)) return { clase: "enlace", etiqueta: "Datasets", icono: "data", fuente: "Hugging Face" };
    return { clase: "enlace", etiqueta: "Enlace", icono: "link", fuente: dominio(url) };
  }

  // Un resultado puede ser un texto o una tabla { titulo, encabezados: [...], filas: [[...], ...] }
  function bloqueResultado(r) {
    if (typeof r === "string") return '<p class="resultado">' + formatear(r) + "</p>";
    return '<figure class="tabla-resultado">' +
      (r.titulo ? "<figcaption>" + formatear(r.titulo) + "</figcaption>" : "") +
      '<div class="tabla-marco"><table><thead><tr>' +
      r.encabezados.map(function (h) { return "<th>" + formatear(h) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      r.filas.map(function (f) {
        return "<tr>" + f.map(function (c) { return "<td>" + formatear(String(c)) + "</td>"; }).join("") + "</tr>";
      }).join("") +
      "</tbody></table></div></figure>";
  }

  function dominio(url) {
    try {
      const partes = new URL(url).hostname.split(".");
      return partes.slice(-2).join(".");
    } catch (e) { return ""; }
  }

  function idYoutube(url) {
    const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  }

  function claseCumplimiento(valor) {
    if (!valor) return "";
    if (/plenamente/i.test(valor)) return "pleno";
    if (/alto grado/i.test(valor)) return "alto";
    if (/parcialmente/i.test(valor)) return "parcial";
    return "no";
  }

  function insigniaCumplimiento(valor) {
    if (!valor) return "";
    return '<span class="insignia ' + claseCumplimiento(valor) + '">' + escapar(valor) + "</span>";
  }

  function contarEvidencias(semana) {
    let enlaces = 0, videos = 0;
    (semana.evidencias || []).forEach(function (g) {
      g.items.forEach(function (it) {
        const c = clasificar(it.url).clase;
        if (c === "video" || c === "youtube") videos++; else enlaces++;
      });
    });
    (semana.medios || []).forEach(function (m) {
      if (m.tipo === "video") videos++; else enlaces++;
    });
    const partes = [];
    if (enlaces) partes.push(enlaces + (enlaces === 1 ? " evidencia" : " evidencias"));
    if (videos) partes.push(videos + (videos === 1 ? " video" : " videos"));
    return partes.join(" · ");
  }

  // ---------- Encabezado común ----------
  function encabezado(compacto) {
    const imgs = (PROYECTO.imagenes || []);
    let galeria = "";
    if (!compacto && imgs.length) {
      galeria = '<div class="galeria-encabezado cols-' + Math.min(imgs.length, 3) + '">' +
        imgs.map(function (im) {
          return '<figure><img src="' + escapar(im.archivo) + '" alt="' + escapar(im.descripcion || "") + '" loading="lazy">' +
            (im.descripcion ? "<figcaption>" + escapar(im.descripcion) + "</figcaption>" : "") + "</figure>";
        }).join("") + "</div>";
    }
    return '<header class="encabezado' + (compacto ? " compacto" : "") + '">' +
      '<div class="contenedor">' +
      '<p class="institucion">' + escapar(PROYECTO.institucion) + "</p>" +
      (compacto
        ? '<a class="titulo-enlace" href="index.html">' + escapar(PROYECTO.titulo) + "</a>"
        : "<h1>" + escapar(PROYECTO.titulo) + '</h1><p class="subtitulo">' + escapar(PROYECTO.subtitulo) + "</p>" +
          '<a class="boton" href="' + escapar(PROYECTO.repositorio) + '" target="_blank" rel="noopener">' + icono("code") + "Repositorio del proyecto</a>") +
      "</div>" + galeria + "</header>";
  }

  function pie() {
    return '<footer class="pie"><div class="contenedor">' +
      "<span>Bitácora de seguimiento del proyecto de grado</span>" +
      '<a href="' + escapar(PROYECTO.repositorio) + '" target="_blank" rel="noopener">' + escapar(PROYECTO.repositorio.replace("https://", "")) + "</a>" +
      "</div></footer>";
  }

  // ---------- Página principal ----------
  function paginaPrincipal(raiz) {
    const lista = SEMANAS.map(function (s, i) {
      const hito = s.tipo === "hito";
      const meta = hito ? "" : contarEvidencias(s);
      const contenido =
        '<div class="tarjeta-cabecera"><span class="fechas">' + escapar(s.fechas) + "</span>" + insigniaCumplimiento(s.cumplimiento) + "</div>" +
        "<h3>" + (hito ? icono("flag", "icono hito-icono") : "") + escapar(s.titulo) + "</h3>" +
        "<p>" + escapar(s.resumen) + "</p>" +
        (hito ? "" : '<div class="tarjeta-pie"><span class="meta">' + escapar(meta) + '</span><span class="ver">Ver detalle' + icono("arrowR") + "</span></div>");
      return '<li class="semana' + (hito ? " hito" : "") + '">' +
        '<span class="marca" aria-hidden="true">' + (i + 1) + "</span>" +
        (hito
          ? '<div class="tarjeta">' + contenido + "</div>"
          : '<a class="tarjeta" href="semana.html?id=' + encodeURIComponent(s.id) + '">' + contenido + "</a>") +
        "</li>";
    }).join("");

    raiz.innerHTML = encabezado(false) +
      '<main class="contenedor">' +
      '<section class="seccion"><div class="seccion-titulo"><h2>Bitácora de avances</h2><span class="contador">' +
      SEMANAS.length + (SEMANAS.length === 1 ? " semana registrada" : " semanas registradas") + "</span></div>" +
      '<ol class="linea-tiempo">' + lista + "</ol></section></main>" + pie();
  }

  // ---------- Página de detalle ----------
  function tarjetaEvidencia(item) {
    const c = clasificar(item.url);
    if (c.clase === "youtube" && idYoutube(item.url)) {
      return '<figure class="video-incrustado' + (/\/shorts\//.test(item.url) ? ' vertical' : '') + '"><div class="marco"><iframe src="https://www.youtube-nocookie.com/embed/' +
        idYoutube(item.url) + '" title="' + escapar(item.texto) + '" allowfullscreen loading="lazy"></iframe></div>' +
        "<figcaption>" + formatear(item.texto) + "</figcaption></figure>";
    }
    if (c.clase === "video") {
      return '<a class="video-tarjeta" href="' + escapar(item.url) + '" target="_blank" rel="noopener">' +
        '<span class="video-portada"><span class="play">' + icono("play") + "</span></span>" +
        '<span class="video-texto"><span class="tipo">Video</span><strong>' + formatear(item.texto) + "</strong>" +
        "<small>Se abre en " + escapar(c.fuente) + "</small></span></a>";
    }
    return '<a class="evidencia" href="' + escapar(item.url) + '" target="_blank" rel="noopener">' +
      '<span class="evidencia-icono">' + icono(c.icono) + "</span>" +
      '<span class="evidencia-texto"><span class="tipo">' + escapar(c.etiqueta) + " · " + escapar(c.fuente) + "</span>" +
      "<strong>" + formatear(item.texto) + "</strong></span></a>";
  }

  function bloqueMedios(medios) {
    if (!medios || !medios.length) return "";
    return '<section class="bloque registro"><h2>Registro visual</h2><div class="galeria">' +
      medios.map(function (m) {
        const pie = m.descripcion ? "<figcaption>" + escapar(m.descripcion) + "</figcaption>" : "";
        if (m.tipo === "video") {
          return '<figure class="medio"><video src="' + escapar(m.archivo) + '" controls preload="metadata"></video>' + pie + "</figure>";
        }
        return '<figure class="medio"><a href="' + escapar(m.archivo) + '" target="_blank" rel="noopener"><img src="' +
          escapar(m.archivo) + '" alt="' + escapar(m.descripcion || "") + '" loading="lazy"></a>' + pie + "</figure>";
      }).join("") + "</div></section>";
  }

  function paginaSemana(raiz) {
    const id = new URLSearchParams(window.location.search).get("id");
    const navegables = SEMANAS.filter(function (s) { return s.tipo !== "hito"; });
    const pos = navegables.findIndex(function (s) { return s.id === id; });
    const s = navegables[pos];

    if (!s) {
      raiz.innerHTML = encabezado(true) + '<main class="contenedor detalle"><p class="aviso">No se encontró la semana solicitada.</p>' +
        '<a class="volver" href="index.html">' + icono("arrowL") + "Volver a la bitácora</a></main>" + pie();
      return;
    }
    document.title = s.fechas + " · Bitácora de avances";

    const actividades = (s.actividades || []).length
      ? '<section class="bloque actividades"><h2>Actividades</h2><ul class="lista-actividades">' +
        s.actividades.map(function (a) { return "<li>" + formatear(a) + "</li>"; }).join("") + "</ul></section>"
      : "";

    const resultados = (s.resultados || []).length
      ? '<section class="bloque resultados"><h2>Resultados</h2>' +
        s.resultados.map(bloqueResultado).join("") + "</section>"
      : "";

    let evidencias = "";
    if ((s.evidencias || []).length) {
      evidencias = '<section class="bloque evidencias"><h2>Evidencias</h2>' +
        s.evidencias.map(function (g) {
          const videos = g.items.filter(function (it) { const c = clasificar(it.url).clase; return c === "video" || c === "youtube"; });
          const otros = g.items.filter(function (it) { const c = clasificar(it.url).clase; return c !== "video" && c !== "youtube"; });
          return '<div class="grupo">' + (g.grupo ? "<h3>" + escapar(g.grupo) + "</h3>" : "") +
            (videos.length ? '<div class="rejilla-videos">' + videos.map(tarjetaEvidencia).join("") + "</div>" : "") +
            (otros.length ? '<div class="rejilla-evidencias">' + otros.map(tarjetaEvidencia).join("") + "</div>" : "") +
            "</div>";
        }).join("") + "</section>";
    }

    const anterior = navegables[pos - 1];
    const siguiente = navegables[pos + 1];
    const navegacion = '<nav class="navegacion">' +
      (anterior ? '<a href="semana.html?id=' + encodeURIComponent(anterior.id) + '">' + icono("arrowL") +
        "<span><small>Semana anterior</small>" + escapar(anterior.fechas) + "</span></a>" : "<span></span>") +
      (siguiente ? '<a class="derecha" href="semana.html?id=' + encodeURIComponent(siguiente.id) + '">' +
        "<span><small>Semana siguiente</small>" + escapar(siguiente.fechas) + "</span>" + icono("arrowR") + "</a>" : "<span></span>") +
      "</nav>";

    raiz.innerHTML = encabezado(true) +
      '<main class="contenedor detalle">' +
      '<a class="volver" href="index.html">' + icono("arrowL") + "Bitácora de avances</a>" +
      '<div class="detalle-cabecera"><span class="fechas">' + escapar(s.fechas) + "</span>" + insigniaCumplimiento(s.cumplimiento) + "</div>" +
      "<h1>" + escapar(s.titulo) + "</h1>" +
      '<p class="introduccion">' + formatear(s.introduccion) + "</p>" +
      actividades + resultados + evidencias + bloqueMedios(s.medios) + navegacion +
      "</main>" + pie();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const raiz = document.getElementById("app");
    if (document.body.dataset.pagina === "semana") paginaSemana(raiz);
    else paginaPrincipal(raiz);
  });
})();
