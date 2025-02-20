import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";


@customElement("ecom-sidebar")
export class SidebarContainer extends LitElement{

    render(){
        return html `
        <div>
        
        </div>`;
    }

    static styles = css`
        :host{ 
            all : initial;
            background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
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


