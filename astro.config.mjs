import { defineConfig, passthroughImageService } from 'astro/config';
import { fontProviders } from "astro/config";
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.cahayalintangabadi.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: passthroughImageService(),
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter", weights: [400, 500, 600, 700],
      cssVariable: "--font-sans",
      display: "swap",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Syne", weights: [400, 800],
      cssVariable: "--font-syne",
      display: "swap",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Inconsolata", weights: [200, 900],
      cssVariable: "--font-mono",
      display: "swap",
    }
  ]
});
