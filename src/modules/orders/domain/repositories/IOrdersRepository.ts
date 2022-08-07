import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

interface IfindOne {
  relations: string[];
}

export interface IOrdersRepository {
  createOrder(data: ICreateOrder): Promise<IOrder>;
  findById(id: string): Promise<IOrder | undefined>;
  create(data: ICreateOrder): IOrder;
  save(data: IOrder): Promise<IOrder>;
  findOne(id: string, param: IfindOne): Promise<IOrder | undefined>;
}
