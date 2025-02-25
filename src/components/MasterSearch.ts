import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { convertToPascalCase } from "../services/helperMethods";
import "./ProductsContainer"
import { APIService } from "../services/APIService";

@customElement("ecom-mastersearch")
export class MasterSearch extends LitElement{

    private api = new APIService();

    @state() categories : string[] = [];
    @state() private isModalVisible = false;

    async connectedCallback(){
        super.connectedCallback();
        this.categories = await this.api.getProductCategories();
    }
    

    private handleSearchInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const searchQuery = inputElement.value;
        this.dispatchEvent(new CustomEvent("search-changed", {
            detail: { query: searchQuery },
            bubbles: true,
            composed: true
        }));
    }

    private handleCategoryClick(event : Event) {
        const listElement = event.target as HTMLElement;
        this.dispatchEvent(new CustomEvent("category-clicked",{
            detail: { query : listElement.id },
            bubbles: true,
            composed : true
        }))
        this.toggleCategoryModal();
    }

    private toggleCategoryModal() {
      this.isModalVisible = !this.isModalVisible;
    }

    
    render(){
        return html `
            <input type="text" id="headersearch" placeholder="Search your favourite product" @input=${this.handleSearchInput}/>
            <button @click=${this.toggleCategoryModal} class="applycat" >Select Category</button>

         ${this.isModalVisible ? html`
            <overlay-modal @close-clicked=${this.toggleCategoryModal} modalTitle = "Categories">
               <ul>
                        ${this.categories.map(c => html`<li id=${c} @click=${this.handleCategoryClick}>${convertToPascalCase(c)}</li>`)}
                </ul>
            </overlay-modal>
          `: ''}
        `;
    }

    static styles = css`
    :host { 
        all: initial;
        width: 100%;
        display: flex;
        margin: 1rem;
    }   

    .applycat{
       margin-left:auto;
    }

    h2{
    margin :0x
    }

    #headersearch {
        min-width: 500px;
        padding: 0.5rem;
        font-size : 1rem;
        border-radius: 1rem;
        text-align: center;
        border: 1px green solid ;
        margin-left:auto;
    }

    button {
    padding :0.5rem 0.8rem;
    margin: 0 .5rem;
    border-radius : 0.7rem;
    border:none;
    background-image: linear-gradient(to right,rgb(138, 227, 188) 0%, #3cba92 100%);
    cursor:pointer;
    }

    .close{
    border:none;
    background : none;
    }

    ul {
    display:flex;
    flex-wrap:wrap;
    list-style :none;
    margin:0;
    }

    ul li{
    padding :0.5rem 0.8rem;
    margin: .5rem;
    border-radius : 0.7rem;
    border:none;
    background-image: linear-gradient(to right,rgb(138, 227, 188) 0%, #3cba92 100%);
    cursor:pointer;
    }

    ul :hover {
        transform: scale(1.05);
    }
`;
}


