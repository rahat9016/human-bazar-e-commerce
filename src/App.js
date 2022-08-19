import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { isUserLoggedIn } from "./action";
import { updateCart } from "./action/cart.action";
import "./App.css";
import CartPage from "./containers/CartPage/CartPage";
import CheckoutPage from "./containers/CheckoutPage/CheckoutPage";
import HomePage from "./containers/HomePage/HomePage";
import ProductDetailsPage from "./containers/ProductDetailsPage/ProductDetailsPage";
import ProductListPage from "./containers/ProductListPage/ProductListPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [dispatch, auth.authenticate]);
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(updateCart());
    }
  }, [dispatch, auth.authenticate]);
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/:slug" element={<ProductListPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/:productSlug/:productId/p"
          element={<ProductDetailsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
