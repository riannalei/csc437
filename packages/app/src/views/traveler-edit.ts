import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class TravelerEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "user-id" })
  userid?: string;

  @state()
  get profile(): Traveler | undefined {
    return this.model?.profile;
  }

  constructor() {
    super("blazing:model");
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.userid) {
      this.requestProfile();
    }
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      this.requestProfile();
    }
  }

  requestProfile() {
    if (this.userid) {
      this.dispatchMessage([
        "profile/request",
        { userid: this.userid }
      ]);
    }
  }

  handleSubmit(event: Form.SubmitEvent<Traveler & { airports?: string }>) {
    if (!this.userid) return;

    // Convert airports string to array
    const formData = { ...event.detail };
    if (typeof formData.airports === "string") {
      formData.airports = formData.airports
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a.length > 0);
    }

    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid,
        profile: formData as Traveler
      },
      {
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/traveler/${this.userid}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }

  render() {
    const profile = this.profile;

    if (!this.userid) {
      return html`
        <main class="traveler-edit">
          <p>No user ID provided</p>
        </main>
      `;
    }

    if (!profile || profile.userid !== this.userid) {
      return html`
        <main class="traveler-edit">
          <p>Loading profile for ${this.userid}...</p>
        </main>
      `;
    }

    return html`
      <main class="traveler-edit">
        <header class="edit-header">
          <h1>Edit Profile</h1>
          <a href="/app/traveler/${this.userid}" class="cancel-link">Cancel</a>
        </header>

        <mu-form
          .init=${profile}
          @mu-form:submit=${this.handleSubmit}>
          <label>
            <span>Name</span>
            <input name="name" required placeholder="Enter your name" />
          </label>

          <label>
            <span>Nickname</span>
            <input name="nickname" placeholder="Enter your nickname" />
          </label>

          <label>
            <span>Home</span>
            <input name="home" required placeholder="Enter your home location" />
          </label>

          <label>
            <span>Avatar URL</span>
            <input name="avatar" type="url" placeholder="Enter avatar image URL" />
          </label>

          <label>
            <span>Airports</span>
            <input 
              name="airports" 
              placeholder="Enter airports (comma-separated)" 
              .value=${profile.airports?.join(", ") || ""} />
          </label>

          <button type="submit">Save Profile</button>
        </mu-form>
      </main>
    `;
  }

  static styles = css`
    .traveler-edit {
      max-width: 600px;
      margin: var(--spacing-xxl) auto;
      padding: var(--spacing-xl);
    }

    .edit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
      border-bottom: 2px solid var(--color-border, #e5e7eb);
    }

    .edit-header h1 {
      margin: 0;
      font-size: var(--font-size-3xl, 1.875rem);
    }

    .cancel-link {
      color: var(--color-primary, #21969a);
      text-decoration: none;
      font-weight: 600;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-md, 8px);
      transition: background-color 0.2s;
    }

    .cancel-link:hover {
      background-color: var(--color-background-section, #f9fafb);
    }

    mu-form {
      display: block;
    }

    mu-form label {
      display: block;
      margin-bottom: var(--spacing-lg);
    }

    mu-form label span {
      display: block;
      margin-bottom: var(--spacing-sm);
      font-weight: 600;
      color: var(--color-text, #1f2937);
    }

    mu-form input {
      width: 100%;
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: var(--border-radius-md, 8px);
      font-size: var(--font-size-base, 1rem);
      box-sizing: border-box;
    }

    mu-form input:focus {
      outline: none;
      border-color: var(--color-primary, #21969a);
      box-shadow: 0 0 0 3px rgba(33, 150, 154, 0.1);
    }

    mu-form button[type="submit"] {
      width: 100%;
      padding: var(--spacing-md) var(--spacing-lg);
      background: var(--color-primary, #21969a);
      color: white;
      border: none;
      border-radius: var(--border-radius-md, 8px);
      font-size: var(--font-size-base, 1rem);
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: var(--spacing-lg);
    }

    mu-form button[type="submit"]:hover {
      background: var(--color-primary-dark, #17696c);
    }

    mu-form button[type="submit"]:active {
      transform: translateY(1px);
    }
  `;
}

