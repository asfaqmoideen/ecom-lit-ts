import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement("custom-footer")
export class CustomFooter extends LitElement{

    render(){
        return html `
        <div>
        <p>Company Title</p>
        </div>`;
    }

    static styles = css`
        :host{ 
            all : initial;
            background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
        }
        div{   
            padding-inline : 0.8rem ;
            display : flex;
            justify-content : space-between;
            align-items:center;
        }
    `
}


