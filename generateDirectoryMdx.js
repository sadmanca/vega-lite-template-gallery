import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'public/db.json');
const directoryPath = path.resolve(__dirname, 'src/content/directory');

// Sample placeholder values

// card_image: "/public/favicon_large.png"
const sampleContent = `---
layout: ../../layouts/Card.astro
title: "{figure_description}"
description: "{vega_description}"
tags:
  - "{filename}"
  - "{section_name}"
  - "{lesson_title}"
  - "{title}"
  - "{figure_number}"
  - "ID: {id}"
  - "Module ID: {moduleid}"
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
  var fileContent = sampleContent.replace(/{title}/g, item.title);
  fileContent = fileContent.replace(/{id}/g, item.id);
  fileContent = fileContent.replace(/{moduleid}/g, item.moduleid);
  fileContent = fileContent.replace(/{lesson_title}/g, item.lesson_title);
  fileContent = fileContent.replace(/{sectionid}/g, item.sectionid);
  fileContent = fileContent.replace(/{section_name}/g, item.section_name);
  fileContent = fileContent.replace(/{filename}/g, item.filename);
  fileContent = fileContent.replace(/{figure_number}/g, item.figure_number);
  fileContent = fileContent.replace(/{figure_description}/g, item.figure_description);
  if (item.vega_description !== null) {
    fileContent = fileContent.replace(/{vega_description}/g, item.vega_description);
  } else {
    fileContent = fileContent.replace(/{vega_description}/g, item.title);
  }

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`Created: ${filePath}`);
});

console.log('MDX files generated successfully.');