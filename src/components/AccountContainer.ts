import { LitElement, html, css } from "lit";
import { customElement, state, property, } from "lit/decorators.js";




@customElement("account-container")
export class AccountContainer extends LitElement{

    
    render(){
        return html `
        <h1> Account </h1>
       `
    }

    static styles = css`
        :host{ 
        all : initial;
        flex:1;
        margin:1rem;
        }

    `
}



