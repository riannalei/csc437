import{i as u,x as o,a as d,r as v,n as f,V as A,d as P,f as O,h as j,b as y,_ as I,s as T}from"./state-CQOAiUN3.js";var q=Object.defineProperty,k=(i,e,r,t)=>{for(var a=void 0,s=i.length-1,n;s>=0;s--)(n=i[s])&&(a=n(e,r,a)||a);return a&&q(e,r,a),a};const w=class w extends u{constructor(){super(...arguments),this.authenticated=!1,this.darkMode=!1,this.handleVisibilityChange=()=>{document.hidden||this.updateAuthStatus()},this.handleStorageChange=e=>{e.key==="blazing:auth"&&this.updateAuthStatus()},this.handleAuthMessage=e=>{const r=e,[t,a]=r.detail;console.log("[Header] Auth message received:",t,a),t==="auth/signin"?(a&&a.token&&(console.log("[Header] Got token from payload, storing and updating"),localStorage.setItem("blazing:auth",a.token),this.updateAuthStatus()),setTimeout(()=>{console.log("[Header] Checking auth after signin (50ms)"),this.updateAuthStatus()},50),setTimeout(()=>{console.log("[Header] Checking auth after signin (200ms)"),this.updateAuthStatus()},200),setTimeout(()=>{console.log("[Header] Checking auth after signin (500ms)"),this.updateAuthStatus()},500)):t==="auth/signout"&&this.updateAuthStatus()}}connectedCallback(){super.connectedCallback(),document.addEventListener("auth:message",this.handleAuthMessage),window.addEventListener("storage",this.handleStorageChange),document.addEventListener("visibilitychange",this.handleVisibilityChange),this.updateAuthStatus(),setTimeout(()=>this.updateAuthStatus(),100),setTimeout(()=>this.updateAuthStatus(),500),this.checkDarkMode()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("auth:message",this.handleAuthMessage),window.removeEventListener("storage",this.handleStorageChange),document.removeEventListener("visibilitychange",this.handleVisibilityChange)}updateAuthStatus(){let e=null;const r=["blazing:auth","blazing:auth:token","auth:token","token"];console.log("[Header] All localStorage keys:",Object.keys(localStorage));for(const t of r){const a=localStorage.getItem(t);if(a&&a.startsWith("eyJ")){e=a,console.log("[Header] Found token in key:",t);break}}if(!e)for(let t=0;t<localStorage.length;t++){const a=localStorage.key(t);if(a&&(a.includes("auth")||a.includes("blazing"))){const s=localStorage.getItem(a);if(s&&s.startsWith("eyJ")){e=s,console.log("[Header] Found token in key:",a);break}}}if(console.log("[Header] Token found:",e?"YES":"NO"),this.authenticated=!!e,e)try{const t=e.split(".")[1],a=JSON.parse(atob(t));console.log("[Header] Decoded payload:",a),this.username=a.username}catch(t){console.error("[Header] Failed to decode token:",t),this.username=void 0}else this.username=void 0;console.log("[Header] Final state - Authenticated:",this.authenticated,"Username:",this.username),this.requestUpdate()}checkDarkMode(){this.darkMode=document.body.classList.contains("dark-mode")}toggleDarkMode(){this.darkMode=!this.darkMode,this.darkMode?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode")}signOut(){document.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]})),window.location.href="/login.html"}render(){return o`
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
              ${this.authenticated?o`
                    <span class="user-greeting">Hi, ${this.username||"User"}!</span>
                    <button @click=${this.signOut} class="btn-signout">Sign Out</button>
                  `:o`
                    <a href="/login.html" class="btn-signin">Sign In</a>
                  `}
            </span>
          </nav>
        </div>
      </header>
    `}};w.styles=d`
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
      color: rgba(255, 255, 255, 0.95);
      font-weight: 600;
      font-size: var(--font-size-base, 1rem);
      padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
      background: rgba(255, 255, 255, 0.15);
      border-radius: var(--border-radius-md, 8px);
      backdrop-filter: blur(10px);
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
  `;let l=w;k([v()],l.prototype,"authenticated");k([v()],l.prototype,"username");k([v()],l.prototype,"darkMode");const z=class z extends u{render(){return o`
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
    `}};z.styles=d`
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
  `;let b=z;var H=Object.defineProperty,M=(i,e,r,t)=>{for(var a=void 0,s=i.length-1,n;s>=0;s--)(n=i[s])&&(a=n(e,r,a)||a);return a&&H(e,r,a),a};const $=class $ extends u{render(){return o`
      <main class="placeholder-view">
        <h1>${this.type?this.type.charAt(0).toUpperCase()+this.type.slice(1):"Page"} View</h1>
        ${this.itemId?o`<p>ID: ${this.itemId}</p>`:""}
        <p>This view is coming soon!</p>
        <a href="/app">← Back to Home</a>
      </main>
    `}};$.styles=d`
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
  `;let p=$;M([f()],p.prototype,"type");M([f({attribute:"item-id"})],p.prototype,"itemId");var L=Object.defineProperty,D=Object.getOwnPropertyDescriptor,N=(i,e,r,t)=>{for(var a=t>1?void 0:t?D(e,r):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(a=(t?n(e,r,a):n(a))||a);return t&&a&&L(e,r,a),a};const m=class m extends A{get profile(){var e;return(e=this.model)==null?void 0:e.profile}constructor(){super("blazing:model")}connectedCallback(){super.connectedCallback(),this.userid&&this.requestProfile()}attributeChangedCallback(e,r,t){super.attributeChangedCallback(e,r,t),e==="user-id"&&r!==t&&t&&this.requestProfile()}requestProfile(){this.userid&&this.dispatchMessage(["profile/request",{userid:this.userid}])}handleSubmit(e){if(!this.userid)return;const r={...e.detail};typeof r.airports=="string"&&(r.airports=r.airports.split(",").map(t=>t.trim()).filter(t=>t.length>0)),this.dispatchMessage(["profile/save",{userid:this.userid,profile:r},{onSuccess:()=>j.dispatch(this,"history/navigate",{href:`/app/traveler/${this.userid}`}),onFailure:t=>console.log("ERROR:",t)}])}render(){var r;const e=this.profile;return this.userid?!e||e.userid!==this.userid?o`
        <main class="traveler-edit">
          <p>Loading profile for ${this.userid}...</p>
        </main>
      `:o`
      <main class="traveler-edit">
        <header class="edit-header">
          <h1>Edit Profile</h1>
          <a href="/app/traveler/${this.userid}" class="cancel-link">Cancel</a>
        </header>

        <mu-form
          .init=${e}
          @mu-form:submit=${this.handleSubmit}>
          <label>
            <span>Name</span>
            <input name="name" required placeholder="Enter your name" />
          </label>

          <label>
            <span>Nickname</span>
            <input name="nickname" placeholder="Enter your nickname" />
          </label>

          <label>
            <span>Home</span>
            <input name="home" required placeholder="Enter your home location" />
          </label>

          <label>
            <span>Avatar URL</span>
            <input name="avatar" type="url" placeholder="Enter avatar image URL" />
          </label>

          <label>
            <span>Airports</span>
            <input 
              name="airports" 
              placeholder="Enter airports (comma-separated)" 
              .value=${((r=e.airports)==null?void 0:r.join(", "))||""} />
          </label>

          <button slot="submit" type="submit">Save Profile</button>
        </mu-form>
      </main>
    `:o`
        <main class="traveler-edit">
          <p>No user ID provided</p>
        </main>
      `}};m.uses=P({"mu-form":O.Element}),m.styles=d`
    .traveler-edit {
      max-width: 700px;
      margin: var(--spacing-xxl, 3rem) auto;
      padding: var(--spacing-xl, 2rem);
    }

    .edit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xxl, 3rem);
      padding-bottom: var(--spacing-lg, 1.5rem);
      border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .edit-header h1 {
      margin: 0;
      font-size: var(--font-size-4xl, 2.25rem);
      font-weight: 700;
      color: var(--color-text, #1f2937);
      letter-spacing: -0.02em;
    }

    .cancel-link {
      color: var(--color-text-muted, #6b7280);
      text-decoration: none;
      font-weight: 500;
      padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
      border-radius: var(--border-radius-md, 8px);
      transition: all 0.2s ease;
      font-size: var(--font-size-sm, 0.875rem);
    }

    .cancel-link:hover {
      background-color: var(--color-background-section, #f9fafb);
      color: var(--color-text, #1f2937);
    }

    mu-form {
      display: block;
      background: white;
      padding: var(--spacing-xxl, 3rem);
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    mu-form label {
      display: block;
      margin-bottom: var(--spacing-xl, 2rem);
    }

    mu-form label:last-of-type {
      margin-bottom: var(--spacing-lg, 1.5rem);
    }

    mu-form label span {
      display: block;
      margin-bottom: var(--spacing-sm, 0.5rem);
      font-weight: 600;
      color: var(--color-text, #1f2937);
      font-size: var(--font-size-sm, 0.875rem);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    mu-form input {
      width: 100%;
      padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
      border: 2px solid var(--color-border, #e5e7eb);
      border-radius: var(--border-radius-md, 8px);
      font-size: var(--font-size-base, 1rem);
      box-sizing: border-box;
      transition: all 0.2s ease;
      background: white;
      color: var(--color-text, #1f2937);
    }

    mu-form input:hover {
      border-color: var(--color-primary-light, #76bbbf);
    }

    mu-form input:focus {
      outline: none;
      border-color: var(--color-primary, #21969a);
      box-shadow: 0 0 0 4px rgba(33, 150, 154, 0.1);
      background: white;
    }

    mu-form input::placeholder {
      color: var(--color-text-muted, #9ca3af);
    }

    mu-form button[type="submit"] {
      width: 100%;
      padding: var(--spacing-md, 1rem) var(--spacing-xl, 2rem);
      background: linear-gradient(135deg, var(--color-primary, #21969a) 0%, var(--color-primary-dark, #17696c) 100%);
      color: white;
      border: none;
      border-radius: var(--border-radius-md, 8px);
      font-size: var(--font-size-base, 1rem);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: var(--spacing-xl, 2rem);
      box-shadow: 0 4px 6px rgba(33, 150, 154, 0.2);
      min-height: 48px;
      letter-spacing: 0.01em;
    }

    mu-form button[type="submit"]:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(33, 150, 154, 0.3);
    }

    mu-form button[type="submit"]:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(33, 150, 154, 0.2);
    }

    mu-form button[type="submit"]:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba(33, 150, 154, 0.2), 0 4px 6px rgba(33, 150, 154, 0.2);
    }
  `;let c=m;N([f({attribute:"user-id"})],c.prototype,"userid",2);N([v()],c.prototype,"profile",1);var _=Object.defineProperty,E=(i,e,r,t)=>{for(var a=void 0,s=i.length-1,n;s>=0;s--)(n=i[s])&&(a=n(e,r,a)||a);return a&&_(e,r,a),a};const S=class S extends A{constructor(){super("blazing:model")}get profile(){var e;return(e=this.model)==null?void 0:e.profile}connectedCallback(){super.connectedCallback(),this.userid&&this.requestProfile()}attributeChangedCallback(e,r,t){super.attributeChangedCallback(e,r,t),e==="user-id"&&r!==t&&t&&this.requestProfile()}requestProfile(){this.userid&&this.dispatchMessage(["profile/request",{userid:this.userid}])}render(){const e=this.profile;return this.userid?!e||e.userid!==this.userid?o`
        <main class="traveler-view">
          <p>Loading profile for ${this.userid}...</p>
        </main>
      `:o`
      <main class="traveler-view">
        <a class="back-link" href="/app">← Back to dashboard</a>
        <header class="profile-header">
          ${e.avatar?o`<img src=${e.avatar} alt=${e.name} class="avatar" />`:o`<div class="avatar-placeholder">${e.name.charAt(0)}</div>`}
          <div class="profile-info">
            <div class="profile-title-row">
              <div>
                <h1>${e.name}</h1>
                ${e.nickname?o`<p class="nickname">${e.nickname}</p>`:""}
                <p class="home">📍 ${e.home}</p>
              </div>
              <a href="/app/traveler/${this.userid}/edit" class="edit-button">Edit</a>
            </div>
          </div>
        </header>

        <section class="profile-details">
          <h2>Airports</h2>
          ${e.airports&&e.airports.length>0?o`
                <ul class="airports-list">
                  ${e.airports.map(r=>o`<li>${r}</li>`)}
                </ul>
              `:o`<p>No airports listed</p>`}
        </section>
      </main>
    `:o`
        <main class="traveler-view">
          <p>No user ID provided</p>
        </main>
      `}};S.styles=d`
    .traveler-view {
      max-width: 900px;
      margin: var(--spacing-xxl, 3rem) auto;
      padding: var(--spacing-xl, 2rem);
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs, 0.25rem);
      margin-bottom: var(--spacing-lg, 1.5rem);
      text-decoration: none;
      color: var(--color-primary, #21969a);
      font-weight: 600;
    }
    .profile-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-xxl, 3rem);
      margin-bottom: var(--spacing-xxl, 3rem);
      padding: var(--spacing-xxl, 3rem);
      background: white;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    }
    .avatar {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--color-primary, #21969a);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .avatar-placeholder {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary, #21969a) 0%, var(--color-primary-dark, #17696c) 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3.5rem;
      font-weight: bold;
      border: 4px solid var(--color-primary-dark, #17696c);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .profile-title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      gap: var(--spacing-lg, 1.5rem);
    }
    .profile-info h1 {
      margin: 0 0 var(--spacing-sm, 0.5rem) 0;
      font-size: var(--font-size-4xl, 2.25rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-text, #1f2937);
    }
    .edit-button {
      padding: var(--spacing-md, 1rem) var(--spacing-xl, 2rem);
      background: linear-gradient(135deg, var(--color-primary, #21969a) 0%, var(--color-primary-dark, #17696c) 100%);
      color: white;
      text-decoration: none;
      border-radius: var(--border-radius-md, 8px);
      font-weight: 600;
      font-size: var(--font-size-sm, 0.875rem);
      transition: all 0.2s ease;
      white-space: nowrap;
      box-shadow: 0 2px 4px rgba(33, 150, 154, 0.2);
      letter-spacing: 0.01em;
    }
    .edit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(33, 150, 154, 0.3);
    }
    .edit-button:active {
      transform: translateY(0);
    }
    .nickname {
      font-size: var(--font-size-xl, 1.25rem);
      color: var(--color-text-muted, #6b7280);
      margin: 0 0 var(--spacing-sm, 0.5rem) 0;
      font-weight: 500;
    }
    .home {
      margin: 0;
      color: var(--color-text-muted, #6b7280);
      font-size: var(--font-size-base, 1rem);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 0.25rem);
    }
    .profile-details {
      background: white;
      padding: var(--spacing-xxl, 3rem);
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    }
    .profile-details h2 {
      margin: 0 0 var(--spacing-xl, 2rem) 0;
      font-size: var(--font-size-2xl, 1.5rem);
      font-weight: 700;
      color: var(--color-text, #1f2937);
      letter-spacing: -0.01em;
    }
    .airports-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-md, 1rem);
    }
    .airports-list li {
      background: linear-gradient(135deg, var(--color-primary-light, #76bbbf) 0%, var(--color-primary, #21969a) 100%);
      color: white;
      padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
      border-radius: var(--border-radius-md, 8px);
      font-weight: 600;
      font-size: var(--font-size-sm, 0.875rem);
      box-shadow: 0 2px 4px rgba(33, 150, 154, 0.2);
      transition: transform 0.2s ease;
    }
    .airports-list li:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(33, 150, 154, 0.3);
    }
  `;let g=S;E([f({attribute:"user-id"})],g.prototype,"userid");const C=class C extends u{render(){return o`
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
    `}};C.styles=d`
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
  `;let x=C;const F={};function R(i,e){return fetch(`/api/travelers/${i.userid}`,{headers:y.headers(e)}).then(r=>{if(r.status===200)return r.json();throw new Error("No Response from server")}).then(r=>{if(r)return r;throw new Error("No JSON in response from server")})}function U(i,e){return fetch(`/api/travelers/${i.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...y.headers(e)},body:JSON.stringify(i.profile)}).then(r=>{if(r.status===200)return r.json();throw new Error(`Failed to save profile for ${i.userid}`)}).then(r=>{if(r)return r;throw new Error("No JSON in API response")})}function J(i,e,r){var t;switch(i[0]){case"profile/request":{const{userid:a}=i[1];return((t=e.profile)==null?void 0:t.userid)===a?e:[e,R(i[1],r).then(s=>["profile/load",{userid:a,profile:s}]).catch(s=>(console.error("Failed to load profile:",s),["profile/load",{userid:a,profile:void 0}]))]}case"profile/load":{const{profile:a}=i[1];return{...e,profile:a}}case"profile/save":{const{userid:a}=i[1],{onSuccess:s,onFailure:n}=i[2]||{};return[e,U(i[1],r).then(h=>(s&&s(),["profile/load",{userid:a,profile:h}])).catch(h=>{throw n&&n(h),h})]}default:{const a=i[0];throw new Error(`Unhandled Store message "${a}"`)}}}const Y=[{path:"/app/destination/tokyo",view:()=>o` <destination-tokyo></destination-tokyo> `},{path:"/app/destination/:id",view:i=>o`
      <placeholder-view type="destination" item-id=${i.id}></placeholder-view>
    `},{path:"/app/flight/:id",view:i=>o`
      <placeholder-view type="flight" item-id=${i.id}></placeholder-view>
    `},{path:"/app/traveler/:id/edit",view:i=>o`
      <traveler-edit user-id=${i.id}></traveler-edit>
    `},{path:"/app/traveler/:id",view:i=>o`
      <traveler-view user-id=${i.id}></traveler-view>
    `},{path:"/app/airline/:id",view:i=>o`
      <placeholder-view type="airline" item-id=${i.id}></placeholder-view>
    `},{path:"/app/accommodation/:id",view:i=>o`
      <placeholder-view type="accommodation" item-id=${i.id}></placeholder-view>
    `},{path:"/app/activity/:id",view:i=>o`
      <placeholder-view type="activity" item-id=${i.id}></placeholder-view>
    `},{path:"/app/finance/:id",view:i=>o`
      <placeholder-view type="finance" item-id=${i.id}></placeholder-view>
    `},{path:"/app",view:()=>o`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];P({"mu-auth":y.Provider,"mu-history":j.Provider,"mu-store":class extends T.Provider{constructor(){super(J,F,"blazing:auth")}},"blazing-header":l,"home-view":b,"traveler-view":g,"traveler-edit":c,"placeholder-view":p,"destination-tokyo":x,"mu-switch":class extends I.Element{constructor(){super(Y,"blazing:history","blazing:auth")}}});
