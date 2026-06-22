/* ============================================================
   IBERDAP · Manejador de formularios (compartido)
   ------------------------------------------------------------
   Cómo activarlo en producción (guía completa: docs/SETUP_FORMULARIOS.md):
   1. En Make crea un escenario con disparador "Custom webhook".
   2. Conecta el webhook a "Airtable → Create a record" en la tabla
      "Leads Web" (tblj2xaQfxyxh7hvu) de la base appKspHRqtvOG3KJD
      ("Talento Internacional Automoción").
   3. Copia la URL del webhook y pégala abajo en IBERDAP_ENDPOINT.
   Mientras IBERDAP_ENDPOINT esté vacío, el formulario funciona en
   MODO DEMO (muestra el mensaje de éxito sin enviar nada).
   NO se incluye ningún token aquí: el secreto vive en Make, no en la web.
   ============================================================ */

const IBERDAP_ENDPOINT = "https://hook.eu1.make.com/lycbfgfju50d52iofhs42co7d1tmlep5"; // webhook Make -> Airtable (Leads Web)

function iberdapInitForms() {
  document.querySelectorAll("form[data-iberdap]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const card = form.closest(".fcard") || form;
      const okMsg = form.querySelector(".form-msg.ok");
      const errMsg = form.querySelector(".form-msg.err");
      if (okMsg) okMsg.style.display = "none";
      if (errMsg) errMsg.style.display = "none";

      // Recoge todos los campos con name + metadatos útiles
      const data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.area = data.area || form.dataset.area || "General";
      data.origen = window.location.pathname.split("/").pop() || "index.html";
      data.url = window.location.href;
      data.enviado = new Date().toISOString();

      // MODO DEMO: sin endpoint configurado
      if (!IBERDAP_ENDPOINT) {
        if (okMsg) okMsg.style.display = "block";
        form.reset();
        return;
      }

      // ENVÍO REAL
      card.classList.add("busy");
      fetch(IBERDAP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          if (okMsg) okMsg.style.display = "block";
          form.reset();
        })
        .catch(function () {
          if (errMsg) errMsg.style.display = "block";
        })
        .finally(function () {
          card.classList.remove("busy");
        });
    });
  });
}

if (document.readyState !== "loading") iberdapInitForms();
else document.addEventListener("DOMContentLoaded", iberdapInitForms);
