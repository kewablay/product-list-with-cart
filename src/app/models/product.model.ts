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
  category: string;
}

// to handle where products are displayed but has quantity
export interface CartItem extends Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  quantity: number;
  id: number;
}
// to handle where products are displayed but has quantity and image
export interface OrderItem extends CartItem {}
