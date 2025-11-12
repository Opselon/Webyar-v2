# 🚀 WebYar v2: Persian-First Multi-language SEO Website

![GitHub license](https://img.shields.io/github/license/Opselon/Webyar-v2?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-000000?style=flat-square&logo=hono&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-21F641?style=flat-square&logo=playwright&logoColor=white)

---

## 🌟 Overview: The Global SEO Powerhouse

**WebYar v2** is a bleeding-edge, high-performance, multi-language SEO services website engineered for speed and global reach. Built atop the Cloudflare Workers serverless platform, this project delivers exceptional performance, minimal latency, and native support for complex right-to-left (RTL) languages, prioritizing Persian (Farsi) as the primary market.

We combine the speed of **Hono** (a lightweight web framework) with the type safety of **TypeScript** and the reliability of **Playwright** for end-to-end testing, ensuring a robust and modern digital presence.

---

## ✨ Core Features

| Icon | Feature | Description |
| :--- | :--- | :--- |
| 🌐 | **Multi-language & RTL Support** | Seamless localization for Persian (fa), English (en), and Arabic (ar), with native RTL layout handling for superior UX in Middle Eastern markets. |
| ⚡ | **Hyper-Performant Architecture** | Built on **Cloudflare Workers** for edge-based rendering, providing unparalleled speed and scalability with near-zero cold starts. |
| 🎨 | **Modern & Accessible UI/UX** | A clean, professional design featuring a high-contrast aesthetic with built-in **Light and Dark Modes**. |
| 🛡️ | **TypeScript Safety** | All logic and UI components are written in TypeScript, ensuring maintainable, reliable, and bug-resistant code. |
| 🧪 | **Comprehensive Testing** | A full suite of end-to-end (E2E) tests managed by **Playwright** ensures all user flows and multi-language routes are verified before deployment. |

---

## 🖼️ User Interface Sneak Peek

A clean, modern, and accessible design that gracefully handles complex multi-language layouts.

<p align="center">
  <img src="https://raw.githubusercontent.com/Opselon/Webyar-v2/main/docs/screen.png" alt="Screenshot of the WebYar v2 website UI" width="700">
  <br>
  <a href="https://github.com/Opselon/Webyar-v2/blob/main/docs/screen.png" target="_blank">View Full Resolution Screenshot</a>
</p>

---

## 🛠️ Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following tools installed:

-   [**Node.js**](https://nodejs.org/) (v18 or later)
-   [**npm**](https://www.npmjs.com/) (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Opselon/Webyar-v2.git
    cd Webyar-v2
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

Start the local development server using the Cloudflare Wrangler CLI.

```bash
npm run dev
```

The server will be available at `http://localhost:8787`. The local dev environment respects the `wrangler.toml` configuration.

---

## 🧪 Testing

We use Playwright for robust E2E testing to ensure all routes, especially the language switching and RTL layouts, function correctly.

| Command | Description |
| :--- | :--- |
| `npm test` | Runs the full test suite (integration and end-to-end tests). |
| `npm run test:e2e` | Runs only the **Playwright** end-to-end tests. |
| `npm run test:e2e:ui` | Runs Playwright tests with the interactive UI reporter. |

---

## ☁️ Deployment

This project is designed for seamless deployment to **Cloudflare Workers**.

1.  **Install the Cloudflare CLI (Wrangler):**
    ```bash
    npm install -g wrangler
    ```
2.  **Authenticate (if needed):**
    ```bash
    wrangler login
    ```
3.  **Deploy the Worker:**
    ```bash
    npm run deploy
    # or
    # wrangler publish
    ```
    Wrangler will use the configuration in `wrangler.toml` to build and deploy the project to your Cloudflare account.

---

## 📂 Project Structure

| Directory | Purpose |
| :--- | :--- |
| `src/` | Main source code for the Cloudflare Worker and Hono application. |
| `src/data/` | Static JSON files containing the website's localized content (`i18n` data). |
| `src/static/` | Static assets, including main CSS files and global styling. |
| `src/templates/` | JSX components for the UI (Hono's JSX/TSX rendering). |
| `src/utils/` | Utility functions, primarily the multi-language `i18n` module and routing logic. |
| `tests/` | End-to-end tests written using Playwright. |
| `wrangler.toml` | The configuration file for the Cloudflare Worker. |
| `package.json` | Project dependencies and scripts. |

---

## 👋 Contributing

We welcome contributions! If you have suggestions for performance improvements, new features, or bug fixes, please open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
