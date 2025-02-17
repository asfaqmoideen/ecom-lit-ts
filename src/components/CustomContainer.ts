import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { APIService } from "../services/UsersAPIService";
import "./ProductsContainer"

@customElement("custom-container")
export class CustomContainer extends LitElement{

    private api = new APIService();
    @state() private products : any[] = [];
        
    async connectedCallback() {
        super.connectedCallback();
        const data = await this.api.getAllProducts();
        this.products  = data.products || [];
    }

    render(){
        return html `
        <ecom-productscontainer .products=${this.products}></ecom-productscontainer>
        `;
    }

    static styles = css`
        :host{ 
        all : initial;
        flex:1; 
        margin:1rem;
        }

    `
}


