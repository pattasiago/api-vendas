import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User Not Found!');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
