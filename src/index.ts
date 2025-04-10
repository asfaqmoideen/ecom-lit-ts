import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { provide } from '@lit/context';
import { cartContext, loggedInContext, userContext } from './contexts/GlobalContexts';
import { Product, User, Cart } from './constants/GlobalTypes';
import './components/CustomHeader';
import './components/CustomFooter';
import './components/HomeContainer';
import './components/CartContianer'
import './components/AccountContainer';
import './components/ProductDetailContainer';
import './components/loginContainer'
import { CartController } from './controllers/CartController';
import { CartService } from './services/CartService';

@customElement('app-main')
export class AppMain extends LitElement {

  private cartCon = new CartController();
  @provide({ context: loggedInContext }) loggedIn = false;
  @provide({ context: cartContext }) cart = {} as Cart;
  @provide({ context: userContext }) user = {} as User;

  connectedCallback() {
    super.connectedCallback();
    this.restoreUserFromSession();
  }
  
  saveCartToSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  
  saveUserToSession() {
    sessionStorage.setItem('user', JSON.stringify(this.user));
    sessionStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));
  }
  
  restoreUserFromSession() {
    const userData = sessionStorage.getItem('user');
    const loggedInStatus = sessionStorage.getItem('loggedIn');
    const cartData = sessionStorage.getItem('cart');
    if (userData) this.user = JSON.parse(userData);
    if (loggedInStatus) this.loggedIn = JSON.parse(loggedInStatus);
    if (cartData) this.cart = JSON.parse(cartData);
  }

  async firstUpdated() {
    const router = new Router(this.renderRoot.querySelector('#outlet'));
    router.setRoutes([
      { path: '/', component: 'home-container' },
      { path: '/account', component: 'account-container' },
      { path: '/cart', component: 'cart-container' },
      { path: '/product', component: 'product-detail-container' },
      { path: '/login', component: 'login-container' },
      { path: '(.*)', component: 'home-container' },
    ]);


    this.addEventListener('update-login', (e) => {   
      this.setLoggedIn((e as CustomEvent).detail.status, (e as CustomEvent).detail.user);
      this.setUserCart((e as CustomEvent).detail.user);
    });
    this.addEventListener('add-to-cart', (e) => {   
      this.addToCart((e as CustomEvent).detail.product, (e as CustomEvent).detail.quantity );
    });
    this.addEventListener('remove-from-cart', (e) => {   
      this.removeFromCart((e as CustomEvent).detail.product);
    });

    this.addEventListener('quantity-change', (e)=>{
      this.quantityChange((e as CustomEvent).detail.product, (e as CustomEvent).detail.quantity,)
    })
    this.addEventListener('logout-confirm', (e)=>{
      const logoutRequest = (e as CustomEvent).detail.logoutRequest;
      if(logoutRequest) {
        this.loggedIn = false;
      }
    })
  }

  setLoggedIn(status: boolean, user?: User) {
    this.loggedIn = status;
    if (user) this.user = user;
    this.saveUserToSession();
  }


  async setUserCart(user: User) {
    const cart = await this.cartCon.getUserCart(user.id);
    if(cart) this.cart = cart;
  }

  
  addToCart(product: Product, quantity: number) {
    this.cart = CartService.addToCart(this.cart, product, quantity);
    this.saveCartToSession(); 
  }
  
  removeFromCart(product: Product) {
    this.cart = CartService.removeFromCart(this.cart, product.id);
    this.saveCartToSession();
  }
  
  quantityChange(product: Product, quantity: number) {
    this.cart = CartService.updateQuantity(this.cart, product.id, quantity);
    this.saveCartToSession();
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