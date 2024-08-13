import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import DefaultLayout from './components/DefaultLayout';
import SimpleLayout from './components/SimpleLayout';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import AlterPassword from './pages/alterPassword/AlterPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout><Home/></DefaultLayout>} />
          <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>} />
          <Route path='/forgot-password' element={<SimpleLayout><ForgotPassword/></SimpleLayout>} />
          <Route path='/alter-password' element={<SimpleLayout><AlterPassword/></SimpleLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
