import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getProductBySlug } from "../../../action";
import Card from "../../../components/UI/Card/Card";
import { generatePublicUrl } from "../../../urlConfig";

const ProductStore = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = useState({
    under5K: 5000,
    under10K: 10000,
    under15K: 15000,
    under20K: 20000,
    under25K: 25000,
    under30K: 30000,
  });
  const categoryLocation = location.pathname.split("-")[0].split("/")[1];
  useEffect(() => {
    dispatch(getProductBySlug(slug));
  }, [dispatch, slug]);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
            key={key}
            headerLeft={`${categoryLocation} products under ${priceRange[key]}`}
            headerRight={<button>View all</button>}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product, index) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{ display: "block" }}
                  className="productContainer"
                  key={index}
                >
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0px" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>8000</span>
                    </div>
                    <div className="productPrice">${product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ProductStore;
