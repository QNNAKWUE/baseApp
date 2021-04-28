import Validator from '../validator';

class Sanitize {
  static signupSanitizer(req, res, next) {
    const {
      fullname, password, email, confirmPassword,
    } = req.body;
    const response = (error) => res.status(400).send({ status: 'error', error });

    if (Validator.checkEmpty(email)) return response('email cannot be empty');
    if (Validator.checkEmpty(fullname)) return response('fullname cannot be empty');
    if (Validator.checkEmpty(password)) return response('password cannot be empty');
    if (Validator.checkEmpty(confirmPassword)) return response('confirm password cannot be empty');

    if (!Validator.isMatchingPassword(password, confirmPassword)) return response('Passwords do not match');
    if (!Validator.isEmail(email)) return response('invalid email');
    if (Validator.isValidParamsLength(fullname, 2)) return response('fullname must be atleast two characters long');

    if (Validator.isValidParamsLength(password, 5)) return response('password must be greater than five characters');
    if (Validator.containsNumber(fullname)) return response('fullname cannot  contain number');

    return next();
  }

  static loginSanitizer(req, res, next) {
    const {email, password} = req.body;
    const response = (error) => res.status(400).send({status: 'error', error});

    if(Validator.checkEmpty(email)) return response('please enter your email');
    if(Validator.checkEmpty(password)) return response('please enter your password');

    next();
  }
}


export default Sanitize;


