import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import Product from "../constants/ProductType";


@customElement("ecom-productcard")
export class ProductCard extends LitElement{

    @property()
    product :any = {}

    render(){

        return html`
            <div class="productCard">
                <div class = "headgrp"> </div>
                <img src=${this.product.thumbnail} class="thumbnail">
                    <h4>${this.product.title}</h4>
                    <p id="detailsp"><span id="actualprice">$${this.product.price}</span> $${this.product.discountPercentage}
                    ⭐${this.product.rating}</p>
                    
            </div>`
    ;
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
            transform: scale(1.01);
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

    `
}


