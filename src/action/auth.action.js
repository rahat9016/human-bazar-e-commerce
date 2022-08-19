import axios from "../helpers/axios";
import { authConstants, cartConstants } from "./constance";
export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    const res = await axios.post("/signing", {
      ...user,
    });
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
// export const signup = (user) => {
//   return async (dispatch) => {
//     dispatch({
//       type: userConstants.USER_REGISTER_REQUEST,
//     });
//     const res = await axios.post("/admin/signup", {
//       ...user,
//     });
//     if (res.status === 201) {
//       const { message } = res.data;
//       dispatch({
//         type: userConstants.USER_REGISTER_SUCCESS,
//         payload: {
//           message,
//         },
//       });
//     } else {
//       if (res.status === 400) {
//         dispatch({
//           type: userConstants.USER_REGISTER_FAILURE,
//           payload: { error: res.data.error },
//         });
//       }
//     }
//   };
// };
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};
export const signOut = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
    localStorage.clear();
    window.location.reload();
    // window.localStorage.removeItem("user");
    // window.localStorage.removeItem("token");
    dispatch({
      type: authConstants.LOGOUT_SUCCESS,
    });
    dispatch({
      type: cartConstants.RESET_CART,
    });
  };
};
