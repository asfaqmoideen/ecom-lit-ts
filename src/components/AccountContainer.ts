import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, userContext } from "../contexts/GlobalContexts";
import { User } from "../constants/GlobalTypes";
import "./loginContainer";
import { ecommerceProfileSections } from "../constants/appconstants";
import { convertToPascalCase } from "../services/helperMethods";

@customElement("account-container")
export class AccountContainer extends LitElement {
  @consume({ context: loggedInContext }) @state() loggedIn?: boolean;
  @consume({ context: userContext }) @state() user?: User;
  @state() activeSection: string = "personal-information";

  switchContent(id: string) {
    this.activeSection = id;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="sidebar">
        <ul>
          ${ecommerceProfileSections.map(
            (s) => html`
              <li
                id="${s}"
                class="${this.activeSection === s ? "active" : ""}"
                @click="${() => this.switchContent(s)}"
              >
                ${convertToPascalCase(s)}
              </li>
            `
          )}
          <button>Logout</button>
        </ul>
      </div>
      <div class="content-container">
        <!-- ${ecommerceProfileSections.map(
          (s) => html`
            <div
              id="${s}-container"
              class="content ${this.activeSection === s ? "active" : ""}"
            >
            <p>Content for ${convertToPascalCase(s)}</p>
            </div>
          `
          
        )} -->
        <div id="personal-information-container" class="content ${this.activeSection === "personal-information" ? "active" : ""}">
            <h1> Personal Information</h1>
        </div>
        <div id="billing-addresses-container" class="content ${this.activeSection === "billing-addresses" ? "active" : ""}">
            <h1> Billing Addresses</h1>
        </div>
        <div id="shipping-addresses-container" class="content ${this.activeSection === "shipping-addresses" ? "active" : ""}">
            <h1> Shipping Addresses</h1>
        </div>
        <div id="payment-information-container" class="content ${this.activeSection === "payment-information" ? "active" : ""}">
            <h1> Payment Information</h1>
        </div>
        <div id="order-history-container" class="content ${this.activeSection === "order-history" ? "active" : ""}">
            <h1> Order History</h1>
        </div>
        <div id="account-settings-container" class="content ${this.activeSection === "account-settings" ? "active" : ""}">
            <h1> Account Settings</h1>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      all: initial;
      display: flex;
      height: 100%;
    }

    .sidebar {
      margin: 1rem;
      background-color: antiquewhite;
      border-radius: 1rem;
      height: 100%;
    }

    .sidebar ul {
      list-style: none;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .sidebar ul li,
    .sidebar button {
      cursor: pointer;
      padding: 0.6rem 0.45rem;
      border-radius: 0.5rem;
      border: none;
    }

    .sidebar .active {
      background-color: wheat;
    }

    .sidebar ul :hover {
      background-color: grey;
    }

    .content-container {
      flex-grow: 1;
      padding: 1rem;
    }

    .content {
      display: none;
    }

    .content.active {
      display: block;
    }
  `;
}
