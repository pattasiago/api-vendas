import { Request, Response } from 'express';
import CreateSessionService from '../../../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUser = new CreateSessionService();
    const user = await createUser.execute({
      email,
      password,
    });
    return response.json(instanceToInstance(user));
  }
}
