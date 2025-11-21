import {
  Auth,
  define,
  History,
  Store,
  Switch
} from "@calpoly/mustang";
import { html } from "lit";
import { HeaderElement } from "./components/blazing-header";
import { HomeViewElement } from "./views/home-view";
import { PlaceholderViewElement } from "./views/placeholder-view";
import { TravelerEditElement } from "./views/traveler-edit";
import { TravelerViewElement } from "./views/traveler-view";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

const routes = [
  {
    path: "/app/destination/:id",
    view: (params: Switch.Params) => html`
      <placeholder-view type="destination" item-id=${params.id}></placeholder-view>
    `
  },
  {
    path: "/app/flight/:id",
    view: (params: Switch.Params) => html`
      <placeholder-view type="flight" item-id=${params.id}></placeholder-view>
    `
  },
  {
    path: "/app/traveler/:id/edit",
    view: (params: Switch.Params) => html`
      <traveler-edit user-id=${params.id}></traveler-edit>
    `
  },
  {
    path: "/app/traveler/:id",
    view: (params: Switch.Params) => html`
      <traveler-view user-id=${params.id}></traveler-view>
    `
  },
  {
    path: "/app/airline/:id",
    view: (params: Switch.Params) => html`
      <placeholder-view type="airline" item-id=${params.id}></placeholder-view>
    `
  },
  {
    path: "/app/accommodation/:id",
    view: (params: Switch.Params) => html`
      <placeholder-view type="accommodation" item-id=${params.id}></placeholder-view>
    `
  },
  {
    path: "/app/activity/:id",
    view: (params: Switch.Params) => html`
      <placeholder-view type="activity" item-id=${params.id}></placeholder-view>
    `
  },
  {
    path: "/app/finance/:id",
    view: (params: Switch.Params) => html`
      <placeholder-view type="finance" item-id=${params.id}></placeholder-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
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
  "home-view": HomeViewElement,
  "traveler-view": TravelerViewElement,
  "traveler-edit": TravelerEditElement,
  "placeholder-view": PlaceholderViewElement,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history", "blazing:auth");
    }
  }
});

