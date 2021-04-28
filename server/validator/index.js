class Validate {
  static isEmail(email) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;
    return re.test(email);
  }

  static isValidParamsLength(param, length) {
    return param.length < length;
  }

  static checkEmpty(input) {
    const re = /^$/;
    const testBody = re.test(input);
    return testBody;
  }

  static containsNumber(name) {
    const re = /[0-9]/g;
    const testName = re.test(name);
    return testName;
  }

  static isMatchingPassword(password, confirmPassword) {
    return password === confirmPassword;
  }

  static itsaNumber(item) {
    const re = /^[-+]?\d*$/;
    return re.test(item);
  }
}

export default Validate;

