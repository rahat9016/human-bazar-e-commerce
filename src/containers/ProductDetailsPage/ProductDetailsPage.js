import React, { useEffect } from "react";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetailsById } from "../../action";
import { AiFillThunderbolt } from "react-icons/ai";
import Layout from "../../components/Layout/Layout";
import { MaterialButton } from "../../components/MaterialUI/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";
import { BiRupee } from "react-icons/bi";
import "./style.css";
import { addToCart } from "../../action/cart.action";
const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  let { productId } = useParams();
  const { productDetails } = useSelector((state) => state.product);
  const navigate = useNavigate();
  useEffect(() => {
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, [dispatch, productId]);
  if (Object.keys(productDetails).length === 0) {
    return null;
  }
  const addToCartHandler = () => {
    const { _id, name, price } = productDetails;
    const img = productDetails.productPictures[0].img;
    dispatch(addToCart({ _id, name, price, img }));
    navigate("/cart", { replace: true });
  };
  return (
    <Layout>
      <div className="productDetailsContainer">
        <div className="productDetailsLeftBox">
          <div className="verticalImageStack">
            {productDetails.productPictures.map((thumb, index) => (
              <div className="thumbnail">
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              </div>
            ))}
            <div className="thumbnail active">
              {productDetails.productPictures.map((thumb, index) => (
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              ))}
            </div>
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={generatePublicUrl(productDetails.productPictures[0].img)}
                alt={`${productDetails.productPictures[0].img}`}
              />
            </div>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={addToCartHandler}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        {/* home > category > subCategory > productName */}
        <div className="productDetailsInfoContainer">
          <div className="breed">
            <ul>
              <li>
                <a href="#">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Mobiles</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Samsung</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">{productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">Extra TK 4500 off </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiRupee />
                {productDetails.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
