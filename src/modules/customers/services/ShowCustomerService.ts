import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICustomer } from '../domain/models/ICustomer';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User Not Found!');
    }
    return customer;
  }
}

export default ShowCustomerService;
