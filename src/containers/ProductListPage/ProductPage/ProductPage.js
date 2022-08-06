import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProductPage } from "../../../action/product.action";
import getParams from "../../../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./style.css";
import Card from "../../../components/UI/Card/Card";
const ProductPage = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  useEffect(() => {
    const params = getParams(location.search);
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, [dispatch, location.search]);
  return (
    <div style={{ margin: "0px 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}} autoPlay>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img src={banner.img} alt="" style={{ height: "100%" }} />
            </a>
          ))}
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px 0px",
        }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card
              key={index}
              style={{
                width: "400px",
                height: "200px",
                margin: "0px 5px",
              }}
            >
              <img
                key={index}
                src={product.img}
                alt=""
                width="100%"
                height="100%"
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
