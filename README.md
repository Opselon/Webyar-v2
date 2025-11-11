# Persian-First Multi-language SEO Website

This project is a modern, high-performance, multi-language SEO services website built on Cloudflare Workers using TypeScript, Hono, and Playwright.

## Features

- **Multi-language Support:** Persian (fa), English (en), and Arabic (ar) with language-based routing.
- **Modern UI:** A clean, professional, and accessible UI with light and dark modes.
- **Performant:** Built on the Cloudflare Workers serverless platform for exceptional performance and scalability.
- **Well-Tested:** Includes a comprehensive suite of end-to-end tests using Playwright.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

### Running the Development Server

To start the local development server, run the following command:

```bash
npm run dev
```

The server will be available at `http://localhost:8787`.

### Running Tests

To run the full test suite, use the following command:

```bash
npm test
```

This will run both the integration and end-to-end tests. To run only the Playwright tests, use:

```bash
npm run test:e2e
```

## Project Structure

- `src/`: The main source code for the Cloudflare Worker.
  - `data/`: Static JSON files containing the website's content.
  - `static/`: Static assets like CSS files.
  - `templates/`: JSX components for the UI.
    - `components/`: Reusable UI components.
    - `pages/`: Page-level components.
  - `utils/`: Utility functions, including the i18n module.
  - `index.tsx`: The main entry point for the Hono application.
- `tests/`: End-to-end tests written with Playwright.
- `wrangler.toml`: The configuration file for the Cloudflare Worker.
- `package.json`: The project's dependencies and scripts.
- `tsconfig.json`: The TypeScript configuration file.
