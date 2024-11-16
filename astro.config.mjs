// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwind from '@astrojs/tailwind';
import themeConfig from './src/integrations/themeConfig';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://bestmeditationapps.com",
  integrations: [vue(), tailwind(), themeConfig(), mdx(), icon(), sitemap()],
});