// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const painelTarget = process.env.VITE_PAINEL_PROXY_TARGET || "http://localhost/pjt/painel-cti";

export default defineConfig({
  // HostGator compartilhado = Apache estático (sem Node).
  // SPA mode gera shell HTML; nitro desligado evita preset Cloudflare/SSR no shared host.
  tanstackStart: {
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
        crawlLinks: false,
      },
    },
  },
  nitro: false,
  vite: {
    server: {
      host: "127.0.0.1",
      port: 8080,
      proxy: {
        // Evita CORS: o browser chama mesma origem; Vite encaminha ao Apache/XAMPP
        "/api/v1/student": {
          target: painelTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
});
