import fs from "fs/promises";
import toml from "@iarna/toml";

let config: any = null;

export async function loadConfig() {
  if (!config) {
    const configData = await fs.readFile(
      "./src/config/theme-config.toml",
      "utf-8"
    );
    config = toml.parse(configData);
  }
  return config;
}
