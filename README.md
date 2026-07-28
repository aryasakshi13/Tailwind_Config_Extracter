# ⚡Tailwind Config Extractor
A full-stack TypeScript platform and browser extension that extracts DOM styles from active web pages and converts them into production-ready Tailwind CSS configurations.


# Key Features
Real-Time DOM Scraping: Injects content scripts (scraper.ts) to extract active computed styles, font scales, colors, and layout spacing.

Background Service Worker: Coordinates asynchronous communication between the browser extension runtime, active web tabs, and API endpoints.

Web Management Portal: Full-featured React dashboard (webApp) to view saved scans, edit design tokens, and analyze color palettes.

REST API & Authentication: Secure Express backend with JWT-based route protection (authMiddleware.ts) for managing persistent scan data.

Tailwind Config Generation: Converts extracted CSS tokens directly into valid, downloadable tailwind.config.js files.

# Tech Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Browser Extension** | React, TypeScript, Vite, Manifest V3, Tailwind CSS |
| **Web Application** | React, TypeScript, Vite, Tailwind CSS |
| **Backend API** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB, Mongoose ORM |
| **Tooling & Build** | Vite, PostCSS, ESLint, Git |


# Folder Structure

```text

TAILWIND-CONFIG-EXTRACTOR/
├── backend/
│   ├── dist/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   │   ├── authController.ts
│   │   │   └── extractController.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts
│   │   ├── models/
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── extractor.ts
│   │   │   └── scan.ts
│   │   ├── utils/
│   │   └── server.ts
│   ├── .env
│   ├── package-lock.json
│   └── package.json
├── extension/
│   ├── src/
│   │   ├── core/
│   │   │   ├── background.ts
│   │   │   └── scraper.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── manifest.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
└── webApp/
    ├── dist/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── component/
    │   ├── pages/
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js

    ```

    