# Development Plan: Kiezblock Alt-Lichtenberg Website

## Project Overview

Recreate the website **kiezblock-alt-lichtenberg.de** as a standalone, self-hosted website. The current site is built on Wix — we are rebuilding it from scratch as a modern, fast, static site.

> **IMPORTANT FOR THE DEVELOPER AI:** Screenshots of the current website are included in this conversation. Use them as the primary visual reference for layout, spacing, typography, colors, and UI behavior. Every section must match the screenshots as closely as possible — this is a 1:1 recreation.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Astro** | Static-first, zero JS by default, perfect for content sites |
| Styling | **Tailwind CSS v4** | Utility-first, fast to match exact designs |
| Animations | **CSS transitions + Intersection Observer** | Lightweight scroll-triggered animations |
| Newsletter | **Mailchimp** | Embedded signup form via API |
| Hosting | **Self-hosted** (static files) | Output is plain HTML/CSS/JS, deployable anywhere |
| Build | **Node.js + npm** | Standard tooling |

---

## Site Structure (Pages)

Based on the sitemap:

```
/                           → Homepage (main landing page)
/impressum                  → Impressum (Legal Notice)
/datenschutz                → Datenschutz (Privacy Policy)
/nachbarschaftsdinner-pic   → Nachbarschaftsdinner Gallery (Neighborhood Dinner Photos)
```

---

## Project File Structure

