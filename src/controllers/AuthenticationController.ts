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
            sessionStorage.setItem("token", reponse.accessToken);
            console.log("", reponse);
            this.loginSuccessfull = true;
        }
        catch(e){
            
        }
    }
}


type User = {
    username:string;
    password:string;
}