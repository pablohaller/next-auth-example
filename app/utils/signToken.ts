import jwt from 'jsonwebtoken';

const SignToken = async (email: string) => {
  const token = await jwt.sign({ id: email }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });
  return token
}

export default SignToken;