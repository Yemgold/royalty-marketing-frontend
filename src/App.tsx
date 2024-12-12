import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TokenConfirmationPage from './pages/traders/TokenConfirmationPage';
import ReConfirmCustomerPage from './pages/traders/ReConfirmCustomerPage';
import TraderDashboardPage from './pages/traders/TraderDashboardPage';
import CustomerDashboardPage from './pages/customers/CustomerDashboardPage';
import SalesPromoPage from './pages/traders/SalesPromoPage';
import AdminDashboardPage from './pages/admins/AdminDashboardPage';
import AllCustomersPage from './pages/admins/Customers/AllCustomersPage';
import TokenForValuePage from './pages/customers/TokenForValuePage';
import TokenForTargetPage from './pages/customers/TokenForTargetPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';

function App() {
  return (
    <>
      <NavBar />
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

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/customers/all" element={<AllCustomersPage />} />

        {/* TRADER ROUTES */}
        <Route path="/trader/dashboard" element={<TraderDashboardPage />} />
        <Route
          path="/trader/all-customers-confirmation"
          element={<TokenConfirmationPage />}
        />
        <Route
          path="/trader/customers-reconfirmation"
          element={<ReConfirmCustomerPage />}
        />
        <Route path="/trader/sales-promo" element={<SalesPromoPage />} />

        {/* CUSTOMER ROUTES */}
        <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
        <Route
          path="/customer/token-for-value"
          element={<TokenForValuePage />}
        />
        <Route
          path="/customer/token-for-target"
          element={<TokenForTargetPage />}
        />

        {/* PUBLIC ROUTES */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
