import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

// Define the main layout component
@customElement('app-main')
class AppMain extends LitElement {
  static styles = css`
    nav a { margin: 0 10px; cursor: pointer; }
  `;

  firstUpdated() {
    const router = new Router(this.shadowRoot?.querySelector('#outlet')!);
    router.setRoutes([
      { path: '/', component: 'app-home' },
      { path: '/about', component: 'app-about' },
      { path: '/contact', component: 'app-contact' }
    ]);
  }

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <div id="outlet"></div>
    `;
  }
}

// Define individual page components
@customElement('app-home')
class AppHome extends LitElement {
  render() { return html`<h1>Home Page</h1>`; }
}

@customElement('app-about')
class AppAbout extends LitElement {
  render() { return html`<h1>About Page</h1>`; }
}

@customElement('app-contact')
class AppContact extends LitElement {
  render() { return html`<h1>Contact Page</h1>`; }
}
