import { createContext } from '@lit/context';
import { Product, User } from '../constants/GlobalTypes';


export const loggedInContext = createContext<boolean>('logged-in');
export const userContext = createContext<User>('user');
export const cartContext = createContext<{ items: Product[] }>('cart');

