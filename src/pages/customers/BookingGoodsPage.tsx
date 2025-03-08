import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../constants/types';
import useApi from '../../hooks/ApiCalls';
import { joiValidateBookingSchema } from '../../hooks/validation';
import { toast } from 'react-toastify';
import axios from 'axios';
import Form from '../../components/Form';
import Button from '../../components/Button';
import { buttonStyle } from '../../constants/styles';

const BookingGoodsPage = () => {
  const [loading, setLoading] = useState(false);
  const [packs, setPacks] = useState<string>('');
  const [referralToken, setReferralToken] = useState<string>('');
  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const { bookingGoods } = useApi();

  const handlePacksChange = (value: string) => {
    setPacks(value);
  };

  const handleReferralTokenChange = (value: string) => {
    setReferralToken(value);
  };

  const payload = {
    packs,
    referralToken,
  };

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = joiValidateBookingSchema.validate(payload, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        console.error(detail);

        toast.error(detail.message);
      });

      return;
    }

    setLoading(true);
    try {
      const actualPayload = {
        ...payload,
        customerToken: currentUser?.token,
      };
      const response = await bookingGoods(actualPayload);
      if (response) {
        toast.success(response.message);
        setPacks('');
        setReferralToken('');

        navigate('/customer/dashboard');
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
    <div className="py-4 my-24">
      <div className="flex px-4 md:px-6 lg:px-8 max-w-[100%] flex-col md:flex-row items-center justify-between">
        <div className="w-[90%] md:w-[50%] lg:w-[50%]">
          <img
            loading="lazy"
            className="w-[100%] md:w-[80%] rounded-lg h-[400px]"
            src="../../../images/placeholder.png"
            alt=""
          />
        </div>

        <div className="w-[100%] md:w-[50%] lg:w-[50%] flex flex-col items-center">
          <div className="flex flex-col text-center">
            {/* DROP DOWN FOR MARKETING DURATION */}

            <div className="mt-3 flex items-end flex-col">
              <form
                onSubmit={handleSubmitPayment}
                className="lg:w-[30vw] md:w-[40vw] w-[80vw]"
              >
                <p className="text-center text-xl font-semibold">Book Goods</p>

                <div className="">
                  <Form
                    title={'Number of packs'}
                    type={'text'}
                    required={true}
                    placeholder={'amount...'}
                    value={packs.toString()}
                    setValue={handlePacksChange}
                  />
                </div>
                <div className="">
                  <Form
                    title={'Referral token'}
                    type={'text'}
                    required={true}
                    placeholder={'token...'}
                    value={referralToken.toString()}
                    setValue={handleReferralTokenChange}
                  />
                </div>

                <div className="items-center flex flex-col mt-5">
                  <Button
                    buttonStyle={buttonStyle}
                    loading={loading}
                    title="Submit Booking"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingGoodsPage;
