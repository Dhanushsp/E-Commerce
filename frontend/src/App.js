import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { Shopcategory } from './Pages/Shopcategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
import CheckoutPage from './Pages/Checkout';

export const backend_url = 'https://e-commerce-backend-lgh6.onrender.com';
export const currency = '₹';

function App() {
  return (
    <div className="font-Poppins">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Shop />} />

          {/* Category routes */}
          <Route path="/mens" element={<Shopcategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<Shopcategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<Shopcategory banner={kids_banner} category="kid" />} />

          {/* Product detail route with dynamic productId */}
          <Route path="/product/:productId" element={<Product />} />

          {/* Cart and Login routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />

          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
