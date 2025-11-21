import { Traveler } from "server/models";

export type Msg =
  | ["profile/save", { userid: string; profile: Traveler }]
  | ["profile/request", { userid: string }]
  | Cmd;

type Cmd =
  | ["profile/load", { userid: string; profile: Traveler }];

