import User from '../schemas/User';
import checkPassword from '../services/CheckPassword';
import hashPassword from '../services/HashPassword';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: 'This e-mail is already used' });
    }

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    };
    const user = await User.create(userData);

    return res.json(user);
  }

  async update(req, res) {
    const { email, password, newPassword } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ error: 'User not found, check the credentials' });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail is already used' });
      }
    }

    const userData = req.body;

    if (password) {
      const passwordIsValid = await checkPassword(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ error: 'Password does not match' });
      }
      userData.password = await hashPassword(newPassword);
    }

    const userUpdated = await User.findByIdAndUpdate(req.userId, userData, {
      new: true,
    });

    return res.json(userUpdated);
  }
}

export default new UserController();
