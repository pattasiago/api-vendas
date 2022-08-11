import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { IListCustomer } from '@modules/customers/domain/models/IListCustomer';
import {
  ICustomerRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomerRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { v4 } from 'uuid';

export class FakeCustomersRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public create({ name, email }: ICreateCustomer): Customer {
    const customer = new Customer();
    customer.id = v4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);
    return customer;
  }

  public async remove(customer: Customer): Promise<Customer | undefined> {
    return undefined;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IListCustomer | undefined> {
    return undefined;
  }

  public async findOne(id: string): Promise<Customer | undefined> {
    return undefined;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}
