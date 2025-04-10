
import { Product, Cart } from '../constants/GlobalTypes';
import { mapProductToCart } from './helperMethods';

export class CartService {
  static addToCart(cart: Cart, product: Product, quantity: number): Cart {
    const index = cart.products.findIndex(p => p.id === product.id);
    let updatedProducts;

    if (index !== -1) {
      updatedProducts = [...cart.products];
      updatedProducts[index].quantity = quantity;
    } else {
      const productToCart = mapProductToCart(product, quantity);
      updatedProducts = [...cart.products, productToCart];
    }

    return this.recalculateCart({ ...cart, products: updatedProducts });
  }

  static removeFromCart(cart: Cart, productId: number): Cart {
    const updatedProducts = cart.products.filter(p => p.id !== productId);
    return this.recalculateCart({ ...cart, products: updatedProducts });
  }

  static updateQuantity(cart: Cart, productId: number, quantity: number): Cart {
    const updatedProducts = cart.products.map(p =>
      p.id === productId ? { ...p, quantity } : p
    );
    return this.recalculateCart({ ...cart, products: updatedProducts });
  }

  private static recalculateCart(cart: Cart): Cart {
    cart.products = cart.products.map(p => {
      const total = p.price * p.quantity;
      const discountedTotal = +(total * (1 - p.discountPercentage / 100)).toFixed(2);
      return { ...p, total, discountedTotal };
    });
  
    cart.total = +(cart.products.reduce((sum, p) => sum + p.total, 0)).toFixed(2);
    cart.discountedTotal = +(cart.products.reduce((sum, p) => sum + p.discountedTotal, 0)).toFixed(2);
    cart.totalProducts = cart.products.length;
    cart.totalQuantity = cart.products.reduce((sum, p) => sum + p.quantity, 0);
    console.log(cart);
    return cart;
  }
  
}
