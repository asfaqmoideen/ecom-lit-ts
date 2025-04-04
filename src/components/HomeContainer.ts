import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { APIService } from "../services/APIService";
import "./ProductsContainer"
import "./MasterSearch"
import "./CustomLoader"
import "./PaginationContainer"
import { convertToPascalCase } from "../services/helperMethods";
import {ResponseData} from "../constants/GlobalTypes";


@customElement("home-container")
export class HomeContainer extends LitElement{

    private api = new APIService();
    @state() data : ResponseData | null = null;
    @state() private resultTitle : string = "All Products";
    @state() private isLoading : boolean = false;
    @state() startProduct :number = 1;
    @state() endProduct :number = 20;
    @state() sortOrder : 'asc' | 'desc' = 'asc'
    

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
        this.startProduct = event.detail.skip;
        this.endProduct = event.detail.limit * event.detail.page; 
    }

    private async handleSortChange(event :CustomEvent) {
        const sortType = event.detail.sortType;
        this.isLoading = true;
        this.sortOrder = event.detail.orderBy;
        console.log(this.sortOrder, sortType); 
        this.data = await this.api.getSortedProducts(sortType,this.sortOrder);
        this.isLoading = false ;
        this.resultTitle = sortType ? `Sorted by ${convertToPascalCase(sortType)} in ${this.sortOrder} Order (${this.data?.total})` : "";
    }

    render(){
        return html `
        <ecom-mastersearch .title = ${this.resultTitle ? this.resultTitle : "All Products"} 
            @search-changed=${this.handleSearch} 
            @category-clicked=${this.handleCategory} 
            @clear-results=${this.handleClearResults}
            @sort-change=${this.handleSortChange}>
        </ecom-mastersearch>
            ${this.isLoading ? html`<custom-loader></custom-loader>` : html`
            <div class="content">
            <ecom-productscontainer .products=${this.data?.products.slice(this.startProduct, this.endProduct)}></ecom-productscontainer>
            <pagination-container @page-change=${this.handlePageChange} .total=${this.data?.total}></pagination-container>
            </div>
            `} 
        `;
    }

    static styles = css`
        :host{ 
            all : initial;
            width :100%;
            margin:1rem;
        }

        custom-loader{
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
            height:calc(100vh - 13rem);
        }

    `
}

