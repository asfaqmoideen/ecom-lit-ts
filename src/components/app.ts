import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './CustomHeader'
import './CustomFooter'
import './HomeContainer'
import './AccountContainer'
import './CartContianer'

@customElement('ecom-root')
export class EcomRoot extends LitElement {

  @state()
  currentPage : string = 'home';

  private handleNavClick(event : CustomEvent){
    this.currentPage = event.detail.id;
  }

  render() {
    switch(this.currentPage) {
      case "home":
        return html` 
          <custom-header @nav-clicked=${this.handleNavClick}></custom-header>
          <home-container></home-container>
          <custom-footer></custom-footer>`

      case "cart":
        return html`
          <custom-header @nav-clicked=${this.handleNavClick}></custom-header>
          <cart-container></cart-container>
          <custom-footer></custom-footer>`

      case "account":
        return html`
        <custom-header @nav-clicked=${this.handleNavClick}></custom-header>
        <account-container></account-container>
        <custom-footer></custom-footer>
        `
    }
  }


  static styles = css`
    :host {
      height : 100vh;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
    }
    
  `
}
