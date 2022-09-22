import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { FakeUsersRepository } from '../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'iago',
      email: 'iago@outlook.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: user.email,
      password: user.password,
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    const response = createSession.execute({
      email: 'iago@outlook.com',
      password: '123456',
    });
    expect(response).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong pass', async () => {
    const user = await fakeUsersRepository.create({
      name: 'iago',
      email: 'iago@outlook.com',
      password: '123456',
    });

    const response = createSession.execute({
      email: user.email,
      password: 'lalala',
    });

    expect(response).rejects.toBeInstanceOf(AppError);
  });
});
