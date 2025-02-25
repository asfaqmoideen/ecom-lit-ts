import { LitElement, html, css } from "lit";
import { customElement, state, property, eventOptions } from "lit/decorators.js";


@customElement('overlay-modal')
export class OverlayModal extends LitElement {

    @property({ attribute: true })
    private modalTitle : string = "Title";

    private handleCloseButton() {
        this.dispatchEvent(new CustomEvent("close-clicked", {
            bubbles: true,
            composed: true,
        }))
    }
    render(){
        return html`
         <div class="overlay" @click=${this.handleCloseButton}>
                    <div class="modal" @click=${(event :Event)=>{event.stopPropagation()}}>
                        <div class="headgrp">
                            <h2>${this.modalTitle}</h2>
                            <button class="close" @click=${this.handleCloseButton}>✖️</button>
                        </div>
                        <slot>
                        </slot>
                    </div>
        </div>
        `
    }

    static styles = css`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      min-width: 300px;
      max-width : 600px;
      max-height : 400px;
      text-align: center;
      overflow-y :auto;
    }

    .headgrp{
    display :flex;
    justify-content : space-between;
    }
    .close{
    border:none;
    background : none;
    cursor:pointer;
    }`
}