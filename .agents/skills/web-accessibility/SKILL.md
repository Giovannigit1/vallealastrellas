---
name: web-accessibility
description: WCAG 2.1 AA/AAA compliance guidelines, multi-modal accessibility toolbar, screen reader announcements, and keyboard navigation patterns.
---

# Web Accessibility (A11y) Standards

## WCAG 2.1 AA Requirements
1. **Contrast Ratios**:
   - Normal text: >= 4.5:1
   - Large text (18pt / 14pt bold): >= 3:1
   - UI components & graphical objects: >= 3:1
2. **Keyboard Navigation**:
   - Visible, high-contrast focus rings (`outline: 2px solid #D4AF37; outline-offset: 2px`).
   - All interactive components (modals, dropdowns, trivia cards, forms) must be fully operable via Tab, Enter, Space, and Arrow keys.
   - Trap keyboard focus inside modals/dialogs while open; restore focus on close.
   - Include a "Skip to main content" link as the first focusable element.

## Universal Inclusion Features
- **Dynamic Text Scaling**: Provide A+ / A- buttons adjusting root font size (`font-size-adjust` or HTML root class), persisted in `localStorage`.
- **Text-to-Speech (Web Speech API)**: Read aloud section summaries using `window.speechSynthesis` with `es-CL` or `es-ES` speech synthesis voices.
- **Deaf & Hard of Hearing Support ("Subtítulos visuales")**: Toggle clear visual summaries, bulleted digestible takeaways, and sign/symbol iconography per section.
- **Screen Reader Announcements (`aria-live`)**:
   - Use `aria-live="polite"` for dynamic form validations, trivia feedback, and chatbot responses.
   - Ensure every `input` has an associated `<label>` (explicit `for` / `id` or wrapping) and `aria-describedby` pointing to error messages.
