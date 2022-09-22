import { IHashProvider } from '../models/IHashProvider';
import { compare, hash } from 'bcryptjs';

export default class BcryptHashProvider implements IHashProvider {
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
