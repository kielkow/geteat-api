import jwt from 'jsonwebtoken';
import checkPassword from '../services/CheckPassword';

import User from '../schemas/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid e-mail' });

    const passwordIsValid = await checkPassword(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Password doesn´t match' });
    }

    const { id } = user;

    return res.json({
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
