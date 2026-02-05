#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import { input, select } from "@inquirer/prompts";
import path from "path";
import { capitalizeWords, dashWords } from "./text.helper.js";
import { directoryExists } from "./file.helper.js";

// program
//   .command('generate <name>')
//   .description('Generate a new TypeScript component file')
//   .action((name) => {
//     generateComponent(name);
//   })

async function main() {
  console.log(chalk.blue("🚀 Welcome to create-aco-items!"));
  const answers = await inputParams();
  console.log(chalk.grey(JSON.stringify(answers, null, 2)));
  copyAndReplace(answers);
  console.log(chalk.green("\n✅ Process is done!"));
}

interface InputParams {
  itemType: string;
  itemName: string;
  fileName: string;
  templatePath: string;
  outputPath: string;
}

async function inputParams(): Promise<InputParams> {
  let itemType = await select({
    message: "What do you want to create?",
    choices: [
      { name: "Page", value: "page" },
      { name: "Store", value: "store" },
      { name: "ContentModel", value: "content-model" },
      { name: "DataModel", value: "data-model" },
    ],
  });
  let itemName = await input({ message: "Item name:" });
  itemType = itemType;
  itemName = itemName;
  return {
    itemType: dashWords(itemType),
    itemName: capitalizeWords(itemName),
    fileName: dashWords(itemName),
    templatePath: path.join(process.cwd(), "node_modules", "create-aco-items", "src", "templates", "angular", itemType),
    outputPath: groupFolder(itemType) ? path.join(process.cwd(), dashWords(itemName)) : process.cwd(),
  };
}

function groupFolder(itemType: string) {
  return itemType === "page" || itemType === "component";
}

function copyAndReplace(params: InputParams) {
  try {
    if (!directoryExists(params.templatePath)) {
      console.error(chalk.red("❌ Template path not found."));
      process.exit(1);
    }
    if (directoryExists(params.outputPath) && groupFolder(params.itemType)) {
      console.error(chalk.red("❌ Output path already exists."));
      process.exit(1);
    }
    if (groupFolder(params.itemType)) {
      fs.mkdirSync(params.outputPath, { recursive: true });
    }
    let files = fs.readdirSync(params.templatePath).filter((f) => path.extname(f).toLowerCase() === ".tpl");
    files.forEach((file) => {
      let outputFileName = getOutputFileName(params, file);
      let templateContent = getContent(params, file);
      writeFile(outputFileName, templateContent);
    });
  } catch (error) {
    console.error(chalk.red("❌ Error creating file:", error));
  }
}

function getContent(params: InputParams, file: string) {
  let templateContent = fs.readFileSync(path.join(params.templatePath, file), "utf-8");
  templateContent = templateContent
    .replace(/{{ComponentName}}/g, params.itemName)
    .replace(/{{file-name}}/g, params.fileName);
  return templateContent;
}

function getOutputFileName(params: InputParams, file: string) {
  return path.join(
    params.outputPath,
    path.basename(file).replace(`new-${params.itemType}`, params.fileName).replace(".tpl", ""),
  );
}

function writeFile(outputFileName: string, templateContent: string) {
  console.log(chalk.yellow(`Trying create file: ${outputFileName}`));
  if (fs.existsSync(outputFileName)) {
    console.error(chalk.red("❌ Output file already exists."));
    return;
  }
  fs.writeFileSync(outputFileName, templateContent);
  console.log(chalk.green(`✅ Successfully created file: ${outputFileName}`));
}

main();
