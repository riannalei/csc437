import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import type { Trip } from "server/models";
import { findAuthToken } from "./trips-view";

export class TripEditElement extends LitElement {
  @property({ attribute: "trip-id" })
  tripId?: string;

  @state()
  private trip: Partial<Trip> = {};

  @state()
  private error: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (this.tripId) {
      this.loadTrip();
    }
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
      this.error = "Could not load this trip for editing.";
    }
  }

  private updateField(
    e: Event,
    field: keyof Trip
  ) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.trip = { ...this.trip, [field]: target.value };
  }

  private updateActivities(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value || "";
    const activities = value
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    this.trip = { ...this.trip, activities };
  }

  private activitiesText(): string {
    if (Array.isArray(this.trip.activities)) {
      return this.trip.activities.join("\n");
    }
    return "";
  }

  private ensureItinerary() {
    if (!Array.isArray(this.trip.itinerary)) {
      this.trip = { ...this.trip, itinerary: [] };
    }
  }

  private addDay() {
    this.ensureItinerary();
    const current = Array.isArray(this.trip.itinerary)
      ? this.trip.itinerary
      : [];
    const next = [...current, { label: "", items: [] }];
    this.trip = { ...this.trip, itinerary: next };
  }

  private removeDay(index: number) {
    if (!Array.isArray(this.trip.itinerary)) return;
    const next = this.trip.itinerary.slice();
    next.splice(index, 1);
    this.trip = { ...this.trip, itinerary: next };
  }

  private addItem(dayIndex: number) {
    this.ensureItinerary();
    if (!Array.isArray(this.trip.itinerary)) return;
    const days = this.trip.itinerary.map((d, i) =>
      i === dayIndex
        ? {
            ...d,
            items: [
              ...(d.items || []),
              { time: "", title: "", notes: "" }
            ]
          }
        : d
    );
    this.trip = { ...this.trip, itinerary: days };
  }

  private updateItem(
    dayIndex: number,
    itemIndex: number,
    field: "time" | "title" | "notes",
    value: string
  ) {
    if (!Array.isArray(this.trip.itinerary)) return;
    const days = this.trip.itinerary.map((d, di) => {
      if (di !== dayIndex) return d;
      const items = (d.items || []).map((it, ii) =>
        ii === itemIndex ? { ...it, [field]: value } : it
      );
      return { ...d, items };
    });
    this.trip = { ...this.trip, itinerary: days };
  }

  private removeItem(dayIndex: number, itemIndex: number) {
    if (!Array.isArray(this.trip.itinerary)) return;
    const days = this.trip.itinerary.map((d, di) => {
      if (di !== dayIndex) return d;
      const items = (d.items || []).slice();
      items.splice(itemIndex, 1);
      return { ...d, items };
    });
    this.trip = { ...this.trip, itinerary: days };
  }

  private updateDayLabel(dayIndex: number, value: string) {
    if (!Array.isArray(this.trip.itinerary)) return;
    const days = this.trip.itinerary.map((d, di) =>
      di === dayIndex ? { ...d, label: value } : d
    );
    this.trip = { ...this.trip, itinerary: days };
  }

  private async saveTrip(e: Event) {
    e.preventDefault();
    const token = findAuthToken();
    if (!token) {
      this.error = "You must be signed in to save trips.";
      return;
    }
    const body: Partial<Trip> = {
      destination: this.trip.destination || "",
      startDate: this.trip.startDate,
      endDate: this.trip.endDate,
      notes: this.trip.notes,
      activities: Array.isArray(this.trip.activities)
        ? this.trip.activities
        : [],
      itinerary: this.trip.itinerary || []
    };
    const isNew = !this.tripId;
    const url = isNew ? "/api/trips" : `/api/trips/${this.tripId}`;
    const method = isNew ? "POST" : "PUT";
    try {
      const resp = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
      const saved = (await resp.json()) as Trip;
      window.location.href = `/app/trip/${saved._id}`;
    } catch (err) {
      console.error("Failed to save trip:", err);
      this.error = "Could not save this trip.";
    }
  }

  render() {
    const isNew = !this.tripId;
    return html`
      <main class="trip-edit">
        <header class="edit-header">
          <h1>${isNew ? "Add trip" : "Edit trip"}</h1>
          <a href=${isNew ? "/app" : `/app/trip/${this.tripId}`} class="cancel"
            >Cancel</a
          >
        </header>

        ${this.error ? html`<p class="error">${this.error}</p>` : null}

        <form @submit=${this.saveTrip} class="edit-form">
          <label>
            <span>Destination</span>
            <input
              required
              placeholder="e.g. Tokyo, Kyoto, Paris"
              .value=${this.trip.destination || ""}
              @input=${(e: Event) => this.updateField(e, "destination")}
            />
          </label>

          <label>
            <span>Start date</span>
            <input
              type="date"
              .value=${this.trip.startDate || ""}
              @input=${(e: Event) => this.updateField(e, "startDate")}
            />
          </label>

          <label>
            <span>End date</span>
            <input
              type="date"
              .value=${this.trip.endDate || ""}
              @input=${(e: Event) => this.updateField(e, "endDate")}
            />
          </label>

          <label class="full">
            <span>Notes</span>
            <textarea
              rows="4"
              placeholder="Trip goals, lodging info, anything you want to remember."
              .value=${this.trip.notes || ""}
              @input=${(e: Event) => this.updateField(e, "notes")}
            ></textarea>
          </label>

          <section class="full itinerary">
            <header class="itinerary-header">
              <h2>Itinerary</h2>
              <button
                type="button"
                class="add-day"
                @click=${() => this.addDay()}
              >
                Add day
              </button>
            </header>

            ${Array.isArray(this.trip.itinerary) &&
            this.trip.itinerary.length
              ? this.trip.itinerary.map(
                  (day, dayIndex) => html`
                    <div class="day">
                      <div class="day-header">
                        <input
                          class="day-label"
                          placeholder="Day ${dayIndex + 1} – title"
                          .value=${day.label || ""}
                          @input=${(e: Event) =>
                            this.updateDayLabel(
                              dayIndex,
                              (e.target as HTMLInputElement).value
                            )}
                        />
                        <button
                          type="button"
                          class="remove-day"
                          @click=${() => this.removeDay(dayIndex)}
                        >
                          ×
                        </button>
                      </div>

                      <div class="items">
                        ${(day.items || []).map(
                          (item, itemIndex) => html`
                            <div class="item-row">
                              <input
                                class="time"
                                placeholder="09:00"
                                .value=${item.time || ""}
                                @input=${(e: Event) =>
                                  this.updateItem(
                                    dayIndex,
                                    itemIndex,
                                    "time",
                                    (e.target as HTMLInputElement).value
                                  )}
                              />
                              <input
                                class="title"
                                placeholder="Activity"
                                .value=${item.title || ""}
                                @input=${(e: Event) =>
                                  this.updateItem(
                                    dayIndex,
                                    itemIndex,
                                    "title",
                                    (e.target as HTMLInputElement).value
                                  )}
                              />
                              <textarea
                                class="notes"
                                rows="2"
                                placeholder="Notes"
                                .value=${item.notes || ""}
                                @input=${(e: Event) =>
                                  this.updateItem(
                                    dayIndex,
                                    itemIndex,
                                    "notes",
                                    (e.target as HTMLTextAreaElement).value
                                  )}
                              ></textarea>
                              <button
                                type="button"
                                class="remove-item"
                                @click=${() =>
                                  this.removeItem(dayIndex, itemIndex)}
                              >
                                ×
                              </button>
                            </div>
                          `
                        )}
                        <button
                          type="button"
                          class="add-item"
                          @click=${() => this.addItem(dayIndex)}
                        >
                          Add item
                        </button>
                      </div>
                    </div>
                  `
                )
              : html`<p class="itinerary-empty">
                  No days yet. Click “Add day” to start building your schedule.
                </p>`}
          </section>

          <button type="submit" class="save-button">
            ${isNew ? "Create trip" : "Save changes"}
          </button>
        </form>
      </main>
    `;
  }

  static styles = css`
    .trip-edit {
      max-width: 1000px;
      margin: var(--spacing-xxl, 3rem) auto var(--spacing-4xl, 4rem);
      padding: var(--spacing-xl, 2rem);
    }
    .edit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xxl, 3rem);
    }
    .cancel {
      color: var(--color-text-muted, #6b7280);
      text-decoration: none;
      font-weight: 500;
    }
    .error {
      color: #b91c1c;
      margin-bottom: var(--spacing-lg, 1.5rem);
    }
    .edit-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl, 2rem);
      background: white;
      padding: var(--spacing-xxl, 3rem);
      border-radius: 32px;
      box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
      border: 1px solid rgba(15, 23, 42, 0.08);
    }
    label {
      display: block;
      width: 100%;
    }
    label.full {
      width: 100%;
    }
    label span {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-muted, #6b7280);
    }
    input,
    textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      border: 2px solid var(--color-border, #e5e7eb);
      font-size: 1rem;
      box-sizing: border-box;
    }
    textarea {
      resize: vertical;
      min-height: 120px;
    }
    .save-button {
      align-self: flex-end;
      padding: 0.9rem 2.2rem;
      border-radius: 999px;
      border: none;
      background: linear-gradient(
        135deg,
        var(--color-primary, #21969a),
        var(--color-primary-dark, #17696c)
      );
      color: white;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 6px 14px rgba(33, 150, 154, 0.3);
    }
    .itinerary {
      border-top: 1px solid var(--color-border, #e5e7eb);
      padding-top: var(--spacing-xl, 2rem);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md, 1rem);
      width: 100%;
      align-items: stretch;
    }
    .itinerary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg, 1.5rem);
    }
    .itinerary-header h2 {
      margin: 0;
      font-size: 1.1rem;
    }
    .add-day,
    .add-item,
    .remove-day,
    .remove-item {
      border: none;
      border-radius: 999px;
      padding: 0.4rem 0.9rem;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .add-day,
    .add-item {
      background: rgba(33, 150, 154, 0.08);
      color: var(--color-primary, #21969a);
    }
    .remove-day,
    .remove-item {
      background: transparent;
      color: #9ca3af;
    }
    .day {
      width: 100%;
      border-radius: 1rem;
      border: 1px solid var(--color-border, #e5e7eb);
      padding: var(--spacing-md, 1rem);
      background: #f9fafb;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-self: stretch;
      box-sizing: border-box;
    }
    .day-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .day-label {
      flex: 1;
      width: 100%;
    }
    .items {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .item-row {
      display: grid;
      grid-template-columns: minmax(90px, 110px) minmax(0, 2fr) minmax(0, 3fr) auto;
      gap: 0.5rem;
      align-items: center;
      width: 100%;
    }
    .item-row .time {
      max-width: 120px;
      width: 100%;
    }
    .item-row .title,
    .item-row .notes {
      width: 100%;
    }
    .itinerary-empty {
      margin: 0;
      color: var(--color-text-muted, #94a3b8);
    }
    :host-context(.dark-mode) .edit-form {
      background: #111827;
      border-color: rgba(255, 255, 255, 0.08);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
    }
    :host-context(.dark-mode) label span,
    :host-context(.dark-mode) .itinerary-header h2 {
      color: #cbd5f5;
    }
    :host-context(.dark-mode) input,
    :host-context(.dark-mode) textarea {
      background: #020617;
      border-color: rgba(148, 163, 184, 0.4);
      color: #e5e7eb;
    }
    :host-context(.dark-mode) .day {
      background: #020617;
      border-color: rgba(148, 163, 184, 0.4);
    }
  `;
}


