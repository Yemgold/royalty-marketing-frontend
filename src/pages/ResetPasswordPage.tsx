import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { buttonStyle } from '../constants/styles';
import Form from '../components/Form';
import Button from '../components/Button';
import { useState } from 'react';
import {
  ResetPasswordFormData,
  ResetPasswordFormDataKey,
} from '../constants/types';
import useApi from '../hooks/ApiCalls';
import axios from 'axios';
import { toast } from 'react-toastify';
import { joiResetPasswordValidationSchema } from '../hooks/validation';

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [unableToPaste, setUnableToPaste] = useState(false);

  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get('userId') || '';
  const token = searchParams.get('token') || '';

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirm_password: '',
  });

  const { passwordReset } = useApi();

  // console.log('formData:', formData);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleConfirmPasswordFocus = () => setIsMatched(true);
  const handleConfirmPasswordBlur = () => {
    setIsMatched(false);
    setUnableToPaste(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUnableToPaste(true);
  };

  const handleShowPasswordChange = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPasswordChange = (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (key: ResetPasswordFormDataKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!userId || !token) {
    //   console.error('User id or token can not be found');
    //   return;
    // }

    const confirmData = {
      password: formData.password.trim(),
      confirm_password: formData.confirm_password.trim(),
    };

    const data = {
      ...confirmData,
      userId,
      token,
    };

    const { error } = joiResetPasswordValidationSchema.validate(confirmData, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        if (
          detail.message ===
          'password must have min of 8 characters, max of 32 characters 1 uppercase, 1 lowercase and 1 special character.'
        ) {
          setIsFocused(true);
        }

        if (detail.message === 'Password and Confirm Password do not match') {
          setIsMatched(true);
        }
        toast.error(detail.message);
      });
      return;
    }

    setLoading(true);
    try {
      const response = await passwordReset(data);
      if (response.success) {
        console.log(response.message);
        toast.success(response.message);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:mt-[70px] lg:justify-around md:gap-[100px] justify-center items-center md:px-10 lg:px-20 py-10">
      <div className="w-[90%] md:w-[50%] lg:w-[50%]">
        <img
          className="w-[100%] md:w-[80%] rounded-lg"
          src="../../../images/placeholder.jpg"
          alt=""
        />
      </div>
      <div className="">
        <form
          onSubmit={handleResetPassword}
          className="lg:w-[30vw] md:w-[40vw] w-[80vw]"
        >
          <p className="text-center text-xl font-semibold">
            Royalty Reward <br /> Token
          </p>

          <div className="relative">
            <div className="h-20 mb-6">
              <Form
                title={'Password'}
                type={showPassword ? 'text' : 'password'}
                required={true}
                placeholder={'password...'}
                value={formData.password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                setValue={(value) => handleChange('password', value)}
              />
              {isFocused && (
                <p className="text-red-500 text-[11px] text-center">
                  password must have min of 8 characters, max of 32 characters 1
                  uppercase, 1 lowercase and 1 special character.
                </p>
              )}
              <button
                className="absolute right-5 top-10"
                onClick={handleShowPasswordChange}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="relative mb-2 h-20">
              <Form
                title={'Confirm Password'}
                type={showConfirmPassword ? 'text' : 'password'}
                required={true}
                placeholder={'confirm password...'}
                onFocus={handleConfirmPasswordFocus}
                onBlur={handleConfirmPasswordBlur}
                onPaste={handlePaste}
                value={formData.confirm_password}
                setValue={(value) => handleChange('confirm_password', value)}
              />
              {isMatched && (
                <p className="text-red-500 text-[11px] text-center">
                  password and confirm password must match
                </p>
              )}
              {unableToPaste && (
                <p className="text-red-500 text-[11px] text-center">
                  Pasting is disabled for this input field
                </p>
              )}
              <button
                className="absolute right-5 top-10"
                onClick={handleShowConfirmPasswordChange}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <div className="items-center flex flex-col mt-5">
            <Button
              buttonStyle={buttonStyle}
              loading={loading}
              title="Reset Password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
