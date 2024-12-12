export type LoginFormData = {
  login_input: string;
  password: string;
};

export type ResetPasswordFormData = {
  password: string;
  confirm_password: string;
};

export type ResetPasswordFormDataType = ResetPasswordFormData &
  VerificationDataType;

export type FormData = ResetPasswordFormData & {
  email: string;
  phone_number: string;
  selected_role: string;
};

export type UserState = {
  currentUser: CurrentUserType;
  access: string;
  web: string;
  loading: boolean;
  error: null;
};

export type VerificationDataType = {
  userId: string;
  token: string;
};

export type AllMyCustomersForTokenApprovalType = {
  contact_no: string;
  percent: number;
  user_id: string;
};

export type TokenState = {
  allMyCustomersForTokenApproval: AllMyCustomersForTokenApprovalType;
  allMyCustomersForTokenApprovalTotalCount: number;
};

export type CurrentUserType = {
  id: string;
  status: string;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  role: string;
};

export type AdminState = {
  allCustomers: CurrentUserType[];
  allTraders: CurrentUserType[];
  allCustomersTotalCount: number;
  allTradersTotalCount: number;
  allTokenTransactionsTotalCount: number;
};

export type TransactionType = {
  account_id: string;
  account_number: string;
  amount: string;
  created_at: string;
  description: string;
  id: string;
  receiving_account: string;
  reference_number: string;
  transaction_date: string;
  transaction_source: string;
  transaction_status: string;
  transaction_type: string;
  updated_at: string;
  user_id: string;
};

export type TransactionDataType = SuccessMessage & {
  transactions: {
    transactions: TransactionType[];
    totalCount: number;
  };
};

export type SearchProp = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type TransactionState = {
  transactionDetails: TransactionType[];
  totalTransactionsCount: number;
  singleAccountTransactionDetails: TransactionType[];
  singleTransactionDetails: {
    id: string;
    user_id: string;
    amount: string;
    transaction_type: string;
    transaction_date: string;
    transaction_status: string;
    description: string;
    account_id: string;
    reference_number: string;
    created_at: string;
    updated_at: string;
    transaction_source: string;
    receiving_account: string;
    account_number: string;
    receiving_account_number: string;
    receiving_bank_name: string;
    receiver_account_name: string;
  };

  singleAccountCompletedTransactionsCount: number;
  singleAccountTotalTransactionsCount: number;

  loading: boolean;
  error: boolean;
};

export type SuccessMessage = {
  message: string;
  success: boolean;
};

export type CustomerDataType = SuccessMessage & {
  customers: {
    customers: CurrentUserType[];
    totalCount: number;
  };
};

export type FormDataKey = keyof FormData;
export type ResetPasswordFormDataKey = keyof ResetPasswordFormData;

export type LoginFormDataKey = keyof LoginFormData;
