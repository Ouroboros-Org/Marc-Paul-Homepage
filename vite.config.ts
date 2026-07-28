import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import vinext from "vinext";

// nitro() replaces RSC envs with FetchableDevEnvironment (no .runner), which
// crashes @vitejs/plugin-rsc's serverHandler in vinext dev — skip it for local serve.
export default defineConfig(({ command, isPreview }) => ({
  plugins: [
    vinext(),
    ...(command === "build" || isPreview ? [nitro()] : [])
  ]
}));
