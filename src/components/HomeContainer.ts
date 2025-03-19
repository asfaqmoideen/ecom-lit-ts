import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { APIService } from "../services/APIService";
import "./ProductsContainer"
import "./MasterSearch"
import "./CustomLoader"
import "./PaginationContainer"
import { convertToPascalCase } from "../services/helperMethods";
import Product from "../constants/ProductType";


@customElement("home-container")
export class HomeContainer extends LitElement{

    private api = new APIService();
    @state() data : Data | null = null;
    @state() private resultTitle : string = "All Products";
    @state() private isLoading : boolean = false;
    

    async connectedCallback() {
        super.connectedCallback();
        this.setAllProducts();
    }

    private async setAllProducts(){
        this.isLoading = true;
        this.data = await this.api.getAllProducts();
        this.isLoading = false;
    }

    private async handleSearch(event: CustomEvent) {
        const query = event.detail.query.toLowerCase();
        this.isLoading = true;
        this.data = await this.api.searchProduct(query);
        this.isLoading = false;
        this.resultTitle = query ? `${this.data?.total} results for '${query}'` : "";
    }

    private async handleCategory(event: CustomEvent) {
        const query = event.detail.query;
        this.isLoading = true;
        this.data = await this.api.getProductsByCategory(query);
        this.isLoading = false ;
        this.resultTitle = query ? `${convertToPascalCase(query)} (${this.data?.total})` : "";
    }
    
    private async handleClearResults() {
        this.setAllProducts();
        this.resultTitle = "All Products";
    }

    private handlePageChange(event: CustomEvent) {
        console.log("event", event.detail);
    }
    render(){
        return html `
        <ecom-mastersearch .title = ${this.resultTitle ? this.resultTitle : "All Products"} 
            @search-changed=${this.handleSearch} 
            @category-clicked=${this.handleCategory} 
            @clear-results=${this.handleClearResults}>
        </ecom-mastersearch>
        <div class="content">
            ${this.isLoading ? html`<custom-loader></custom-loader>` : html` 
            <ecom-productscontainer .products=${this.data?.products}></ecom-productscontainer>
            <pagination-container @page-change=${this.handlePageChange} .total=${this.data?.total}></pagination-container>`} 
        </div>
        `;
    }

    static styles = css`
        :host{ 
            all : initial;
            width :100%;
            margin:1rem;
        }

        .content{
            display:flex;
            height:100%;
            align-items:center;
            justify-content:center;
            flex-direction:column;
        }

    `
}

    type Data = {
        limit : number,
        total: number,
        products : Product[],
        skip:number;
    }



