import { LitElement, html, css } from "lit";
import { customElement, state, property, } from "lit/decorators.js";
import { APIService } from "../services/APIService";
import "./ProductsContainer"
import "./MasterSearch"


@customElement("home-container")
export class HomeContainer extends LitElement{

    private api = new APIService();
    @state() private products : any[] = [];
    

    async connectedCallback() {
        super.connectedCallback();
        const data = await this.api.getAllProducts();
        this.products  = data.products ;
    }

    private async handleSearch(event: CustomEvent) {
        const query = event.detail.query.toLowerCase();
        const data = await this.api.searchProduct(query);
        this.products = data.products;
    }

    private async handleCategory(event: CustomEvent) {
        const query = event.detail.query;
        console.log(query);
        const data = await this.api.getProductsByCategory(query);
        this.products = data.products ;
    }
    
    render(){
        return html `
        <ecom-mastersearch @search-changed=${this.handleSearch} @category-clicked=${this.handleCategory}></ecom-mastersearch>
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



