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
  allTransactionsRoute,
  deleteManyNotificationRoute,
  deleteNotificationRoute,
  singleNotificationRoute,
  markNotificationAsViewedRoute,
  allNotificationsRoute,
} from './ApiRoutes';
import {
  CustomerDataType,
  FormData,
  LoginFormData,
  ResetPasswordFormDataType,
  TransactionDataType,
  VerificationDataType,
} from '../constants/types';

const useApi = () => {
  const webAuth = '';
  const header = {
    'Content-Type': 'application/json',
  };

  const authHeader = {
    ...header,
    Authorization: `Bearer ${webAuth}`,
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
      const response = await axios.post(RegisterRoute, formData, {
        headers: header,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const verifyUser = async (data: VerificationDataType) => {
    try {
      console.log('API formData', data);
      const response = await axios(
        `${VerificationRoute}?userId=${data?.userId}&token=${data?.token}`,
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

  const getPlatformTransactions = async (
    page: string,
    limit: string,
    searchValue: string
  ): Promise<TransactionDataType> => {
    try {
      const transactions = await axios.get<TransactionDataType>(
        `${allTransactionsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
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

  const getNotifications = async (
    page: string,
    limit: string,
    searchValue: string
  ) => {
    try {
      const response = await axios(
        `${allNotificationsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
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

  const markNotificationsAsViewed = async () => {
    try {
      const response = await axios.put(
        markNotificationAsViewedRoute,
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

  const getSingleNotification = async (notification_id: string) => {
    try {
      const response = await axios(
        `${singleNotificationRoute}/${notification_id}`,
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

  const deleteNotification = async (notification_id: number) => {
    try {
      const id = notification_id.toString();
      const response = await axios.delete(`${deleteNotificationRoute}/${id}`, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteManyNotifications = async (notification_ids: number[]) => {
    try {
      console.log('deleteManyNotifications:', notification_ids);
      const response = await axios.post(
        deleteManyNotificationRoute,
        {
          notification_ids,
        },
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
    getSingleNotification,
    markANotificationAsRead,
    deleteManyNotifications,
    deleteNotification,
    getNotifications,
    markNotificationsAsViewed,
    getPlatformTransactions,
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
  };
};

export default useApi;
