import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import { IUser } from '../domain/models/IUser';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const usersRepository = this.usersRepository;
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email Address Already Exists', 403);
    }
    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
