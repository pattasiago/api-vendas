import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import { ISessionRequest } from '../domain/models/ISessionRequest';
import { ISessionResponse } from '../domain/models/ISessionResponse';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ISessionRequest): Promise<ISessionResponse> {
    const usersRepository = this.usersRepository;
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorret Email/Password Combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorret Email/Password Combination', 401);
    }

    //TODO importar o hash de um arquivo de configuração
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
