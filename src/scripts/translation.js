// translation.js
import _ from "lodash";
import fs from "node:fs";
import path from "node:path";
import papa from "papaparse";

export function getTranslation(pathToTranslationsSource) {
  return new Promise(resolve => {
    const file = fs.readFileSync(pathToTranslationsSource, "utf-8");
    papa.parse(file, {
      complete: results => {
        resolve(results.data);
      },
    });
  });
}

export function formatTranslation(rows, header) {
  const targets = header.slice(2);
  const data = rows.map(row => _.zipObject(header, row));
  const missingEntries = {};
  const targetsMap = targets
    .map(target => ({
      [target]: _.chain(data)
        .filter(d => {
          const valid = _.isString(d[target]) && d[target].trim() !== "";
          if (!valid) {
            missingEntries[target] = [...(missingEntries[target] || []), d];
          }
          return valid;
        })
        .map(d => ({
          namespace: d.namespace,
          ..._.set({}, d.key, d[target]),
        }))
        .groupBy("namespace")
        .mapValues(namespace =>
          _.chain(namespace)
            .map(entry => _.omit(entry, "namespace"))
            .reduce(_.merge, {})
            .value()
        )
        .value(),
    }))
    .reduce(_.assign, {});
  return { targetsMap, missingEntries };
}

export function saveTranslatedFile({ targets, targetsMap, missingEntries, outputPath }) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  targets.forEach(target => {
    const targetData = targetsMap[target];
    const location = path.join(outputPath, `${target}.json`);
    const json = JSON.stringify(targetData, null, 2);
    fs.writeFileSync(location, json, "utf8");
    console.info(`write '${target}' language file => ${location}`);
    console.info("Translation saved!");

    if (Object.keys(missingEntries).length > 1) {
      _.forEach(missingEntries, (target, key) => {
        console.info(`there are missing entries in '${key}' language: `);
        _.forEach(_.groupBy(target, "namespace"), (entries, namespace) => {
          console.info(`  ${namespace}:`);
          entries.forEach(entry => {
            console.info(`    ${entry.key ? entry.key : "<no key>"}`);
          });
        });
      });
    }
  });
}
