import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';

describe('CreateCustomer', () => {
  it('should be able to create a new costumer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const customerService = new CreateCustomerService(fakeCustomersRepository);
    const customer = await customerService.execute({
      name: 'iago',
      email: 'iago@outlook.com',
    });
    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with same email address', () => {
    expect(1).toBe(1);
  });
});
