import jwt from 'jsonwebtoken';
import { config } from '../../config/conf';

export class Utils {
    static validateEmail(email: string): boolean {
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(email);
    }

    static generateToken(params = {}) {
      return jwt.sign({ params }, config.secret, {
          expiresIn: 86400,
      });
  }
}