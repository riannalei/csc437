import {
  Auth,
  define,
  History,
  Store,
  Switch
} from "@calpoly/mustang";
import { html } from "lit";
import { HeaderElement } from "./components/blazing-header";
import { TripsViewElement } from "./views/trips-view";
import { TripViewElement } from "./views/trip-view";
import { TripEditElement } from "./views/trip-edit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

const routes = [
  {
    path: "/app",
    view: () => html`
      <trips-view></trips-view>
    `
  },
  {
    path: "/app/trip/new",
    view: () => html` <trip-edit></trip-edit> `
  },
  {
    path: "/app/trip/:id/edit",
    view: (params: Switch.Params) => html`
      <trip-edit trip-id=${params.id}></trip-edit>
    `
  },
  {
    path: "/app/trip/:id",
    view: (params: Switch.Params) => html`
      <trip-view trip-id=${params.id}></trip-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
  "blazing-header": HeaderElement,
  "trips-view": TripsViewElement,
  "trip-view": TripViewElement,
  "trip-edit": TripEditElement,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history", "blazing:auth");
    }
  }
});

