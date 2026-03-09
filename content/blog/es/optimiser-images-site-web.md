---
title: Cómo optimizar las imágenes de tu sitio web para velocidad y SEO
meta_description: Las imágenes sin optimizar son la causa nº1 de sitios lentos. Aprende
  a comprimir, redimensionar y formatear tus imágenes para máximo rendimiento y SEO.
slug: optimiser-images-site-web
categorie: Rendimiento
date_publication: '2026-03-09'
url_article: https://mindzy.me/es/blog/optimiser-images-site-web/
image: /images/es/blog/optimiser-images-site-web.jpg
lang: es
excerpt: ''
category: business
author: Mindzy
date: ''
readingTime: 5
modifiedDate: ''
wordCount: 0
tags: []
keywords: ''
---

# Cómo optimizar las imágenes de tu sitio web para velocidad y SEO

Las imágenes hacen las webs hermosas pero pesadas. En promedio, las imágenes representan el 60-70% del tamaño total de una página web. Las imágenes sin optimizar son la causa más común de sitios lentos — y los sitios lentos pierden visitantes, posicionamiento e ingresos.

## El formato correcto para cada caso

**WebP — tu elección por defecto:** Ofrece archivos un 25-35% más pequeños que JPEG a calidad equivalente. Compatible con todos los navegadores modernos. Úsalo para fotos, ilustraciones y cualquier imagen de tu web.

**JPEG — para fotos complejas:** Cuando WebP no sea posible, JPEG al 70-80% de calidad produce buenos resultados.

**PNG — para transparencia:** Usa PNG solo cuando necesites fondo transparente (logos, iconos). Convierte siempre a WebP cuando sea posible.

**SVG — para logos e iconos:** Formato vectorial: escalable infinitamente, tamaño de archivo minúsculo.

## Compresión: ¿cuánta calidad puedes sacrificar?

El ojo humano no puede distinguir entre un JPEG al 80% de calidad y uno al 100% en la mayoría de contextos web. Pero la diferencia en tamaño de archivo puede ser de 3-5 veces.

**Herramientas:**
- **Squoosh** (squoosh.app) — gratuito, basado en navegador, potente
- **TinyPNG/TinyJPEG** — compresión simple arrastrando y soltando
- **ShortPixel** (plugin WordPress) — optimización automática al subir

Objetivo: menos de 100 KB por imagen para la mayoría; menos de 200 KB para imágenes de ancho completo.

## Dimensionado correcto: no subas imágenes de 4000px de ancho

Si una imagen se muestra a 800px en tu web, subir una versión de 4000px significa que los usuarios descargan 5 veces más datos de los necesarios.

**Regla:** Redimensiona las imágenes al tamaño máximo de visualización antes de subirlas.

## Carga diferida: carga imágenes solo cuando se necesiten

```html
<img src="imagen.webp" loading="lazy" alt="Descripción de la imagen">
```

El atributo `loading="lazy"` aplaza las imágenes por debajo del pliegue hasta que el usuario se desplaza cerca de ellas. En WordPress, se aplica por defecto desde WordPress 5.5.

## Texto alternativo: SEO y accesibilidad

**Buen alt text:** "Silla de oficina ergonómica negra con soporte lumbar ajustable"
**Mal alt text:** "silla" o "imagen1.jpg" o "Compra nuestra mejor silla ahora"

Sé descriptivo y natural. Incluye tu palabra clave principal donde sea genuinamente relevante.

## Stack de optimización de imágenes para WordPress

1. **ShortPixel o Imagify** — compresión automática y conversión WebP al subir
2. **WP Rocket o LiteSpeed Cache** — carga diferida y CDN de imágenes
3. **Cloudflare** — distribución CDN para reducir la distancia entre servidor y visitante

Para una auditoría completa y optimización del rendimiento, [contacta con nuestro equipo SEO en Mindzy](https://mindzy.me/es/seo/). [Contáctanos](https://mindzy.me/es/contact/).

**Seguir leyendo:**
- [Cómo mejorar la velocidad de tu web](https://mindzy.me/es/blog/ameliorer-vitesse-site-web/)
- [Core Web Vitals y Google AI Overview](https://mindzy.me/es/blog/core-web-vitals-google-geo/)
