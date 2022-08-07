import { ICustomer } from '@modules/customers/domain/models/ICustomer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export interface ICreateOrder {
  customer: ICustomer;
  order_products: IProduct[];
}
