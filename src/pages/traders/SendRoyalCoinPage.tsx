import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../constants/types';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/ApiCalls';
import { joiValidateSendCoinsSchema } from '../../hooks/validation';
import { toast } from 'react-toastify';
import axios from 'axios';
import Form from '../../components/Form';
import Button from '../../components/Button';
import { buttonStyle } from '../../constants/styles';

const SendRoyalCoinPage = () => {
  const [loading, setLoading] = useState(false);
  const [goodsAmount, setGoodsAmount] = useState<number>(0);
  const [customerToken, setCustomerToken] = useState<string>('');
  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  console.log('currentUser', currentUser);

  const { sendRoyaltyCoin } = useApi();

  const handleGoodsAmountChange = (value: string) => {
    setGoodsAmount(Number(value));
  };

  const handleCustomerTokenChange = (value: string) => {
    setCustomerToken(value);
  };

  const payload = {
    amount_of_goods_purchased: goodsAmount,
    customerToken,
  };

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = joiValidateSendCoinsSchema.validate(payload, {
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
      const response = await sendRoyaltyCoin(payload);

      if (response) {
        toast.success(response.message);
        setGoodsAmount(0.0);
        setCustomerToken('');

        navigate('/trader/dashboard');
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
                  Send Royalty Coin
                </p>

                <div className="">
                  <Form
                    title={'Amount of goods purchased'}
                    type={'text'}
                    required={true}
                    placeholder={'0'}
                    value={goodsAmount.toString()}
                    setValue={handleGoodsAmountChange}
                  />
                </div>
                <div className="">
                  <Form
                    title={'Customer Token'}
                    type={'text'}
                    required={true}
                    placeholder={'Enter customer token...'}
                    value={customerToken.toString()}
                    setValue={handleCustomerTokenChange}
                  />
                </div>

                <div className="items-center flex flex-col mt-5">
                  <Button
                    buttonStyle={buttonStyle}
                    loading={loading}
                    title="Submit Amount"
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

export default SendRoyalCoinPage;
