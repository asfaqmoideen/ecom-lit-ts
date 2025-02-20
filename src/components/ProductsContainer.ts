import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement("ecom-productscontainer")
export class ProductsContainer extends LitElement{

    @property({ type: Array })
    products: any[] = [];

    render(){
        if(this.products.length === 0){
            return html`<h2>No products found<h2>`
        }

        return html `
        ${this.products.map(product => html`
            <div class="productCard">
                <div class = "headgrp"> </div>
                <img src=${product.thumbnail} class="thumbnail">
                    <h4>${product.title}</h4>
                    <p id="detailsp"><span id="actualprice">$${product.price}</span> $${product.discountPercentage}
                    ⭐${product.rating}</p>
                    
            </div>`)}

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

    `
}


