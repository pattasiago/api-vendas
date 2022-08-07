import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public create({ name, email, password }: ICreateUser): User {
    const customer = this.ormRepository.create({ name, email, password });
    return customer;
  }

  public async save(customer: User): Promise<User> {
    return this.ormRepository.save(customer);
  }

  public async remove(customer: User): Promise<User> {
    return this.ormRepository.remove(customer);
  }

  public async findOne(id: string): Promise<User | undefined> {
    const customer = this.ormRepository.findOne(id);
    return customer;
  }

  public async find(): Promise<User[]> {
    const customer = this.ormRepository.find();
    return customer;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
