import { IUserToken } from '../models/IUserToken';

export interface IUserTokensRepository {
  findByToken(name: string): Promise<IUserToken | undefined>;
  generate(email: string): Promise<IUserToken>;
}
