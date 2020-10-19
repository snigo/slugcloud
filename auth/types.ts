export interface Menu {
  restaraunt: string;
  items: Product[];
}

export interface Product {
  name: string;
  price: number;
  description: string;
}

export interface Order {
  item: Product[];
  note: string;
}