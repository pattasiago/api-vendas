import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {
    // this.customersRepository = customersRepository;
  }

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email Address Already Exists', 403);
    }
    const customer = this.customersRepository.create({
      name,
      email,
    });

    await this.customersRepository.save(customer);
    return customer;
  }
}

export default CreateCustomerService;
