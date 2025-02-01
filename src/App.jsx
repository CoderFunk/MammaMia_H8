import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { MiProveedor } from './context/MiProveedor';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { UserProvider } from './context/UserContext';



function App() {

  return (
    <UserProvider>
      <MiProveedor>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={
            <PublicRoute>
            <Register />
          </PublicRoute>
          } />
          <Route path='/login' element={
            <PublicRoute>
            <Login />
          </PublicRoute>
          } />
          <Route path='/cart' element={
              <Cart />
          } />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/*' element={<NotFound />} />
        </Routes>

        <Footer />
      </MiProveedor>
    </UserProvider>

  )
}

export default App;