import { LitElement, html, css } from "lit";
import { customElement, state} from "lit/decorators.js";
import { consume } from "@lit/context";
import { loggedInContext, userContext } from "../contexts/GlobalContexts";
import { User } from "../constants/GlobalTypes";
import { Router } from "@vaadin/router";
import './loginContainer';


@customElement("account-container")
export class AccountContainer extends LitElement{

    @consume({context: loggedInContext}) @state() loggedIn? : boolean;
    @consume({context: userContext}) @state() user? : User;

    connectedCallback(): void {
        super.connectedCallback();
            if(!this.loggedIn){
                Router.go('/login');
            }    
    }
    render(){
        return html`<h1> ${this.user?.firstName} </h1>`
    }

    static styles = css`
        :host{ 
        all : initial;
        flex:1;
        padding:1rem;
        }

    `
}



