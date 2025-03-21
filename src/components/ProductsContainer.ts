import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import './ProductCard';
import './OverlayModal';
import './CustomLoader';
import { Router } from "@vaadin/router";
import {Product} from "../constants/GlobalTypes";


@customElement("ecom-productscontainer")
export class ProductsContainer extends LitElement{

    @property() private products: Product[] = [];

    connectedCallback() {
      super.connectedCallback();

    }

    private handleProductCardClick(event: Event) {
        const productCard = event.target as HTMLElement & { product: any };
        const productId = productCard?.product?.id;
        if (productId) {
          Router.go(`/product?id=${productId}`);
        }
      }

    render(){   
        if(this.products.length === 0){
            return html`<h2>No products found<h2>`;
        }


        return html `
        ${this.products.map(product => html`
            <ecom-productcard .product=${product} @click=${this.handleProductCardClick}></ecom-productcard>
            `)}
        
        `;
    }

    static styles = css`
        :host{
        height:100%; 
        display:flex;
        flex-wrap: wrap;
        align-items:center; 
        justify-content :center;
        }
    `
}


