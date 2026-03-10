---
title: How to Optimize Website Images for Speed and SEO
meta_description: 'Unoptimised images are the #1 cause of slow websites. Learn how to compress, resize, and format your images for maximum performance and SEO impact.'
slug: optimiser-images-site-web
categorie: Performance
date_publication: '2026-03-09'
url_article: https://mindzy.me/en/blog/optimiser-images-site-web/
image: /images/en/blog/optimiser-images-site-web.jpg
lang: en
excerpt: 'Unoptimised images are the #1 cause of slow websites. Learn how to compress, resize, and format your images for maximum performance and SEO impact.'
category: business
author: Mindzy
date: '2026-03-09'
readingTime: 5
modifiedDate: '2026-03-09'
wordCount: 507
tags: [performance, business]
keywords: performance, business
---

# How to Optimize Website Images for Speed and SEO

Images make websites beautiful but heavy. On average, images account for 60–70% of a web page's total file size. Unoptimised images are the single most common cause of slow websites — and slow websites lose visitors, rankings, and revenue.

The good news: image optimisation is straightforward and delivers immediate, measurable results.

## The Right Format for Every Use Case

### WebP — Your Default Choice
WebP is Google's modern image format offering 25–35% smaller files than JPEG at equivalent quality, and 50–80% smaller than PNG for images with transparency. Supported by all modern browsers.

**Use for:** Photos, illustrations, any image on your website.

### JPEG — For Complex Photos
When WebP isn't an option, JPEG at 70–80% quality produces good results for photos.

### PNG — For Transparency
Use PNG only when you need a transparent background (logos, icons). Always convert to WebP when possible.

### SVG — For Logos and Icons
Vector format: infinitely scalable, tiny file size. Use for logos, icons, and simple graphics.

### AVIF — The Future
AVIF is even more efficient than WebP (20–30% smaller) but browser support is still growing. Use it as a next-generation option alongside WebP.

## Compression: How Much Quality Can You Sacrifice?

The human eye can't distinguish between a JPEG at 80% quality and one at 100% quality in most web contexts. But the file size difference can be 3–5×.

**Tools for compression:**
- **Squoosh** (squoosh.app) — free, browser-based, powerful comparison view
- **TinyPNG/TinyJPEG** — simple drag-and-drop compression
- **ImageOptim** — Mac desktop app for batch optimisation
- **ShortPixel** (WordPress plugin) — automatic optimisation on upload

Target: under 100KB per image for most web images; under 200KB for full-width hero images.

## Correct Sizing: Don't Upload 4000px Wide Images

If an image is displayed at 800px wide on your website, uploading a 4000px version means users download 5× more data than necessary.

**Rule:** Resize images to the maximum display size before uploading.

For responsive images, provide multiple sizes using the `srcset` attribute:
```html
<img src="image-800.webp"
     srcset="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w"
     sizes="(max-width: 600px) 400px, 800px"
     alt="Description of the image">
```

Modern WordPress themes handle `srcset` automatically. Verify it's working by inspecting the HTML of your image elements.

## Lazy Loading: Load Images Only When Needed

Images below the fold (not visible on initial load) don't need to load immediately. Lazy loading defers them until the user scrolls near them, dramatically improving initial page load time.

```html
<img src="image.webp" loading="lazy" alt="Description">
```

The `loading="lazy"` attribute is now supported natively in all major browsers. On WordPress, it's applied by default since WordPress 5.5.

## Alt Text: SEO and Accessibility

Alt text (the `alt` attribute on image tags) serves two purposes:
1. **Accessibility** — screen readers describe images to visually impaired users
2. **SEO** — search engines read alt text to understand image content

**Good alt text:** "Black ergonomic office chair with adjustable lumbar support"
**Bad alt text:** "chair" or "image1.jpg" or "Buy our best chair now click here"

Be descriptive and natural. Include your primary keyword where genuinely relevant.

## WordPress Image Optimisation Stack

1. **ShortPixel or Imagify** — automatic compression and WebP conversion on upload
2. **WP Rocket or LiteSpeed Cache** — lazy loading and image CDN
3. **Cloudflare** — CDN delivery reduces distance between server and visitor
4. **Regenerate Thumbnails** plugin — useful when you change themes or thumbnail sizes

For a full website performance audit and optimisation, [contact our Mindzy SEO and performance team](https://mindzy.me/en/seo/). We identify and fix exactly what's slowing your site. [Get in touch](https://mindzy.me/en/contact/).

**Further reading:**
- [How to improve your website speed](https://mindzy.me/en/blog/ameliorer-vitesse-site-web/)
- [Core Web Vitals and Google AI Overview](https://mindzy.me/en/blog/core-web-vitals-google-geo/)
