import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'public/db.json');
const directoryPath = path.resolve(__dirname, 'src/content/directory');

// Sample placeholder values
const sampleContent = `---
layout: ../../layouts/Card.astro
title: {title}
description: This is an example listing to get you started.
tags:
  - default-tag
links:
  - name: "test"
    link: "#"
  - name: "test"
    link: "#"
---

# {title}

import JsonCodeBlock from '../../components/JsonCodeBlock.astro';
import VegaLite from '../../components/VegaLite.astro';

## Code
<JsonCodeBlock title="{title}" />
## Vega-Lite Chart
<VegaLite title="{title}" />
`;

// Read db.json
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Delete all existing files in the directory
fs.readdirSync(directoryPath).forEach(file => {
  fs.unlinkSync(path.join(directoryPath, file));
});

// Create new .mdx files
dbData.forEach((item, index) => {
  const fileName = `${item.title.replace(/[\s.]+/g, '_').toLowerCase()}.mdx`;
  const filePath = path.join(directoryPath, fileName);
  const fileContent = sampleContent.replace(/{title}/g, item.title);

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Created: ${filePath}`);
});

console.log('MDX files generated successfully.');