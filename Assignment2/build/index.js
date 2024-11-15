import { showBanner } from "../src/js/View/View.js";
import { runTasks } from "../src/js/Presenter/Presenter.js";

async function main() {
  showBanner();
  runTasks();
}

main();

const fs = require("fs").promises;
const path = require("path");
const cheerio = require("cheerio");
const terser = require("terser");

console.log("Your Code should start here ... :)");
//TODO Fehlerbehandlung!
//ist ordnerstruktur immer so?
//sollen alle im ordner minifiziert werden oder alle in index.html?

//index html durchgehen und alle .js dateien rausfinden
async function findJSFiles() {
  // fs.readFile (asynchron) und cheerio, um  Datei zu laden und alle src-Attribute der <script>-Tags zu extrahieren.
  //Gibt eine Liste mit den Pfaden zu den gefundenen .js-Dateien zurück (z. B. ['js/script1.js', 'js/test/script3.js']).
  const htmlPath = path.join(__dirname, "../src/index.html");
  const htmlContent = await fs.readFile(htmlPath, "utf-8");

  // Entferne alle Kommentare aus dem HTML-Inhalt
  const uncommentedHtmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, "");

  // Parst das bereinigte HTML ohne Kommentare
  const $ = cheerio.load(uncommentedHtmlContent);

  const jsFiles = [];
  $("script[src]").each((_, el) => {
    jsFiles.push($(el).attr("src"));
  });

  return jsFiles;
}

//dist ordner mit gleicher ordnerstruktur wie js anlegen
async function createDistFolder(jsFiles) {
  //mit mkdir
  const distPath = path.join(__dirname, "../dist");
  await fs.mkdir(distPath, { recursive: true });

  // Erstelle Ordnerstruktur für alle JS-Dateien
  const directories = new Set();
  jsFiles.forEach((jsFile) => {
    const dir = path.join(distPath, path.dirname(jsFile));
    directories.add(dir);
  });

  for (const dir of directories) {
    await fs.mkdir(dir, { recursive: true });
  }
}

//im js ordner suchen und datei minifizieren + mini dateien im dist ordner speichern
async function minifyAndSaveJS(jsFiles) {
  //Prüfe mit fs.access, ob die Datei existiert.
  //minifiziere sie mit terser und speichere den minifizierten Code
  for (const jsFile of jsFiles) {
    const srcFilePath = path.join(__dirname, "../src", jsFile);
    const distFilePath = path.join(__dirname, "../dist", jsFile);

    try {
      const fileContent = await fs.readFile(srcFilePath, "utf-8");
      const minified = await terser.minify(fileContent);
      if (minified.code) {
        await fs.writeFile(distFilePath, minified.code);
        console.log(`Minified and saved: ${distFilePath}`);
      }
    } catch (error) {
      console.error(`Error processing ${jsFile}: ${error.message}`);
    }
  }
}

//Kopiert die index.html-Datei in den dist-Ordner und passt die Referenzen der JavaScript-Dateien an die minifizierten Versionen an.
async function copyAndModifyHtml(jsFiles) {
  //Lese die index.html, ersetze alle .js-Dateireferenzen durch die Pfade im dist-Ordner (z. B. src="js/script1.js" zu src="dist/js/script1.min.js").
  //Speichere die modifizierte index.html im dist-Ordner.
  const htmlPath = path.join(__dirname, "../src/index.html");
  const htmlContent = await fs.readFile(htmlPath, "utf-8");
  const $ = cheerio.load(htmlContent);
  jsFiles.forEach((jsFile) => {
    $(`script[src="${jsFile}"]`).attr("src", jsFile);
  });
  const distHtmlPath = path.join(__dirname, "../dist/index.html");
  await fs.writeFile(distHtmlPath, $.html());
}
