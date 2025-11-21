import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";

export class HeaderElement extends LitElement {
  @state()
  authenticated = false;

  @state()
  darkMode = false;

  connectedCallback() {
    super.connectedCallback();
    // Listen for auth status changes
    document.addEventListener("auth:message", this.handleAuthMessage);
    this.updateAuthStatus();
    this.checkDarkMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("auth:message", this.handleAuthMessage);
  }

  handleAuthMessage = (e: Event) => {
    const customEvent = e as CustomEvent;
    const [action] = customEvent.detail;
    if (action === "auth/signin" || action === "auth/signout") {
      this.updateAuthStatus();
    }
  };

  updateAuthStatus() {
    // Check if user is authenticated by looking for token
    const token = localStorage.getItem("blazing:auth");
    this.authenticated = !!token;
    this.requestUpdate();
  }

  checkDarkMode() {
    this.darkMode = document.body.classList.contains("dark-mode");
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

  signOut() {
    document.dispatchEvent(new CustomEvent("auth:message", {
      bubbles: true,
      composed: true,
      detail: ["auth/signout"]
    }));
    window.location.href = "/login.html";
  }

  render() {
    return html`
      <header class="main-header">
        <div class="header-content">
          <div class="header-title">
            <h1>Travel Planner</h1>
            <p>Plan your perfect journey</p>
          </div>
          <nav class="header-nav">
            <label class="dark-mode-toggle">
              <input 
                type="checkbox" 
                ?checked=${this.darkMode}
                @change=${this.toggleDarkMode}
                autocomplete="off" />
              Dark mode
            </label>
            <span class="auth-status">
              ${this.authenticated
                ? html`
                    <span class="user-greeting">Welcome!</span>
                    <button @click=${this.signOut} class="btn-signout">Sign Out</button>
                  `
                : html`
                    <a href="/login.html" class="btn-signin">Sign In</a>
                  `}
            </span>
          </nav>
        </div>
      </header>
    `;
  }

  static styles = css`
    .main-header {
      background: linear-gradient(135deg, var(--color-primary, #21969a) 0%, var(--color-primary-dark, #17696c) 100%);
      color: white;
      padding: var(--spacing-xl, 2rem) var(--spacing-lg, 1.5rem);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-lg);
    }
    .header-title h1 {
      color: white;
      margin: 0 0 var(--spacing-xs, 0.25rem) 0;
      font-size: var(--font-size-3xl, 1.875rem);
    }
    .header-title p {
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-size: var(--font-size-base, 1rem);
    }
    .header-nav {
      display: flex;
      align-items: center;
      gap: var(--spacing-md, 1rem);
    }
    .auth-status {
      display: flex;
      align-items: center;
      gap: var(--spacing-md, 1rem);
    }
    .btn-signin, .btn-signout {
      padding: var(--spacing-sm, 0.5rem) var(--spacing-lg, 1.5rem);
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: var(--border-radius-md, 8px);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s ease;
      cursor: pointer;
      font-size: var(--font-size-sm, 0.875rem);
    }
    .btn-signin:hover, .btn-signout:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
    }
    .user-greeting {
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
    }
    .dark-mode-toggle {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 0.5rem);
      color: rgba(255, 255, 255, 0.9);
      font-size: var(--font-size-sm, 0.875rem);
      cursor: pointer;
    }
    .dark-mode-toggle input[type="checkbox"] {
      cursor: pointer;
    }
  `;
}

