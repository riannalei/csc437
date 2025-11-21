import{i as g,x as t,a as p,r as x,n as u,V as $,b as y,d as z,_ as A,s as C,h as M}from"./state-C5e8AMb5.js";var P=Object.defineProperty,w=(a,e,r,n)=>{for(var i=void 0,s=a.length-1,o;s>=0;s--)(o=a[s])&&(i=o(e,r,i)||i);return i&&P(e,r,i),i};const v=class v extends g{constructor(){super(...arguments),this.authenticated=!1,this.darkMode=!1,this.handleAuthMessage=e=>{const r=e,[n]=r.detail;(n==="auth/signin"||n==="auth/signout")&&this.updateAuthStatus()}}connectedCallback(){super.connectedCallback(),document.addEventListener("auth:message",this.handleAuthMessage),this.updateAuthStatus(),this.checkDarkMode()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("auth:message",this.handleAuthMessage)}updateAuthStatus(){const e=localStorage.getItem("blazing:auth");this.authenticated=!!e,this.requestUpdate()}checkDarkMode(){this.darkMode=document.body.classList.contains("dark-mode")}toggleDarkMode(){this.darkMode=!this.darkMode,this.darkMode?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode")}signOut(){document.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]})),window.location.href="/login.html"}render(){return t`
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
              ${this.authenticated?t`
                    <span class="user-greeting">Welcome!</span>
                    <button @click=${this.signOut} class="btn-signout">Sign Out</button>
                  `:t`
                    <a href="/login.html" class="btn-signin">Sign In</a>
                  `}
            </span>
          </nav>
        </div>
      </header>
    `}};v.styles=p`
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
  `;let l=v;w([x()],l.prototype,"authenticated");w([x()],l.prototype,"darkMode");const m=class m extends g{render(){return t`
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
    `}};m.styles=p`
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
  `;let h=m;var j=Object.defineProperty,k=(a,e,r,n)=>{for(var i=void 0,s=a.length-1,o;s>=0;s--)(o=a[s])&&(i=o(e,r,i)||i);return i&&j(e,r,i),i};const f=class f extends g{render(){return t`
      <main class="placeholder-view">
        <h1>${this.type?this.type.charAt(0).toUpperCase()+this.type.slice(1):"Page"} View</h1>
        ${this.itemId?t`<p>ID: ${this.itemId}</p>`:""}
        <p>This view is coming soon!</p>
        <a href="/app">← Back to Home</a>
      </main>
    `}};f.styles=p`
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
  `;let d=f;k([u()],d.prototype,"type");k([u({attribute:"item-id"})],d.prototype,"itemId");var S=Object.defineProperty,_=(a,e,r,n)=>{for(var i=void 0,s=a.length-1,o;s>=0;s--)(o=a[s])&&(i=o(e,r,i)||i);return i&&S(e,r,i),i};const b=class b extends ${constructor(){super("blazing:model")}get profile(){var e;return(e=this.model)==null?void 0:e.profile}connectedCallback(){super.connectedCallback(),this.userid&&this.requestProfile()}attributeChangedCallback(e,r,n){super.attributeChangedCallback(e,r,n),e==="user-id"&&r!==n&&n&&this.requestProfile()}requestProfile(){this.userid&&this.dispatchMessage(["profile/request",{userid:this.userid}])}render(){const e=this.profile;return this.userid?!e||e.userid!==this.userid?t`
        <main class="traveler-view">
          <p>Loading profile for ${this.userid}...</p>
        </main>
      `:t`
      <main class="traveler-view">
        <header class="profile-header">
          ${e.avatar?t`<img src=${e.avatar} alt=${e.name} class="avatar" />`:t`<div class="avatar-placeholder">${e.name.charAt(0)}</div>`}
          <div class="profile-info">
            <h1>${e.name}</h1>
            ${e.nickname?t`<p class="nickname">${e.nickname}</p>`:""}
            <p class="home">📍 ${e.home}</p>
          </div>
        </header>

        <section class="profile-details">
          <h2>Airports</h2>
          ${e.airports&&e.airports.length>0?t`
                <ul class="airports-list">
                  ${e.airports.map(r=>t`<li>${r}</li>`)}
                </ul>
              `:t`<p>No airports listed</p>`}
        </section>
      </main>
    `:t`
        <main class="traveler-view">
          <p>No user ID provided</p>
        </main>
      `}};b.styles=p`
    .traveler-view {
      max-width: 800px;
      margin: var(--spacing-xxl) auto;
      padding: var(--spacing-xl);
    }
    .profile-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-xl);
      margin-bottom: var(--spacing-xxl);
      padding-bottom: var(--spacing-xl);
      border-bottom: 2px solid var(--color-border, #e5e7eb);
    }
    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--color-primary, #21969a);
    }
    .avatar-placeholder {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: var(--color-primary, #21969a);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: bold;
      border: 4px solid var(--color-primary-dark, #17696c);
    }
    .profile-info h1 {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: var(--font-size-3xl, 1.875rem);
    }
    .nickname {
      font-size: var(--font-size-xl, 1.25rem);
      color: var(--color-text-muted);
      margin: 0 0 var(--spacing-sm) 0;
    }
    .home {
      margin: 0;
      color: var(--color-text-muted);
    }
    .profile-details h2 {
      margin-bottom: var(--spacing-md);
    }
    .airports-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-md);
    }
    .airports-list li {
      background: var(--color-background-section, #f9fafb);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-md, 8px);
      border: 1px solid var(--color-border, #e5e7eb);
    }
  `;let c=b;_([u({attribute:"user-id"})],c.prototype,"userid");const I={};function N(a,e){return fetch(`/api/travelers/${a.userid}`,{headers:y.headers(e)}).then(r=>{if(r.status===200)return r.json();throw new Error("No Response from server")}).then(r=>{if(r)return r;throw new Error("No JSON in response from server")})}function D(a,e,r){var n;switch(a[0]){case"profile/request":{const{userid:i}=a[1];return((n=e.profile)==null?void 0:n.userid)===i?e:[e,N(a[1],r).then(s=>["profile/load",{userid:i,profile:s}]).catch(s=>(console.error("Failed to load profile:",s),["profile/load",{userid:i,profile:void 0}]))]}case"profile/load":{const{profile:i}=a[1];return{...e,profile:i}}case"profile/save":{const{profile:i}=a[1];return{...e,profile:i}}default:{const i=a[0];throw new Error(`Unhandled Store message "${i}"`)}}}const q=[{path:"/app/destination/:id",view:a=>t`
      <placeholder-view type="destination" item-id=${a.id}></placeholder-view>
    `},{path:"/app/flight/:id",view:a=>t`
      <placeholder-view type="flight" item-id=${a.id}></placeholder-view>
    `},{path:"/app/traveler/:id",view:a=>t`
      <traveler-view user-id=${a.id}></traveler-view>
    `},{path:"/app/airline/:id",view:a=>t`
      <placeholder-view type="airline" item-id=${a.id}></placeholder-view>
    `},{path:"/app/accommodation/:id",view:a=>t`
      <placeholder-view type="accommodation" item-id=${a.id}></placeholder-view>
    `},{path:"/app/activity/:id",view:a=>t`
      <placeholder-view type="activity" item-id=${a.id}></placeholder-view>
    `},{path:"/app/finance/:id",view:a=>t`
      <placeholder-view type="finance" item-id=${a.id}></placeholder-view>
    `},{path:"/app",view:()=>t`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];z({"mu-auth":y.Provider,"mu-history":M.Provider,"mu-store":class extends C.Provider{constructor(){super(D,I,"blazing:auth")}},"blazing-header":l,"home-view":h,"traveler-view":c,"placeholder-view":d,"mu-switch":class extends A.Element{constructor(){super(q,"blazing:history","blazing:auth")}}});
