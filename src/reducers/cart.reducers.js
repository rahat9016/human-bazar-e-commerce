import { cartConstants } from "../action/constance";

const initState = {
  cartItems: {},
  loading: false,
};

const cartReducers = (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
      };
      break;
    default:
      return state;
  }
  return state;
};
export default cartReducers;
