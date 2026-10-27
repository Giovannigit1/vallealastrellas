---
name: web-animations
description: Best practices for implementing elegant, performant web animations using Motion (Framer Motion), canvas, and CSS scroll-driven effects with accessibility respect.
---

# Web Animations & Motion Design

## Principles
1. **Meaningful Motion**: Every animation must serve comprehension, narrative progression, or immediate tactile feedback. Never animate for mere decorative clutter.
2. **Accessibility First (`prefers-reduced-motion`)**:
   - Always query `@media (prefers-reduced-motion: reduce)` in CSS and `useReducedMotion()` in Motion/Framer Motion.
   - When active, replace translation/scale movement with immediate cuts or subtle opacity fades.
3. **Performance Standards**:
   - Animate only `transform` and `opacity` properties to leverage GPU compositing.
   - Use `will-change` sparingly on elements undergoing active transforms.
   - Clean up event listeners and canvas requestAnimationFrame loops on unmount.

## Core Interactions
- **Hero Starlight Canvas**: Lightweight particle system with random alpha blinking and subtle constellation lines.
- **Scroll Timeline**: SVG path drawn progressively (`stroke-dasharray` / `pathLength`) synchronized with viewport intersection.
- **Card Tilts**: Gentle 3D perspective shifts on hover (`rotateX`, `rotateY`) capped at 6 degrees for subtle luxury feel.
- **Form Micro-interactions**: Smooth error shake, checkmark draw on success, button spinner transition.
