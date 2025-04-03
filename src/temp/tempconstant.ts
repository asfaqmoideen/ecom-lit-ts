import { Cart, User } from "../constants/GlobalTypes";

export const sampleUser1 = {  
    "id": 1,
    "firstName": "Emily",
    "lastName": "Johnson",
    "maidenName": "Smith",
    "age": 28,
    "gender": "female",
    "email": "emily.johnson@x.dummyjson.com",
    "phone": "+81 965-431-3024",
    "username": "emilys",
    "password": "emilyspass",
    "birthDate": "1996-5-30",
    "image": "https://dummyjson.com/icon/emilys/128",
    "bloodGroup": "O-",
    "height": 193.24,
    "weight": 63.16,
    "eyeColor": "Green",
    "hair": {
      "color": "Brown",
      "type": "Curly"
    },
    "ip": "42.48.100.32",
    "address": {
      "address": "626 Main Street",
      "city": "Phoenix",
      "state": "Mississippi",
      "stateCode": "MS",
      "postalCode": "29112",
      "coordinates": {
        "lat": -77.16213,
        "lng": -92.084824
      },
      "country": "United States"
    },
    "macAddress": "47:fa:41:18:ec:eb",
    "university": "University of Wisconsin--Madison",
    "bank": {
      "cardExpire": "03/26",
      "cardNumber": "9289760655481815",
      "cardType": "Elo",
      "currency": "CNY",
      "iban": "YPUXISOBI7TTHPK2BR3HAIXL"
    },
    "company": {
      "department": "Engineering",
      "name": "Dooley, Kozey and Cronin",
      "title": "Sales Manager",
      "address": {
        "address": "263 Tenth Street",
        "city": "San Francisco",
        "state": "Wisconsin",
        "stateCode": "WI",
        "postalCode": "37657",
        "coordinates": {
          "lat": 71.814525,
          "lng": -161.150263
        },
        "country": "United States"
      }
    },
    "ein": "977-175",
    "ssn": "900-590-289",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    "crypto": {
      "coin": "Bitcoin",
      "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
      "network": "Ethereum (ERC20)"
    },
    "role": "admin"
  } as User

  export const sampleCart1 = {
    "id": 1,
    "products": [
      {
        "id": 168,
        "title": "Charger SXT RWD",
        "price": 32999.99,
        "quantity": 3,
        "total": 98999.97,
        "discountPercentage": 13.39,
        "discountedTotal": 85743.87,
        "thumbnail": "https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png"
      },
      {
        "id": 78,
        "title": "Apple MacBook Pro 14 Inch Space Grey",
        "price": 1999.99,
        "quantity": 2,
        "total": 3999.98,
        "discountPercentage": 18.52,
        "discountedTotal": 3259.18,
        "thumbnail": "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png"
      },
      {
        "id": 183,
        "title": "Green Oval Earring",
        "price": 24.99,
        "quantity": 5,
        "total": 124.95,
        "discountPercentage": 6.28,
        "discountedTotal": 117.1,
        "thumbnail": "https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Oval%20Earring/thumbnail.png"
      },
      {
        "id": 100,
        "title": "Apple Airpods",
        "price": 129.99,
        "quantity": 5,
        "total": 649.95,
        "discountPercentage": 12.84,
        "discountedTotal": 566.5,
        "thumbnail": "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png"
      }
    ],
    "total": 103774.85,
    "discountedTotal": 89686.65,
    "userId": 33,
    "totalProducts": 4,
    "totalQuantity": 15
  } as Cart