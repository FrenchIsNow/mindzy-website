---
title: "Reglamento Europeo de Inteligencia Artificial 2026: guía operativa de conformidad"
slug: reglamento-ia-2026-resumen
excerpt: "Todo lo que necesita para cartografiar la exposición de su organización a la AI Act 2026: pirámide de riesgos, casos de uso concretos, checklist de conformidad de 38 puntos, calendario 2026-2027 y plantillas documentales listas para usar."
category: business
author: Mindzy
date: '2026-07-10'
image: /images/ebooks/ai-act-2026-europe.png
readingTime: 10
relatedPosts:
- visibilite-ia-mindzy
- visibilite-articles-blog
- seo-entrepreneurs-guide
modifiedDate: '2026-07-10'
wordCount: 1820
tags: [ai-act, rgpd, conformidad, inteligencia-artificial, europa, 2026]
keywords: ai act, rgpd, conformidad ia, inteligencia artificial, regulación europea, 2026
lang: es
---

# Reglamento Europeo de Inteligencia Artificial 2026: guía operativa de conformidad

> **En breve**: El Reglamento (UE) 2024/1689 — conocido como **AI Act** — entró en vigor el 2 de febrero de 2025 y se aplica por fases, con las primeras obligaciones vinculantes el **2 de agosto de 2026** (prohibiciones y normas GPAI) y la cobertura completa del alto riesgo el **2 de agosto de 2027**. Sanción máxima: **35 millones de euros** o el **7% del volumen de negocios mundial**. Esta guía operativa le ofrece, en 8 capítulos, el método para cartografiar su exposición, calificar sus casos de uso y constituir su expediente de conformidad antes de la fecha límite.

Si despliega, compra o revende un sistema de IA en la Unión Europea — incluso un simple chatbot, un modelo de scoring o una herramienta de RR. HH. aumentada — está en el ámbito de aplicación. La cuestión ya no es *«¿se me aplica la AI Act?»* sino *«¿en qué fecha, para qué riesgo y con qué expediente de conformidad?»*

---

## La AI Act en 5 minutos

La AI Act es el primer texto del mundo que regula la IA de forma horizontal. No sustituye al RGPD: se superpone a él. Donde el RGPD regula los datos personales, la AI Act regula los **sistemas** que los tratan y los **modelos** que los producen.

Tres principios estructuran el texto:

1. **Una clasificación por niveles de riesgo** — inaceptable, elevado, limitado, mínimo — con obligaciones crecientes.
2. **Una responsabilidad compartida** entre proveedor, responsable del despliegue, importador y distribuidor.
3. **Un enfoque por los usos**, no por las tecnologías: es el uso final el que determina el nivel de riesgo, no el algoritmo subyacente.

La AI Act se aplica a toda organización que introduzca un sistema de IA en el mercado europeo, con independencia de su sede — una empresa con sede en San Francisco, Dubái o Singapur está obligada por las mismas obligaciones si sirve a usuarios europeos.

---

## Capítulo 01 — Ámbito de aplicación

La AI Act se dirige a:

- **Proveedores** que desarrollan o hacen desarrollar un sistema de IA y lo introducen en el mercado de la UE.
- **Responsables del despliegue** que utilizan un sistema de IA bajo su propia responsabilidad (empresa cliente, administración pública, asociación).
- **Importadores y distribuidores** que introducen un sistema de terceros en el mercado europeo.

**Quedan fuera del ámbito**: los sistemas puramente militares, los sistemas de I+D antes de su introducción en el mercado, y los modelos de IA utilizados para actividades de investigación científica antes de cualquier explotación comercial.

Una empresa francesa que despliega ChatGPT Enterprise para redactar sus informes internos es **responsable del despliegue** en el sentido de la AI Act. Una pyme que integra una API de scoring de CV en su ATS es a la vez **proveedor** (de la integración final, si vende un producto) y **responsable del despliegue** (del uso que hace internamente).

---

## Capítulo 02 — Clasificación de riesgos

La AI Act organiza los usos en **cuatro niveles** (en realidad seis, incluyendo las subcategorías GPAI con/sin riesgo sistémico):

| Nivel | Ejemplos | Obligaciones principales |
|-------|----------|--------------------------|
| **Inaceptable** | Scoring social, identificación biométrica en tiempo real en espacios públicos (con excepciones estrictas) | Prohibido |
| **Elevado** | Reclutamiento, scoring crediticio, acceso a educación, justicia, salud | Documentación técnica, gestión de riesgos, supervisión humana, transparencia |
| **Limitado** | Chatbots, generación de contenido, deepfakes | Información al usuario |
| **Mínimo** | Filtros anti-spam, videojuegos, IA de compleción de código | Ninguna obligación específica |

