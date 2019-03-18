import { EMAIL_PATTERN } from './../config';

export default {
  email(value) {
    return EMAIL_PATTERN.test(value);
  },
  password(value) {
    return value.length >= 6;
  },
  text(value) {
    return value.length > 0;
  },
};
