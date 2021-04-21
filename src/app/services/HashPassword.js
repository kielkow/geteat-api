import bcrypt from 'bcrypt';

export default async password => {
  const hash = await bcrypt.hash(password, 12);

  return hash;
};
