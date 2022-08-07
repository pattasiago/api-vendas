import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file?.filename,
    });
    return response.json(instanceToInstance(user));
  }
}
