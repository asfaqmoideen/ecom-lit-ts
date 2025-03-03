import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import './components/CustomHeader';
import './components/CustomFooter';
import './components/HomeContainer';
import './components/CartContianer';
import './components/AccountContainer';

@customElement('app-main')
export class AppMain extends LitElement {

  firstUpdated() {
    const router = new Router(this.renderRoot?.querySelector('#outlet')!);
    router.setRoutes([
      { path: '/', component: 'home-container' },
      { path: '/account', component: 'account-container' },
      { path: '/cart', component: 'cart-container' },
    ]);
  }

  render() {
    return html`
      <custom-header></custom-header>
      <div id="outlet"></div>
      <custom-footer></custom-footer>
    `;
  }

  static styles = css`
    :host {
    all : initial;
      height : 100vh;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
    }
    #outlet{
    flex:1;
    }
    `
}

