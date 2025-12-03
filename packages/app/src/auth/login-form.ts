// app/src/auth/login-form.ts
import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

interface LoginFormData {
  username?: string;
  password?: string;
}

export class LoginFormElement extends LitElement {
  @state()
  formData: LoginFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  get canSubmit(): boolean {
    return Boolean(this.api && this.formData.username &&
      this.formData.password);
  }

  override render() {
    return html`
      <form
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <button
          ?disabled=${!this.canSubmit}
          type="submit">
          Login
        </button>
        <p class="error">${this.error}</p>
      </form>
    `;
  }
  
  override connectedCallback() {
    super.connectedCallback();
    // Use event delegation from the host to capture events from slotted elements
    this.addEventListener('input', (e) => this.handleChange(e));
    this.addEventListener('change', (e) => this.handleChange(e));
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
      .error:not(:empty) {
        color: #dc2626;
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        padding: var(--spacing-md, 1rem);
        margin: var(--spacing-md, 1rem) 0;
        border-radius: var(--border-radius-md, 8px);
        font-size: var(--font-size-sm, 0.875rem);
      }
      form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg, 1.5rem);
        width: 100%;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs, 0.5rem);
      }
      label span {
        font-weight: 600;
        color: var(--color-neutral-700, #4b5563);
        font-size: var(--font-size-base, 1rem);
        letter-spacing: -0.01em;
      }
      input {
        padding: var(--spacing-md, 1rem);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 999px;
        font-size: var(--font-size-base, 1rem);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        background-color: #f8f7f4;
      }
      input::placeholder {
        color: #9ca3af;
      }
      input:focus {
        outline: none;
        border-color: var(--color-primary, #21969a);
        box-shadow: 0 0 0 4px rgba(33, 150, 154, 0.15);
      }
      input:required:invalid {
        border-color: #fecaca;
      }
      button {
        padding: var(--spacing-md, 1rem) var(--spacing-xl, 2rem);
        background: var(--color-primary, #21969a);
        color: white;
        border: none;
        border-radius: 999px;
        cursor: pointer;
        font-size: var(--font-size-base, 1rem);
        font-weight: 600;
        margin-top: var(--spacing-sm, 0.5rem);
        min-height: 48px;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: var(--color-primary, #21969a);
        color: white;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      button:not(:disabled):hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 16px rgba(33, 150, 154, 0.25);
        background: var(--color-primary-dark, #17696c);
        color: #fff;
      }
      button:not(:disabled):active {
        transform: translateY(0);
        box-shadow: 0 4px 8px rgba(33, 150, 154, 0.2);
      }
    `
  ];

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target || !target.name) return;
    
    const name = target.name;
    const value = target.value;
    const prevData = this.formData;

    console.log("Input changed:", name, value);

    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
    }
    
    console.log("Form data updated:", this.formData, "canSubmit:", this.canSubmit);
    this.requestUpdate();
  }
  

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();
    console.log("Form submitted", this.formData, "canSubmit:", this.canSubmit);

    if (this.canSubmit) {
      console.log("Making fetch request to:", this.api);
      fetch(
        this?.api || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.formData)
        }
      )
      .then((res) => {
        console.log("Response status:", res.status);
        if (res.status !== 200 && res.status !== 201) {
          return res.text().then(text => {
            console.error("Request failed:", text);
            throw new Error(`Request failed: ${text}`);
          });
        }
        return res.json();
      })
      .then((json: object) => {
          console.log("Login successful, got token");
          const { token } = json as { token: string };
          const customEvent = new CustomEvent(
          'auth:message', {
          bubbles: true,
          composed: true,
          detail: [
              'auth/signin',
              { token, redirect: this.redirect }
          ]
          });
          console.log("dispatching message", customEvent);
          this.dispatchEvent(customEvent);
      })
      .catch((error: Error) => {
          console.error("Login error:", error);
          this.error = error.message || error.toString();
      });
    } else {
      console.log("Cannot submit - form not valid");
      this.error = "Please fill in both username and password";
    }
  }
}

