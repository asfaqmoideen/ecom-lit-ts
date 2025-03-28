import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, userContext } from "../contexts/GlobalContexts";
import { User } from "../constants/GlobalTypes";
import "./loginContainer";
import { ecommerceProfileSections } from "../constants/appconstants";
import { convertToPascalCase } from "../services/helperMethods";
import { Router } from "@vaadin/router";

@customElement("account-container")
export class AccountContainer extends LitElement {
  @consume({ context: loggedInContext }) @state() loggedIn?: boolean;
  @consume({ context: userContext }) @state() user?: User;
  @state() activeSection: string = "personal-information";


  connectedCallback(): void {
    super.connectedCallback();
    if(!this.loggedIn){
        Router.go('/login');
    }
    console.log(this.user);
    
}
  switchContent(id: string) {
    this.activeSection = id;
    this.requestUpdate();
  }

  isActiveSection(divID : string): string{
    return this.activeSection === divID ? "active" : "";
  }
  render() {
    return html`
      <div class="sidebar">
        <ul>
          ${ecommerceProfileSections.map(
            (s) => html`
              <li
                id="${s}"
                class="${this.isActiveSection(s)}"
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
              class="content ${this.isActiveSection(s)}"
            >
            <p>Content for ${convertToPascalCase(s)}</p>
            </div>
          `
          
        )} -->
        <div id="personal-information-container" class="content ${this.isActiveSection("personal-information")}">
            <h1> Personal Information</h1>
            <div class="container">
                <img src="${this.user?.image}" alt="User profile"/>
                <p> First Name${this.user?.firstName} </p>
                <p> Second Name ${this.user?.firstName} </p>
                <p> ${this.user?.firstName} </p>
            </div> 
        </div>
        <div id="billing-addresses-container" class="content ${this.isActiveSection("billing-addresses")}">
            <h1> Billing Addresses</h1>
        </div>
        <div id="shipping-addresses-container" class="content ${this.isActiveSection("shipping-addresses")}">
            <h1> Shipping Addresses</h1>
        </div>
        <div id="payment-information-container" class="content ${this.isActiveSection("payment-information")}">
            <h1> Payment Information</h1>
        </div>
        <div id="order-history-container" class="content ${this.isActiveSection("order-history")}">
            <h1> Order History</h1>
        </div>
        <div id="account-settings-container" class="content ${this.isActiveSection("account-settings")}">
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
