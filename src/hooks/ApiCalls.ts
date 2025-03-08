import axios from 'axios';
import {
  LoginRoute,
  RegisterRoute,
  VerificationRoute,
  ForgotPassRoute,
  PasswordResetRoute,
  CustomerDetailsConfirmationRoute,
  allCustomersRoute,
  allTradersRoute,
  allTokenTransactionsRoute,
  transactionsRoute,
  markNotificationAsReadRoute,
  traderSubmitPaymentRoute,
  sendRoyaltyCoinRoute,
  createSalesTargetAmountRoute,
  bookingGoodsRoute,
  transferCashFunctionRoute,
  withdrawCashFunctionRoute,
  fetchBiddingProductRoute,
  processBiddingFunctionRoute,
} from './ApiRoutes';
import {
  bookingGoodsType,
  CustomerDataType,
  FormData,
  LoginFormData,
  ProcessBiddingType,
  ResetPasswordFormDataType,
  SendRoyaltyCoinType,
  SubmitPaymentType,
  TransactionDataType,
  UserState,
  VerificationDataType,
  withdrawCashType,
} from '../constants/types';
import { useSelector } from 'react-redux';

const useApi = () => {
  const { access } = useSelector((state: { user: UserState }) => state.user);
  const header = {
    'Content-Type': 'application/json',
  };

  const authHeader = {
    ...header,
    Authorization: `Bearer ${access}`,
  };

  const passwordReset = async (data: ResetPasswordFormDataType) => {
    try {
      console.log('API data:', data);
      const { userId, token, ...others } = data;
      const response = await axios.post(
        `${PasswordResetRoute}${userId}/${token}`,
        others,
        {
          headers: header,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const forgotPass = async (email: string) => {
    try {
      console.log('API email:', email);
      const response = await axios.post(ForgotPassRoute, email, {
        headers: header,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const loginUser = async (formData: LoginFormData) => {
    try {
      console.log('API formData:', formData);
      const response = await axios.post(LoginRoute, formData, {
        headers: header,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const registerUser = async (formData: FormData) => {
    try {
      console.log('API formData', formData);
      let regRoute = '';
      console.log('register formData:', formData);
      if (formData?.role === 'trader') {
        regRoute = `${RegisterRoute}-trader`;
      } else {
        if (formData?.role === 'customer') {
          regRoute = `${RegisterRoute}-customer`;
        }
      }
      const response = await axios.post(regRoute, formData, {
        headers: header,
      });

      console.log('register response:', response);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const verifyUser = async (data: VerificationDataType) => {
    try {
      const response = await axios(
        `${VerificationRoute}?userId=${data?.userId}&token=${data?.token}`,
        {
          headers: header,
        }
      );

      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const processBiddingFunction = async (data: ProcessBiddingType) => {
    try {
      console.log('API payload:', data);
      const response = await axios.post(processBiddingFunctionRoute, data, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchBiddingProduct = async () => {
    try {
      const response = await axios(fetchBiddingProductRoute, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const bookingGoods = async (data: bookingGoodsType) => {
    try {
      console.log('data:', data);
      const response = await axios.post(bookingGoodsRoute, data, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const sendRoyaltyCoin = async (data: SendRoyaltyCoinType) => {
    try {
      const response = await axios.post(sendRoyaltyCoinRoute, data, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createSalesTargetAmount = async (data: number) => {
    try {
      // console.log('authHeader:', authHeader);
      // console.log('data:', data);

      const salesTargetAmount = data;

      console.log('salesTargetAmount:', salesTargetAmount);

      const response = await axios.post(
        createSalesTargetAmountRoute,
        { salesTargetAmount },
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const withdrawCashFunction = async (data: withdrawCashType) => {
    try {
      const response = await axios.post(withdrawCashFunctionRoute, data, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const transferCashFunction = async (amount: number) => {
    try {
      const response = await axios.post(
        transferCashFunctionRoute,
        { amount },
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const traderSubmitPayment = async (data: SubmitPaymentType) => {
    try {
      console.log('authHeader:', authHeader);
      const response = await axios.post(traderSubmitPaymentRoute, data, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getCustomersDetailsForConfirmation = async (
    page: string,
    limit: string,
    searchValue: string
  ) => {
    try {
      const response = await axios.get(
        `${CustomerDetailsConfirmationRoute}?searchValue=${searchValue}&page=${page}&limit=${limit}`,
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getPlatformCustomers = async (
    page: string,
    limit: string,
    searchValue: string
  ): Promise<CustomerDataType> => {
    try {
      const customers = await axios.get<CustomerDataType>(
        `${allCustomersRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
        {
          headers: authHeader,
        }
      );
      return customers.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getPlatformTokenTransactions = async (
    page: string,
    limit: string,
    searchValue: string
  ): Promise<CustomerDataType> => {
    try {
      const customers = await axios.get<CustomerDataType>(
        `${allTokenTransactionsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
        {
          headers: authHeader,
        }
      );
      return customers.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getPlatformTraders = async (
    page: string,
    limit: string,
    searchValue: string
  ): Promise<CustomerDataType> => {
    try {
      const customers = await axios.get<CustomerDataType>(
        `${allTradersRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
        {
          headers: authHeader,
        }
      );
      return customers.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUserTransactions = async (
    page: string,
    limit: string,
    searchValue: string
  ): Promise<TransactionDataType> => {
    try {
      console.log(page);
      console.log(limit);
      console.log(searchValue);
      const transactions = await axios.get<TransactionDataType>(
        `${transactionsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
        {
          headers: authHeader,
        }
      );
      return transactions.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const markANotificationAsRead = async (notification_id: string) => {
    console.log(notification_id);
    try {
      const response = await axios.put(
        `${markNotificationAsReadRoute}${notification_id}`,
        {},
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    processBiddingFunction,
    fetchBiddingProduct,
    withdrawCashFunction,
    transferCashFunction,
    sendRoyaltyCoin,
    createSalesTargetAmount,
    markANotificationAsRead,
    getUserTransactions,
    getPlatformTraders,
    getPlatformTokenTransactions,
    getPlatformCustomers,
    getCustomersDetailsForConfirmation,
    verifyUser,
    registerUser,
    loginUser,
    forgotPass,
    passwordReset,
    traderSubmitPayment,
    bookingGoods,
  };
};

export default useApi;
