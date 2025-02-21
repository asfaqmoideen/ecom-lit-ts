import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import './ProductCard';
import { ProductCard } from "./ProductCard";


@customElement("ecom-productscontainer")
export class ProductsContainer extends LitElement{

    @state()
    products: any[] = [];

    @property()
    private isProductInfoVisible = false

    @state()
    private clickedProduct :any = {}

    private toogleProductInfo(){
        this.isProductInfoVisible = !this.isProductInfoVisible;
    }

    private handleProductCardClick(event : Event){
        const litElement = event.target as ProductCard;
        this.clickedProduct = litElement.product;
        this.toogleProductInfo();
    }

    render(){   
        if(this.products.length === 0){
            return html`<h2>No products found<h2>`
        }

        return html `
        ${this.products.map(product => html`
            <ecom-productcard .product=${product} @click=${this.handleProductCardClick}></ecom-productcard>
            `)}

            ${this.isProductInfoVisible ? html`
                <div class="overlay">
                    <div class="modal" >
                        <div class="headgrp">
                            <h2>Product Info</h2>
                            <button class="close" @click=${this.toogleProductInfo}>✖️</button>
                        </div>

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
                            </div>
                    </div>
                </div>
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

        .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      min-width: 300px;
      max-width : 600px;
      max-height : 400px;
      text-align: center;
      overflow-y :auto;
    }

    .headgrp{
    display :flex;
    justify-content : space-between;
    }
    .close{
    border:none;
    background : none;
    cursor:pointer;
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


