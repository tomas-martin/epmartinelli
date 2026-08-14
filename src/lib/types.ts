export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  min_stock: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StockMovement {
  id: string;
  product_id: string;
  quantity: number;
  type: 'entry' | 'exit';
  user_id: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  role: 'owner' | 'employee';
}