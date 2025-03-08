const host = 'https://o-netshopping.onrender.com/api';

const LoginRoute = `${host}/auth/login`;
const RegisterRoute = `${host}/auth/register`;
const VerificationRoute = `${host}/auth/verify-email`;
const ForgotPassRoute = `${host}`;
const logoutRoute = `${host}`;
const PasswordResetRoute = `${host}`;
const CustomerDetailsConfirmationRoute = `${host}`;
const allCustomersRoute = `${host}`;
const allTokenTransactionsRoute = `${host}`;
const allTradersRoute = `${host}`;
const transactionsRoute = `${host}`;
const markNotificationAsReadRoute = `${host}`;
const processBiddingFunctionRoute = `${host}/requests/redeem-coins`;
const fetchBiddingProductRoute = `${host}/requests/bidding-products`;
const withdrawCashFunctionRoute = `${host}/requests/withdraw-to-bank`;
const transferCashFunctionRoute = `${host}/requests/withdraw-referral-cash`;
const bookingGoodsRoute = `${host}/requests/book-goods`;
const sendRoyaltyCoinRoute = `${host}/requests/send-royalty-coins`;
const traderSubmitPaymentRoute = `${host}/requests/request-credit`;
const createSalesTargetAmountRoute = `${host}/requests/sales-target`;

export {
  bookingGoodsRoute,
  sendRoyaltyCoinRoute,
  createSalesTargetAmountRoute,
  logoutRoute,
  traderSubmitPaymentRoute,
  transferCashFunctionRoute,
  withdrawCashFunctionRoute,
  fetchBiddingProductRoute,
  markNotificationAsReadRoute,
  processBiddingFunctionRoute,
  transactionsRoute,
  allTokenTransactionsRoute,
  allTradersRoute,
  allCustomersRoute,
  CustomerDetailsConfirmationRoute,
  LoginRoute,
  RegisterRoute,
  VerificationRoute,
  ForgotPassRoute,
  PasswordResetRoute,
};

/*
<Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route
          path="/transaction-history"
          element={<TransactionHistoryPage />}
        />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route
          path="/notification/:notificationId"
          element={<NotificationDetailsPage />}
        />

        { ADMIN ROUTES }
       
        { TRADER ROUTES }
       
         

        // { PUBLIC ROUTES }
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      */
