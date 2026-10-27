---
name: frontend-design
description: Guidelines for crafting distinctive, premium UI design for artisanal, gastronomic, and tourism web applications, avoiding generic corporate templates.
---

# Frontend Design Guidelines

## Visual Identity & Atmosphere
- Avoid generic gray/blue or plain white corporate templates.
- Define an intentional, evocative color palette anchored in physical and emotional senses:
  - Deep Andes brown (`#1F1513`)
  - Warm Starlight gold (`#D4AF37` / `#F3E5AB`)
  - Adobe terracotta & sunset amber (`#C05A3E` / `#E68A48`)
  - Deep Andean night blue (`#0B132B` / `#1C2541`)
  - Warm cream background (`#FDFBF7` / `#FAF6F0`)
- Use layered textures, subtle grain, and glowing celestial accents to evoke the Elqui Valley sunset and nocturnal skies.

## Typography Hierarchy
- **Display / Headings**: Expressive, high-contrast serif font (e.g. *Cinzel*, *Cormorant Garamond*, or *Playfair Display*) with elegant kerning.
- **Body & UI**: Clean, warm, humanist sans-serif (e.g. *Plus Jakarta Sans*, *Outfit*) ensuring effortless legibility down to 14px.
- Use fluid typography scaling (`clamp()`) to preserve balance across mobile (360px) and wide screens (1440px+).

## Component Styling
- Card containers: Subtle glassmorphism (`backdrop-blur-md`), warm borders (`rgba(212, 175, 55, 0.2)`), gentle inner shadows.
- Buttons & CTAs: Rich gradients, tactile click depth (`active:scale-[0.98]`), gold sheen hover effects.
- Avoid flat, monotonous surfaces; use subtle ambient background lighting via radial gradients.
