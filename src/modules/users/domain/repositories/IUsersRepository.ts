import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUser): IUser;
  save(data: IUser): Promise<IUser>;
  remove(data: IUser): Promise<IUser>;
  findOne(id: string): Promise<IUser | undefined>;
  find(): Promise<IUser[]>;
}
