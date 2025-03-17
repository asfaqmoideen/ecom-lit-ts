import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"
import { AppTitle } from "../constants/appconstants";
import { AuthenticationController } from "../controllers/AuthenticationController";

@customElement("login-container")
export class LoginContainer extends LitElement {

    @state() private isLoginMode: boolean = true;
    @state() private loginError: string = "";
    @state() private signupError: string = "";
    
    private auth = new AuthenticationController();

    private handleLogin(event: Event) {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement | null;

        if (!form || !(form instanceof HTMLFormElement)) {
            this.loginError = "Form submission error.";
            return;
        }

        const formData = new FormData(form);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        
        this.auth.login({username, password});
        console.log("Login Form Data:", { username, password });
        this.loginError = "";
    }

    private handleSignUp(event: Event) {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement | null;

        if (!form || !(form instanceof HTMLFormElement)) {
            this.signupError = "Form submission error.";
            return;
        }

        const formData = new FormData(form);
        const username = formData.get("name") as string;
        const password = formData.get("npassword") as string;
        const confirmPassword = formData.get("fpassword") as string;

        if (password !== confirmPassword) {
            this.signupError = "Passwords do not match.";
            return;
        }

        console.log("Signup Form Data:", { username, password });
        this.signupError = "";
    }

    private switchMode() {
        this.isLoginMode = !this.isLoginMode;
        this.loginError = "";
        this.signupError = "";
    }

    render() {
        return html`
            <div class="imageDiv">
                <img src=${AppTitle.logoPath} alt="Company Logo" class="mainlogo" />
                <h2>${AppTitle.title}</h2>
            </div>

            ${this.isLoginMode ? this.renderLoginForm() : this.renderSignupForm()}
        `;
    }

    private renderLoginForm() {
        return html`
            <div class="login-container">
                <form id="login-form" @submit=${this.handleLogin}>
                    <h3>Sign In</h3>
                    <div class="form-group">
                        <label for="username">User Name</label>
                        <input type="text" name="username" id="username" placeholder="Enter username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter password" required>
                    </div>
                    <p class="error">${this.loginError}</p>
                    <button type="submit" class="btn">Sign In</button>
                    <p>Don't have an account? <span @click=${this.switchMode} class="switch-text">Sign Up</span></p>
                </form>
            </div>`;
    }

    private renderSignupForm() {
        return html`
            <div class="login-container">
                <form id="signup-form" @submit=${this.handleSignUp}>
                    <h3>Register</h3>
                    <div class="form-group">
                        <label for="name">User Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="npassword">Password</label>
                        <input type="password" name="npassword" id="npassword" placeholder="Create a password" required>
                    </div>
                    <div class="form-group">
                        <label for="fpassword">Retype Password</label>
                        <input type="password" name="fpassword" id="fpassword" placeholder="Confirm password" required>
                    </div>
                    <p class="error">${this.signupError}</p>
                    <button type="submit" class="btn">Register</button>
                    <p>Already have an account? <span @click=${this.switchMode} class="switch-text">Sign In</span></p>
                </form>
            </div>`;
    }
    static styles = 
        css`
            :host {
                all:initial;
                display: flex;
                align-items:center;
                flex-wrap:wrap;
                width:100%;
                height:100vh;
                justify-content:space-around;
                position: fixed;
                z-index: 100;
                top:0;
                left:0;
                background-color:white;
            }
            
            form{
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
                padding: 2rem;
            }

            .mainlogo{
                width: 100%;
                max-width: 300px; 
                height: auto; 
                object-fit: cover; 
            }

            .form-group{
                display: flex;
                flex-direction: column;
            }

            .login-container{
                background: whitesmoke;
                max-height: max-content;
                border-radius: 1rem;
            }

            .signspan{
                color: blue; 
                font-weight: bold;
                cursor: pointer;
            }
            .btnclass, input{
                padding: 10px;
                font-size: 14px;
                border: 1px solid #ccc;
                border-radius: 8px;
                width: 20em;
            }
            button{
                cursor: pointer;
            }
            .imageDiv{
                display: flex;
                flex-direction:column;
                align-items:center;
            }
            
            button {
            width: 45%;
            padding: 0.6rem;
            border: none;
            border-radius: 0.4rem;
            background:rgb(5, 201, 116);
            color: white;
            cursor: pointer;
            margin-top: 0.8rem;
            transition: background 0.4s ease-in-out;
            }

            button:hover {
            background:rgb(80, 174, 133);
            }

            .switch-text {
            color: blue;
            font-weight: bold;
            cursor: pointer;
        }
        `;
}

declare global {
    interface HTMLElementTagNameMap {
        "loginContainer": LoginContainer;
    }
}
