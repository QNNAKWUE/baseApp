import bcrypt from 'bcrypt';

const User = [{
  id: 1,
  fullname: 'Nonso Amadi',
  email: 'nonsoamadi@aol.com',
  password: bcrypt.hash('password', 10),
}];

export default User;
