import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { convertToPascalCase } from "../services/helperMethods";
import "./ProductsContainer"
import { APIService } from "../services/APIService";

@customElement("ecom-mastersearch")
export class MasterSearch extends LitElement{

    private api = new APIService();

    @property({ attribute: true }) title: string = "All Products"
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
            <div class = "headgrp">
            <h3>${convertToPascalCase(this.title)}</h3>
            <input type="text" id="headersearch" placeholder="Search your favourite product" @input=${this.handleSearchInput}/>
            <button @click=${this.toggleCategoryModal}>Select Category</button>
            </div>
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
    display: block; 
    width: 100%;
}

.headgrp {
    display: flex;
    align-items: center; 
    justify-content: space-between;
    gap: 1rem; 
}

#headersearch {
    width: 100%; 
    max-width: 400px;
    border-radius: 1rem;
    text-align: center;
    border: 1px solid green;
    padding: 0.5rem; 
    font-size: 1rem;
    outline: none; 
    transition: border-color 0.3s ease-in-out;
}

#headersearch:focus {
    border-color: #3cba92; 
}

button {
    padding: 0.5rem 1rem; 
    border-radius: 0.7rem;
    border: none;
    background-image: linear-gradient(to right, rgb(138, 227, 188) 0%, #3cba92 100%);
    cursor: pointer;
    transition: background 0.3s ease-in-out, transform 0.2s;
}

button:hover {
    background-image: linear-gradient(to right, #3cba92 0%, rgb(138, 227, 188) 100%);
    transform: scale(1.05);
}

    ul {
    display:flex;
    flex-wrap:wrap;
    list-style :none;
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


