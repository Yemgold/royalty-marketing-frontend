import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import useApi from '../hooks/ApiCalls';

const EmailVerificationPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { verifyUser } = useApi();

  const searchParams = new URLSearchParams(location.search);

  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  const handleVerification = async () => {
    try {
      if (!userId || !token) {
        return;
      }

      const data = {
        userId,
        token,
      };
      const response = await verifyUser(data);
      if (response.data) {
        console.log(response.data.message);
        toast.success(response.data.message);
        setIsVerified(true);
        return;
      } else {
        setErrorMessage('Email verification failed');
        setIsVerified(false);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred');
        setErrorMessage('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : isVerified ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <p className="text-xl md:text-2xl lg:text-4xl">
            Your email has been successfully verified
          </p>

          <div className="flex items-center justify-center mt-3">
            <Link
              className="bg-primary text-xl md:text-2xl text-white p-2 rounded-lg"
              to="/login"
            >
              Login here
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-xl md:text-2xl lg:text-4xl text-red-500 font-bold">
            {errorMessage || 'Email verification failed'}
          </p>

          <div className="flex flex-col items-center">
            <p className="text-xl md:text-2xl lg:text-4xl text-red-500 font-bold">
              Click the button below to go back home
            </p>
            <Link
              className="bg-primary mt-4 text-xl md:text-2xl text-white p-2 rounded-lg"
              to="/"
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerificationPage;
