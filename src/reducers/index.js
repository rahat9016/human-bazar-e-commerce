import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import { categoryReducers } from "./category.reducers";
import { productReducers } from "./product.reducers";
import cartReducers from "./cart.reducers";
import { userReducers } from "./user.reducers";
const rootReducers = combineReducers({
  category: categoryReducers,
  product: productReducers,
  auth: authReducers,
  cart: cartReducers,
  user: userReducers,
});

export default rootReducers;
