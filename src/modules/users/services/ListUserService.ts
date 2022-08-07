import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { injectable, inject } from 'tsyringe';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const usersRepository = this.usersRepository;
    const users = await usersRepository.find();
    return users;
  }
}

export default ListUserService;
