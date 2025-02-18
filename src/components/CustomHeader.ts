import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { headerItems } from "../constants/appconstants";
import "./HeaderSearch";


@customElement("custom-header")
export class CustomHeader extends LitElement{

    render(){
        return html `
    <h2><img src="/public/image.png" class="headerimg" alt="Logo" /> SamrtEcom</h2>
    <ecom-headersearch></ecom-headersearch>
    <ul>
        ${headerItems.map(item => (html`<li> <a href =${item.href} />${item.name} </li>`))}
    </ul>
        `;
    }

    static styles = css`
        :host{ all : initial; 
            padding-inline : 5rem;
            display : flex;
            justify-content : space-between;
            align-items : center;
            color: white;
            background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
            margin :1rem;
            border-radius :1.5rem;
            font-family : roboto;
        }

        ul{
            list-style:none;
            padding:0;
            margin :0;
        }
        li{
            display:inline;
            padding-inline : .8rem;
        }
        ul a{
        color: white;
        font-weight:bold;
        text-decoration:none;
        }
        h2{
        display : flex;
        align-items :center;
        }
        .headerimg{
        heigth: 2rem;
        width :2rem;
        margin : 0 .5rem ;
        }
    `
}


