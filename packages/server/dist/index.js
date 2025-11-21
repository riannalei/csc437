"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_promises = __toESM(require("node:fs/promises"));
var import_path = __toESM(require("path"));
var import_mongo = require("./services/mongo");
var import_auth = __toESM(require("./routes/auth"));
var import_travelers = __toESM(require("./routes/travelers"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.use("/auth", import_auth.default);
app.use("/api/travelers", import_auth.authenticateUser, import_travelers.default);
app.get("/login.html", (req, res) => {
  const loginHtml = import_path.default.resolve(staticDir, "login.html");
  import_promises.default.readFile(loginHtml, { encoding: "utf8" }).then((html) => res.send(html)).catch(() => res.status(404).send("Login page not found"));
});
app.get("/newuser.html", (req, res) => {
  const newuserHtml = import_path.default.resolve(staticDir, "newuser.html");
  import_promises.default.readFile(newuserHtml, { encoding: "utf8" }).then((html) => res.send(html)).catch(() => res.status(404).send("Signup page not found"));
});
app.use("/app", (req, res) => {
  const indexHtml = import_path.default.resolve(staticDir, "index.html");
  import_promises.default.readFile(indexHtml, { encoding: "utf8" }).then(
    (html) => res.send(html)
  );
});
(0, import_mongo.connect)("blazing");
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
