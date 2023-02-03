import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "../client/client";
import { handleBrowser } from "./scripts/browser";

const server = express();
server.use(bodyParser.json());
const port = 3001;

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", express.static(path.join(__dirname, "static")));

const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);
const assets = JSON.parse(manifest);

server.get("/", (req, res) => {
  const component = ReactDOMServer.renderToString(React.createElement(App));
  res.render("client", { assets, component });
});

// create a route that accepts json
server.post("/post-schema", async (req, res) => {
  let filepath = await handleBrowser(req.body);
  console.log(path.join(__dirname, `static/${filepath}`));
  res.status(200).sendFile(path.join(__dirname, `static/${filepath}`));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
