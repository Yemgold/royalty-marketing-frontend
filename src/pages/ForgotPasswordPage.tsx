import Form from '../components/Form';
import React, { useState } from 'react';
import useApi from '../hooks/ApiCalls';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '../components/Button';
import { buttonStyle } from '../constants/styles';
import { joiForgotPasswordValidationSchema } from '../hooks/validation';

const ForgotPasswordPage = () => {
  // const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { forgotPass } = useApi();

  const handleChange = (value: string) => {
    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    const { error } = joiForgotPasswordValidationSchema.validate(
      { email: trimmedEmail },
      {
        abortEarly: false,
      }
    );

    if (error) {
      error.details.forEach((detail) => {
        toast.error(detail.message);
      });
      return;
    }
    setLoading(true);
    try {
      const response = await forgotPass(email.trim());

      if (response.success) {
        console.log(response.message);
        toast.success(response.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        return;
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred');
        return;
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-4 max-w-[100%] flex flex-col md:flex-row md:mt-[70px] md:my-[300px] lg:justify-around md:gap-[100px] justify-center items-center md:px-10 lg:px-20 py-10">
      <div className="w-[90%] md:w-[50%] lg:w-[50%]">
        <img
          className="w-[100%] md:w-[80%] rounded-lg"
          src="../../../images/placeholder.jpg"
          alt=""
        />
      </div>{' '}
      <form
        className="max-w-[90%] flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <p className="text-center">Forgot Password</p>
        <div className="w-[80vw] md:w-[50vw] lg:w-[50vw] mb-6">
          <Form
            title={'email'}
            type={'email'}
            required={true}
            placeholder={'Email...'}
            value={email}
            setValue={(value) => handleChange(value)}
          />
        </div>

        <Button title={'Submit'} loading={loading} buttonStyle={buttonStyle} />
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
