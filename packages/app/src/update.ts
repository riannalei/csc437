import { Auth } from "@calpoly/mustang";
import { Traveler } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

function requestProfile(
  payload: { userid: string },
  user: Auth.User
): Promise<Traveler> {
  return fetch(`/api/travelers/${payload.userid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error("No Response from server");
    })
    .then((json: unknown) => {
      if (json) return json as Traveler;
      throw new Error("No JSON in response from server");
    });
}

function saveProfile(
  payload: { userid: string; profile: Traveler },
  user: Auth.User
): Promise<Traveler> {
  return fetch(`/api/travelers/${payload.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(payload.profile)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(`Failed to save profile for ${payload.userid}`);
    })
    .then((json: unknown) => {
      if (json) return json as Traveler;
      throw new Error("No JSON in API response");
    });
}

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | [Model, Promise<Msg>] {
  switch (message[0]) {
    case "profile/request": {
      const { userid } = message[1];
      if (model.profile?.userid === userid) {
        return model;
      }
      return [
        model, // Don't set placeholder, just return current model
        requestProfile(message[1], user)
          .then((profile) => [
            "profile/load",
            { userid, profile }
          ] as Msg)
          .catch((error) => {
            console.error("Failed to load profile:", error);
            // Could dispatch an error message here if needed
            return ["profile/load", { userid, profile: undefined as any }] as Msg;
          })
      ];
    }
    case "profile/load": {
      const { profile } = message[1];
      return { ...model, profile };
    }
    case "profile/save": {
      const { userid, profile } = message[1];
      const { onSuccess, onFailure } = message[2] || {};
      return [
        model,
        saveProfile(message[1], user)
          .then((savedProfile) => [
            "profile/load",
            { userid, profile: savedProfile }
          ] as Msg)
          .then(() => {
            if (onSuccess) onSuccess();
          })
          .catch((error: Error) => {
            if (onFailure) onFailure(error);
          })
      ];
    }
    default: {
      const unhandled: never = message[0];
      throw new Error(`Unhandled Store message "${unhandled}"`);
    }
  }
}

