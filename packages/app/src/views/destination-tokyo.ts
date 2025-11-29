import { css, html, LitElement } from "lit";

export class DestinationTokyoView extends LitElement {
  render() {
    return html`
      <article class="destination">
        <section class="hero">
          <div>
            <p class="eyebrow">Destination Spotlight</p>
            <h1>Tokyo, Japan</h1>
            <p>
              Neon nightlife, tranquil temples, and unforgettable food tucked
              into one perfect stopover. Here’s a curated 48-hour plan to fall in
              love with the city.
            </p>
          </div>
          <img src="/images/destinations/tokyo-skyline.jpg" alt="Tokyo skyline" />
        </section>

        <section class="itinerary">
          <h2>Featured Itinerary</h2>
          <ol>
            <li>
              <strong>Morning</strong>
              <span>Sensō-ji Temple stroll + matcha at Nakamise-dori</span>
            </li>
            <li>
              <strong>Afternoon</strong>
              <span>Tsukiji outer market tasting tour + Ginza boutiques</span>
            </li>
            <li>
              <strong>Evening</strong>
              <span>Shibuya Sky sunset, then omakase at Sushi Noguchi</span>
            </li>
          </ol>
        </section>

        <section class="highlights">
          <div>
            <h3>Stay</h3>
            <p>Shinjuku Ryokan · Park Hyatt Tokyo · Muji Hotel Ginza</p>
          </div>
          <div>
            <h3>Bite</h3>
            <p>Ichiran Ramen · TeamLab Planets café · Tsujiri parfaits</p>
          </div>
          <div>
            <h3>Move</h3>
            <p>JR Pass · Suica IC card · Airport Limousine Bus</p>
          </div>
        </section>

        <a class="back-link" href="/app">← Back to dashboard</a>
      </article>
    `;
  }

  static styles = css`
    :host,
    article {
      display: block;
    }

    .destination {
      max-width: 960px;
      margin: var(--spacing-xxl, 3rem) auto;
      padding: var(--spacing-xxl, 3rem);
      background: var(--color-background-section, #fff);
      border-radius: 24px;
      box-shadow: 0 25px 50px rgba(15, 23, 42, 0.1);
      border: 1px solid rgba(15, 23, 42, 0.08);
    }

    .hero {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-xl, 2rem);
      align-items: center;
      margin-bottom: var(--spacing-xxl, 3rem);
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 0.75rem;
      color: var(--color-primary, #21969a);
      margin: 0 0 var(--spacing-sm, 0.5rem);
    }

    h1 {
      margin: 0 0 var(--spacing-md, 1rem);
      font-size: clamp(2rem, 4vw, 3rem);
      font-family: var(--font-family-heading, "Playfair Display", serif);
    }

    .hero img {
      width: 100%;
      border-radius: 20px;
      object-fit: cover;
      max-height: 320px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .itinerary {
      background: linear-gradient(135deg, #fef7f1, #f2fbfb);
      border-radius: 20px;
      padding: var(--spacing-xl, 2rem);
      margin-bottom: var(--spacing-xxl, 3rem);
    }

    .itinerary h2 {
      margin-top: 0;
      font-size: 1.5rem;
    }

    .itinerary ol {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: var(--spacing-lg, 1.5rem);
    }

    .itinerary li {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs, 0.25rem);
    }

    .highlights {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--spacing-lg, 1.5rem);
      margin-bottom: var(--spacing-xl, 2rem);
    }

    .highlights div {
      background: var(--color-background-section, #fff);
      border-radius: 16px;
      padding: var(--spacing-lg, 1.5rem);
      border: 1px solid rgba(15, 23, 42, 0.08);
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
    }

    .back-link {
      text-decoration: none;
      color: var(--color-primary, #21969a);
      font-weight: 600;
    }

    :host-context(.dark-mode) .destination {
      background: #111827;
      border-color: rgba(255, 255, 255, 0.08);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
    }

    :host-context(.dark-mode) .itinerary {
      background: linear-gradient(135deg, #1f2937, #0f172a);
    }

    :host-context(.dark-mode) .highlights div {
      background: #1f2a37;
      border-color: rgba(255, 255, 255, 0.08);
    }
  `;
}

