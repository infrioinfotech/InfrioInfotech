# Infrio Infotech - Codebase Documentation

This codebase has been restructured into a clean, human-readable, and highly performant frontend architecture. The messy WordPress/Elementor static export folders and duplicate styles have been fully consolidated and de-duplicated.

## Project Structure

```text
InfrioInfotech-main/
├── assets/
│   ├── images/         # All project and page image assets (.webp, .png, .jpg)
│   ├── logos/          # Infrio Infotech brand logos
│   ├── svg/            # Vectors and icons
│   └── favicon.ico     # Site favicon
├── src/
│   ├── components/     # Dynamic component templates (navbar, footer, loader, etc.)
│   ├── css/
│   │   └── style.css   # Consolidated and de-duplicated master stylesheet (2MB)
│   ├── js/
│   │   ├── loader.js   # Dynamic template loader and routing manager
│   │   └── *.js        # All local modular JS libraries (jquery, swiper, isotope, etc.)
│   └── pages/          # Clean, flat subpage HTML templates
│       ├── about.html
│       ├── blog.html
│       ├── contact-us.html
│       ├── pricing.html
│       ├── project.html
│       └── services.html
├── index.html          # Homepage entrypoint
├── dev-server.js       # Local Node.js development server
├── vercel.json         # Routing overrides for clean production deployment URLs
└── README.md           # Project guide
```

## Running Locally

To start the local development server:

1. Run the server using Node:
   ```bash
   node dev-server.js
   ```
2. Open `http://localhost:5500/` in your browser.
3. Clean URL rewrites (like `/about-us` and `/services`) will resolve dynamically to the new `src/pages/` structure.
