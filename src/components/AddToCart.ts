import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, property, state} from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, cartContext } from "../contexts/GlobalContexts";
import { Product } from "../constants/GlobalTypes";


@customElement("ecom-addtocart")
export class AddtoCart extends LitElement {
    @property({attribute:true}) product :Product | null = null;
    @consume({context: cartContext}) @state()Cart : {items: Product[]} = {items: []};
    @consume({context: loggedInContext}) LoggedIn? :boolean;
    @state() quantity = 0;

    private addToCart() {   
        this.dispatchEvent(new CustomEvent("add-to-cart", {
            detail: {product : this.product},
            bubbles : true,
            composed:true,
        }));
        this.quantity++;
    }

    private isAlreadyInTheCart(){
        return this.Cart.items.find(item => item.id === this.product?.id) 
    }

    private handleQuantityChange(event : Event){
        const element = event.target as HTMLButtonElement;
        if (element) {
            if(element.id == "+"){
                this.quantity ++;
            }
            else if(element.id == "-"){
                this.quantity --;
                if(this.quantity==0){
                    
                }
            }
        }
        
    }
    render() {
        return html`
            ${  this.quantity >0?
                html`
                <div class="quantityChange">
                    <button id="-"  @click=${this.handleQuantityChange} class="quantity">-</button>
                    <span id="quantity">${this.quantity}</span>
                    <button id="+" @click=${this.handleQuantityChange} class="quantity">+</button>
                </div>
                `
                : html`<button @click=${this.addToCart} class="addtoCart">Add to cart</button>`   
            }
        `
    }
    static styles = css`
            button {
            display: inline;
            text-align:center;
            padding: 0.4rem;
            border: none;
            width:auto;
            border-radius: 0.4rem;
            background:rgb(5, 201, 116);
            color: white;
            cursor: pointer;
            transition: background 0.4s ease-in-out;
            }
            .addtoCart{
                width:100%;
            }
            .quantity{
                width:25%;
            }
            button:hover {
                background:rgb(80, 174, 133);
            }
            .quantityChange{
                width:100%;
                display:flex;
                align-items:center;
                justify-content:space-around;
            }`
}
declare global {
    interface HTMLElementTagNameMap {
        "AddtoCart": AddtoCart;
    }
}
