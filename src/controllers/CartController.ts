import { Cart } from "../constants/GlobalTypes";
import { APIService } from "../services/APIService";


export class CartController{

    private api = new APIService();

    async getUserCart(id:number){
        try{
            const cart = await this.api.getUserCart(id) as Cart;
            return cart;
        }
        catch(e){
            console.log(e);
        }
    }
}