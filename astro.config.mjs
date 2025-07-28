import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import node from "@astrojs/node";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    // output: 'hybrid', // This should work with Astro 5.3.0
    adapter: node({
        mode: 'standalone'
    }),
    vite: {
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
        drafts: true,
        shikiConfig: {
            theme: "css-variables",
        },
    },
    shikiConfig: {
        wrap: true,
        skipInline: false,
        drafts: true,
    },
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
        mdx(),
        icon(),
    ],
});