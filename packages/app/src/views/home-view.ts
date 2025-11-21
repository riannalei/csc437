import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
  render() {
    return html`
      <main>
        <section aria-labelledby="destinations">
          <h2 id="destinations">
            <svg class="icon">
              <use href="/icons/travel.svg#icon-location" />
            </svg>
            Destinations
          </h2>
          <ul>
            <li><a href="/app/destination/tokyo">Tokyo</a></li>
          </ul>
        </section>

        <section aria-labelledby="flights">
          <h2 id="flights">
            <svg class="icon">
              <use href="/icons/travel.svg#icon-plane" />
            </svg>
            Flights
          </h2>
          <ul>
            <li><a href="/app/flight/ana-united-nyc-nrt-2025-12-20">NYC → NRT (codeshare)</a></li>
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
          </ul>
        </section>
      </main>

      <div class="grid-container">
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

      <footer>
        <small>© 2025 Travel Planner</small>
      </footer>
    `;
  }

  static styles = css`
    main {
      padding-top: var(--spacing-xxl, 3rem);
      max-width: 1200px;
      margin: 0 auto;
      padding-left: var(--spacing-lg);
      padding-right: var(--spacing-lg);
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-xl);
      max-width: 1200px;
      margin: var(--spacing-xxl) auto;
      padding: 0 var(--spacing-lg);
    }
    section {
      margin-bottom: var(--spacing-xl);
    }
    h2 {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }
    .icon {
      width: 24px;
      height: 24px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin-bottom: var(--spacing-sm);
    }
    a {
      color: var(--color-primary);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    footer {
      text-align: center;
      padding: var(--spacing-xl);
      margin-top: var(--spacing-xxl);
    }
  `;
}

