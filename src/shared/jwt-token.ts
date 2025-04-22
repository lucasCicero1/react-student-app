import jwt, {
  VerifyErrors,
  JwtPayload,
  SignOptions,
  Algorithm,
} from "jsonwebtoken";

interface IEncrypt {
  value: any;
  secret: string;
  config: SignOptions & { algorithm: Algorithm };
}

interface IDecrypt {
  token: string;
  secret: string;
}

type IDecoded = JwtPayload | string | undefined;

type IErr = VerifyErrors | null;

type DecryptResult = JwtPayload | string | { error: true };

export class JWTToken {
  static encrypt({ value, secret, config }: IEncrypt): string {
    return jwt.sign(value, secret, config);
  }

  static async decrypt({ token, secret }: IDecrypt): Promise<DecryptResult> {
    return new Promise((resolve) => {
      jwt.verify(token, secret, (err: IErr, decoded: IDecoded) => {
        if (err || !decoded) return resolve({ error: true });
        resolve(decoded);
      });
    });
  }
}
