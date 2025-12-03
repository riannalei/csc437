import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";

export class HeaderElement extends LitElement {
  @state()
  authenticated = false;

  @state()
  username?: string;

  @state()
  darkMode = false;

  connectedCallback() {
    super.connectedCallback();
    // Listen for auth status changes
    document.addEventListener("auth:message", this.handleAuthMessage);
    window.addEventListener("storage", this.handleStorageChange);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    // Check immediately and also after a short delay to catch token storage
    this.updateAuthStatus();
    setTimeout(() => this.updateAuthStatus(), 100);
    setTimeout(() => this.updateAuthStatus(), 500);
    this.checkDarkMode();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("auth:message", this.handleAuthMessage);
    window.removeEventListener("storage", this.handleStorageChange);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  handleVisibilityChange = () => {
    if (!document.hidden) {
      this.updateAuthStatus();
    }
  };

  handleStorageChange = (e: StorageEvent) => {
    if (e.key === "blazing:auth") {
      this.updateAuthStatus();
    }
  };

  handleAuthMessage = (e: Event) => {
    const customEvent = e as CustomEvent;
    const [action, payload] = customEvent.detail;
    console.log("[Header] Auth message received:", action, payload);
    if (action === "auth/signin") {
      // If we have the token in the payload, use it directly
      if (payload && payload.token) {
        console.log("[Header] Got token from payload, storing and updating");
        // Store it ourselves if mu-auth hasn't yet
        localStorage.setItem("blazing:auth", payload.token);
        this.updateAuthStatus();
      }
      // Also check localStorage multiple times to catch when mu-auth stores it
      setTimeout(() => {
        console.log("[Header] Checking auth after signin (50ms)");
        this.updateAuthStatus();
      }, 50);
      setTimeout(() => {
        console.log("[Header] Checking auth after signin (200ms)");
        this.updateAuthStatus();
      }, 200);
      setTimeout(() => {
        console.log("[Header] Checking auth after signin (500ms)");
        this.updateAuthStatus();
      }, 500);
    } else if (action === "auth/signout") {
      this.updateAuthStatus();
    }
  };

  updateAuthStatus() {
    // Check all localStorage keys to find the auth token
    // mu-auth might store it with a different key
    let token: string | null = null;
    
    // Try different possible keys
    const possibleKeys = [
      "blazing:auth",
      "blazing:auth:token",
      "auth:token",
      "token"
    ];
    
    // First, log all localStorage keys for debugging
    console.log("[Header] All localStorage keys:", Object.keys(localStorage));
    
    for (const key of possibleKeys) {
      const value = localStorage.getItem(key);
      if (value && value.startsWith("eyJ")) { // JWT tokens start with "eyJ"
        token = value;
        console.log("[Header] Found token in key:", key);
        break;
      }
    }
    
    // If not found, check all keys for JWT-like values
    if (!token) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes("auth") || key.includes("blazing"))) {
          const value = localStorage.getItem(key);
          if (value && value.startsWith("eyJ")) {
            token = value;
            console.log("[Header] Found token in key:", key);
            break;
          }
        }
      }
    }
    
    console.log("[Header] Token found:", token ? "YES" : "NO");
    this.authenticated = !!token;
    
    // Decode JWT to get username
    if (token) {
      try {
        // JWT format: header.payload.signature
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        console.log("[Header] Decoded payload:", decoded);
        this.username = decoded.username;
      } catch (e) {
        console.error("[Header] Failed to decode token:", e);
        this.username = undefined;
      }
    } else {
      this.username = undefined;
    }
    
    console.log("[Header] Final state - Authenticated:", this.authenticated, "Username:", this.username);
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
                    <span class="user-greeting">Hi, ${this.username || "User"}!</span>
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
      background: var(--color-background-page, rgb(250 249 246));
      color: inherit;
      padding: var(--spacing-xl, 2rem) var(--spacing-md, 1rem) 0;
    }
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-lg);
      padding-bottom: var(--spacing-xl, 2rem);
      border-bottom: 4px solid var(--color-border, rgba(0, 0, 0, 0.2));
    }
    .header-title h1 {
      color: inherit;
      margin: 0 0 var(--spacing-xs, 0.25rem) 0;
      font-size: var(--font-size-3xl, 1.875rem);
    }
    .header-title p {
      color: var(--color-text-muted, #6b7280);
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
      background: var(--color-primary, #21969a);
      color: white;
      border: none;
      border-radius: var(--border-radius-md, 8px);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s ease;
      cursor: pointer;
      font-size: var(--font-size-sm, 0.875rem);
    }
    .btn-signin:hover, .btn-signout:hover {
      background: var(--color-primary-dark, #17696c);
    }
    .user-greeting {
      color: inherit;
      font-weight: 600;
      font-size: var(--font-size-base, 1rem);
      padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
    }
    .dark-mode-toggle {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 0.5rem);
      color: inherit;
      font-size: var(--font-size-sm, 0.875rem);
      cursor: pointer;
    }
    .dark-mode-toggle input[type="checkbox"] {
      cursor: pointer;
    }
  `;
}

