import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import Product from "../constants/ProductType";

@customElement("ecom-productcard")
export class ProductCard extends LitElement {

    @property({ type: Object })
    product: Product | null = null;

    render() {
        if (!this.product) return html``; 

        return html`
            <div class="productCard">
                <div class="imagebg">
                    <div class="discount"><p>- ${this.product.discountPercentage}%</p></div>
                    <div class="rating"><p>⭐ ${this.product.rating}</p></div>
                    <img src=${this.product.thumbnail} class="thumbnail" alt=${this.product.title}>
                </div>
                <div class="details">  
                    <h4>${this.product.title}</h4>
                    <p id="detailsp">
                        $${this.calculateDisPrice(this.product)} 
                        <span id="actualprice">$${this.product.price}</span>
                    </p>
                    <div @click=${(e:Event)=> e.stopPropagation()}><button @click=${this.addToCart}>Add to Cart</button></div>
                </div>
            </div>
        `;
    }

    private calculateDisPrice(product: Product): number {
        return Number((product.price - (product.price * product.discountPercentage / 100)).toFixed(2));
    }

    private addToCart() {
        console.log(`Added to cart: ${this.product?.title}`);
        this.dispatchEvent(new CustomEvent("add-to-cart", {
            detail: this.product,
            bubbles: true,
            composed: true
        }));
    }

    static styles = css`
        :host { 
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }

        p, h4 {
            margin: 0;
        }

        .productCard {
            width: 220px;
            border-radius: 0.4rem;
            margin: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease-in-out;
            padding: 1rem;
            background: white;
        }

        .productCard:hover {
            transform: scale(1.02);
        }

        .imagebg {
            height: 200px;
            width: 200px;
            border-radius: 0.4rem;
            background-color: whitesmoke;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .thumbnail {
            max-height: 180px;
            max-width: 180px;
            object-fit: contain;
        }

        #actualprice {
            text-decoration: line-through;
            opacity: 0.7;
            margin-left: 5px;
            font-size: 0.9rem;
            color: grey;
        }

        .details {
            align-self: start;
            padding: 0.6rem;
            text-align: center;
            width: 100%;
        }

        .discount, .rating {
            position: absolute;
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
            font-weight: bold;
            border-radius: 0.2rem;
        }

        .discount {
            background-color: rgb(250, 57, 57);
            top: 10px;
            left: 10px;
            color:white;    
        }

        .rating {
            background-color: whitesmoke;
            top: 10px;
            right: 10px;
        }

        button {
            width: 100%;
            display: inline;
            padding: 0.6rem;
            border: none;
            border-radius: 0.4rem;
            background:rgb(138, 227, 188);
            color: white;
            cursor: pointer;
            margin-top: 0.8rem;
            transition: background 0.2s ease-in-out;
        }

        button:hover {
            background:rgb(80, 174, 133);
        }
    `;
}
