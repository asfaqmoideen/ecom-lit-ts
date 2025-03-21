import { LitElement, html, css } from "lit";
import { customElement, property} from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, cartContext } from "../contexts/GlobalContexts";
import { Product } from "../constants/GlobalTypes";


@customElement("cart-container")
export class CartContainer extends LitElement{
    
    @consume({context: cartContext}) Cart : {items: Product[]} = {items: []};
    @consume({context: loggedInContext}) LoggedIn? :boolean;

   

    render(){
        return html `
            ${this.LoggedIn ? html`
                <h1> Carts </h1>
            `
            : html`<login-container></login-container>`
            }
        `;
    }

    static styles = css`
        :host{ 
        all : initial;
        flex:1;
        }

    `
}



