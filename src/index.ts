import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import './components/CustomHeader';
import './components/CustomFooter';
import './components/HomeContainer';
import './components/CartContianer';
import './components/AccountContainer';
import './components/ProductDetailContainer';
import './components/loginContainer';

@customElement('app-main')
export class AppMain extends LitElement {


  firstUpdated() {
    const router = new Router(this.renderRoot.querySelector('#outlet'));
    router.setRoutes([
      { path: '/', component: 'home-container' },
      { path: '/account', component: 'account-container' },
      { path: '/cart', component: 'cart-container' },
      { path: "/product", component: 'product-detail-container' },
      { path: '/login', component : 'login-container'}
    ]);

  }

  render() {
    return html`
      <div class="wrap">
        <custom-header></custom-header>
        <div id="outlet"></div>
      </div>
      <custom-footer></custom-footer>
    `;
  }

  static styles = css`
    :host {
      all : initial;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .wrap{
      min-height : 100vh;
      display: flex;
      flex-direction: column;
    }
    #outlet{
    flex:1;
    }
    `
}

