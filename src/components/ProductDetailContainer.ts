import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { APIService } from "../services/APIService";
import Product from "../constants/ProductType";


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
      return html`<h2>Loading Product Details...</h2>`;
    }
    if (!this.product) {
      return html`<h2>Product Not Found</h2>`;
    }
    return html`
      <div class="product-detail">
        <img src="${this.product.images[0]}" alt="${this.product.title}" />
        <h2>${this.product.title}</h2>
        <p>${this.product.description}</p>
        <p><strong>Price:</strong> $${this.product.price}</p>
        <p><strong>Discount:</strong> ${this.product.discountPercentage}%</p>
        <button @click="${() => history.back()}">Back</button>
      </div>
    `;
  }

  static styles = css`
    .product-detail {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
    }
    img {
      max-width: 300px;
    }
  `;
}
