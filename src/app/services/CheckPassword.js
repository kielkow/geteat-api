import bcrypt from 'bcrypt';

export default async (password, hash) => {
  const isMatch = await bcrypt.compare(password, hash);

  return isMatch;
};
