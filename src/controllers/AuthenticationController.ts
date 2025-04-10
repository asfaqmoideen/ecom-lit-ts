import { LoginAPIService } from "../services/LoginService";
import { UserCredentials } from "../constants/GlobalTypes";
export class AuthenticationController{

    private loginService: LoginAPIService;

    public loginSuccessfull:boolean = false;

    constructor(){
        this.loginService = new LoginAPIService();
    }

    
    public async login(user :UserCredentials){
        try{
            const reponse = await this.loginService.tryLogin(user);
            sessionStorage.setItem("token", reponse.accessToken);
            sessionStorage.setItem("refreshToken", reponse.refreshToken);
            this.loginSuccessfull = true;
            return this.loginSuccessfull;
        }
        catch(e){
            throw e;
        }
    }

    public async authenticate(){
        try{
            const response = await this.loginService.tryAuthenticatingUser(sessionStorage.getItem("token"));
            this.scheduleTokenRefresh();
            return response;
        }
        catch(e){
            throw e;
        }
    }

    public async scheduleTokenRefresh() {
        setTimeout(async () => {
            document.addEventListener("visibilitychange", async () => {
                if (document.visibilityState === "visible") {
                    console.log("Tab is active, trying to refresh token");
                    await this.tokenRefresh(); 
                } else {
                    console.log("Tab is inactive, logged out");
                }
            });
            this.scheduleTokenRefresh();
        }, (this.loginService.expireInMins-1) * 60000);
    }

    public async tokenRefresh(){
        try{
            await this.loginService.tryRefreshingUserToken(sessionStorage.getItem("refreshToken"));
        }
        catch(e){
            throw e;
        }
    }
}
