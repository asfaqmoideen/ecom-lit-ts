export class APIService{

  private baseURL : string = "https://dummyjson.com/products";
  
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
      return await this.tryFetchingData('?limit=0');
    }
  
  
    async searchProduct(productname :string) {
      return this.tryFetchingData(`search?q=${productname}&limit=0`);
    }
  
    async getProducts(limit :number, skip:number){
      return await this.tryFetchingData(`?limit=${limit}&skip=${skip}`)
    }

    async getProductCategories(){
      return await this.tryFetchingData(`category-list`)
    }

    async getProductsByCategory(category :string) {
      return await this.tryFetchingData(`category/${category}?limit=0`)
    }

    async getProductById(productID :number){
      return await this.tryFetchingData(`${productID}`)
    }

    
}