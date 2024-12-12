import React, { useState } from 'react';
import Form from '../components/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '../components/Button';
import { LoginFormData, LoginFormDataKey } from '../constants/types';
import axios from 'axios';
import { toast } from 'react-toastify';
import useApi from '../hooks/ApiCalls';
import { joiLoginValidationSchema } from '../hooks/validation';
import { buttonStyle } from '../constants/styles';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    login_input: '',
    password: '',
  });

  const { loginUser } = useApi();

  console.log(formData);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleShowPasswordChange = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (key: LoginFormDataKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedFormData = {
      login_input: formData.login_input.trim().toLowerCase(),
      password: formData.password.trim(),
    };

    const { error } = joiLoginValidationSchema.validate(trimmedFormData, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        console.error(detail);
        if (
          detail.message ===
          'password must have min of 8 characters, max of 32 characters 1 uppercase, 1 lowercase and 1 special character.'
        ) {
          setIsFocused(true);
        }
        toast.error(detail.message);
      });

      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(trimmedFormData);
      console.log(response);
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
      </div>{' '}
      <div className="">
        <form
          onSubmit={handleLogin}
          className="lg:w-[30vw] md:w-[40vw] w-[80vw]"
        >
          <p className="text-center text-xl font-semibold">
            Royalty Reward <br /> Token
          </p>

          <div className="">
            <Form
              title={'email or username'}
              type={'text'}
              required={true}
              placeholder={'email or username...'}
              value={formData.login_input}
              setValue={(value) => handleChange('login_input', value)}
            />
          </div>

          <div className="relative">
            <div className="">
              <Form
                title={'password'}
                type={showPassword ? 'text' : 'password'}
                required={true}
                placeholder={'password...'}
                value={formData.password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                setValue={(value) => handleChange('password', value)}
              />
            </div>

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
          <div className="items-center flex flex-col mt-5">
            <Button
              buttonStyle={buttonStyle}
              loading={loading}
              title="Log In"
            />
          </div>
        </form>

        <div className="text-center mt-1">
          <Link className="" to="/forgot-password">
            Forgot Password
          </Link>
        </div>
        <div className="flex justify-center mt-20 font-bold">
          <p>Don't have an account?</p>
          <Link className="text-primary font-semibold ml-1" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
