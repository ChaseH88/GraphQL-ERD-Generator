import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const TEMPFILEPATH = "../dist/static/schema.png";

const formatInput = (input: string) => {
  return JSON.stringify(input).replace(/^"|"$|\\n/g, "");
};

const handleBrowser = async (input: any) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (fs.existsSync(TEMPFILEPATH)) {
    fs.unlinkSync(TEMPFILEPATH);
  }

  await page.goto("https://ivangoncharov.github.io/graphql-voyager/");
  await page.setViewport({ width: 1080, height: 1024 });

  // // Wait and click on first result
  const buttonSelector = ".voyager-logo + button";
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);

  const sdlButton = ".MuiTabs-flexContainer > :nth-child(2)";
  await page.waitForSelector(sdlButton);
  await page.click(sdlButton);

  const textarea = '[placeholder="Paste SDL Here"]';
  await page.waitForSelector(textarea);
  await page.type(textarea, formatInput(input.schema));

  const submitButton = "div.MuiDialogActions-root > button:nth-child(2)";
  await page.waitForSelector(submitButton);
  await page.click(submitButton);

  const svg = ".viewport svg";
  await page.waitForSelector(svg);

  // set a timeout to allow the svg to render
  await page.waitForTimeout(2000);

  const element = await page.$(svg);
  // save the image to 'dist/static/schema.png'
  await element!.screenshot({
    path: path.join(__dirname, TEMPFILEPATH),
  });

  console.log("Complete!");

  await browser.close();

  // return the file path so we can send it back to the client
  return "schema.png";
};

export { handleBrowser };
