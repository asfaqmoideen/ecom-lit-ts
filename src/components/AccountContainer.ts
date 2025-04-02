import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, userContext } from "../contexts/GlobalContexts";
import { User } from "../constants/GlobalTypes";
import "./loginContainer";
import { ecommerceProfileSections } from "../constants/appconstants";
import { convertToPascalCase } from "../services/helperMethods";
import './OverlayModal'
import { Router } from "@vaadin/router";
@customElement("account-container")
export class AccountContainer extends LitElement {
  @consume({ context: loggedInContext }) @state() loggedIn?: boolean;
  @consume({ context: userContext }) @state() user?: User 
  @state() activeSection: string = "personal-information";
  @state() isLogoutModalVisible :boolean = false;

    connectedCallback(): void {
        super.connectedCallback();
        if(!this.loggedIn){
            Router.go('/login');
        }
    }

  handleLogout(){
    this.dispatchEvent(new CustomEvent("logout-confirm", {
      detail : {logoutRequest : true},
      bubbles: true,
      composed: true,
    }))
    this.loggedIn = false;
    this.toogleLogoutModal();
    Router.go("/");
  }

  toogleLogoutModal(){
    this.isLogoutModalVisible = !this.isLogoutModalVisible;
  }
  switchContent(id: string) {
    this.activeSection = id;
    this.requestUpdate();
  }

  isActiveSection(divID: string): string {
    return this.activeSection === divID ? "active" : "";
  }

  render() {
    return html`
      ${this.isLogoutModalVisible ? html`
        <overlay-modal modalTitle="Are you sure to logout ?" @close-clicked=${this.toogleLogoutModal}>
            <button @click=${this.handleLogout} class="logout-btn">Yes</button>
            <button @click=${this.toogleLogoutModal} class="logout-btn">No</button>
        </overlay-modal>` 
        : html``}
      <div class="account-container">
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
          </ul>
          <button class="logout-button" @click=${this.toogleLogoutModal}>Logout</button>
        </div>
        <div class="content-container">
          <div
            id="personal-information-container"
            class="content ${this.isActiveSection("personal-information")}"
          >
            <h2>Personal Information</h2>
            <div class="profile-details">
              <!-- <img src="${this.user?.image}" alt="User profile" class="profile-image"/> -->
              <div class="profile-info">
                <p><strong>First Name:</strong> ${this.user?.firstName}</p>
                <p><strong>Last Name:</strong> ${this.user?.lastName}</p>
                <p><strong>Username:</strong> ${this.user?.username}</p>
                <p><strong>Gender:</strong> ${this.user?.gender}</p>
                <p><strong>Phone:</strong> ${this.user?.phone}</p>
                <p><strong>Email:</strong> ${this.user?.email}</p>
              </div>
            </div>
          </div>
          <div
            id="billing-addresses-container"
            class="content ${this.isActiveSection("billing-addresses")}"
          >
            <h2>Billing Addresses</h2>
            <div class="address-details">
              <p><strong>Address:</strong> ${this.user?.address?.address}</p>
              <p><strong>City:</strong> ${this.user?.address?.city}</p>
              <p><strong>State:</strong> ${this.user?.address?.state}</p>
              <p><strong>Postal Code:</strong> ${this.user?.address?.postalCode}</p>
              <p><strong>Country:</strong> ${this.user?.address?.country}</p>
            </div>
          </div>
          <div
            id="shipping-addresses-container"
            class="content ${this.isActiveSection("shipping-addresses")}"
          >
            <h2>Shipping Addresses</h2>
            <div class="address-details">
              <p><strong>Address:</strong> ${this.user?.address?.address}</p>
              <p><strong>City:</strong> ${this.user?.address?.city}</p>
              <p><strong>State:</strong> ${this.user?.address?.state}</p>
              <p><strong>Postal Code:</strong> ${this.user?.address?.postalCode}</p>
              <p><strong>Country:</strong> ${this.user?.address?.country}</p>
            </div>
          </div>
          <div
            id="payment-information-container"
            class="content ${this.isActiveSection("payment-information")}"
          >
            <h2>Payment Information</h2>
            <div class="payment-details">
              <p><strong>Card Type:</strong> ${this.user?.bank?.cardType}</p>
              <p><strong>Card Number:</strong> ${this.user?.bank?.cardNumber}</p>
              <p><strong>Card Expire:</strong> ${this.user?.bank?.cardExpire}</p>
              <p><strong>Currency:</strong> ${this.user?.bank?.currency}</p>
            </div>
          </div>
      </div>
    `;
  }

  static styles = css`
    .account-container {
        display:flex;
        width:100%;
        height:100%;
    }
    .sidebar {
      margin: 1rem;
        background-color: #546E7A;
      border-radius: 8px;
      min-width: 220px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
    }

    .sidebar ul {
      list-style: none;
      padding:0;
      display: flex;
      flex-direction: column;
      align-items:center;
      
    }

    .sidebar ul li {
      cursor: pointer;
      padding:1rem;
      text-align: left;
      width:100%;
    }

    .logout-button{
      border-radius: 1rem;
      justify-self: flex-end;
      padding:.5rem;
      width:90%;
      border: none;
      margin:1rem;
      cursor: pointer;
    }

    .logout-btn{
      border-radius: 1rem;
      padding:.5rem;
      width:4rem;
      border: none;
      margin:1rem;
      cursor: pointer;
    }

    .sidebar .active {
      background-color: #d0d0d0;
      border-radius:1rem;
    }

    .sidebar ul li:hover, .sidebar .logout-button:hover{
        background-color: #c0c0c0;
        border-radius:1rem;
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

    .profile-details, .address-details, .payment-details{
        display:flex;
        gap: 1rem;
    }

    .profile-info, .address-details, .payment-details{
        display:flex;
        flex-direction:column;
        gap: 0.5rem;
    }

  `;
}