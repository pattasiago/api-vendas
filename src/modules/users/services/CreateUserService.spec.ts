import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import { FakeUsersRepository } from '../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let UserService: CreateUserService;
let HashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    HashProvider = new FakeHashProvider();
    UserService = new CreateUserService(fakeUsersRepository, HashProvider);
  });

  it('should be able to create a new costumer', async () => {
    const User = await UserService.execute({
      name: 'iago',
      email: 'iago@outlook.com',
      password: '123456',
    });
    expect(User).toHaveProperty('id');
  });

  it('should not be able to create two customers with same email address', async () => {
    await UserService.execute({
      name: 'iago',
      email: 'iago@outlook.com',
      password: '123456',
    });

    const customer = UserService.execute({
      name: 'iago',
      email: 'iago@outlook.com',
      password: '123456',
    });

    expect(customer).rejects.toBeInstanceOf(FakeHashProvider);
  });
});
