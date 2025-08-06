// Import fs if working in Node.js for file writing
import fs from "fs";

const inputText = `
`;

const languageMarkers = {
  en: ["Love", "Business", "Finance", "Career", "Decision", "Conflict", "Future", "Warning"],
  ru: [
    "Любовь",
    "Бизнес",
    "Финансы",
    "Карьера",
    "Решение",
    "Конфликт",
    "Будущее",
    "Предупреждение",
  ],
  es: ["Amor", "Negocios", "Finanzas", "Carrera", "Decisión", "Conflicto", "Futuro", "Advertencia"],
  lt: [
    "Meilė",
    "Verslas",
    "Finansai",
    "Karjera",
    "Sprendimas",
    "Konfliktas",
    "Ateitis",
    "Įspėjimas",
  ],
};
// Define categories and language markers
const langs = ["en", "ru", "es", "lt"];
const categories = [
  "Love",
  "Business",
  "Finance",
  "Career",
  "Decision",
  "Conflict",
  "Future",
  "Warning",
];

const key = "world";
const keys = [
  { category: "Love", key: `${key}Love` },
  { category: "Business", key: `${key}Business` },
  { category: "Finance", key: `${key}Finance` },
  { category: "Career", key: `${key}Career` },
  { category: "Decision", key: `${key}Decision` },
  { category: "Conflict", key: `${key}Conflict` },
  { category: "Future", key: `${key}Future` },
  { category: "Warning", key: `${key}Warning` },
];

const replaceMarkersIfRowHasOnlyKey = (text, arr) => {
  const rows = text.split("\n"); // Split the text into rows
  const a = rows.map(x => (arr.indexOf(x) === -1 ? x : "--"));
  debugger;
  return a.join("\n"); // Join rows back into a single string
};

// Function to parse the text into structured data
function parseTextToStructure(text) {
  const structuredData = [];
  const c = Object.values(languageMarkers).flat();
  // Split the text by lines
  const modifiedText = replaceMarkersIfRowHasOnlyKey(text, c);

  const lines = modifiedText
    .replace(/\n/g, "")
    .split("---")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  lines.forEach((line, idx) => {
    const translations = line.split("--");
    const c = {
      lang: langs[idx],
    };

    translations.forEach((x, i) => {
      const key = categories[i];
      c[key] = x;
    });

    structuredData.push(c);
  });

  return structuredData;
}

// Parse the input text
const result = parseTextToStructure(inputText);

console.log(result);

// Function to convert structured data into CSV format
function createCSV(structuredData) {
  // Define the header
  let csvContent = "namespace,key,en,lt,es,ru\n";

  // Build CSV rows for each category (key)
  keys.forEach(key => {
    const en = structuredData.find(x => x.lang === "en")[key.category].replace(/\*\*/g, "\\n\\n");
    const lt = structuredData.find(x => x.lang === "lt")[key.category].replace(/\*\*/g, "\\n\\n");
    const es = structuredData.find(x => x.lang === "es")[key.category].replace(/\*\*/g, "\\n\\n");
    const ru = structuredData.find(x => x.lang === "ru")[key.category].replace(/\*\*/g, "\\n\\n");

    const row = `card,${key.key},"${en}","${lt}","${es}","${ru}"\n`;
    csvContent += row;
  });

  // Write the CSV content to a file (in Node.js environment)
  fs.writeFileSync("translations11.csv", csvContent);
  console.log("CSV file created successfully.");
}

// Call the function to create the CSV
createCSV(result);
