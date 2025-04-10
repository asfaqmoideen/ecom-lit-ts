import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { provide } from '@lit/context';
import { cartContext, loggedInContext, userContext } from './contexts/GlobalContexts';
import { Product, User, Cart } from './constants/GlobalTypes';
import { AuthenticationController } from './controllers/AuthenticationController';
import './components/CustomHeader';
import './components/CustomFooter';
import './components/HomeContainer';
import './components/CartContianer'
import './components/AccountContainer';
import './components/ProductDetailContainer';
import './components/loginContainer'
import { CartController } from './controllers/CartController';
import { mapProductToCart } from './services/helperMethods';

@customElement('app-main')
export class AppMain extends LitElement {

  private auth = new AuthenticationController();
  private cartCon = new CartController();
  @provide({ context: loggedInContext }) loggedIn = false;
  @provide({ context: cartContext }) cart = {} as Cart;
  @provide({ context: userContext }) user = {} as User;

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
        this.requestUpdate();
        sessionStorage.removeItem("token");
      }
    })
    // console.log("reviewing logggen In detials");
    // const user = await this.auth.authenticate();
    
    // if(user) {
    //   this.loggedIn = true;
    //   this.user = user.user;
    //   console.log("User already loggen In !");
    // }
  }

  setLoggedIn(status: boolean, user?: User) {
    this.loggedIn = status;
    if (user) this.user = user;
    this.requestUpdate();
  }

  addToCart(product: Product, quantity: number) {

    const existingProduct = this.cart.products.find(p => p.id === product.id)
    if(existingProduct) {
         existingProduct.quantity = quantity;
         return;
    }
    const productToCart = mapProductToCart(product, quantity);
    
    this.cart.products.push(productToCart);
    this.requestUpdate();
  }

  async setUserCart(user: User) {
    const cart = await this.cartCon.getUserCart(user.id);
    console.log(user.id);
    
    if(cart) this.cart = cart;
    this.requestUpdate();
  }

  removeFromCart(product : Product){
    const existingProductId = this.cart.products.findIndex(p => p.id === product.id)
    if(existingProductId) {
      console.log(existingProductId);
      this.cart.products.splice(existingProductId, 1);
      console.log("Deleted!", this.cart.products);
    }
  }

  quantityChange(product : Product, quantity: number) {
    const existingProduct = this.cart.products.find(p=> p.id === product.id)
    if(existingProduct){
       existingProduct.quantity = quantity;
    }
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