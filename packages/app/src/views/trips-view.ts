import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import type { Trip } from "server/models";

export function findAuthToken(): string | null {
  const keys = [
    "blazing:auth",
    "blazing:auth:token",
    "auth:token",
    "token"
  ];

  for (const key of keys) {
    const v = localStorage.getItem(key);
    if (v && v.startsWith("eyJ")) return v;
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes("auth")) {
      const v = localStorage.getItem(key);
      if (v && v.startsWith("eyJ")) return v;
    }
  }
  return null;
}

export class TripsViewElement extends LitElement {
  @state()
  private trips: Trip[] = [];

  @state()
  private error: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadTrips();
  }

  private async loadTrips() {
    const token = findAuthToken();
    if (!token) {
      this.error = "Sign in to see and manage your trips.";
      this.trips = [];
      return;
    }
    try {
      const resp = await fetch("/api/trips", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      this.trips = (await resp.json()) as Trip[];
      this.error = null;
    } catch (err) {
      console.error("Failed to load trips:", err);
      this.error =
        "Could not load your trips. Is the server running and are you signed in?";
      this.trips = [];
    }
  }

  render() {
    const hasTrips = this.trips.length > 0;
    return html`
      <main class="trips-view">
        <header class="trips-header">
          <div>
            <h1>My Trips</h1>
            <p>Plan destinations and activities for your travels.</p>
          </div>
          <a class="add-trip" href="/app/trip/new">Add a trip</a>
        </header>

        ${this.error
          ? html`<p class="error">${this.error}</p>`
          : hasTrips
            ? html`
                <ul class="trip-list">
                  ${this.trips.map(
                    (trip) => html`
                      <li>
                        <a href="/app/trip/${trip._id}">
                          <h2>${trip.destination}</h2>
                          <p class="dates">
                            ${trip.startDate || "Anytime"}
                            ${trip.endDate ? ` → ${trip.endDate}` : ""}
                          </p>
                          ${Array.isArray(trip.itinerary) &&
                          trip.itinerary.length
                            ? html`<p class="activities">
                                ${trip.itinerary.length} planned
                                day${trip.itinerary.length === 1 ? "" : "s"}
                              </p>`
                            : html`<p class="activities muted">
                                No itinerary yet — click to add one.
                              </p>`}
                        </a>
                      </li>
                    `
                  )}
                </ul>
              `
            : html`
                <section class="empty">
                  <h2>No trips yet</h2>
                  <p>
                    Start by creating a trip for your next destination and add
                    activities you care about.
                  </p>
                  <a class="add-trip primary" href="/app/trip/new"
                    >Create your first trip</a
                  >
                </section>
              `}
      </main>
    `;
  }

  static styles = css`
    .trips-view {
      max-width: 1000px;
      margin: var(--spacing-xxl, 3rem) auto var(--spacing-4xl, 4rem);
      padding: var(--spacing-xl, 2rem);
    }
    .trips-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xxl, 3rem);
      gap: var(--spacing-lg, 1.5rem);
    }
    .trips-header h1 {
      margin: 0;
      font-size: var(--font-size-3xl, 1.875rem);
    }
    .trips-header p {
      margin: 0.25rem 0 0;
      color: var(--color-text-muted, #6b7280);
    }
    .add-trip {
      padding: 0.6rem 1.5rem;
      border-radius: 999px;
      border: 2px solid var(--color-primary, #21969a);
      color: var(--color-primary, #21969a);
      text-decoration: none;
      font-weight: 600;
      background: white;
      box-shadow: 0 4px 10px rgba(33, 150, 154, 0.15);
    }
    .add-trip.primary {
      background: linear-gradient(
        135deg,
        var(--color-primary, #21969a),
        var(--color-primary-dark, #17696c)
      );
      color: white;
      border-color: transparent;
    }
    .trip-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--spacing-xl, 2rem);
    }
    .trip-list li a {
      display: block;
      background: white;
      border-radius: 24px;
      padding: var(--spacing-xl, 2rem);
      text-decoration: none;
      color: inherit;
      box-shadow: 0 15px 30px rgba(15, 23, 42, 0.1);
      border: 1px solid rgba(15, 23, 42, 0.06);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .trip-list li a:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 35px rgba(15, 23, 42, 0.15);
    }
    .trip-list h2 {
      margin: 0 0 0.5rem;
    }
    .dates {
      margin: 0 0 0.25rem;
      font-weight: 500;
      color: var(--color-text-muted, #6b7280);
    }
    .activities {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 500;
    }
    .activities.muted {
      color: var(--color-text-muted, #94a3b8);
    }
    .empty {
      margin-top: var(--spacing-xxl, 3rem);
      text-align: center;
      padding: var(--spacing-xxl, 3rem);
      border-radius: 24px;
      background: white;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
      border: 1px solid rgba(15, 23, 42, 0.06);
    }
    .error {
      color: #b91c1c;
      margin-bottom: var(--spacing-xl, 2rem);
    }
    :host-context(.dark-mode) .trips-header p {
      color: #cbd5f5;
    }
    :host-context(.dark-mode) .trip-list li a,
    :host-context(.dark-mode) .empty {
      background: #111827;
      border-color: rgba(255, 255, 255, 0.08);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
      color: #f9fafb;
    }
    :host-context(.dark-mode) .dates,
    :host-context(.dark-mode) .activities.muted {
      color: #9ca3ff;
    }
  `;
}


