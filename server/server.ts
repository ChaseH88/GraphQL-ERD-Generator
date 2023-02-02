import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "../client/client";

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
server.post("/post-schema", (req, res) => {
  console.log("req.body", req.body);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
