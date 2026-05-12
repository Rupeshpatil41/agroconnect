// client/src/App.js

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import FarmerDashboard from "./pages/FarmerDashboard";

import CompanyDashboard from "./pages/CompanyDashboard";

import AddProduct from "./pages/AddProduct";

import BrowseProducts from "./pages/BrowseProducts";

import FarmerOrders from "./pages/FarmerOrders";

import CompanyOrders from "./pages/CompanyOrders";

import ProductDetail from "./pages/ProductDetail";

import Profile from "./pages/Profile";

import PublicProfile from "./pages/PublicProfile";

import Chat from "./pages/Chat";

import AddReview from "./pages/AddReview";

import Notifications from "./pages/Notifications";

import PricePrediction from "./pages/PricePrediction";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* FARMER */}
        <Route
          path="/farmer-dashboard"
          element={
            <FarmerDashboard />
          }
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/farmer-orders"
          element={
            <FarmerOrders />
          }
        />

        {/* COMPANY */}
        <Route
          path="/company-dashboard"
          element={
            <CompanyDashboard />
          }
        />

        <Route
          path="/browse-products"
          element={
            <BrowseProducts />
          }
        />

        <Route
          path="/company-orders"
          element={
            <CompanyOrders />
          }
        />

        {/* PRODUCT */}
        <Route
          path="/product/:id"
          element={
            <ProductDetail />
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/profile/:id"
          element={
            <PublicProfile />
          }
        />

        {/* CHAT */}
        <Route
          path="/chat"
          element={<Chat />}
        />

        {/* REVIEW */}
        <Route
  path="/reviews/:id"
  element={
    <AddReview />
  }
/>
        {/* NOTIFICATIONS */}
        <Route
          path="/notifications"
          element={
            <Notifications />
          }
        />

        <Route
  path="/price-prediction"
  element={
    <PricePrediction />
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;