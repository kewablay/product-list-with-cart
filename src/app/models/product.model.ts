// export interface Product {
//   image: {
//     thumbnail: string;
//     mobile: string;
//     tablet: string;
//     desktop: string;
//   };
//   name: string;
//   category: string;
//   price: number;
// }

export interface Product {
  name: string;
  price: number;
}

// to handle where products are displayed with images
export interface Dessert extends Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

// to handle where products are displayed but has quantity
export interface CartItem extends Product {
  quantity: number;
}

// to handle where products are displayed but has quantity and image
export interface OrderItem extends Product {
  quantity: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
