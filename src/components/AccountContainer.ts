import { LitElement, html, css } from "lit";
import { customElement, state} from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, userContext } from "../contexts/GlobalContexts";
import { User } from "../constants/GlobalTypes";
import { Router } from "@vaadin/router";
import './loginContainer';
import { ecommerceProfileSections } from "../constants/appconstants";
import { convertToPascalCase } from "../services/helperMethods";


@customElement("account-container")
export class AccountContainer extends LitElement{

    @consume({context: loggedInContext}) @state() loggedIn? : boolean;
    @consume({context: userContext}) @state() user? : User;

    connectedCallback(): void {
        super.connectedCallback();
            // if(!this.loggedIn){
            //     Router.go('/login');
            // }    
    }
    render(){
        return html`
            <div class="sidebar">
                <ul>
                    ${ecommerceProfileSections.map(s=> html`<li id="${s}" >${convertToPascalCase(s)}</li>`)}
                    <button>Logout</button>
                </ul>
            </div>
            <div id="personal-information-container" class="active">
                <img src="${this.user?.image}" alt="User Profile Picture" />
            </div>
            <div id="shipping-addresses-container">

            </div>
            <div id="billing-addresses-container">

            </div>
            <div id="payment-information-container">

            </div>
            <div id="order-history-container">

            </div>
            <div id="account-settings-container">

            </div>
            `
    }

    static styles = css`
        :host{ 
        all : initial;
        display:flex;
        height:100%;
        }

        .sidebar{
            margin:1rem;
            background-color:antiquewhite;
            border-radius: 1rem;
            height:100%;
        }

        .sidebar ul{
            list-style: none;
            padding: 1rem;
            display:flex;
            flex-direction:column;
            gap:1rem;
        }

        .sidebar ul li, .sidebar button{
            cursor: pointer;
            padding: .6rem .45rem ;
            border-radius: .5rem;
            border:none;
        }

        .sidebar .active{
            background-color:wheat;
        }
        .sidebar ul :hover{
            background-color:grey;
        }

    `
}



