# iberdap-web

Sitio web público de **IBERDAP** (Iberian Autoparts Distribution, S.L.) — partner integral del sector de automoción: formación, colocación de técnicos, aplicaciones, recambios y consultoría. Con el aval de MSerrano Automoción.

Sitio estático (HTML/CSS/JS). Diseño "Propuesta E": identidad IBERDAP + sistema visual MSerrano.

## Estructura

```
index.html          ← home
areas/              ← landings por área (formación, colocación, aplicaciones, recambios, consultoría)
assets/             ← estilos, scripts, logos y fuentes
```

## Formularios

Los formularios envían a un webhook (Make → Airtable) configurable en `assets/form.js`.
Sin endpoint configurado funcionan en modo demo. No se incluye ningún token en el cliente.

---

*Publicado con GitHub Pages. La gestión interna del proyecto está en el repo privado IBERDAP-DIGITAL.*
