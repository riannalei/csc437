import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.js";

// TypeScript interfaces for our data
interface SectionItem {
  text: string;
  href: string;
}

interface Section {
  icon: string;
  sectionTitle: string;
  sectionId: string;
  items: SectionItem[];
}

interface SectionsData {
  mainSections: Section[];
  gridSections: Section[];
}

export class TravelPlannerElement extends LitElement {
  @property()
  src?: string;

  @state()
  mainSections: Section[] = [];

  @state()
  gridSections: Section[] = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      this.hydrate(this.src);
    }
  }

  async hydrate(src: string) {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      
      if (json) {
        const data = json as SectionsData;
        this.mainSections = data.mainSections || [];
        this.gridSections = data.gridSections || [];
      }
    } catch (error) {
      console.error('Failed to load sections data:', error);
    }
  }

  renderSection(section: Section) {
    return html`
      <travel-section
        icon="${section.icon}"
        section-title="${section.sectionTitle}"
        section-id="${section.sectionId}"
      >
        <ul>
          ${section.items.map(item => html`
            <li><a href="${item.href}">${item.text}</a></li>
          `)}
        </ul>
      </travel-section>
    `;
  }

  override render() {
    return html`
      <main>
        ${this.mainSections.map(section => this.renderSection(section))}
      </main>
      
      <div class="grid-container">
        ${this.gridSections.map(section => this.renderSection(section))}
      </div>
    `;
  }

  static styles = [
    reset.styles,
    css`
      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--spacing-xl) var(--spacing-lg);
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-lg);
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--spacing-xl) var(--spacing-lg);
      }

      /* Mobile: Single column */
      @media (max-width: 640px) {
        main,
        .grid-container {
          padding: var(--spacing-md);
        }
        
        .grid-container {
          grid-template-columns: 1fr;
          gap: var(--spacing-md);
        }
      }

      /* Tablet: Two columns */
      @media (min-width: 641px) and (max-width: 1024px) {
        .grid-container {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-md);
        }
      }
    `
  ];
}
