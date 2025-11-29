import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import type { Trip } from "server/models";

import { findAuthToken } from "./trips-view";

export class TripViewElement extends LitElement {
  @property({ attribute: "trip-id" })
  tripId?: string;

  @state()
  private trip?: Trip;

  @state()
  private error: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (this.tripId) this.loadTrip();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("tripId") && this.tripId) {
      this.loadTrip();
    }
  }

  private async loadTrip() {
    const token = findAuthToken();
    if (!token || !this.tripId) return;
    try {
      const resp = await fetch(`/api/trips/${this.tripId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
      this.trip = (await resp.json()) as Trip;
      this.error = null;
    } catch (err) {
      console.error("Failed to load trip:", err);
      this.error = "Could not load this trip.";
      this.trip = undefined;
    }
  }

  private async deleteTrip() {
    if (!this.tripId || !confirm("Delete this trip?")) return;
    const token = findAuthToken();
    if (!token) return;
    try {
      const resp = await fetch(`/api/trips/${this.tripId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!resp.ok && resp.status !== 204)
        throw new Error(`${resp.status} ${resp.statusText}`);
      window.location.href = "/app";
    } catch (err) {
      console.error("Failed to delete trip:", err);
      this.error = "Could not delete this trip.";
    }
  }

  render() {
    if (this.error) {
      return html`<main class="trip-view"><p class="error">${this.error}</p></main>`;
    }

    if (!this.trip) {
      return html`<main class="trip-view"><p>Loading trip...</p></main>`;
    }

    const trip = this.trip;
    const itinerary = Array.isArray(trip.itinerary)
      ? trip.itinerary
      : [];

    return html`
      <main class="trip-view">
        <a class="back-link" href="/app">← Back to trips</a>
        <section class="trip-card">
          <header class="trip-header">
            <div>
              <p class="eyebrow">Trip</p>
              <h1>${trip.destination}</h1>
              <p class="dates">
                ${trip.startDate || "Anytime"}
                ${trip.endDate ? ` → ${trip.endDate}` : ""}
              </p>
            </div>
            <div class="header-actions">
              <a
                class="button secondary"
                href="/app/trip/${trip._id}/edit"
                >Edit trip</a
              >
              <button class="button danger" @click=${this.deleteTrip}>
                Delete
              </button>
            </div>
          </header>

          ${trip.notes
            ? html`
                <section class="trip-notes">
                  <h2>Notes</h2>
                  <p>${trip.notes}</p>
                </section>
              `
            : null}

          <section class="itinerary-panel">
            <h2>Itinerary</h2>
            ${itinerary.length
              ? html`
                  <ol class="day-list">
                    ${itinerary.map(
                      (day, index) => html`
                        <li class="day">
                          <h3>
                            Day ${index + 1}
                            ${day.label ? html`– ${day.label}` : ""}
                          </h3>
                          ${(day.items || []).length
                            ? html`
                                <ul class="timeline">
                                  ${(day.items || []).map(
                                    (item) => html`
                                      <li>
                                        <span class="time"
                                          >${item.time || ""}</span
                                        >
                                        <div class="details">
                                          <div class="title">${item.title}</div>
                                          ${item.notes
                                            ? html`
                                                <div class="notes">
                                                  ${item.notes}
                                                </div>
                                              `
                                            : null}
                                        </div>
                                      </li>
                                    `
                                  )}
                                </ul>
                              `
                            : html`<p class="muted">
                                No items yet for this day.
                              </p>`}
                        </li>
                      `
                    )}
                  </ol>
                `
              : html`<p class="muted">
                  No itinerary yet. Use the edit page to build a day-by-day
                  schedule.
                </p>`}
          </section>
        </section>
      </main>
    `;
  }

  static styles = css`
    .trip-view {
      max-width: 1000px;
      margin: var(--spacing-xxl, 3rem) auto var(--spacing-4xl, 4rem);
      padding: var(--spacing-xl, 2rem);
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: var(--spacing-lg, 1.5rem);
      text-decoration: none;
      color: var(--color-primary, #21969a);
      font-weight: 600;
    }
    .trip-card {
      background: white;
      border-radius: 32px;
      padding: var(--spacing-xxl, 3rem);
      box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
      border: 1px solid rgba(15, 23, 42, 0.08);
    }
    .trip-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--spacing-xl, 2rem);
      margin-bottom: var(--spacing-xxl, 3rem);
    }
    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.3em;
      font-size: 0.75rem;
      color: var(--color-primary, #21969a);
      margin: 0 0 0.5rem;
    }
    .dates {
      margin: 0.25rem 0 0;
      color: var(--color-text-muted, #6b7280);
      font-weight: 500;
    }
    .header-actions {
      display: flex;
      gap: var(--spacing-md, 1rem);
      flex-wrap: wrap;
    }
    .button {
      padding: 0.6rem 1.4rem;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .button.secondary {
      background: white;
      color: var(--color-primary, #21969a);
      border: 2px solid var(--color-primary, #21969a);
    }
    .button.danger {
      background: #fee2e2;
      color: #b91c1c;
      border: 2px solid #fecaca;
    }
    .trip-notes {
      margin: 0 0 var(--spacing-xl, 2rem);
      padding-bottom: var(--spacing-xl, 2rem);
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    }
    .trip-notes h2 {
      margin: 0 0 0.5rem;
    }
    .itinerary-panel h2 {
      margin: 0 0 1rem;
    }
    .muted {
      color: var(--color-text-muted, #94a3b8);
    }
    .day-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .day h3 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
    }
    .timeline {
      list-style: none;
      padding: 0;
      margin: 0;
      border-left: 2px solid rgba(148, 163, 184, 0.4);
    }
    .timeline li {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 0.75rem;
      padding: 0.5rem 0 0.5rem 1rem;
      position: relative;
    }
    .timeline li::before {
      content: "";
      position: absolute;
      left: -5px;
      top: 1.05rem;
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: var(--color-primary, #21969a);
    }
    .time {
      font-weight: 600;
      color: var(--color-text-muted, #6b7280);
      font-size: 0.85rem;
    }
    .details .title {
      font-weight: 600;
      margin-bottom: 0.1rem;
    }
    .details .notes {
      font-size: 0.9rem;
      color: var(--color-text-muted, #6b7280);
    }
    .error {
      color: #b91c1c;
    }
    :host-context(.dark-mode) .trip-card {
      background: #111827;
      border-color: rgba(255, 255, 255, 0.08);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
    }
    :host-context(.dark-mode) .trip-notes h2,
    :host-context(.dark-mode) .itinerary-panel h2,
    :host-context(.dark-mode) .day h3 {
      color: #f9fafb;
    }
    :host-context(.dark-mode) .muted,
    :host-context(.dark-mode) .dates,
    :host-context(.dark-mode) .time,
    :host-context(.dark-mode) .details .notes {
      color: #9ca3ff;
    }
  `;
}


