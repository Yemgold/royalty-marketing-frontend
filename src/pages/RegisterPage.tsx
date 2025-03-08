import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { buttonStyle } from '../constants/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import useApi from '../hooks/ApiCalls';
import { toast } from 'react-toastify';
import axios from 'axios';
import Form from '../components/Form';
import { joiRegisterValidationSchema } from '../hooks/validation';
import { FormDataKey } from '../constants/types';
import Phone from '../components/Phone';
import { roles } from '../constants/array';

type FormData = {
  password: string;
  confirm_password: string;
  email: string;
  name: string;
  phone_number?: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [unableToPaste, setUnableToPaste] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirm_password: '',
    // email: 'votinggivers@gmail.com',
    // password: 'Password@6910',
    // confirm_password: 'Password@6910',
    name: '',
  });

  const { registerUser } = useApi();

  // console.log('formData:', formData);
  // console.log('phoneValue:', phoneValue);
  // console.log('selectedRole:', selectedRole);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleConfirmPasswordFocus = () => setIsMatched(true);
  const handleConfirmPasswordBlur = () => {
    setIsMatched(false);
    setUnableToPaste(false);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
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

  const handleChange = (key: FormDataKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedFormData = {
      email: formData.email.trim(),
      name: formData.name.trim(),
      password: formData.password.trim(),
      confirm_password: formData.confirm_password.trim(),
      phone_number: phoneValue.trim(),
    };

    const { error } = joiRegisterValidationSchema.validate(trimmedFormData, {
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

        if (detail.message === 'Password and Confirm Password do not match') {
          setIsMatched(true);
        }
        toast.error(detail.message);
      });

      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({
        ...trimmedFormData,
        role: selectedRole,
      });

      if (response) {
        toast.success(response.message);
        setFormData({
          email: '',
          password: '',
          confirm_password: '',
          name: '',
        });

        navigate('/login');
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
          className="w-[100%] md:w-[80%] rounded-lg h-[400px]"
          src="../../../images/placeholder.png"
          alt=""
        />
      </div>

      <div className="">
        <form
          onSubmit={handleRegister}
          className="lg:w-[30vw] md:w-[40vw] w-[80vw]"
        >
          <p className="text-center text-xl font-semibold">
            Royalty Reward <br /> Token
          </p>

          <div className="">
            <Form
              title={'Name'}
              type={'text'}
              required={true}
              placeholder={'name...'}
              value={formData.name}
              onFocus={handleFocus}
              onBlur={handleBlur}
              setValue={(value) => handleChange('name', value)}
            />
          </div>

          <div className="">
            <Form
              title={'Email'}
              type={'email'}
              required={true}
              placeholder={'email...'}
              value={formData.email}
              setValue={(value) => handleChange('email', value)}
            />
          </div>

          <div className="relative h-20 mb-6">
            <div className="">
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

            <div className="relative mb-32 h-20">
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
          <div className="mt-20">
            <Phone value={phoneValue} setValue={setPhoneValue} />
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
              title="Register"
            />
          </div>
        </form>

        <div className="flex justify-center mt-20">
          <p>Have an account?</p>
          <Link className="text-primary font-bold ml-1" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