La trampa clásica: un mismo sistema puede cambiar de un nivel a otro según su **contexto de uso**. Un mismo algoritmo de recomendación será «mínimo» en un sitio de e-commerce B2C, pero «elevado» si se utiliza para orientar el acceso a un servicio público.

---

## Capítulo 03 — Riesgo inaceptable: la lista negra

Quedan **prohibidos** desde el 2 de febrero de 2025 (entrada en vigor) y plenamente aplicables el 2 de agosto de 2026:

- La explotación de vulnerabilidades (edad, discapacidad, situación socioeconómica) para empujar a un comportamiento dañino.
- La *puntuación social* (*social scoring*) generalizada.
- La identificación biométrica en tiempo real en espacios públicos accesibles al público, salvo para finalidades muy enmarcadas (búsqueda de víctimas, amenaza terrorista inminente, etc.).
- El reconocimiento de emociones en el trabajo y en la educación (con excepciones).
- La categorización biométrica que infiera raza, opiniones políticas, orientación sexual, convicciones religiosas.

Si alguno de estos usos está en su hoja de ruta 2026-2027, **debe detenerlo ahora** — no después del 2 de agosto de 2026.

---

## Capítulo 04 — Riesgo elevado: el grueso del trabajo

Los sistemas de alto riesgo representan la mayor parte de la carga de conformidad. Dos subconjuntos:

1. **Sistemas integrados en productos** sujetos a evaluaciones de conformidad (Anexo I, por ejemplo: dispositivos médicos, juguetes, vehículos).
2. **Sistemas enumerados en el Anexo III**: reclutamiento, gestión de trabajadores, scoring crediticio, seguros, servicios públicos esenciales, educación, justicia, mantenimiento del orden, migración, democracia.

Para cada sistema de alto riesgo, debe constituir un expediente conforme al artículo 11 (sistemas técnicos) y al Anexo IV, que incluya:

- Una **descripción funcional** detallada.
- Un **análisis de gestión de riesgos** documentado e iterado.
- Una **gobernanza de datos**: trazabilidad, sesgo, representatividad.
- Un **registro de eventos** (*logging*) automático.
- Una **documentación técnica** actualizada.
- Un **manual de instrucciones de uso** para el responsable del despliegue.
- Una **supervisión humana** efectiva (no solo formal).
- Un nivel de **precisión, robustez y ciberseguridad** documentado.

Para las organizaciones que despliegan un sistema de alto riesgo sin ser el proveedor, el artículo 27 exige: nombrar un responsable de supervisión humana, mantener un registro automático, informar al proveedor y a los interesados en caso de incidente grave, y realizar una **DPIA** (evaluación de impacto en la protección de datos) si el tratamiento es probable que entrañe un alto riesgo para los derechos y libertades.

---

## Capítulo 05 — IA de uso general (GPAI)

Los modelos de base — GPT, Claude, Gemini, Mistral, Llama — se someten a un régimen específico. Los modelos de «IA de uso general» (GPAI) están sujetos a:

- **Documentación técnica** del modelo (arquitectura, datos de entrenamiento, capacidad).
- **Transparencia** frente a los proveedores *descendentes* (*downstream*): el proveedor de GPAI debe facilitar la documentación y la información necesaria para una integración conforme.
- Una **política de respeto de los derechos de autor** (opt-out respetado).

Los modelos clasificados de **riesgo sistémico** (por encima de 10^25 FLOPs de entrenamiento) tienen obligaciones adicionales: evaluaciones adversariales, notificación de incidentes graves, garantía de ciberseguridad.

A partir del **2 de agosto de 2026**, estas obligaciones se aplican. Concretamente: si utiliza GPT-5, Claude 4 o un modelo europeo de código abierto para servir a sus clientes, debe poder demostrar que ha recibido y archivado la documentación del proveedor ascendente, y que ha informado a sus propios usuarios de manera conforme.

---

## Capítulo 06 — Obligaciones de transparencia

Para los usos de **riesgo limitado** (chatbots, generación de contenido, deepfakes), la AI Act impone una transparencia mínima:

- Los usuarios deben saber que interactúan con una IA (salvo excepción médica o de urgencia).
- Los contenidos sintéticos (texto, audio, imagen, vídeo) deben ser **marcables** como tales.
- Los deepfakes deben ser señalados.
- Los sistemas de **categorización biométrica** o de **análisis de emociones** deben informar a las personas concernidas.

