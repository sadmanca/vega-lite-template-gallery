import type { AstroIntegration } from "astro";
import { loadConfig } from "../util/loadConfig";

export const lifecycleLogs = () => {
  const hooks = [`astro:config:setup`, "astro:build:setup"] as const;

  // base integration structure. "hooks" will be updated
  let integration: AstroIntegration = {
    name: "astro-lifecycle-logs",
    hooks: {},
  };

  // loop over the hooks list and add the name and log
  for (const hook of hooks) {
    integration.hooks[hook] = () => {
      const config = loadConfig();
      globalThis.themeConfig = config;
    };
  }

  return integration;
};

export default lifecycleLogs;
