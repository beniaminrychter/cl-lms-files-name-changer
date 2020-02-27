const glob = require("glob");
const path = require("path");
const currentPath = process.cwd();
const fs = require("fs");
const YAML = require("yaml");
const {strOptions} = require("yaml/types");
strOptions.defaultType = "QUOTE_SINGLE";


const options = {
  entry: "additional", // folder który będzie skanowany w celu zmiany nazw
  files: "html",
  prefix: "presentation"
};

const globSetting = {
  root: path.resolve(currentPath, `../`)
};


glob(`/${options.entry}/**/*.${options.files}`, globSetting, (err, files) => {
  if (err !== null) {
    console.log(err);
    return;
  }

  if (files.length === 0) {
    console.log("No files found.");
    return;
  }

  files.forEach(file => {
    const folders = file.split("/");
    const oldFileName = folders.pop();

    if (oldFileName.includes(options.prefix)) {
      return;
    }


    // Rename file
    const numberPrefix = oldFileName.slice(0, 2);
    const newFileName = `${numberPrefix}_${options.prefix}_${oldFileName.slice(3)}`;
    fs.rename(file, `${folders.join("/")}/${newFileName}`, err => {
      if (err) return console.log(err);
    });

    // Change .config.yml
    folders.pop(); // remove "content" sub folder
    const configPath = `${folders.join("/")}/.config.yml`;

    fs.access(configPath, fs.F_OK, err => {
      if (err) {
        return;
      }

      const configYAML = fs.readFileSync(configPath, "utf-8");
      const configJS = YAML.parse(configYAML);
      const content = Object.entries(configJS.content).map(entry => {
        if (entry[0] === oldFileName) {
          entry[0] = newFileName;
        }
        return entry;
      }).reduce((acc, cur) => {
        acc[cur[0]] = cur[1];
        return acc;
      }, {});

      configJS.content = content;

      fs.writeFile(configPath, YAML.stringify(configJS, {schema: "failsafe"}), "utf8", err => {
        if (err) return console.log(".config.yml ERROR " + err);
      });
    });
  });
});
