import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';
import { IDeleteCustomer } from '../models/IDeleteCustomer';
import { IListCustomer } from '../models/IListCustomer';

export interface SearchParams {
  page: number;
  skip: number;
  take: number;
}

export interface ICustomerRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): ICustomer;
  save(data: ICustomer): Promise<ICustomer>;
  remove(data: IDeleteCustomer): Promise<ICustomer | undefined>;
  findAll(data: SearchParams): Promise<IListCustomer | undefined>;
  findOne(id: string): Promise<ICustomer | undefined>;
}
