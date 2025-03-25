import { LitElement, html, css } from "lit";
import { customElement, property, state} from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, cartContext } from "../contexts/GlobalContexts";
import { Product } from "../constants/GlobalTypes";
import { Router } from "@vaadin/router";


@customElement("cart-container")
export class CartContainer extends LitElement{
    
    @consume({context: cartContext}) @state() cart : {items: Product[]} = {items: []};
    @consume({context: loggedInContext})@state() loggedIn? :boolean;

    connectedCallback(): void {
        super.connectedCallback();
        if(!this.loggedIn){
            Router.go('/login');
        }
    }

    render(){
        return html`
                <h1> Carts </h1>
            `

    }

    static styles = css`
        :host{ 
        all : initial;
        flex:1;
        }

    `
}



