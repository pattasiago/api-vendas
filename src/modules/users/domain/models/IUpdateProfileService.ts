export interface IUpdateProfileService {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
