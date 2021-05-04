import Validate from '../validator';

class Sanitize {
  static signupSanitizer(req, res, next) {
    const {
      fullname, password, email, confirmPassword,
    } = req.body;
    const response = (error) => res.status(400).send({ status: 'error', error });

    if (Validate.checkEmpty(email)) return response('email cannot be empty');
    if (Validate.checkEmpty(fullname)) return response('fullname cannot be empty');
    if (Validate.checkEmpty(password)) return response('password cannot be empty');
    if (Validate.checkEmpty(confirmPassword)) return response('confirm password cannot be empty');

    if (!Validate.isMatchingPassword(password, confirmPassword)) return response('Passwords do not match');
    if (!Validate.isEmail(email)) return response('invalid email');
    if (Validate.isValidParamsLength(fullname, 2)) return response('fullname must be atleast two characters long');

    if (Validate.isValidParamsLength(password, 5)) return response('password must be greater than five characters');
    if (Validate.containsNumber(fullname)) return response('fullname cannot  contain number');

    return next();
  }

  static loginSanitizer(req, res, next) {
    const { email, password } = req.body;
    const response = (error) => res.status(400).send({ status: 'error', error });

    if (Validate.checkEmpty(email)) return response('please enter your email');
    if (Validate.checkEmpty(password)) return response('please enter your password');

    return next();
  }

  static listSanitizer(req, res, next){
   const {name, createdAt, userId} = req.body;
    const response = (error) => res.status(400).send({status: 'error', error});

    if(Validate.checkEmpty(name)) return response('list name cannot be empty');
    if(Validate.containsNumber(name)) return response('list name cannot contain number');
    if(Validate.checkEmpty(createdAt)) return response('please input start date');
    if(Validate.checkEmpty(userId)) return response('please enter your userID');

    return next();
   }
}

export default Sanitize;
