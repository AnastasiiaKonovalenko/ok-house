import csv from "csv-parser";
import { writeToPath } from "fast-csv";
import fs from "fs";

function wrapSubstringInStrongTag(text, substring) {
  if (!text) return text;
  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
  }
  // Escape any special characters in the substring for safe regex use
  const escapedSubstring = escapeRegExp(substring);
  const regex = new RegExp(`(${escapedSubstring})`, "gi"); // 'i' flag for case-insensitivity
  console.log(text.replace(regex, "<strong>$1</strong>"));
  return text.replace(regex, "<strong>$1</strong>");
}

function updateCsv(inputFilePath, substrings) {
  const updatedRows = [];
  const outputFilePath = `output_${substrings[0]}.csv`;
  const setions = [
    "love",
    "business",
    "finance",
    "career",
    "decision",
    "conflict",
    "future",
    "warning",
  ];
  fs.createReadStream(inputFilePath)
    .pipe(csv({ headers: true }))
    .on("data", row => {
      if (row._0 === substrings[0] && setions.includes(row._1)) {
        // Wrap the substring in all language columns
        row._2 = wrapSubstringInStrongTag(row._2, substrings[1]);
        row._3 = wrapSubstringInStrongTag(row._3, substrings[2]);
        row._4 = wrapSubstringInStrongTag(row._4, substrings[3]);
        row._5 = wrapSubstringInStrongTag(row._5, substrings[4]);

        updatedRows.push(row);
      }
    })
    .on("end", () => {
      // Write the updated rows to a new CSV file
      writeToPath(outputFilePath, updatedRows, { headers: true }).on("finish", () =>
        console.log(`Updated CSV saved to ${outputFilePath}`)
      );
    });
}

// Usage example
const inputFilePath = "src/locales/translations.csv";
const substrings = [
  ["fool", "The Fool", "Kvailys", "El Loco", "Дурак"],
  ["magician", "The Magician", "Magas", "El Mago", "Маг"],
  [
    "highPriestess",
    "The High Priestess",
    "Vyriausioji Žynė",
    "La Suma Sacerdotisa",
    "Верховная Жрица",
  ],
  ["empress", "The Empress", "Imperatorė", "La Emperatriz", "Императрица"],
  ["emperor", "The Emperor", "Imperatorius", "El Emperador", "Император"],
  ["hierophant", "The Hierophant", "Hierofantas", "El Hierofante", "Иерофант"],
  ["lovers", "The Lovers", "Meilužiai", "Los Enamorados", "Влюбленные"],
  ["strength", "Strength", "Stiprybė", "La Fuerza", "Сила"],
  ["hermit", "The Hermit", "Atsiskyrėlis", "El Ermitaño", "Отшельник"],
  [
    "wheelOfFortune",
    "Wheel of Fortune",
    "Fortūnos Ratas",
    "La Rueda de la Fortuna",
    "Колесо фортуны",
  ],
  ["justice", "Justice", "Teisingumas", "Justicia", "Правосудие"],
  ["hangedMan", "The Hanged Man", "Pakabintasis", "El Colgado", "Повешенный"],
  ["death", "Death", "Mirtis", "Muerte", "Смерть"],
  ["temperance", "Temperance", "Saikingumas", "Templanza", "Умеренность"],
  ["devil", "The Devil", "Velnias", "El Diablo", "Дьявол"],
  ["tower", "The Tower", "Bokštas", "La Torre", "Башня"],
  ["star", "The Star", "Žvaigždė", "La Estrella", "Звезда"],
  ["moon", "The Moon", "Mėnulis", "La Luna", "Луна"],
  ["sun", "The Sun", "Saulė", "El Sol", "Солнце"],
  ["judgment", "Judgement", "Teismas", "Juicio", "Суд"],
  ["world", "The World", "Pasaulis", "El Mundo", "Мир"],
];

substrings.forEach(substrings => updateCsv(inputFilePath, substrings));
