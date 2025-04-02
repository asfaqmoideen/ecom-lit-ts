import { Product, User } from "./GlobalTypes";

export const AppTitle = {
    title : "ByteBazaar",
    logoPath : "/public/image.png"
}

export const headerItems  = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "🛒Cart",
        href: "/cart",
    },
    {
        name: "👤Account",
        href: "/account"
    }
]

export const sortableFields: (keyof Product)[] = [
    "category",
    "price",
    "discountPercentage",
    "rating",
    "stock",
    "brand",
    "weight",
    "minimumOrderQuantity",
  ];
  
 export const filterableFields: (keyof Product)[] = [
    "id",
    "title",
    "category",
    "price",
    "discountPercentage",
    "rating",
    "stock",
    "tags",
    "brand",
    "sku",
    "weight",
    "availabilityStatus",
    "minimumOrderQuantity",
  ];

  export const ecommerceProfileSections: string[] = [
    "personal-information",
    "shipping-addresses",
    "billing-addresses",
    "payment-information",
  ];

 