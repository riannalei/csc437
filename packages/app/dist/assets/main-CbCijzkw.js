import{i as p,x as a,a as h,r as m,n as f,d as x,_ as w,h as k,b as $}from"./state-C2F6c-XN.js";var A=Object.defineProperty,b=(e,t,r,d)=>{for(var i=void 0,n=e.length-1,s;n>=0;n--)(s=e[n])&&(i=s(t,r,i)||i);return i&&A(t,r,i),i};const g=class g extends p{constructor(){super(...arguments),this.authenticated=!1,this.darkMode=!1,this.handleAuthMessage=t=>{const r=t,[d]=r.detail;(d==="auth/signin"||d==="auth/signout")&&this.updateAuthStatus()}}connectedCallback(){super.connectedCallback(),document.addEventListener("auth:message",this.handleAuthMessage),this.updateAuthStatus(),this.checkDarkMode()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("auth:message",this.handleAuthMessage)}updateAuthStatus(){const t=localStorage.getItem("blazing:auth");this.authenticated=!!t,this.requestUpdate()}checkDarkMode(){this.darkMode=document.body.classList.contains("dark-mode")}toggleDarkMode(){this.darkMode=!this.darkMode,this.darkMode?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode")}signOut(){document.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]})),window.location.href="/login.html"}render(){return a`
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
              ${this.authenticated?a`
                    <span class="user-greeting">Welcome!</span>
                    <button @click=${this.signOut} class="btn-signout">Sign Out</button>
                  `:a`
                    <a href="/login.html" class="btn-signin">Sign In</a>
                  `}
            </span>
          </nav>
        </div>
      </header>
    `}};g.styles=h`
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
  `;let o=g;b([m()],o.prototype,"authenticated");b([m()],o.prototype,"darkMode");const v=class v extends p{render(){return a`
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
    `}};v.styles=h`
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
  `;let c=v;var M=Object.defineProperty,y=(e,t,r,d)=>{for(var i=void 0,n=e.length-1,s;n>=0;n--)(s=e[n])&&(i=s(t,r,i)||i);return i&&M(t,r,i),i};const u=class u extends p{render(){return a`
      <main class="placeholder-view">
        <h1>${this.type?this.type.charAt(0).toUpperCase()+this.type.slice(1):"Page"} View</h1>
        ${this.itemId?a`<p>ID: ${this.itemId}</p>`:""}
        <p>This view is coming soon!</p>
        <a href="/app">← Back to Home</a>
      </main>
    `}};u.styles=h`
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
  `;let l=u;y([f()],l.prototype,"type");y([f({attribute:"item-id"})],l.prototype,"itemId");const z=[{path:"/app/destination/:id",view:e=>a`
      <placeholder-view type="destination" item-id=${e.id}></placeholder-view>
    `},{path:"/app/flight/:id",view:e=>a`
      <placeholder-view type="flight" item-id=${e.id}></placeholder-view>
    `},{path:"/app/traveler/:id",view:e=>a`
      <placeholder-view type="traveler" item-id=${e.id}></placeholder-view>
    `},{path:"/app/airline/:id",view:e=>a`
      <placeholder-view type="airline" item-id=${e.id}></placeholder-view>
    `},{path:"/app/accommodation/:id",view:e=>a`
      <placeholder-view type="accommodation" item-id=${e.id}></placeholder-view>
    `},{path:"/app/activity/:id",view:e=>a`
      <placeholder-view type="activity" item-id=${e.id}></placeholder-view>
    `},{path:"/app/finance/:id",view:e=>a`
      <placeholder-view type="finance" item-id=${e.id}></placeholder-view>
    `},{path:"/app",view:()=>a`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];x({"mu-auth":$.Provider,"mu-history":k.Provider,"blazing-header":o,"home-view":c,"placeholder-view":l,"mu-switch":class extends w.Element{constructor(){super(z,"blazing:history","blazing:auth")}}});
