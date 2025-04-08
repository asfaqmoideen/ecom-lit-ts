import { LitElement, html, css } from "lit";
import { customElement, property, state} from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, cartContext } from "../contexts/GlobalContexts";
import { Cart } from "../constants/GlobalTypes";
import { Router } from "@vaadin/router";
import { calculateDisPrice } from "../services/helperMethods";


@customElement("cart-container")
export class CartContainer extends LitElement{
    
    @consume({context: cartContext})@state()cart? : Cart;
    @consume({context: loggedInContext})@state() loggedIn? :boolean;

    connectedCallback(): void {
        super.connectedCallback();
        if(!this.loggedIn){
            Router.go('/login');
        }
    }

    render(){
        if(this.cart){
        return html`
            <div class="carts-container">
                <h2>Your Shopping Bag</h2>
                <p><strong>${this.cart.totalProducts} items</strong> in your bag.</p>
                <div class="cart-table">
                    <table>
                        <thead>
                            <tr>
                                <td>Product</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Total Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                this.cart.products.map(p=> html`    
                                    <tr>
                                        <td>
                                            <div class="primary-data">
                                                <img src="${p.thumbnail}" alt="productImage">
                                                <div class="title-details">
                                                    <h4>${p.title}</h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="price-div">
                                                <p class="actual-price">$ ${p.price}</p>
                                                <p class="dis-price">$ ${calculateDisPrice(p)}</p>
                                            </div>
                                        </td>
                                        <td>
                                            ${p.quantity}
                                        </td>
                                        <td>
                                            <p>$ ${p.discountedTotal}</p>
                                        </td>
                                    </tr>
                                `)

                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="side-div">
                <div class="totals-div">
                    <h3>Cart Total</h3>
                    <p><strong> Grand Total :</strong> $${this.cart.total}</p>
                    <p><strong> Discounted Total :</strong> $${this.cart.discountedTotal}</p>
                    <p class="saved-amount"> You saved : $ ${(this.cart.total-this.cart.discountedTotal).toFixed(2)} 🎉</p>
                    <p>Delivery : Free</p>
                </div>
                <custom-button>Checkout</custom-button>
            </div>
            `
        }

    }

    static styles = css`
        :host{ 
        all : initial;
        flex:1;
        display:flex;
        justify-content:center;
        align-items:center;
        }
        .carts-container{
            margin:1rem;
        }

        .primary-data img{
            height:100px;
            width:100px;
            border-radius: 50%;
            margin:0 1rem ;
        }

        table{
            border-collapse:collapse;
        }
        thead{
            background-color: whitesmoke;
        }
        thead td{
            padding: 1rem 2rem;
            text-align:center;
            font-weight:700;
        }

        tbody td{
            text-align:center;
            padding: .5rem;
        }
        .primary-data{
            display:flex;

        }
        .actual-price{
            text-decoration:line-through;
            opacity: .8;
        }

        .totals-div{
            background-color:whitesmoke;
            min-width:200px;
            min-height:200px;
            padding:1rem;
            border-radius:1rem;
            display:flex;
            flex-direction:column;
            
        }
        .saved-amount{
            color:green;
        }
        .side-div{
            display:flex;
            justify-content:space-around;
            flex-direction:column;
        }
        .dis-price{
            font-weight:600;
        }
    `
}



