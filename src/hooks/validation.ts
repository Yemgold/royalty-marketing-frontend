import Joi from 'joi';

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])(?=.*[0-9]).{8,32}$/;

export const joiLoginValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .custom((value, helpers) => {
      const emailValidation = Joi.string()
        .email({ tlds: { allow: false } })
        .validate(value);

      if (emailValidation.error) {
        const usernameRegexPattern = /^[a-zA-Z0-9_]{3,}$/;
        if (!usernameRegexPattern.test(value)) {
          return helpers.error('any.invalid', {
            custom: 'Invalid email',
          });
        }
      }
      return value;
    })
    .messages({
      'string.empty': 'Email is required',
      'any.invalid': '{{#custom}}',
    }),

  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(passwordRegex)
    .required()
    .label('Password')
    .messages({
      'string.pattern.base':
        'password must have min of 8 characters, max of 32 characters 1 uppercase, 1 lowercase and 1 special character.',
    }),
});

export const joiRegisterValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
  name: Joi.string().min(3).required().label('Name'),
  password: Joi.string()
    .min(8)
    .max(32)
    .required()
    .pattern(passwordRegex)
    .messages({
      'string.pattern.base':
        'password must have min of 8 characters, max of 32 characters 1 uppercase, 1 lowercase and 1 special character.',
    })
    .label('Password'),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm Password')
    .messages({ 'any.only': 'Password and Confirm Password do not match' }),
  phone_number: Joi.string().min(11).required().label('Phone Number'),
});

export const joiForgotPasswordValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
});

export const joiResetPasswordValidationSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(32)
    .required()
    .pattern(passwordRegex)
    .messages({
      'string.pattern.base':
        'password must have min of 8 characters, max of 32 characters 1 uppercase, 1 lowercase and 1 special character.',
    })
    .label('Password'),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm Password')
    .messages({ 'any.only': 'Password and Confirm Password do not match' }),
});

export const joiValidatePaymentSchema = Joi.object({
  amount: Joi.number().min(4),
});

export const joiValidateTransferCashSchema = Joi.object({
  referralCash: Joi.number(),
});

export const joiValidateSendCoinsSchema = Joi.object({
  amount_of_goods_purchased: Joi.number(),
  customerToken: Joi.string().min(4),
});

export const joiValidateBookingSchema = Joi.object({
  packs: Joi.string(),
  referralToken: Joi.string().min(4),
});

export const joiValidateWithdrawCashSchema = Joi.object({
  bankName: Joi.string(),
  accountNumber: Joi.string(),
  accountName: Joi.string(),
  amount: Joi.number(),
});
