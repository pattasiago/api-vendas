import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export interface IFindProducts {
  id: string;
}

export interface IProductsRepository {
  findOne(data: string): Promise<IProduct | undefined>;
  find(data?: string[]): Promise<IProduct[]>;
  findByName(data: string): Promise<IProduct | undefined>;
  findAllByIds(data: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): IProduct;
  save(data: IProduct): Promise<IProduct>;
  remove(data: IProduct): Promise<IProduct>;
  updateStock(data: IUpdateStockProduct[]): Promise<void>;
}
