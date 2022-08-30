import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecordPage from './pages/RecordPage';
import ProfilePage from './pages/ProfilePage';
import RecordListPage from './pages/RecordListPage';
import CheckoutPage from './pages/CheckoutPage';
import { useLayoutEffect } from 'react'
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';

const Wrapper = ({children}: any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Wrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/my-profile" element={<ProfilePage />} />
            <Route path="/vinyl-records" element={<RecordListPage />} />
            <Route path="/vinyl-record/:id" element={<RecordPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Wrapper>
      </Layout>
    </Router>
  );
}

export default App;
