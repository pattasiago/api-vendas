import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('User Not Found!');
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('User Already Exists', 403);
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
