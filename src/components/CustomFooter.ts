import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { AppTitle } from "../constants/appconstants";

@customElement("custom-footer")
export class CustomFooter extends LitElement{

    render(){
        return html `
        <div>
        <p>Copyrights @ ${AppTitle.title}  ${new Date().getFullYear()}</p>
        </div>`;
    }

    static styles = css`
        :host{ 
            all : initial;
            background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
            width :100%;
        }
        p{
        padding : 0;
        }
        div{   
            width :100%;
            display : flex;
            justify-content : center;
            align-items:center;
        }
    `
}


