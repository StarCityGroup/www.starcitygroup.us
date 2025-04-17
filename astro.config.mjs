import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';

import partytown from "@astrojs/partytown";

import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

export default defineConfig({
  site: 'https://www.starcitygroup.us',
  integrations: [
    mdx(), 
    sitemap(), 
    tailwind(), 
    partytown(),
    pagefind()
  ],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [[autoNewTabExternalLinks, {
      domain: 'localhost:4321'
    }]]
  }
});



