/* ============================================================
   IBERDAP · Píxel de Meta (Facebook / Instagram Ads)
   ------------------------------------------------------------
   Cómo activarlo: pega el ID del píxel abajo (solo el número).
   Lo obtienes en Meta Events Manager → tu píxel → ID.
   Mientras esté vacío, NO se carga nada (desactivado).
   Al ponerlo, el píxel se activa en TODAS las páginas a la vez
   (home + 5 landings) y registra PageView automáticamente.
   ============================================================ */

const META_PIXEL_ID = ""; // ← pega aquí el ID del píxel de Meta (ej: "1234567890")

if (META_PIXEL_ID) {
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");

  // Fallback sin JavaScript (se inyecta solo si hay ID configurado)
  var ns = document.createElement("noscript");
  ns.innerHTML =
    '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' +
    encodeURIComponent(META_PIXEL_ID) +
    '&ev=PageView&noscript=1"/>';
  document.head.appendChild(ns);
}

/* Nota: para registrar un lead cuando se envía un formulario, en form.js
   se puede llamar a  fbq('track','Lead')  tras el envío correcto.
   Lo dejamos listo para cuando el píxel esté activo. */
