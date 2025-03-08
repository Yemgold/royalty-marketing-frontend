export type LoginFormData = {
  email: string;
  password: string;
  role: string;
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
  role: string;
  name: string;
};

export type NotificationProp = {
  id: number;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  message: string;
  receiver: string;
  title: string;
  user_id: string;
};

export type NotificationState = {
  userNotifications: NotificationProp[];
  totalIsViewed: number;
  totalNotificationsCount: number;
  singleUserNotification: NotificationProp;
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

export type ProcessBiddingType = {
  productToken: string;
  royaltyBidingAmount: string;
};

export type bookingGoodsType = {
  packs: string;
  referralToken: string;
  customerToken: string;
};

export type biddingProductObjType = {
  _id: string;
  adminId: string;
  name: string;
  image: object;
  cost: number;
  productToken: string;
  createdAt: string;
  updatedAt: string;
};

export type biddingProductType = biddingProductObjType[];

export type withdrawCashType = {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
};

export type SendRoyaltyCoinType = {
  amount_of_goods_purchased: number;
  customerToken: string;
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

export type ProfilePropType = {
  business_address: string;
  business_name: string;
  phone_number: string;
  bank_name?: string;
  account_name?: string;
  account_number?: string;
};

export type SubmitPaymentType = {
  role: string;
  id: string;
  amount: number;
};

export type CurrentUserType = {
  _id: string;
  email: string;
  name: string;
  role: string;
  royaltyCoinBalance: number;
  referralCashWallet: number;
  bookingWallet: number;
  biddingWallet: number;
  potentialEarning: number;
  salesTargetAmount: number;
  token: string;
  totalSales: number;
  walletBalance: number;
  profile: ProfilePropType;

  status: string;
  user_name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
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

export type SidebarComponentProps = {
  toggle: boolean | undefined;
  handleDropDownToggle?: () => void;
  dropDownOpen?: boolean | undefined;
  handleTheDropDownToggle?: () => void;
  dropOpen?: boolean | undefined;
  handleGeneralMenuToggle?: () => void;
  generalMenuOpen?: boolean | undefined;
  handleAdminMenuToggle?: () => void;
  handleTraderMenuToggle?: () => void;
  handleCustomerMenuToggle?: () => void;
  adminMenuOpen?: boolean | undefined;
  traderMenuOpen?: boolean | undefined;
  customerMenuOpen?: boolean | undefined;
  handleSuperAdminMenuToggle?: () => void;
  handleCloseToggle?: () => void;
  superAdminMenuOpen?: boolean | undefined;
};

export type NavLinkType = {
  isActive: boolean;
  extraClasses?: string;
};
