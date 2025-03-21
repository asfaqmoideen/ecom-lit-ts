import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { APIService } from "../services/APIService";
import {Product} from "../constants/GlobalTypes";
import './CustomLoader';
import { convertToPascalCase, calculateDisPrice } from "../services/helperMethods";


@customElement("product-detail-container")
export class ProductDetailContainer extends LitElement {
  private api = new APIService();
  @state() private product: Product | null = null;
  @state() private isLoading = true;

  async firstUpdated() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (productId) {
      const data = await this.api.getProductById(parseInt(productId));
      this.product = data;
    }
    this.isLoading = false;
  }

  render() {
    if (this.isLoading) {
      return html`<custom-loader></custom-loader>`;
    }
    if (!this.product) {
      return html`<h2>Product Not Found !</h2>`;
    }
    return html`
          <div class="detailcontainer">
            <div class="imgcont">
              ${this.product.images.map(img=>html`<img src=${img} class="images"/>`)}
            </div>
            <div class="thumbnail"><img src="${this.product.thumbnail}" alt="${this.product.title}"  id="thumbnail"></div>
            <div class="product-detail">
              <p class="brand">${this.product.brand}</p>
              <h2>${this.product.title}</h2>
              <p class="category">${convertToPascalCase(this.product.category)}</p>
              <div class="tags-container">
                <p>${this.product.tags.map(tag=> html`<div class="tag">${convertToPascalCase(tag)}</div> `)}</p>
              </div>
                    <p class="priceTag">$${calculateDisPrice(this.product)} <span class="actualPrice">${this.product.price}</span></p>
                    <p class="description">${this.product.description}</p>
                    <div class="actionDiv">
                       <button class="action">Add to cart</button>
                       <button class="action">Buy Now</button>
                    </div>
              </div>
            </div>

    `;
  }

  static styles = css`
    :host{
      all: initial;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: calc( 100vh - 3rem); 
    }

    h2, p{
      margin:0;
    }
    .product-detail {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap:1rem;
      max-width:300px;
    }

    #thumbnail {
      width: 100%;
      max-width: 400px; 
      height: auto; 
      background-color: whitesmoke;
      object-fit: cover; 
    }
    .images{
        max-width:100px;
        max-height:100px;
        padding:.5rem;
        background-color:whitesmoke;
        object-fit: contain; 
    }
    .imgcont{
        display:flex;
        flex-direction:column;
        gap:.2rem;
    }
    .detailcontainer {
      display: flex;
      gap: 3rem;
      align-items: center;
      justify-content: center; 
      width: 100%;
      flex-wrap:wrap;
    }
    .priceTag{
      font-size:1.5rem;
    }

    .tag{
      padding: 0.3rem 0.6rem;
      font-size: 0.8rem;
      border-radius: 0.2rem;
      background-color: whitesmoke;
      display:inline;
    }

    button {
            width: 45%;
            padding: 0.6rem;
            border: none;
            border-radius: 0.4rem;
            background:rgb(5, 201, 116);
            color: white;
            cursor: pointer;
            margin-top: 0.8rem;
            transition: background 0.4s ease-in-out;
    }

    button:hover {
            background:rgb(80, 174, 133);
    }

    .actualPrice{
      font-size:1.2rem;
      text-decoration: line-through;
      opacity: 0.7;
    }
    .brand{
      font-style:italic;
    }
    .description{
      font-size:0.9rem;
    }

  `;
}
