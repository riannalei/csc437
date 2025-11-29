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
        .map((a: string) => a.trim())
        .filter((a: string) => a.length > 0);
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

          <button slot="submit" type="submit">Save Profile</button>
        </mu-form>
      </main>
    `;
  }

  static styles = css`
    .traveler-edit {
      max-width: 700px;
      margin: var(--spacing-xxl, 3rem) auto;
      padding: var(--spacing-xl, 2rem);
    }

    .edit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xxl, 3rem);
      padding-bottom: var(--spacing-lg, 1.5rem);
      border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .edit-header h1 {
      margin: 0;
      font-size: var(--font-size-4xl, 2.25rem);
      font-weight: 700;
      color: var(--color-text, #1f2937);
      letter-spacing: -0.02em;
    }

    .cancel-link {
      color: var(--color-text-muted, #6b7280);
      text-decoration: none;
      font-weight: 500;
      padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
      border-radius: var(--border-radius-md, 8px);
      transition: all 0.2s ease;
      font-size: var(--font-size-sm, 0.875rem);
    }

    .cancel-link:hover {
      background-color: var(--color-background-section, #f9fafb);
      color: var(--color-text, #1f2937);
    }

    mu-form {
      display: block;
      background: white;
      padding: var(--spacing-xxl, 3rem);
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    mu-form label {
      display: block;
      margin-bottom: var(--spacing-xl, 2rem);
    }

    mu-form label:last-of-type {
      margin-bottom: var(--spacing-lg, 1.5rem);
    }

    mu-form label span {
      display: block;
      margin-bottom: var(--spacing-sm, 0.5rem);
      font-weight: 600;
      color: var(--color-text, #1f2937);
      font-size: var(--font-size-sm, 0.875rem);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    mu-form input {
      width: 100%;
      padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
      border: 2px solid var(--color-border, #e5e7eb);
      border-radius: var(--border-radius-md, 8px);
      font-size: var(--font-size-base, 1rem);
      box-sizing: border-box;
      transition: all 0.2s ease;
      background: white;
      color: var(--color-text, #1f2937);
    }

    mu-form input:hover {
      border-color: var(--color-primary-light, #76bbbf);
    }

    mu-form input:focus {
      outline: none;
      border-color: var(--color-primary, #21969a);
      box-shadow: 0 0 0 4px rgba(33, 150, 154, 0.1);
      background: white;
    }

    mu-form input::placeholder {
      color: var(--color-text-muted, #9ca3af);
    }

    mu-form button[type="submit"] {
      width: 100%;
      padding: var(--spacing-md, 1rem) var(--spacing-xl, 2rem);
      background: linear-gradient(135deg, var(--color-primary, #21969a) 0%, var(--color-primary-dark, #17696c) 100%);
      color: white;
      border: none;
      border-radius: var(--border-radius-md, 8px);
      font-size: var(--font-size-base, 1rem);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: var(--spacing-xl, 2rem);
      box-shadow: 0 4px 6px rgba(33, 150, 154, 0.2);
      min-height: 48px;
      letter-spacing: 0.01em;
    }

    mu-form button[type="submit"]:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(33, 150, 154, 0.3);
    }

    mu-form button[type="submit"]:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(33, 150, 154, 0.2);
    }

    mu-form button[type="submit"]:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba(33, 150, 154, 0.2), 0 4px 6px rgba(33, 150, 154, 0.2);
    }
  `;
}

