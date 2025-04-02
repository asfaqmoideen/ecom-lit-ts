import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { convertToPascalCase } from "../services/helperMethods";
import "./ProductsContainer"
import { APIService } from "../services/APIService";
import { sortableFields } from "../constants/appconstants";
import './CustomButton'

@customElement("ecom-mastersearch")
export class MasterSearch extends LitElement{

    private api = new APIService();

    @property({ attribute: true }) title: string = "All Products"
    @state() categories : string[] = [];
    @state() private isCategoryModalVisible = false;
    @state() private isSortModalVisible = false;
    @state() private isCategorySearchApplied = false;

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
        this.isCategorySearchApplied = true;
    }

    private handleCategoryClick(event : Event) {
        const listElement = event.target as HTMLElement;
        this.dispatchEvent(new CustomEvent("category-clicked",{
            detail: { query : listElement.id },
            bubbles: true,
            composed : true
        }))
        this.toggleCategoryModal();
        this.isCategorySearchApplied = true;
    }

    private clearResults(){
        this.isCategorySearchApplied = !this.isCategorySearchApplied;
        this.dispatchEvent(new CustomEvent("clear-results",{
            bubbles: true,
            composed : true
        }))
    }


    private toggleCategoryModal() {
      this.isCategoryModalVisible = !this.isCategoryModalVisible;
    }
    private toggleSortModal() {
      this.isSortModalVisible = !this.isSortModalVisible;
    }

    private handleSort() {
        const sortType = this.shadowRoot?.getElementById("sort-by") as HTMLSelectElement;
        const orderBy = this.shadowRoot?.getElementById("sort-order") as HTMLSelectElement; 
        this.dispatchEvent(new CustomEvent("sort-change",{
            detail: { 
                sortType : sortType.value,
                orderBy : orderBy.value
             },
            bubbles: true,
            composed : true
        }))
        this.isCategorySearchApplied = true;
        this.toggleSortModal();
    }

    render(){
        return html `
            <div class = "headgrp"> 
                <h3> ${this.isCategorySearchApplied ? html`<button id="back" @click=${this.clearResults}>⬅️</button>` : ''}${this.title}</h3>
                <input type="text" id="headersearch" placeholder="Search your favourite product" @input=${this.handleSearchInput}/>
                <div class = "optionsDiv">
                    <custom-button @click=${this.toggleCategoryModal}>Select Category</custom-button>
                    <custom-button @click=${this.toggleSortModal}>Sort</custom-button>
                </div>
            </div>
                ${this.isCategoryModalVisible ? html`
                    <overlay-modal @close-clicked=${this.toggleCategoryModal} modalTitle = "Categories">
                        <ul>
                            ${this.categories.map(c => html`<li id=${c} @click=${this.handleCategoryClick}>${convertToPascalCase(c)}</li>`)}
                        </ul>
                    </overlay-modal>
                `: ''}
                ${this.isSortModalVisible ? html`
                    <overlay-modal @close-clicked=${this.toggleSortModal} modalTitle = "Select Sort">
                            <div class="sortingDiv">
                                <div class="selectgrp">
                                    <label for="sort-order">Order</label>
                                    <select name="sortorder" id="sort-order">
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </div>
                                <div class="selectgrp">
                                    <label for="sort-by">Sort By </label>
                                    <select name="sortby" id="sort-by" >
                                        ${sortableFields.map(sf => html` <option value="${sf}">${convertToPascalCase(sf)}</option>`)}
                                    </select>
                                </div>
                                <custom-button @click=${this.handleSort}>Show results</custom-button>
                            </div>
                    </overlay-modal>
          `: ''}
        `;
    }

    static styles = css`
   :host { 
    all: initial;
    display: block; 
    margin: 0 1rem;
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

        select {
        display:inline;
        width:max-content;
        padding: 0.5rem 1rem; 
        border-radius: 0.7rem;
        border: none;
        background-color: #90a4ae;
        cursor: pointer;
        transition: background 0.3s ease-in-out, transform 0.2s;
    }



    ul {
    display:flex;
    flex-wrap:wrap;
    list-style :none;
    padding:0;
    }

    ul li{
    padding :0.5rem 0.8rem;
    margin: .5rem;
    border-radius : 0.7rem;
    border:none;
    background-color: #90a4ae;
    cursor:pointer;
    }

    ul :hover {
        transform: scale(1.05);
    }

    #back{
        background:none;
        padding:0;
        margin: 0 1rem;
    }

    .sortingDiv{
        display:flex;
        flex-direction:column;
        gap:1rem;
    }
    .selectgrp{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
`;
}


