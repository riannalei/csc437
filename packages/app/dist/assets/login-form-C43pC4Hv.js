import{a as i,i as u,x as h,r as m,n as p}from"./state-C5e8AMb5.js";const b=i`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  
  img {
    max-width: 100%;
  }
  
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,g={styles:b},f=i`
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: 700;
  }
`,v={styles:f};var x=Object.defineProperty,n=(l,r,e,a)=>{for(var t=void 0,o=l.length-1,c;o>=0;o--)(c=l[o])&&(t=c(r,e,t)||t);return t&&x(r,e,t),t};const d=class d extends u{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return h`
      <form
        @submit=${r=>this.handleSubmit(r)}
      >
        <slot></slot>
        <button
          ?disabled=${!this.canSubmit}
          type="submit">
          Login
        </button>
        <p class="error">${this.error}</p>
      </form>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("input",r=>this.handleChange(r)),this.addEventListener("change",r=>this.handleChange(r))}handleChange(r){const e=r.target;if(!e||!e.name)return;const a=e.name,t=e.value,o=this.formData;switch(console.log("Input changed:",a,t),a){case"username":this.formData={...o,username:t};break;case"password":this.formData={...o,password:t};break}console.log("Form data updated:",this.formData,"canSubmit:",this.canSubmit),this.requestUpdate()}handleSubmit(r){r.preventDefault(),console.log("Form submitted",this.formData,"canSubmit:",this.canSubmit),this.canSubmit?(console.log("Making fetch request to:",this.api),fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(e=>(console.log("Response status:",e.status),e.status!==200&&e.status!==201?e.text().then(a=>{throw console.error("Request failed:",a),new Error(`Request failed: ${a}`)}):e.json())).then(e=>{console.log("Login successful, got token");const{token:a}=e,t=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:a,redirect:this.redirect}]});console.log("dispatching message",t),this.dispatchEvent(t)}).catch(e=>{console.error("Login error:",e),this.error=e.message||e.toString()})):(console.log("Cannot submit - form not valid"),this.error="Please fill in both username and password")}};d.styles=[g.styles,v.styles,i`
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
        color: var(--color-text, #222);
        font-size: var(--font-size-sm, 0.875rem);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      input {
        padding: var(--spacing-md, 1rem);
        border: 2px solid var(--color-border, #e5e7eb);
        border-radius: var(--border-radius-md, 8px);
        font-size: var(--font-size-base, 1rem);
        transition: all 0.2s ease;
        background-color: white;
      }
      input:focus {
        outline: none;
        border-color: var(--color-primary, #21969a);
        box-shadow: 0 0 0 3px rgba(33, 150, 154, 0.1);
      }
      input:required:invalid {
        border-color: #fecaca;
      }
      button {
        padding: var(--spacing-md, 1rem) var(--spacing-xl, 2rem);
        background: linear-gradient(135deg, var(--color-primary, #21969a) 0%, var(--color-primary-dark, #17696c) 100%);
        color: white;
        border: none;
        border-radius: var(--border-radius-md, 8px);
        cursor: pointer;
        font-size: var(--font-size-base, 1rem);
        font-weight: 600;
        margin-top: var(--spacing-sm, 0.5rem);
        min-height: 48px;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: var(--color-neutral-300, #ccc);
        box-shadow: none;
      }
      button:not(:disabled):hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      button:not(:disabled):active {
        transform: translateY(0);
      }
    `];let s=d;n([m()],s.prototype,"formData");n([p()],s.prototype,"api");n([p()],s.prototype,"redirect");n([m()],s.prototype,"error");export{s as L};
