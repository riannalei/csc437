import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
  render() {
    return html`
      <main>
        <div class="card-grid">
          <section aria-labelledby="destinations">
            <h2 id="destinations">
              <svg class="icon">
                <use href="/icons/travel.svg#icon-location" />
              </svg>
              Destinations
            </h2>
            <ul>
              <li><a href="/app/destination/tokyo">Tokyo</a></li>
              <li><a href="/app/destination/osaka">Osaka</a></li>
            </ul>
          </section>

          <section aria-labelledby="traveler">
            <h2 id="traveler">
              <svg class="icon">
                <use href="/icons/travel.svg#icon-traveler" />
              </svg>
              Traveler
            </h2>
            <ul>
              <li><a href="/app/traveler/rianna">Rianna</a></li>
              <li><a href="/app/traveler/dog">Dog</a></li>
            </ul>
          </section>

          <section aria-labelledby="airlines">
            <h2 id="airlines">
              <svg class="icon">
                <use href="/icons/travel.svg#icon-plane" />
              </svg>
              Airlines
            </h2>
            <ul>
              <li><a href="/app/airline/ana">All Nippon Airways (ANA)</a></li>
              <li><a href="/app/airline/united">United Airlines</a></li>
            </ul>
          </section>

          <section aria-labelledby="stays">
            <h2 id="stays">
              <svg class="icon">
                <use href="/icons/travel.svg#icon-bed" />
              </svg>
              Accommodations
            </h2>
            <ul>
              <li><a href="/app/accommodation/shinjuku-ryokan">Shinjuku Ryokan (Tokyo)</a></li>
              <li><a href="/app/accommodation/kyoto-inn">Kyoto Inn</a></li>
            </ul>
          </section>

          <section aria-labelledby="things">
            <h2 id="things">
              <svg class="icon">
                <use href="/icons/travel.svg#icon-activity" />
              </svg>
              Activities
            </h2>
            <ul>
              <li><a href="/app/activity/tsukiji-food-tour">Tsukiji Food Tour</a></li>
              <li><a href="/app/activity/fushimi-inari-hike">Fushimi Inari Hike</a></li>
            </ul>
          </section>

          <section aria-labelledby="money">
            <h2 id="money">
              <svg class="icon">
                <use href="/icons/travel.svg#icon-wallet" />
              </svg>
              Finance
            </h2>
            <ul>
              <li><a href="/app/finance/credit-card-rewards">Credit Card / Rewards</a></li>
              <li><a href="/app/finance/budget">Budget</a></li>
            </ul>
          </section>
        </div>
      </main>

      <footer>
        <small>© 2025 Travel Planner</small>
      </footer>
    `;
  }

  static styles = css`
    main {
      padding-top: var(--spacing-xxl, 3rem);
      max-width: 1100px;
      margin: 0 auto;
      padding-left: var(--spacing-xl, 2rem);
      padding-right: var(--spacing-xl, 2rem);
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--spacing-xl, 2rem);
      margin: 0 auto var(--spacing-xxl, 3rem);
      justify-items: stretch;
    }
    section {
      background: white;
      padding: var(--spacing-lg, 1.5rem);
      border-radius: 20px;
      box-shadow: 0 15px 30px rgba(17, 24, 39, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      margin-bottom: 0;
      border: 1px solid rgba(15, 23, 42, 0.05);
    }
    section:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 35px rgba(15, 23, 42, 0.12);
    }
    .card-grid section {
      margin-bottom: 0;
    }
    h2 {
      display: flex;
      align-items: center;
      gap: var(--spacing-md, 1rem);
      margin: 0 0 var(--spacing-lg, 1.5rem) 0;
      font-size: var(--font-size-xl, 1.25rem);
      font-weight: 700;
      color: var(--color-text, #1f2937);
      letter-spacing: -0.01em;
    }
    .icon {
      width: 28px;
      height: 28px;
      color: var(--color-primary, #21969a);
      flex-shrink: 0;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      margin-bottom: var(--spacing-md, 1rem);
    }
    li:last-child {
      margin-bottom: 0;
    }
    a {
      color: var(--color-primary, #21969a);
      text-decoration: none;
      font-weight: 500;
      font-size: var(--font-size-base, 1rem);
      transition: all 0.2s ease;
      display: inline-block;
      padding: var(--spacing-xs, 0.25rem) 0;
    }
    a:hover {
      color: var(--color-primary-dark, #17696c);
      transform: translateX(4px);
    }
    :host-context(.dark-mode) .card-grid section {
      background: #1f2933;
      border-color: rgba(148, 163, 184, 0.2);
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.4);
    }
    :host-context(.dark-mode) h2 {
      color: #f8fafc;
    }
    :host-context(.dark-mode) li {
      color: #cbd5f5;
    }
    :host-context(.dark-mode) a {
      color: #5fd4d7;
    }
    :host-context(.dark-mode) a:hover {
      color: #9ff1f3;
    }
    footer {
      text-align: center;
      padding: var(--spacing-xl, 2rem);
      margin: var(--spacing-xl, 2rem) auto var(--spacing-xxl, 3rem);
      max-width: 960px;
      color: var(--color-text-muted, #6b7280);
      font-size: var(--font-size-sm, 0.875rem);
    }
  `;
}

