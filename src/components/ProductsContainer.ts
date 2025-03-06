import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import './ProductCard';
import './OverlayModal';
import { Router } from "@vaadin/router";
import Product from "../constants/ProductType";


@customElement("ecom-productscontainer")
export class ProductsContainer extends LitElement{

    @property() private products: Product[] = [];
    @state() private clickedProduct :any = {}
    @state() private isProductInfoVisible = false
    @state() private isLoading = true;

    connectedCallback() {
      super.connectedCallback();
      setTimeout(() => {this.isLoading = false; }, 2000);
    }

    private toogleProductInfo(){
        this.isProductInfoVisible = !this.isProductInfoVisible;
    }

    private handleProductCardClick(event: Event) {
        const productCard = event.target as HTMLElement & { product: any };
        const productId = productCard?.product?.id;
        if (productId) {
          Router.go(`/product?id=${productId}`);
        }
      }

    render(){   
        if (this.isLoading) {
            return html`<h2>Loading Products...</h2>`;
        }

        if(this.products.length === 0){
            return html`<h2>No products found<h2>`;
        }


        return html `
        ${this.products.map(product => html`
            <ecom-productcard .product=${product} @click=${this.handleProductCardClick}></ecom-productcard>
            `)}

            ${this.isProductInfoVisible ? html`
                <overlay-modal @close-clicked=${this.toogleProductInfo} modalTitle = "Product Info"> 
                    <div class="productgroup">
                                    <div class="imggrp">
                                        ${this.clickedProduct.images.map((img: string) => html`<img src=${img} alt="Product Image" />`)}
                                    </div>
                                    <div class="desgrp">
                                        <h3>${this.clickedProduct.title}</h3>
                                        <p>${this.clickedProduct.description}</p>
                                        <p id="detailsp"><span id="actualprice">$${this.clickedProduct.price}</span> $${this.clickedProduct.discountPercentage}
                                            ⭐${this.clickedProduct.rating}</p>
                                    </div>
                            </div
                </overlay-modal>
            `: ''}
            
        `;
    }

    static styles = css`
        :host{ 
        display:flex;
        flex-wrap: wrap;
        align-items:center; 
        justify-content :center;
        }
        
        p,h4{
            margin:0;
        }
            
        .productCard:hover {
            transform: scale(1.05);
        }
        .productCard{
        height: 250px;
        width : 250px;
        border-radius: 1rem;
        background-color : whitesmoke;
        box-shadow: 1px 1px 1px 1px grey;
        margin : 1rem;
        padding: .7rem;
        display:flex;
        flex-direction:column;
        justify-content:space-evenly;
        align-items :center;
        cursor:pointer;
        }

        .thumbnail{
        height: 180px;
        width : 180px;
        }
        #actualprice{
        text-decoration: line-through;
        opacity :.8;
        }



    .productgroup img{
    height :150px;
    width :150px;
    }

    .productgroup{
    display: flex;
    }

    .imggrp{
    display:flex;
    flex-wrap: wrap;}
    `
}


