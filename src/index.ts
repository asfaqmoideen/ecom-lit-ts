import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { provide } from '@lit/context';
import { cartContext, loggedInContext, userContext } from './contexts/GlobalContexts';
import { Product, User } from './constants/GlobalTypes';
import { AuthenticationController } from './controllers/AuthenticationController';
import './components/CustomHeader';
import './components/CustomFooter';
import './components/HomeContainer';
import './components/CartContianer'
import './components/AccountContainer';
import './components/ProductDetailContainer';
import './components/loginContainer'

@customElement('app-main')
export class AppMain extends LitElement {

  private auth = new AuthenticationController();
  @provide({ context: loggedInContext }) loggedIn = false;
  @provide({ context: cartContext }) cart: { items: Product[] } = { items: [] };
  @provide({ context: userContext }) user = {} as User;

  async firstUpdated() {
    const router = new Router(this.renderRoot.querySelector('#outlet'));
    router.setRoutes([
      { path: '/', component: 'home-container' },
      { path: '/account', component: 'account-container' },
      { path: '/cart', component: 'cart-container' },
      { path: '/product', component: 'product-detail-container' },
      { path: '/login', component: 'login-container' }
    ]);


    this.addEventListener('update-login', (e) => {   
      this.setLoggedIn((e as CustomEvent).detail.status, (e as CustomEvent).detail.user);
    });
    this.addEventListener('add-to-cart', (e) => {   
      this.addToCart((e as CustomEvent).detail.product);
    });
    this.addEventListener('logout-confirm', (e)=>{
      const logoutRequest = (e as CustomEvent).detail.logoutRequest;
      if(logoutRequest) {
        this.loggedIn = false;
        this.requestUpdate();
      }
    })
    console.log("reviewing logggen In detials");
    const user = await this.auth.authenticate();
    
    if(user) {
      this.loggedIn = true;
      this.user = user.user;
      console.log("User already loggen In !");
      
    }
  }

  setLoggedIn(status: boolean, user?: User) {
    this.loggedIn = status;
    if (user) this.user = user;
    this.requestUpdate();
  }

  addToCart(product: Product) {
    this.cart = { items: [...this.cart.items, product] };
    this.requestUpdate();
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
      all: initial;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .wrap {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    #outlet {
      flex: 1;
      display:flex;
    }
  `;
}