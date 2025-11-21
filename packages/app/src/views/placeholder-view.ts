import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class PlaceholderViewElement extends LitElement {
  @property()
  type?: string;

  @property({ attribute: "item-id" })
  itemId?: string;

  render() {
    return html`
      <main class="placeholder-view">
        <h1>${this.type ? this.type.charAt(0).toUpperCase() + this.type.slice(1) : "Page"} View</h1>
        ${this.itemId ? html`<p>ID: ${this.itemId}</p>` : ""}
        <p>This view is coming soon!</p>
        <a href="/app">← Back to Home</a>
      </main>
    `;
  }

  static styles = css`
    .placeholder-view {
      max-width: 800px;
      margin: var(--spacing-xxl) auto;
      padding: var(--spacing-xl);
      text-align: center;
    }
    h1 {
      margin-bottom: var(--spacing-lg);
    }
    a {
      display: inline-block;
      margin-top: var(--spacing-lg);
      color: var(--color-primary);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `;
}

