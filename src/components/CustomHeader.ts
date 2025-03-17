import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { AppTitle, headerItems } from "../constants/appconstants";
import "./MasterSearch";


@customElement("custom-header")
export class CustomHeader extends LitElement{

    private handleTitleClick(){
        document.location.href = "./";
    }
    
    render(){
    return html `
    <h2 @click=${this.handleTitleClick}><img src=${AppTitle.logoPath} class="headerimg" alt="Logo" /> ${AppTitle.title}</h2>
    <ecom-headersearch></ecom-headersearch>
    <ul>
        
        ${headerItems.map(item => (html`<a href=${item.href}>${item.name}</a>`))}
    </ul>
        `;
    }

    static styles = css`
        :host{ all : initial; 
            padding-inline : 2rem;
            display : flex;
            justify-content : space-between;
            align-items : center;
            color: white;
            background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
        }

        ul{
            list-style:none;
            padding:0;
            margin :0;
        }
        a{
            display:inline;
            padding-inline : .8rem;
            color: white;
            font-weight:bold;
            cursor: pointer;
            text-decoration: none;
        }
        h2{
        display : flex;
        align-items :center;
        cursor:pointer;
        }
        
        .headerimg{
        heigth: 2rem;
        width :2rem;
        margin : 0 .5rem ;
        }
    `
}


