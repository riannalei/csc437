import{i as v,x as c,r as u,a as b,n as l,b as f,d as y}from"./reset.css-DvUkGz8C.js";var x=Object.defineProperty,g=(n,i,t,d)=>{for(var r=void 0,a=n.length-1,s;a>=0;a--)(s=n[a])&&(r=s(i,t,r)||r);return r&&x(i,t,r),r};const m=class m extends v{render(){return c`
      <section aria-labelledby="${this.sectionId}">
        <h2 id="${this.sectionId}">
          <svg class="icon">
            <use href="/icons/travel.svg#icon-${this.icon}" />
          </svg>
          ${this.sectionTitle}
        </h2>
        <slot></slot>
      </section>
    `}};m.styles=[u.styles,b`
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
  `];let o=m;g([l()],o.prototype,"icon");g([l()],o.prototype,"sectionTitle");g([l({attribute:"section-id"})],o.prototype,"sectionId");var w=Object.defineProperty,p=(n,i,t,d)=>{for(var r=void 0,a=n.length-1,s;a>=0;a--)(s=n[a])&&(r=s(i,t,r)||r);return r&&w(i,t,r),r};const h=class h extends v{constructor(){super(...arguments),this.mainSections=[],this.gridSections=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}async hydrate(i){try{const t=await fetch(i);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const d=await t.json();if(d){const r=d;this.mainSections=r.mainSections||[],this.gridSections=r.gridSections||[]}}catch(t){console.error("Failed to load sections data:",t)}}renderSection(i){return c`
      <travel-section
        icon="${i.icon}"
        section-title="${i.sectionTitle}"
        section-id="${i.sectionId}"
      >
        <ul>
          ${i.items.map(t=>c`
            <li><a href="${t.href}">${t.text}</a></li>
          `)}
        </ul>
      </travel-section>
    `}render(){return c`
      <main>
        ${this.mainSections.map(i=>this.renderSection(i))}
      </main>
      
      <div class="grid-container">
        ${this.gridSections.map(i=>this.renderSection(i))}
      </div>
    `}};h.styles=[u.styles,b`
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
    `];let e=h;p([l()],e.prototype,"src");p([f()],e.prototype,"mainSections");p([f()],e.prototype,"gridSections");y({"travel-section":o,"travel-planner":e});
