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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
            {/* Inserir outras páginas de acesso restrito */}
          </Route>
          <Route path='/login' element={<SimpleLayout><Login /></SimpleLayout>} />
          <Route path='/forgot-password' element={<SimpleLayout><ForgotPassword /></SimpleLayout>} />
          <Route path='/alter-password' element={<SimpleLayout><AlterPassword /></SimpleLayout>} />
          <Route path='/register' element={<SimpleLayout><Register /></SimpleLayout>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
