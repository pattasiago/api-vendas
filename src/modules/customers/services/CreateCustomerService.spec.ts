import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let customerService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    customerService = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new costumer', async () => {
    const customer = await customerService.execute({
      name: 'iago',
      email: 'iago@outlook.com',
    });
    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with same email address', async () => {
    await customerService.execute({
      name: 'iago',
      email: 'iago@outlook.com',
    });

    const customer = customerService.execute({
      name: 'iago',
      email: 'iago@outlook.com',
    });

    expect(customer).rejects.toBeInstanceOf(AppError);
  });
});
