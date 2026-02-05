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
  console.log(chalk.bgGray(JSON.stringify(answers, null, 2)));
  copyAndReplace(answers);
  console.log(chalk.green("\n✅ Project is ready!"));
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
    message: "O que você quer criar?",
    choices: [
      { name: "Page", value: "page" },
      { name: "Component", value: "component" },
      { name: "ContentModel", value: "contentmodel" },
      { name: "DataModel", value: "datamodel" },
    ],
  });
  let itemName = await input({ message: "Item name:" });
  itemType = itemType;
  itemName = itemName;
  return {
    itemType: dashWords(itemType),
    itemName: capitalizeWords(itemName),
    fileName: dashWords(itemName),
    templatePath: path.join(process.cwd(), "templates", "angular", itemType),
    outputPath: path.join(process.cwd(), dashWords(itemName)),
  };
}

function copyAndReplace(params: InputParams) {
  try {
    if (!directoryExists(params.templatePath)) {
      console.error(chalk.red("❌ Template not found."));
      process.exit(1);
    }
    let files = fs.readdirSync(params.templatePath).filter((f) => path.extname(f).toLowerCase() === ".tpl");
    files.forEach((file) => {
      let templateContent = fs.readFileSync(file, "utf-8");
      let outputFileName = path.join(
        params.outputPath,
        path.basename(file).replace(`new-${params.itemType}`, params.fileName),
      );
      templateContent = templateContent.replace(/{{componentName}}/g, params.itemName);
      console.log("outputFileName", outputFileName);
      // fs.writeFileSync(outputFileName, templateContent);
      console.log(`Successfully created file: ${outputFileName}`);
    });
  } catch (error) {
    console.error("Error generating file:", error);
  }
}

main();
