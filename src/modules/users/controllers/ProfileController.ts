import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const showProfile = new ShowProfileService();
    const user = await showProfile.execute({ id: userId });
    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const userId = request.user.id;
    const updateProfile = new UpdateProfileService();
    const user = await updateProfile.execute({
      id: userId,
      name,
      email,
      password,
      old_password,
    });
    return response.json(instanceToInstance(user));
  }
}
