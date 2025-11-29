"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var trips_exports = {};
__export(trips_exports, {
  default: () => trips_default
});
module.exports = __toCommonJS(trips_exports);
var import_express = __toESM(require("express"));
var import_trip_svc = __toESM(require("../services/trip-svc"));
const router = import_express.default.Router();
function requireUserId(req) {
  const username = req.username;
  if (!username) throw new Error("Missing authenticated user");
  return username;
}
router.get("/", (req, res) => {
  try {
    const userId = requireUserId(req);
    import_trip_svc.default.index(userId).then((list) => res.json(list)).catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});
router.get("/:id", (req, res) => {
  try {
    const userId = requireUserId(req);
    const { id } = req.params;
    import_trip_svc.default.get(userId, id).then((trip) => {
      if (trip) res.json(trip);
      else res.status(404).send(`${id} Not Found`);
    }).catch((err) => res.status(404).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});
router.post("/", (req, res) => {
  try {
    const userId = requireUserId(req);
    const body = req.body;
    import_trip_svc.default.create(userId, body).then((trip) => res.status(201).json(trip)).catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});
router.put("/:id", (req, res) => {
  try {
    const userId = requireUserId(req);
    const { id } = req.params;
    const body = req.body;
    import_trip_svc.default.update(userId, id, body).then((trip) => res.json(trip)).catch((err) => res.status(404).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});
router.delete("/:id", (req, res) => {
  try {
    const userId = requireUserId(req);
    const { id } = req.params;
    import_trip_svc.default.remove(userId, id).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});
var trips_default = router;
