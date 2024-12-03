import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import DefaultLayout from './components/DefaultLayout';
import SimpleLayout from './components/SimpleLayout';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import AlterPassword from './pages/alterPassword/AlterPassword';
import Register from './pages/register/Register';
import PrivateRouter from './components/PrivateRouter';
import Profile from './pages/profile/Profile';
import AdminHome from './pages/adminHome/AdminHome';
import ConfirmAccount from './pages/confirmAccount/ConfirmAccount';
import Unauthorized from './pages/unauthorized/Unauthorized';
import NotFound from './pages/notFound/NotFound';
import Category from './pages/categories/Category';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
            <Route path="/profile" element={<DefaultLayout><Profile /></DefaultLayout>} />
            <Route path="/admin" element={<DefaultLayout><AdminHome /></DefaultLayout>} />
            <Route path="/category" element={<DefaultLayout><Category /></DefaultLayout>} />
          </Route>

          <Route path='/login' element={<SimpleLayout><Login /></SimpleLayout>} />
          <Route path='/forgot-password' element={<SimpleLayout><ForgotPassword /></SimpleLayout>} />
          <Route path='/alter-password' element={<SimpleLayout><AlterPassword /></SimpleLayout>} />
          <Route path='/register' element={<SimpleLayout><Register /></SimpleLayout>} />
          <Route path='confirm' element={<SimpleLayout><ConfirmAccount /></SimpleLayout>} />

          <Route path='/401' element={<SimpleLayout><Unauthorized /></SimpleLayout>} />
          <Route path='*' element={<SimpleLayout><NotFound /></SimpleLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
