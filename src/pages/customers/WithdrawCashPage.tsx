import { useSelector } from 'react-redux';
import { UserState } from '../../constants/types';
import Button from '../../components/Button';
import { buttonStyle } from '../../constants/styles';
import Form from '../../components/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { joiValidateWithdrawCashSchema } from '../../hooks/validation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/ApiCalls';

const WithdrawCashPage = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [bankName, setBankName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  console.log('currentUser', currentUser);

  const { withdrawCashFunction } = useApi();

  const handleAmountChange = (value: string) => {
    setAmount(Number(value));
  };

  const handleBankNameChange = (value: string) => {
    setBankName(value);
  };
  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
  };
  const handleAccountNameChange = (value: string) => {
    setAccountName(value);
  };

  const payload = {
    amount,
    bankName,
    accountNumber,
    accountName,
  };

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = joiValidateWithdrawCashSchema.validate(payload, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        console.error(detail);

        toast.error(detail.message);
      });

      return;
    }

    if (amount > currentUser?.walletBalance) {
      toast.error('You can not withdraw more than your balance');
      return;
    }

    setLoading(true);
    try {
      const response = await withdrawCashFunction(payload);
      if (response) {
        toast.success(response.message);

        setAmount(0);
        setBankName('');
        setAccountNumber('');
        setAccountName('');

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
                  Withdraw Cash
                </p>

                <div className="">
                  <Form
                    title={'Amount'}
                    type={'text'}
                    required={true}
                    placeholder={'amount...'}
                    value={amount.toString()}
                    setValue={handleAmountChange}
                  />
                </div>

                <div className="">
                  <p>Bank Details</p>
                  <Form
                    title={'Bank name'}
                    type={'text'}
                    required={true}
                    placeholder={'name...'}
                    value={bankName.toString()}
                    setValue={handleBankNameChange}
                  />
                  <Form
                    title={'Account number'}
                    type={'text'}
                    required={true}
                    placeholder={'number...'}
                    value={accountNumber.toString()}
                    setValue={handleAccountNumberChange}
                  />
                  <Form
                    title={'Account name'}
                    type={'text'}
                    required={true}
                    placeholder={'name...'}
                    value={accountName.toString()}
                    setValue={handleAccountNameChange}
                  />
                </div>

                <div className="items-center flex flex-col mt-5">
                  <Button
                    buttonStyle={buttonStyle}
                    loading={loading}
                    title="Submit Withdrawal"
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

export default WithdrawCashPage;
