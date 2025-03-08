import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TraderDashboardPage from './pages/traders/TraderDashboardPage';
import CustomerDashboardPage from './pages/customers/CustomerDashboardPage';
import AdminDashboardPage from './pages/admins/AdminDashboardPage';
import AllCustomersPage from './pages/admins/Customers/AllCustomersPage';
// import TransactionHistoryPage from './pages/TransactionHistoryPage';
// import NotificationsPage from './pages/NotificationsPage';
// import NotificationDetailsPage from './pages/NotificationDetailsPage';
import { useSelector } from 'react-redux';
import { UserState } from './constants/types';
import Sidebar from './components/Sidebar';
import PublicRoutes from './components/PublicRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';
import AllTransactionsPage from './pages/admins/Transactions/AllTransactionsPage';
import SubmitPaymentPage from './pages/traders/SubmitPayment';
import CreateSalesTargetPage from './pages/traders/CreateSalesTargetPage';
import SendRoyalCoinPage from './pages/traders/SendRoyalCoinPage';
import BookingGoodsPage from './pages/customers/BookingGoodsPage';
import TransferReferralCashPage from './pages/customers/TransferReferralCashPage';
import WithdrawCashPage from './pages/customers/WithdrawCashPage';
import BidForProductsPage from './pages/customers/BidForProductsPage';
import AuthWatcher from './components/AuthWatcher';

function App() {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  return (
    <>
      <AuthWatcher />
      <NavBar />

      <div className="flex h-screen ">
        {currentUser && <Sidebar />}

        <div className="flex-grow overflow-y-auto">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedRoutes />}>
              {/* SUPER ADMIN ROUTES */}
              {/* <Route path="/super-admin/admins/all" element={<AllAdmins />} /> */}
              {/* <Route
        path="/super-admin/admin/:adminId"
        element={<SingleAdminDetails />}
      /> */}

              {/* ADMIN ROUTES */}
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route
                path="/admin/customers/all"
                element={<AllCustomersPage />}
              />

              {/* <Route path="/admin/accounts/all" element={<AllAccounts />} /> */}
              {/* <Route
        path="/admin/account/:userId/:accountId"
        element={<SingleAccountDetails />}
      /> */}
              <Route
                path="/admin/customers/all"
                element={<AllCustomersPage />}
              />
              {/* <Route
        path="/admin/customer/:customerId"
        element={<SingleCustomerDetails />}
      /> */}
              <Route
                path="/admin/transactions/all"
                element={<AllTransactionsPage />}
              />

              {/* <Route
        path="/admin/transaction/:transactionId"
        element={<SingleTransactionDetails />}
      /> */}

              {/* TRADERS ROUTES*/}
              <Route
                path="/trader/dashboard"
                element={<TraderDashboardPage />}
              />
              <Route
                path="/trader/create-sales-target"
                element={<CreateSalesTargetPage />}
              />
              <Route
                path="/trader/send-royalty-coins"
                element={<SendRoyalCoinPage />}
              />
              <Route
                path="/trader/submit-payment"
                element={<SubmitPaymentPage />}
              />

              {/* { CUSTOMER ROUTES } */}
              <Route
                path="/customer/dashboard"
                element={<CustomerDashboardPage />}
              />
              <Route
                path="/customer/withdraw-cash"
                element={<WithdrawCashPage />}
              />
              <Route
                path="/customer/transfer-referral-cash"
                element={<TransferReferralCashPage />}
              />
              <Route
                path="/customer/booking-goods"
                element={<BookingGoodsPage />}
              />
              <Route
                path="/customer/bid-for-products"
                element={<BidForProductsPage />}
              />

              {/* GENERAL ROUTES */}
              {/* <Route path="/profile" element={<Profile />} /> */}
              {/* <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/transactions" element={<TransactionsPage />} /> */}
              {/* <Route
        path="/transaction/:transactionId"
        element={<TransactionDetails />}
      /> */}
              {/* <Route path="/notifications" element={<NotificationsPage />} /> */}
              {/* <Route
        path="/notification/:notificationId"
        element={<NotificationDetails />}
      /> */}
              {/* <Route path="/accounts" element={<MyAccountsPage />} /> */}
              {/* <Route path="/transfer" element={<TransferPage />} /> */}
              {/* <Route
        path="/account/:account_id"
        element={<AccountDetailsPage />}
      /> */}
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route
              path="/email-verification"
              element={<EmailVerificationPage />}
            />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
