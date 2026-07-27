# ⚡Tailwind Config Extractor
A full-stack TypeScript platform and browser extension that extracts DOM styles from active web pages and converts them into production-ready Tailwind CSS configurations.


# Key Features
Real-Time DOM Scraping: Injects content scripts (scraper.ts) to extract active computed styles, font scales, colors, and layout spacing.

Background Service Worker: Coordinates asynchronous communication between the browser extension runtime, active web tabs, and API endpoints.

Web Management Portal: Full-featured React dashboard (webApp) to view saved scans, edit design tokens, and analyze color palettes.

REST API & Authentication: Secure Express backend with JWT-based route protection (authMiddleware.ts) for managing persistent scan data.

Tailwind Config Generation: Converts extracted CSS tokens directly into valid, downloadable tailwind.config.js files.