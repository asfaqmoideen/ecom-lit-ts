import { LitElement, html, css } from "lit";
import { customElement} from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, userContext } from "../contexts/GlobalContexts";
import { User } from "../constants/GlobalTypes";
import './loginContainer';


@customElement("account-container")
export class AccountContainer extends LitElement{

    @consume({context: loggedInContext}) loggedIn? : boolean;
    @consume({context: userContext}) user? : User;
    render(){
        return html `
        ${this.loggedIn ? 
        html`<h1> ${this.user?.firstName} </h1>`:  
        html`<login-container></login-container>`
        }
       `
    }

    static styles = css`
        :host{ 
        all : initial;
        flex:1;
        padding:1rem;
        }

    `
}



