import {Product} from "../constants/GlobalTypes";

export function convertToPascalCase(...words: string[]): string {
        return words
            .join("") 
            .split(/[-_\s]+/) 
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" "); 
}

export function calculateDisPrice(product : Product): number {
    return Number((product.price - (product.price * product.discountPercentage / 100)).toFixed(2));
}