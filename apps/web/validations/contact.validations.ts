import * as yup from 'yup';
import _ from 'lodash';
import axios from 'axios';

enum Deliverability {
  DELIVERABLE = 'DELIVERABLE',
  UNDELIVERABLE = 'UNDELIVERABLE',
}

const verifyEmail = async (value: string, values: yup.TestContext<any>) => {
  try {
    const response = await axios.get(`/api/verify-email?email=${value}`);
    if (response?.data?.message === Deliverability.DELIVERABLE) {
      return true;
    } else {
      values.createError({ path: 'email', message: 'Email is not valid' });
      return false;
    }
  } catch (e) {
    values.createError({ path: 'email', message: 'Email is not valid' });
    return false;
  }
};

const debounceVerifyEmail = _.debounce(verifyEmail, 1500);

export const contactValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  // .test(
  //   'valid',
  //   'Please provide an original and valid email.',
  //   async (value, values) => {
  //     const valid = await debounceVerifyEmail(value as string, values);
  //     return valid as boolean;
  //   },
  // ),
  message: yup.string().required(),
});
