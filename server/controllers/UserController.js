import bcrypt from 'bcrypt';
import { has } from 'config';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
  static async signupController(req, res) {
    const { email, password, fullname } = req.body;

    try {
      // Check if the user exists in the fake DB
      const findUser = await User.find((user) => user.email === email);

      if (findUser) {
        return res.status(409).send({
          success: false,
          message: 'User exists, please login!',
        });
      }
      // If the user does not exist, create an account

      // hash the password, 
      // we do not save raw password in the database for security purposes 
      // so that they are not compromised
      const hashedPwd = await bcrypt.hash(password, 10);
      const newUser = {
        id: (User.length + 1),
        fullname,
        email,
        password: hashedPwd,
      };

      // push the user to the fake DB
      User.push(newUser);

      // return a success message

      return res.status(201).send({
        success: true,
        message: 'user account successfully created',
        data: {
          id: newUser.id,
          email: newUser.email,
          fullname: newUser.fullname,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: 'Server Error',
      });
    }
  }

  static async loginController(req, res){
    const user = await User.findOne({email: req.body.email});
    if(!user){
      return res.status(400).send({
        success: 'false',
        message: 'Email does not exist'
      });
    }
    const validPassword = await bcrypt.compare((user) => user.password === hashedPwd);
    if(!validPassword){
      return res.status(409).send({
        success: 'false',
        message: 'password do not match'
      });
    }
    //generate token after a successful login
    const token = jwt.sign({id:user._id, email: user.email}, process.env.TOKEN_SECRET);
    try{
      return res.header('auth-token', token).send({'token': token});
    }catch(err){
      if(err){
        return res.status(409).send({
          success: 'false',
          message: 'Invalid email/password'
        });
      }
    }
  }
}



export default UserController;
