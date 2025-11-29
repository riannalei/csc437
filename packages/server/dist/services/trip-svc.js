"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var trip_svc_exports = {};
__export(trip_svc_exports, {
  default: () => trip_svc_default
});
module.exports = __toCommonJS(trip_svc_exports);
var import_mongoose = require("mongoose");
const TripSchema = new import_mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    notes: { type: String, trim: true },
    activities: [String],
    itinerary: [
      {
        label: { type: String, required: true, trim: true },
        items: [
          {
            time: { type: String, trim: true },
            title: { type: String, required: true, trim: true },
            notes: { type: String, trim: true }
          }
        ]
      }
    ]
  },
  { collection: "blz_trips" }
);
const TripModel = (0, import_mongoose.model)("Trip", TripSchema);
function index(userId) {
  return TripModel.find({ userId }).sort({ startDate: 1, destination: 1 });
}
function get(userId, id) {
  return TripModel.findOne({ _id: id, userId }).then((trip) => trip).catch(() => {
    throw `${id} Not Found`;
  });
}
function create(userId, json) {
  const t = new TripModel({ ...json, userId });
  return t.save();
}
function update(userId, id, trip) {
  return TripModel.findOneAndUpdate(
    { _id: id, userId },
    trip,
    { new: true }
  ).then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated;
  });
}
function remove(userId, id) {
  return TripModel.findOneAndDelete({ _id: id, userId }).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}
var trip_svc_default = { index, get, create, update, remove };
