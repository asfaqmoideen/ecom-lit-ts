import { LoginAPIService } from "../services/LoginService";
export class AuthenticationController{

    private loginService: LoginAPIService;

    public loginSuccessfull:boolean = false;

    constructor(){
        this.loginService = new LoginAPIService();
    }
    public async login(user :User){
        try{
            const reponse = await this.loginService.tryLogin(user);
            console.log("", reponse);
            sessionStorage.setItem("token", reponse.accessToken);
            sessionStorage.setItem("refreshToken", reponse.refreshToken);
            this.authenticate();
            this.loginSuccessfull = true;
        }
        catch(e){
            
        }
    }

    public async authenticate(){
        try{
            const response = await this.loginService.tryAuthenticatingUser(sessionStorage.getItem("token"));
            console.log(response);
        }
        catch(e){

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
        }, this.loginService.expireInMins-1 * 60000);
    }

    public async tokenRefresh(){
        try{
            const response = await this.loginService.tryRefreshingUserToke(sessionStorage.getItem("refreshToken"));
            console.log(response);
        }
        catch(e){

        }
    }
}


type User = {
    username:string;
    password:string;
}