El artículo 50 es denso: cubre las interacciones IA, los deepfakes, la publicidad, la puntuación, la biometría. A partir del 2 de agosto de 2026, cada interfaz de usuario de IA debe hacer perceptible la intervención de la IA.

---

## Capítulo 07 — Sanciones y gobernanza

Las sanciones se calibran según la naturaleza de la infracción:

- **Prácticas prohibidas** (riesgo inaceptable): hasta **35 M€** o el 7% del volumen de negocios mundial, reteniendo el importe más elevado.
- **Incumplimiento de los sistemas de alto riesgo**: hasta **15 M€** o el 3% del volumen de negocios.
- **Información engañosa**: hasta **7,5 M€** o el 1% del volumen de negocios.

Las pymes se benefician de un límite proporcional.

La gobernanza se reparte entre:

- La **Oficina de IA** a nivel europeo (Comisión, en enlace con los Estados miembros).
- **Autoridades nacionales** designadas por cada Estado miembro (en España: la AESIA — Agencia Española de Supervisión de la Inteligencia Artificial).
- **Organismos notificados** para las evaluaciones de conformidad de los sistemas de alto riesgo.
- El **Comité Europeo de IA** (Estados miembros + Comisión) para dictámenes y orientaciones.

---

## Capítulo 08 — Plan de acción 90 días

He aquí una hoja de ruta operativa para una organización de 50 a 500 personas que utiliza o despliega IA.

### Días 1 a 15 — Cartografía

- Listar todos los sistemas de IA utilizados o desplegados (proveedores internos, APIs, integraciones).
- Identificar los modelos GPAI consumidos (API, autoalojados).
- Para cada sistema, calificar el nivel de riesgo (inaceptable / elevado / limitado / mínimo).

### Días 16 a 45 — Documentación

- Constituir el registro de sistemas IA (plantilla en la guía completa).
- Para los usos de alto riesgo, iniciar el análisis de gestión de riesgos.
- Documentar la gobernanza humana efectiva.
- Verificar la conformidad con el RGPD (DPIA, base legal, AIPD).

### Días 46 a 75 — Conformidad

- Para los usos de riesgo limitado, instaurar la información al usuario (mención «interactúa con una IA»).
- Para los usos de alto riesgo, redactar el manual de uso y la documentación técnica.
- Para los GPAI, verificar la documentación recibida del proveedor ascendente.

### Días 76 a 90 — Auditoría y mejora continua

- Pruebas de robustez, sesgo y ciberseguridad en los sistemas de alto riesgo.
- Instaurar un monitoreo continuo (logging, alertas).
- Formación de los equipos de negocio e IT.
- Procedimiento de escalado en caso de incidente.

---

## Puntos fuertes de la guía completa

- **Marco legal completo**: del Reglamento (UE) 2024/1689 a los actos de ejecución, cada artículo se decodifica con sus implicaciones operativas.
- **Pirámide de 4 riesgos**: inaceptable, elevado, limitado, mínimo — para cada nivel, sus obligaciones concretas y la lista de casos de uso prohibidos.
- **12 casos de uso concretos**: reclutamiento IA, scoring bancario, salud, educación, GPAI — comentados por profesionales del derecho.
- **Checklist de conformidad 38 puntos**: gobernanza, datos, transparencia, supervisión humana, documentación técnica.
- **Calendario 2026-2027**: las 6 fechas clave a anticipar, del 2 de febrero de 2025 al 2 de agosto de 2027.
- **Plantillas de documentos**: ficha de evaluación de riesgo, registro de sistemas IA, cláusula de subcontratación, política de uso de IA — listas para usar.

---

## Estadísticas clave

- **Sanción máxima**: 35 M€ o el 7% del volumen de negocios mundial.
- **Primera fecha de aplicación**: 2 de agosto de 2026.
- **Plena aplicación**: 2 de agosto de 2027.
- **Niveles de riesgo**: 4 (inaceptable, elevado, limitado, mínimo) + 2 subcategorías GPAI.

---

## ¿Quiere ir más lejos?

Si utiliza IA en su organización — chatbot, scoring, generación de contenido, automatización, integración de modelos — Mindzy puede ayudarle a:

- Cartografiar sus usos y calificar sus riesgos.
- Constituir su expediente de conformidad AI Act + RGPD.
- Instaurar un registro de sistemas IA y una gobernanza operativa.
- Formar a sus equipos jurídicos, IT y de negocio.

**Hablemos** de su caso concreto — [concertar una llamada de 30 minutos](https://calendar.app.google/ghE79tSFxmea4Scd9).
