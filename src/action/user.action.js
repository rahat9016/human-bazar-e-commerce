import axios from "../helpers/axios";
import { userConstants } from "./constance";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      const res = await axios.post("/user/getAddress");

      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        console.log(address);
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: {
            address,
          },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: userConstants.ADD_USER_ADDRESS_REQUEST,
      });
      const res = await axios.post("/user/address/create", { payload });
      if (res.status === 201) {
        console.log(res);
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {}
  };
};
