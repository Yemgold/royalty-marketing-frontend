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
import { Link, useNavigate } from 'react-router-dom';
import { roles } from '../constants/array';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: '',
  });

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedRole(selectedValue);
    setFormData((prev) => ({
      ...prev,
      role: selectedValue,
    }));
  };

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
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
    };

    console.log('formData: ', trimmedFormData);

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
      const response = await loginUser(formData);
      if (response) {
        toast.success(response.message);
        dispatch(loginSuccess(response));

        if (response.user.role === 'trader') {
          navigate('/trader/dashboard');
          return;
        } else if (response.user.role === 'customer') {
          navigate('/customer/dashboard');
          return;
        } else {
          navigate('/customer/dashboard');
          return;
        }
      }
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
          className="w-[100%] md:w-[80%] rounded-lg h-[400px]"
          src="../../../images/placeholder.png"
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
              title={'email'}
              type={'text'}
              required={true}
              placeholder={'email...'}
              value={formData.email}
              setValue={(value) => handleChange('email', value)}
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

          <div className="mt-3 flex items-end flex-col">
            <select
              className="w-full border p-2 rounded-full cursor-pointer"
              name=""
              id=""
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option disabled value="">
                Choose type of account to open
              </option>
              {roles.map((role, index) => (
                <option value={role.title} key={index}>
                  {role.title}
                </option>
              ))}
            </select>
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
