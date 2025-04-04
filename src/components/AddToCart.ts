import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, property, state} from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, cartContext } from "../contexts/GlobalContexts";
import { Cart, Product } from "../constants/GlobalTypes";
import './CustomButton'


@customElement("ecom-addtocart")
export class AddtoCart extends LitElement {
    @property({attribute:true}) product :Product | null = null;
    @consume({context: cartContext}) @state()cart : Cart | null = null;
    @consume({context: loggedInContext}) LoggedIn? :boolean;
    @state() quantity = 0;

    private addToCart() { 

        if (this.quantity === 0) {
            this.quantity = 1;
        }
        this.dispatchEvent(new CustomEvent("add-to-cart", {
            detail: {
                    product : this.product,
                    quantity : this.quantity
            },
            bubbles : true,
            composed:true,
        }));
        this.quantity++;
    }

    private changeQuantity() {
        this.dispatchEvent(new CustomEvent("quantity-change", {
            detail: {
                    product : this.product,
                    quantity: this.quantity
            },
            bubbles : true,
            composed : true,
        }))
    }

    private removeFromCart(){
        this.dispatchEvent(new CustomEvent("remove-from-cart", {
            detail : {product: this.product},
            bubbles: true,
            composed: true,
        }))
    }
    private handleQuantityChange(event : Event){
        const element = event.target as HTMLButtonElement;
        if (element) {
            if(element.id == "+"){
                this.quantity ++;
                this.changeQuantity();
            }
            else if(element.id == "-"){
                this.quantity --;
                this.changeQuantity();
                if(this.quantity==0){
                    this.removeFromCart();
                }
            }
        }
        
    }
    render() {
        return html`
            ${  this.quantity >0?
                html`
                <div class="quantityChange">
                    <custom-button id="-"  @click=${this.handleQuantityChange} class="quantity">-</custom-button>
                    <span id="quantity">${this.quantity}</span>
                    <custom-button id="+" @click=${this.handleQuantityChange} class="quantity">+</custom-button>
                </div>
                `
                : html`<custom-button @click=${this.addToCart} class="addtoCart">Add to cart</custom-button>`   
            }
        `
    }
    static styles = css`
            :host{
                all:initial;
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
                align-items:center;
            }`
}
declare global {
    interface HTMLElementTagNameMap {
        "AddtoCart": AddtoCart;
    }
}
