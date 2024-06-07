import { BrowserRouter, Route, Routes } from "react-router-dom";
// components
import Header from "./components/Header"
import Footer from "./components/Footer"
// pages
import Home from "./pages/Home"
import Movies from "./pages/Movies";
import Favourites from "./pages/Favourites"
import Shop from "./pages/Shop"
import Movie from "./pages/Movie"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/movie/:id/details" element={<Movie />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
