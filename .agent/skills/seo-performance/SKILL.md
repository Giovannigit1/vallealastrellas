---
name: seo-performance
description: SEO, Core Web Vitals, Structured Data (JSON-LD), Open Graph metadata, and web performance optimization for experiential gastronomy.
---

# SEO & Web Performance Strategy

## Search Engine Optimization (SEO)
1. **Metadata & Open Graph**:
   - Provide localized Chilean metadata (`es_CL`) in `layout.tsx` or page configs.
   - Configure title templates: `Del Valle a la Mesa, de la Mesa a las Estrellas | Experiencia Gastronómica Valle del Elqui`.
   - Rich Open Graph & Twitter cards with 1200x630 preview image, description, and canonical URLs.
2. **Structured Data (Schema.org / JSON-LD)**:
   - Provide `Restaurant`, `TouristAttraction`, and `Event` schema types.
   - Include geo-coordinates (Vicuña, Coquimbo Region, Chile), opening hours (17:00-21:00), price range, and offers.
3. **Semantic Hierarchy**:
   - Exactly one `<h1>` per view.
   - Logical descending hierarchy (`<h2>` for sections, `<h3>` for cards/milestones).

## Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s. Preload hero image priority (`priority={true}`).
- **INP (Interaction to Next Paint)**: < 200ms. Avoid heavy synchronous JavaScript on user interactions.
- **CLS (Cumulative Layout Shift)**: < 0.1. Reserve aspect ratio dimensions for all banners and cards.
