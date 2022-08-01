import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import UserRoute from './components/UserRoute';
import AdminRoute from './components/AdminRoute';
import AdminEditProduct from './components/AdminEditProduct';
import Order from './components/Order';
import Product from './components/Product';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Shipping from './components/Shipping';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signin' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/order' element={<Order />} />
        <Route exact path='/shipping' element={<Shipping />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route exact path='/product/:productId' element={<Product />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route element={<UserRoute />}>
          <Route exact path='/user/dashboard' element={<UserDashboard />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
          <Route exact path='/admin/edit/product/:productId' element={<AdminEditProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
