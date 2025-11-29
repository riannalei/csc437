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
        <a class="back-link" href="/app">← Back to dashboard</a>
        <section class="profile-card">
          <div class="hero">
            <div class="avatar-shell">
              ${profile.avatar
                ? html`<img src=${profile.avatar} alt=${profile.name} class="avatar" />`
                : html`<div class="avatar-placeholder">${profile.name.charAt(0)}</div>`}
            </div>
            <div class="hero-content">
              <p class="eyebrow">Traveler profile</p>
              <h1>${profile.name}</h1>
              ${profile.nickname
                ? html`<p class="nickname">aka ${profile.nickname}</p>`
                : ""}
              <p class="home">📍 Home base: ${profile.home}</p>
              <div class="hero-actions">
                <span class="tag">${profile.airports?.length || 0} favorite airports</span>
                <a href="/app/traveler/${this.userid}/edit" class="edit-button">
                  Edit profile
                </a>
              </div>
            </div>
          </div>

          <div class="meta-grid">
            <article class="meta-card">
              <h2>About ${profile.name.split(" ")[0]}</h2>
              <dl>
                <dt>User ID</dt>
                <dd>${profile.userid}</dd>
                <dt>Nickname</dt>
                <dd>${profile.nickname || "—"}</dd>
                <dt>Home Base</dt>
                <dd>${profile.home}</dd>
              </dl>
            </article>

            <article class="meta-card">
              <h2>Frequent Airports</h2>
              ${profile.airports && profile.airports.length > 0
                ? html`
                    <div class="chip-list">
                      ${profile.airports.map(
                        (airport) => html`<span class="chip">${airport}</span>`
                      )}
                    </div>
                  `
                : html`<p class="empty">Add an airport from the edit page to keep track of hubs.</p>`}
            </article>
          </div>
        </section>
      </main>
    `;
  }

  static styles = css`
    .traveler-view {
      max-width: 1000px;
      margin: var(--spacing-xxl, 3rem) auto var(--spacing-4xl, 4rem);
      padding: var(--spacing-xl, 2rem);
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs, 0.25rem);
      margin-bottom: var(--spacing-lg, 1.5rem);
      text-decoration: none;
      color: var(--color-primary, #21969a);
      font-weight: 600;
    }
    .profile-card {
      background: var(--color-background-section, #fff);
      border-radius: 32px;
      padding: var(--spacing-xxl, 3rem);
      box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
      border: 1px solid rgba(15, 23, 42, 0.08);
    }
    .hero {
      display: grid;
      grid-template-columns: minmax(220px, 1fr) 2fr;
      gap: var(--spacing-xxl, 3rem);
      margin-bottom: var(--spacing-xxl, 3rem);
      align-items: center;
    }
    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-actions {
        justify-content: center;
      }
    }
    .avatar-shell {
      display: flex;
      justify-content: center;
    }
    .avatar {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--color-primary, #21969a);
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
    }
    .avatar-placeholder {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary, #21969a) 0%, var(--color-primary-dark, #17696c) 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      font-weight: bold;
      border: 4px solid var(--color-primary-dark, #17696c);
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
    }
    .hero-content h1 {
      margin: 0 0 var(--spacing-sm, 0.5rem) 0;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-text, #111827);
    }
    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.3em;
      font-size: 0.75rem;
      color: var(--color-primary, #21969a);
      margin: 0 0 var(--spacing-sm, 0.5rem);
    }
    .edit-button {
      padding: var(--spacing-md, 1rem) var(--spacing-xl, 2rem);
      background: linear-gradient(135deg, var(--color-primary, #21969a) 0%, var(--color-primary-dark, #17696c) 100%);
      color: white;
      text-decoration: none;
      border-radius: var(--border-radius-md, 8px);
      font-weight: 600;
      font-size: var(--font-size-sm, 0.875rem);
      transition: all 0.2s ease;
      white-space: nowrap;
      box-shadow: 0 4px 10px rgba(33, 150, 154, 0.3);
      letter-spacing: 0.01em;
    }
    .edit-button:hover {
      transform: translateY(-2px);
    }
    .nickname {
      font-size: var(--font-size-xl, 1.25rem);
      color: var(--color-text-muted, #6b7280);
      margin: 0 0 var(--spacing-sm, 0.5rem) 0;
      font-weight: 500;
    }
    .home {
      margin: 0;
      color: var(--color-text-muted, #6b7280);
      font-size: var(--font-size-base, 1rem);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 0.25rem);
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-md, 1rem);
      margin-top: var(--spacing-lg, 1.5rem);
      align-items: center;
    }
    .tag {
      background: rgba(33, 150, 154, 0.12);
      color: var(--color-primary, #21969a);
      padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
      border-radius: 999px;
      font-weight: 600;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--spacing-xl, 2rem);
    }
    .meta-card {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.7));
      border-radius: 24px;
      padding: var(--spacing-xl, 2rem);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 20px 35px rgba(15, 23, 42, 0.08);
      border: 1px solid rgba(15, 23, 42, 0.08);
    }
    .meta-card h2 {
      margin: 0 0 var(--spacing-lg, 1.5rem);
      font-size: var(--font-size-2xl, 1.5rem);
    }
    dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: var(--spacing-sm, 0.5rem) var(--spacing-lg, 1.5rem);
      margin: 0;
    }
    dt {
      font-weight: 600;
      color: var(--color-text-muted, #6b7280);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
    }
    dd {
      margin: 0;
      font-weight: 600;
      color: var(--color-text, #111827);
    }
    .chip-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm, 0.5rem);
    }
    .chip {
      padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
      border-radius: 999px;
      background: rgba(33, 150, 154, 0.15);
      color: var(--color-primary, #21969a);
      font-weight: 600;
      font-size: 0.9rem;
    }
    .empty {
      margin: 0;
      color: var(--color-text-muted, #94a3b8);
    }
    :host-context(.dark-mode) .profile-card,
    :host-context(.dark-mode) .meta-card {
      background: #111827;
      border-color: rgba(255, 255, 255, 0.05);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
    }
    :host-context(.dark-mode) .hero-content h1,
    :host-context(.dark-mode) dd {
      color: #f8fafc;
    }
    :host-context(.dark-mode) .home {
      color: #cbd5f5;
    }
    :host-context(.dark-mode) .meta-card {
      background: #172033;
      border-color: rgba(255, 255, 255, 0.08);
    }
  `;
}