```
landing/
├── public/
│   ├── fonts/                    # Self-hosted web fonts
│   ├── images/                   # All images, logos, icons
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── sections/
│   │   └── gallery/
│   ├── documents/
│   │   └── kiezblock-info.pdf    # PDF download file (to be provided)
│   └── favicon.ico
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # Shared HTML shell, head, meta, header, footer
│   ├── components/
│   │   ├── Header.astro          # Navigation bar
│   │   ├── Footer.astro          # Footer with links, social, legal
│   │   ├── Hero.astro            # Hero/banner section
│   │   ├── NewsletterForm.astro  # Mailchimp signup component
│   │   ├── Gallery.astro         # Image gallery/carousel component
│   │   ├── SectionBlock.astro    # Reusable content section
│   │   ├── Button.astro          # Styled button component
│   │   ├── MobileMenu.astro      # Mobile hamburger menu
│   │   └── ScrollAnimation.astro # Intersection Observer wrapper
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── impressum.astro       # Legal notice
│   │   ├── datenschutz.astro     # Privacy policy
│   │   └── nachbarschaftsdinner-pic.astro  # Photo gallery
│   └── styles/
│       └── global.css            # Global styles, font-face declarations, base resets
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

---

## Implementation Plan — Step by Step

### Phase 1: Project Setup

1. **Initialize Astro project**
   ```bash
   npm create astro@latest landing -- --template minimal
   ```

2. **Install dependencies**
   ```bash
   npm install @astrojs/tailwind tailwindcss
   ```

3. **Configure Astro** (`astro.config.mjs`)
   - Enable Tailwind integration
   - Set `site` URL for meta tags
   - Set `output: 'static'` for static site generation
   - Set locale to `de-DE`

4. **Configure Tailwind** (`tailwind.config.mjs`)
   - Define the exact color palette from the original site (user will provide hex values)
   - Define font families
   - Define custom spacing/sizing if needed
   - Set up responsive breakpoints matching the original (desktop: ~1200px content width, mobile: 320px with 10px margins)

5. **Set up global CSS** (`src/styles/global.css`)
   - `@font-face` declarations for self-hosted fonts
   - CSS reset / base styles
   - Smooth scrolling behavior
   - Selection colors
   - Focus ring styles for accessibility

### Phase 2: Layout & Shared Components

6. **BaseLayout.astro** — the shared HTML wrapper
   - `<html lang="de">`
   - Full `<head>` with:
     - Meta charset, viewport
     - Page title and meta description (in German)
     - Open Graph / social meta tags
     - Font preloads
     - Favicon
   - Slot for page content between Header and Footer
   - Smooth scroll CSS

7. **Header.astro** — Navigation
   - **Refer to screenshots** for exact layout
   - Logo on the left (link to `/`)
   - Navigation links on the right (horizontal on desktop)
   - Navigation items based on what screenshots show (likely: sections of homepage as anchor links + Impressum)
   - Sticky/fixed header behavior if shown in screenshots
   - **Mobile:** Hamburger icon that opens a slide-in or overlay menu
   - Active state styling for current page
   - Smooth scroll to anchor sections on homepage

8. **MobileMenu.astro**
   - Triggered by hamburger button in Header
   - Full-screen or slide-in overlay
   - Same nav links as desktop
   - Close button (X)
   - Uses a small `<script>` for toggle (Astro island or inline script)
   - Trap focus for accessibility
   - Close on Escape key

9. **Footer.astro**
   - **Refer to screenshots** for exact layout
   - Links to Impressum, Datenschutz
   - Social media icons/links (if present in screenshots)
   - Copyright notice
   - Possibly a secondary newsletter signup or contact info

### Phase 3: Homepage Sections (Top to Bottom)

> **CRITICAL:** Replicate each section exactly as shown in the screenshots. Match spacing, alignment, font sizes, and colors precisely.

10. **Hero Section** (`Hero.astro`)
    - Large hero image or background
    - Overlay text (heading + subheading)
    - CTA button(s) if present
    - Full-viewport or near-full-viewport height
    - Responsive: stack vertically on mobile, maintain readability

11. **Content Sections** (`SectionBlock.astro`)
    Build a reusable section component, then compose the homepage from multiple instances. Each section from the screenshots should be recreated:
    - **About / Intro section** — What is Kiezblock Alt-Lichtenberg?
    - **Goals / Vision section** — What the initiative aims to achieve
    - **Information section** — Details about the Kiezblock concept
    - **Map or area section** — If there's a map showing the neighborhood area
    - **Events / Activities section** — Neighborhood dinner, community events
    - **Call to Action section** — Get involved, sign the petition, etc.
    - **PDF Download section** — Link to download the informational PDF

    Each section should support:
    - Background color variants (alternate between white and colored backgrounds)
    - Image + text layouts (side by side on desktop, stacked on mobile)
    - Heading + body text + optional CTA button
    - Optional decorative elements

12. **PDF Download**
    - Prominent button or card linking to `/documents/kiezblock-info.pdf`
    - Use `download` attribute on the `<a>` tag
    - Style as a distinct call-to-action
    - File will be provided later — use placeholder path `public/documents/kiezblock-info.pdf`

13. **Newsletter Section** (`NewsletterForm.astro`)
    - Mailchimp integration
    - Email input field + submit button
    - Form posts to Mailchimp endpoint
    - Success/error states
    - GDPR consent checkbox (required for German sites)
    - Implementation details:

    ```html
    <!-- Mailchimp Form Structure -->
    <form
      action="https://PLACEHOLDER.us<REGION_NUMBER>.list-manage.com/subscribe/post?u=PLACEHOLDER_USER_ID&amp;id=PLACEHOLDER_LIST_ID"
      method="post"
      target="_blank"
      novalidate
    >
      <input type="email" name="EMAIL" placeholder="E-Mail-Adresse" required />

      <!-- GDPR Consent -->
      <label>
        <input type="checkbox" name="gdpr[consent]" required />
        Ich stimme zu, Newsletter-E-Mails zu erhalten.
      </label>

      <!-- Bot protection -->
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="b_PLACEHOLDER_USER_ID_PLACEHOLDER_LIST_ID" tabindex="-1" value="" />
      </div>

      <button type="submit">Abonnieren</button>
    </form>
    ```

    **Placeholder credentials to replace later:**
    - `PLACEHOLDER_USER_ID` → Mailchimp user ID
    - `PLACEHOLDER_LIST_ID` → Mailchimp audience/list ID
    - `REGION_NUMBER` → Mailchimp data center number (e.g., `21`)

14. **Image Gallery / Carousel** (`Gallery.astro`) — if present on homepage
    - Grid or carousel of images
    - Lightbox on click (optional, based on screenshots)
    - Responsive grid (3 columns desktop → 2 tablet → 1 mobile)
    - Lazy loading with `loading="lazy"`

### Phase 4: Subpages

15. **Impressum** (`/impressum`)
    - Standard German legal notice page
    - Content provided via screenshots
    - Simple text layout with headings and paragraphs
    - Uses BaseLayout

16. **Datenschutz** (`/datenschutz`)
    - Standard German privacy policy page
    - Content provided via screenshots
    - Simple text layout, possibly with table of contents / anchor links
    - Uses BaseLayout
    - Must include Mailchimp privacy information since newsletter is integrated

17. **Nachbarschaftsdinner Gallery** (`/nachbarschaftsdinner-pic`)
    - Photo gallery page for neighborhood dinner event
    - Grid layout of images
    - Optional lightbox for full-size viewing
    - Image captions if present in screenshots
    - Uses BaseLayout

### Phase 5: Styling & Polish

18. **Typography**
    - **Identify fonts from screenshots** — match the exact typefaces used
    - If fonts are Google Fonts or open-source: self-host them (download woff2 files into `public/fonts/`)
    - Define `@font-face` rules in `global.css`
    - Set up font hierarchy:
      - Headings: likely a bold/display font
      - Body: likely a clean sans-serif
      - Buttons/UI: same as body or slightly different weight
    - Ensure German special characters render correctly (ä, ö, ü, ß)

19. **Responsive Design**
    - **Desktop:** ~1200px max content width, centered
    - **Tablet:** fluid, stacked where needed (~768px breakpoint)
    - **Mobile:** 320px+ with proper margins (~10px side padding)
    - Test all sections at each breakpoint
    - Navigation collapses to hamburger menu on mobile
    - Images scale properly
    - Text remains readable

20. **Animations & Transitions** (match original site behavior)
    - Scroll-triggered fade-in animations using Intersection Observer
    - Smooth scroll for anchor links
    - Hover effects on buttons and links
    - Page transitions if present in original (CSS-based)
    - Respect `prefers-reduced-motion` media query

    ```javascript
    // ScrollAnimation pattern
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });
    ```

21. **Accessibility**
    - Semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
    - Alt text on all images
    - Focus-visible styles (2px solid outline)
    - Keyboard navigable menu
    - Sufficient color contrast (WCAG AA)
    - Skip-to-content link
    - `aria-labels` where needed
    - Language attribute `lang="de"`

22. **SEO & Meta**
    - Unique `<title>` and `<meta description>` per page (in German)
    - Open Graph tags for social sharing
    - Canonical URLs
    - Structured data (Organization schema) if appropriate
    - Generated `sitemap.xml` (Astro can auto-generate this)
    - `robots.txt`

### Phase 6: Final Assembly & Testing

23. **Content population**
    - Insert all text content exactly as shown in screenshots (German)
    - Place all images in correct locations
    - Link PDF download
    - Verify all internal links work
    - Verify all anchor scroll links work

24. **Cross-browser testing**
    - Chrome, Firefox, Safari, Edge
    - Mobile Safari (iOS), Chrome (Android)

25. **Performance optimization**
    - Optimize images (WebP format with fallbacks)
    - Preload critical fonts
    - Minimize CSS/JS (Astro handles this)
    - Lazy-load below-fold images
    - Target Lighthouse score 90+

26. **Build and verify**
    ```bash
    npm run build
    npm run preview
    ```
    - Verify all pages render correctly
    - Test newsletter form submission
    - Test PDF download
    - Test responsive behavior
    - Verify all links

---

## Color Palette

> User will provide exact hex values. Define these in `tailwind.config.mjs` under `theme.extend.colors`:

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        primary: '#______',      // Main brand color
        secondary: '#______',    // Secondary brand color
        accent: '#______',       // Accent/CTA color
        background: '#______',   // Page background
        surface: '#______',      // Card/section backgrounds
        text: {
          primary: '#______',    // Main body text
          secondary: '#______',  // Lighter text
          heading: '#______',    // Heading color
        }
      }
    }
  }
}
```

