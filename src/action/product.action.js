import axios from "../helpers/axios";
import { api } from "../urlConfig";
import { productConstants } from "./constance";
export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`${api}/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG,
        payload: res.data,
      });
    } else {
      // dispatch({
      //   type:{}
      // })
    }
  };
};
export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_REQUEST,
      });
      const { cid, type } = payload.params;
      const res = await axios.get(`/page/${cid}/${type}`);
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axios.get(`/product/${productId}`);
      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
          payload: { productDetails: res.data.product },
        });
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
