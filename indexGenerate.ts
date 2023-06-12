import { findUpSync } from "find-up";
import { Config } from "./src/types";

const fs = require('fs').promises;
const path = require('path');
const { program } = require('commander');

const CONFIG_FILE_NAME = "gtconfig.json"
const tryCatchDecorator =
  (fn: Function, onRejected: (err: unknown) => any) =>
    (...args: any[]) => {
      try {
        return fn(...args);
      } catch (err) {
        return onRejected(err);
      }
    };

const defaultTryCatchDecorator = (fn: Function, onError?: (err: unknown) => any) =>
  tryCatchDecorator(fn,   onError ?? ((err: unknown) => {
    console.error(err);
  }));

export const tcd = defaultTryCatchDecorator;

const readConfig = () => {
  let config: any = null;

  const resolve = tcd(() => {
    const pkg = findUpSync(CONFIG_FILE_NAME, { cwd: process.cwd() });
    config = JSON.parse(fs.readFileSync(pkg as string, "utf8"));
    return config;
  });

  return () => config ?? resolve();
};

const getConfig = readConfig()

const main = async (componentName: string) => {
  tcd(async () => {
    const config: Config = getConfig()
    await fs.mkdir(config.distPath);
    await createCopyDirectory(config.templatePath, config.distPath, componentName);
  })
};

const createCopyDirectory = async (
  currentPath: string,
  putPath: string,
  componentName: string,
  templateName = 'TemplateName'
): Promise<null> => {
  const dirs = await fs.readdir(currentPath);
  const { files, directories } = defineFileAndDir(dirs);

  const createPutPath = (name: string) => path.join(putPath, replaceData(name, componentName, templateName));

  files.forEach((file) =>
    createCopyFile(path.join(currentPath, file), createPutPath(file), componentName, templateName)
  );

  await Promise.all(directories.map((dir) => fs.mkdir(createPutPath(dir))));

  if (directories.length) {
    await Promise.all(
      directories.map((dir) => createCopyDirectory(path.join(currentPath, dir), createPutPath(dir), componentName))
    );
  }

  return null;
};

const createCopyFile = async (currentPath: string, putPath: string, componentName: string, templateName: string) => {
  const file = await fs.readFile(currentPath, { encoding: 'utf-8' });
  return fs.writeFile(putPath, replaceData(file, componentName, templateName));
};

const isFirstLetterLowerCase = (str: string) => !!str && str[0].toLowerCase() === str[0];

const setFirstLetterToLowerCase = (str: string) => str.slice(0, 1).toLowerCase().concat(str.slice(1));

const replaceData = (text: string, componentName: string, templateName: string) => {
  const regexp = new RegExp(templateName, 'gi');
  return text.replace(regexp, ($1) =>
    isFirstLetterLowerCase($1) ? setFirstLetterToLowerCase(componentName) : componentName
  );
};

const defineFileAndDir = (pathes: string[]) =>
  pathes.reduce(
    (acc: { files: string[]; directories: string[] }, cur) => {
      if (path.extname(cur)) {
        acc.files.push(cur);
      } else {
        acc.directories.push(cur);
      }
      return acc;
    },
    { files: [], directories: [] }
  );

program
  .command('generate')
  .description('Generate React Component')
  .argument('<string>', 'Component name')
  .action((componentName: string, options: any) => {
    main(componentName);
  });
program.parse();

export {};
