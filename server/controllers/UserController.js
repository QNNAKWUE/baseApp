import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
  static async signupController(req, res) {
    const { fullname, email, password } = req.body;

    try {
      // Check if the user exists in the fake DB
      const findUser = await User.findOne({email: req.body.email});

      if (findUser) {
        return res.status(409).send({
          success: false,
          message: 'User exists, please login!',
        });
      }

      const user = new User(_.pick(req.body, ['fullname', 'email', 'password']));

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      
      await user.save()

      // return a success message

      return res.status(201).send({
        success: true,
        message: 'user account successfully created',
        data: {
          email
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: 'Server Error',
      });
    }
  }

  static async loginController(req, res){
    const user = await User.findOne({email: req.body.email});
    if(!user){
      return res.status(409).send({
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
      return res.header('auth-token', token).send({'email': user.email, 'id': 'user._id'});
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
