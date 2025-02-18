import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./ProductsContainer"

@customElement("ecom-headersearch")
export class HeaderSearch extends LitElement{

    private handleInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const searchQuery = inputElement.value;
        this.dispatchEvent(new CustomEvent("search-changed", {
            detail: { query: searchQuery },
            bubbles: true,
            composed: true
        }));
    }
    
    render(){
        return html `
        <input type="text" id="headersearch" placeholder="Search your favourite product" @input=${this.handleInput}/>
        `;
    }

    static styles = css`
        :host{ 
        all : initial;
        margin:1rem;
        }
        
        #headersearch{
        width : 300px;
        padding : .5rem;
        border-radius : .7rem;
        text-align :center;
        border: none;
        }

    `
}


