import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';

const passwordRouter = Router();
const passwordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordController.create,
);

export default passwordRouter;
