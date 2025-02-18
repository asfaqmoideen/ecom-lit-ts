import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './CustomHeader'
import './CustomFooter'
import './CustomContainer'

@customElement('ecom-root')
export class EcomRoot extends LitElement {


  @property({ type: Number })
  count = 0

  render() {
    return html`
      <custom-header></custom-header>

      <custom-container></custom-container>
      `
      // <custom-footer></custom-footer>
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
