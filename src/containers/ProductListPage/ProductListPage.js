import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import getParams from "../../utils/getParams";
import ProductPage from "./ProductPage/ProductPage";
import ProductStore from "./ProductStore/ProductStore";
import "./style.css";
const ProductListPage = (props) => {
  let location = useLocation();

  const renderListProduct = () => {
    const params = getParams(location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore />;
        break;
      case "page":
        content = <ProductPage />;
        break;
      default:
        content = null;
        break;
    }
    return content;
  };
  return <Layout>{renderListProduct()}</Layout>;
};

export default ProductListPage;
