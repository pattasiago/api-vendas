import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = await userTokensRepository.generate(user.id);
    // console.log(token);
    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: email,
      },
      subject: '[API VENDAS] Recuperação de Senha',
      templateData: {
        template: 'Olá {{name}}: {{token}} ',
        variables: {
          name: user.name,
          token: token.token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
