export class APIService{

  private baseURL : string = "https://dummyjson.com";
  
    async tryFetchingData(endpoint :string){
      try {
        const response = await fetch(`${this.baseURL}/${endpoint}`, { method: "GET" });
        
        if (!response.ok) {
          throw new Error("Unable to Fetch");
        }
        return response.json();
      } catch (e) {
        console.log(e);
      }
    }
  
    async getAllProducts() {
      return await this.tryFetchingData('products?limit=0');
    }
  
  
    async searchProduct(productname :string) {
      return this.tryFetchingData(`products/search?q=${productname}&limit=0`);
    }
  
    async getProducts(limit :number, skip:number){
      return await this.tryFetchingData(`products?limit=${limit}&skip=${skip}`)
    }

    async getProductCategories(){
      return await this.tryFetchingData(`products/category-list`)
    }

    async getProductsByCategory(category :string) {
      return await this.tryFetchingData(`products/category/${category}?limit=0`)
    }

    async getProductById(productID :number){
      return await this.tryFetchingData(`products/${productID}`)
    }

    async getSortedProducts(type:string, orderby:string){
      return await this.tryFetchingData(`products/?sortBy=${type}&order=${orderby}`)
    } 

    async getUserCart(id :number){
      return await this.tryFetchingData(`carts/${id}`)
    }
}