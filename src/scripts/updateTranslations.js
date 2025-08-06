import path from "node:path";
import { fileURLToPath } from "node:url";

import { formatTranslation, getTranslation, saveTranslatedFile } from "./translation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGE_COLUMNS_OFFSET = 2;

const outputPath = path.join(__dirname, "../locales/lang");
const pathToTranslationsSource = path.join(__dirname, "../locales/translations.csv");

getTranslation(pathToTranslationsSource).then(data => {
  const header = data.shift();
  const targets = header.slice(LANGUAGE_COLUMNS_OFFSET);
  const { targetsMap, missingEntries } = formatTranslation(data, header);

  saveTranslatedFile({
    targets,
    targetsMap,
    missingEntries,
    outputPath,
  });
});
