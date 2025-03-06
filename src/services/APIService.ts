export class APIService{

    private baseURL : string = "https://dummyjson.com/products";
    
      async tryFetchingData(url :string) {
        try {
          const response = await fetch(url, { method: "GET" });
          
          if (!response.ok) {
            throw new Error("Unable to Fetch");
          }
          return response.json();
        } catch (e) {
          console.log(e);
        }
      }
    
      async getAllProducts() {
        return await this.tryFetchingData(`${this.baseURL}`);
      }
    
      async sortProducts(value :number, order :number) {
        return await this.tryFetchingData(
          `${this.baseURL}?sortBy=${value}&order=${order}`
        );
      }

      async filterProducts(filter :number, value :number) {
        return await this.tryFetchingData(
          `${this.baseURL}/filter?key=${filter}&value=${value}`
        );
      }
    
      async searchProduct(productname :string) {
        return this.tryFetchingData(`${this.baseURL}/search?q=${productname}`);
      }
    
      async getProducts(limit :number, skip:number){
        return await this.tryFetchingData(`${this.baseURL}?limit=${limit}&skip=${skip}`)
      }

      async getProductCategories(){
        return await this.tryFetchingData(`${this.baseURL}/category-list`)
      }

      async getProductsByCategory(category :string) {
        return await this.tryFetchingData(`${this.baseURL}/category/${category}`)
      }

      async getProductById(id : number){
        return await this.tryFetchingData(`${this.baseURL}/product/${id}`)
      }
}