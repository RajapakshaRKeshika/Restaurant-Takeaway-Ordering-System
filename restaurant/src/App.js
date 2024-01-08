import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/navigation/navigation';
import AddUsers from './pages/admin/add_admin/add_user';
import AddMenu from './pages/admin/menu/add_menu';
import Cart from './components/cart/cart';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/register/register';
import OrdersPage from './pages/admin/order/order';
import OffersPage from './pages/offer/offer';
import AddPromotion from './pages/admin/offer/add_offer';
import AddOffer from './pages/admin/offer/add_offer';
import ViewUser from './pages/admin/user/view_user';
import ContactUsPage from './pages/contact/contact';
import MessagesPage from './pages/admin/contact/view_contact';
import Account from './pages/account/account';
import Logout from './pages/logout/logout';
import AdminLogin from './pages/admin/admin_login/admin_login';
import Home from './pages/home/home';
import MenuPage from './pages/menu/menu';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/staff/add_user" element={<AddUsers />} />
        <Route path="/staff/add_menu" element={<AddMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/staff/order" element={<OrdersPage />} />
        <Route path="/offer" element={<OffersPage />} />
        <Route path="/staff/add_offer" element={<AddOffer />} />
        <Route path="/staff/view_user" element={<ViewUser />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/staff/view_message" element={<MessagesPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin_login" element={<AdminLogin />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;