---

## Font Configuration

> Fonts to be identified from screenshots. Once known, download woff2 files and self-host:

```css
/* src/styles/global.css */
@font-face {
  font-family: 'HeadingFont';
  src: url('/fonts/heading-font.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'BodyFont';
  src: url('/fonts/body-font.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

---

## Assets Checklist

The user will provide these files:

- [ ] All images and logos → place in `public/images/`
- [ ] PDF document → place in `public/documents/kiezblock-info.pdf`
- [ ] Exact hex color codes → update `tailwind.config.mjs`
- [ ] Font files (once identified) → place in `public/fonts/`
- [ ] Mailchimp credentials → replace placeholders in `NewsletterForm.astro`
- [ ] Impressum text content
- [ ] Datenschutz text content

---

## Key Implementation Notes

1. **All text content is in German.** Preserve all German text exactly as shown in screenshots including umlauts (ä, ö, ü) and Eszett (ß).

2. **The PDF download** should use a prominent styled button/link. The file path is `public/documents/kiezblock-info.pdf` — it will be provided later during development.

3. **Mailchimp placeholders** are marked with `PLACEHOLDER_*` throughout. These will be replaced with actual credentials before deployment.

4. **No JavaScript frameworks** beyond what Astro provides. Keep the site as static as possible. Only use small inline scripts for:
   - Mobile menu toggle
   - Scroll animations (Intersection Observer)
   - Newsletter form validation

5. **Match the original exactly.** Use the provided screenshots as the source of truth for:
   - Section ordering and layout
   - Spacing and padding
   - Font sizes and weights
   - Color usage
   - Button styles
   - Image placement and sizing
   - Responsive behavior
