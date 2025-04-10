import {Product, ProductInCart} from "../constants/GlobalTypes";

export function convertToPascalCase(...words: string[]): string {
        return words
            .join("") 
            .split(/[-_\s]+/) 
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" "); 
}

export function calculateDisPrice(product : Product | ProductInCart): number {
    return Number((product.price - (product.price * product.discountPercentage / 100)).toFixed(2));
}

export function mapProductToCart(product: Product, quantity: number): ProductInCart {
    const total = product.price * quantity;
    const discountedTotal = (total - (total * product.discountPercentage) / 100);
  
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      total,
      discountPercentage: product.discountPercentage,
      discountedTotal,
      thumbnail: product.thumbnail,
    };
  }
  