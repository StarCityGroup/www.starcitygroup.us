import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';
import { remarkYouTube } from './src/remarkYouTube';
import partytown from "@astrojs/partytown";
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
    remarkPlugins: [remarkYouTube],
    rehypePlugins: [[autoNewTabExternalLinks, {
      domain: 'localhost:4321'
    }]]
  }
});



