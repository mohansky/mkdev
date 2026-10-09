import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { fileURLToPath } from 'url';

import cloudflare from "@astrojs/cloudflare";

// Placeholder blog pages: kept for a future blog, but not listed in the sitemap yet
const sitemapExcluded = /^\/(de\/)?(blog|tags|author)(\/|$)/;

// https://astro.build/config
export default defineConfig({
    adapter: cloudflare({
        imageService: "compile",
    }),
    vite: {
        resolve: {
            alias: {
                '@emails': fileURLToPath(new URL('./src/emails', import.meta.url)),
            },
        },
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
    site: "https://mohankumar.dev",
    i18n: {
        defaultLocale: "en",
        locales: ["en", "de"],
    },
    markdown: {
        shikiConfig: {
            theme: "css-variables",
            wrap: true,
        },
    },
    integrations: [
        sitemap({
            filter: (page) => !sitemapExcluded.test(new URL(page).pathname),
        }),
        mdx(),
        icon(),
    ],
});
