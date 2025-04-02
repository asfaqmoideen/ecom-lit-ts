import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js"
import { AppTitle } from "../constants/appconstants";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { consume } from "@lit/context";
import { loggedInContext } from "../contexts/GlobalContexts";
import './CustomButton'
@customElement("login-container")
export class LoginContainer extends LitElement {
  @state() private isLoginMode = true;
  @consume({ context: loggedInContext }) loggedIn?: boolean;

  private auth = new AuthenticationController();
  
  private async handleLogin(event: Event) {
    event.preventDefault();
    try {
      const form = event.currentTarget as HTMLFormElement;
      if (!form) throw new Error("Invalid Form Submission");

      const formData = new FormData(form);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      this.auth.login({ username, password });
      const user = await this.auth.authenticate();
      this.dispatchEvent(new CustomEvent('update-login', {
        detail: { status: true, user },
        bubbles: true,
        composed: true
      }));

      history.back();
    } catch (error) {
      this.setError("signin-error", (error as Error).message);
    }
  }

  private handleSignUp(event: Event) {
    event.preventDefault();
    try {
      const form = event.currentTarget as HTMLFormElement;
      if (!form) throw new Error("Invalid Form Submission");

      const formData = new FormData(form);
      const username = formData.get("name") as string;
      const password = formData.get("npassword") as string;
      const confirmPassword = formData.get("fpassword") as string;

      if (password !== confirmPassword) throw new Error("Passwords do not match");
    } catch (error) {
      this.setError("signup-error", (error as Error).message);
    }
  }

  private switchMode() {
    this.isLoginMode = !this.isLoginMode;
  } 

  private setError(id: string, message: string) {
    const errorElement = this.shadowRoot?.getElementById(id);
    if (errorElement) errorElement.textContent = message;
    setTimeout(() => { if (errorElement) errorElement.textContent = ""; }, 2000);
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
            <input type="text" name="username" id="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" required>
          </div>
          <button type="submit">Sign In</button>
          <p>Don't have an account? <span @click=${this.switchMode}>Sign Up</span></p>
          <p id="signin-error" class="error"></p>
        </form>
      </div>
    `;
  }

  private renderSignupForm() {
    return html`
      <div class="login-container">
        <form id="signup-form" @submit=${this.handleSignUp}>
          <h3>Register</h3>
          <div class="form-group">
            <label for="name">User Name</label>
            <input type="text" name="name" id="name" required>
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" name="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="npassword">Password</label>
            <input type="password" name="npassword" id="npassword" required>
          </div>
          <div class="form-group">
            <label for="fpassword">Retype Password</label>
            <input type="password" name="fpassword" id="fpassword" required>
          </div>
          <button type="submit">Register</button>
          <p>Already have an account? <span @click=${this.switchMode}>Sign In</span></p>
          <p id="signup-error" class="error"></p>
        </form>
      </div>
    `;
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
                padding:.5rem;
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
          
            button {
            padding: 0.6rem;
            border: none;
            border-radius: .8rem;
            background-color:#546E7A;
            color: white;
            cursor: pointer;
            margin-top: 0.8rem;
            transition: background 0.4s ease-in-out;
            }

            button:hover {
            background:#37474F;
            }
            .imageDiv{
                display: flex;
                flex-direction:column;
                align-items:center;
            }

            .switch-text {
            color: blue;
            font-weight: bold;
            cursor: pointer;
            }
            .error{
                color:red;
            }
            `
        ;
}
