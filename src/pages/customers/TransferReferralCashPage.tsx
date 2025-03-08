import axios from 'axios';
import Button from '../../components/Button';
import Form from '../../components/Form';
import { buttonStyle } from '../../constants/styles';
import { toast } from 'react-toastify';
import { joiValidateTransferCashSchema } from '../../hooks/validation';
import { UserState } from '../../constants/types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/ApiCalls';
import { useState } from 'react';

const TransferReferralCashPage = () => {
  const [loading, setLoading] = useState(false);
  const [referralCash, setReferralCash] = useState<number>(0);
  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  console.log('currentUser', currentUser);

  const { transferCashFunction } = useApi();

  const handleReferralCashChange = (value: string) => {
    setReferralCash(Number(value));
  };

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = joiValidateTransferCashSchema.validate(
      { referralCash },
      {
        abortEarly: false,
      }
    );

    if (error) {
      error.details.forEach((detail) => {
        console.error(detail);

        toast.error(detail.message);
      });

      return;
    }

    setLoading(true);
    try {
      const amount = referralCash;
      const response = await transferCashFunction(amount);
      if (response) {
        toast.success(response.message);
        setReferralCash(0);
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
                <p className="text-center text-xl font-semibold">
                  Transfer referral cash
                </p>

                <div className="">
                  <Form
                    title={'Amount'}
                    type={'text'}
                    required={true}
                    placeholder={'amount...'}
                    value={referralCash.toString()}
                    setValue={handleReferralCashChange}
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

export default TransferReferralCashPage;
