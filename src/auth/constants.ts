export const PROD = 'PROD';
export const DEV = 'DEV';

export const jwtConstants = {
  secret:
    process.env.NODE_ENV === DEV
      ? 'very_secret_secret_key'
      : process.env.JWT_SECRET,
};
