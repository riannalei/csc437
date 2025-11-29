import { Schema, model } from "mongoose";
import { Trip } from "../models/trip";

const TripSchema = new Schema<Trip>(
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

const TripModel = model<Trip>("Trip", TripSchema);

function index(userId: string): Promise<Trip[]> {
  return TripModel.find({ userId }).sort({ startDate: 1, destination: 1 });
}

function get(userId: string, id: string): Promise<Trip | null> {
  return TripModel.findOne({ _id: id, userId })
    .then((trip) => trip)
    .catch(() => {
      throw `${id} Not Found`;
    });
}

function create(userId: string, json: Omit<Trip, "userId">): Promise<Trip> {
  const t = new TripModel({ ...json, userId });
  return t.save();
}

function update(
  userId: string,
  id: string,
  trip: Partial<Trip>
): Promise<Trip> {
  return TripModel.findOneAndUpdate(
    { _id: id, userId },
    trip,
    { new: true }
  ).then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated as Trip;
  });
}

function remove(userId: string, id: string): Promise<void> {
  return TripModel.findOneAndDelete({ _id: id, userId }).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}

export default { index, get, create, update, remove };


