import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.js";

export class TravelSectionElement extends LitElement {
  @property()
  icon?: string;

  @property()
  sectionTitle?: string;

  @property({ attribute: "section-id" })
  sectionId?: string;

  override render() {
    return html`
      <section aria-labelledby="${this.sectionId}">
        <h2 id="${this.sectionId}">
          <svg class="icon">
            <use href="/icons/travel.svg#icon-${this.icon}" />
          </svg>
          ${this.sectionTitle}
        </h2>
        <slot></slot>
      </section>
    `;
  }

  static styles = [
    reset.styles,
    css`
    section {
      background-color: var(--color-background-section);
      margin-bottom: var(--spacing-lg);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-md);
      border: var(--border-width) solid var(--color-border);
    }

    h2 {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      color: var(--color-primary);
      margin-top: 0;
      margin-bottom: var(--spacing-md);
      border-bottom: var(--border-width-thick) solid var(--color-border-accent);
      padding-bottom: var(--spacing-sm);
    }

    svg.icon {
      display: inline;
      height: 1.5em;
      width: 1.5em;
      vertical-align: middle;
      fill: currentColor;
      margin-right: var(--spacing-xs);
    }

    ul {
      list-style-type: none;
      padding-left: 0;
    }

    ul li {
      padding: var(--spacing-sm) 0;
      border-bottom: var(--border-width) solid var(--color-neutral-200);
    }

    ul li:last-child {
      border-bottom: none;
    }

    ul li a {
      display: block;
      padding: var(--spacing-sm);
      text-decoration: none;
      border-radius: var(--border-radius-sm);
      transition: background-color 0.2s ease;
      color: var(--color-link);
    }

    ul li a:hover {
      background-color: var(--color-neutral-200);
      color: var(--color-link-hover);
    }
  `];
}
