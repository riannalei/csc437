import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Traveler } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class TravelerViewElement extends View<Model, Msg> {
  @property({ attribute: "user-id" })
  userid?: string;

  constructor() {
    super("blazing:model");
  }

  get profile(): Traveler | undefined {
    return this.model?.profile;
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

  render() {
    const profile = this.profile;
    
    // Check if we have the right profile loaded
    if (!this.userid) {
      return html`
        <main class="traveler-view">
          <p>No user ID provided</p>
        </main>
      `;
    }
    
    if (!profile || profile.userid !== this.userid) {
      return html`
        <main class="traveler-view">
          <p>Loading profile for ${this.userid}...</p>
        </main>
      `;
    }

    return html`
      <main class="traveler-view">
        <header class="profile-header">
          ${profile.avatar
            ? html`<img src=${profile.avatar} alt=${profile.name} class="avatar" />`
            : html`<div class="avatar-placeholder">${profile.name.charAt(0)}</div>`}
          <div class="profile-info">
            <h1>${profile.name}</h1>
            ${profile.nickname ? html`<p class="nickname">${profile.nickname}</p>` : ""}
            <p class="home">📍 ${profile.home}</p>
          </div>
        </header>

        <section class="profile-details">
          <h2>Airports</h2>
          ${profile.airports && profile.airports.length > 0
            ? html`
                <ul class="airports-list">
                  ${profile.airports.map(
                    (airport) => html`<li>${airport}</li>`
                  )}
                </ul>
              `
            : html`<p>No airports listed</p>`}
        </section>
      </main>
    `;
  }

  static styles = css`
    .traveler-view {
      max-width: 800px;
      margin: var(--spacing-xxl) auto;
      padding: var(--spacing-xl);
    }
    .profile-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-xl);
      margin-bottom: var(--spacing-xxl);
      padding-bottom: var(--spacing-xl);
      border-bottom: 2px solid var(--color-border, #e5e7eb);
    }
    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--color-primary, #21969a);
    }
    .avatar-placeholder {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: var(--color-primary, #21969a);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: bold;
      border: 4px solid var(--color-primary-dark, #17696c);
    }
    .profile-info h1 {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: var(--font-size-3xl, 1.875rem);
    }
    .nickname {
      font-size: var(--font-size-xl, 1.25rem);
      color: var(--color-text-muted);
      margin: 0 0 var(--spacing-sm) 0;
    }
    .home {
      margin: 0;
      color: var(--color-text-muted);
    }
    .profile-details h2 {
      margin-bottom: var(--spacing-md);
    }
    .airports-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-md);
    }
    .airports-list li {
      background: var(--color-background-section, #f9fafb);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-md, 8px);
      border: 1px solid var(--color-border, #e5e7eb);
    }
  `;
}

