import "./index.css";

// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrayerTimes from "./pages/PrayerTimes";
import PrivateRoute from "./components/PrivateRoute";
import Events from "./pages/Events";
import Recources from "./pages/Resources";
import Contact from "./pages/Contact";
import Header from "./components/Navbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import UserList from "./Admin/UserList";
import ForgotPassword from "./pages/ForgotPassword";
import EditProfile from "./pages/EditProfile";

import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import AdminPostEvent from "./Admin/AdminPostEvent";
import PostEvent from "./Admin/AdminPostEvent";
import ManageEvents from "./Admin/ManageEvents";
import ViewMessages from "./Admin/ViewMessages";

import QuizForm from "./Admin/QuizForm";
import AttemptQuiz from "./pages/AttempQuiz";
import BuyHalalStyle from "./pages/BuyHalalStyle";
import Shop from "./pages/BuyHalalStyle";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UploadProduct from "./Admin/UploadProduct";

import AdminOrdersPage from "./Admin/AdminOrdersPage";
import AdminManageProducts from "./Admin/AdminManageProducts";
import EditProduct from "./Admin/EditProduct";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          path="/prayer-times"
          element={
            <PrivateRoute>
              <PrayerTimes />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/halalStyle"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="product/:id"
          element={
            <PrivateRoute>
              <ProductDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrdersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manageProduct"
          element={
            <AdminRoute>
              <AdminManageProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <AdminRoute>
              <UploadProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/post-event"
          element={
            <AdminRoute>
              <PostEvent />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-events"
          element={
            <AdminRoute>
              <ManageEvents />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <AdminRoute>
              <ViewMessages />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/quizForm"
          element={
            <AdminRoute>
              <QuizForm />
            </AdminRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <AttemptQuiz />
            </PrivateRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <Recources />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
