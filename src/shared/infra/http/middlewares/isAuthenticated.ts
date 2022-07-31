import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is Missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    //desestruturando propriedade sub do decodedToken
    //decoded Token tem tipo string | JwtPayload, o cast seria necessário para usar
    const { sub } = <ITokenPayload>decodedToken;

    //Request não tem atributo user na biblioteca, para isso tem que ser sobrescrito!
    //Foi criado o tipo user na pasta src/@types
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token!');
  }
}
