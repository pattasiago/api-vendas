import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { IListCustomer } from '@modules/customers/domain/models/IListCustomer';
import {
  ICustomerRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomerRepository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

export class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public create({ name, email }: ICreateCustomer): Customer {
    const customer = this.ormRepository.create({ name, email });
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }

  public async remove(customer: Customer): Promise<Customer> {
    return this.ormRepository.remove(customer);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IListCustomer> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findOne(id: string): Promise<Customer | undefined> {
    const customer = this.ormRepository.findOne(id);
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return customer;
  }
}
