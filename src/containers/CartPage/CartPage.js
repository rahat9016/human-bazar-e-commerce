import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/UI/Card/Card";
import "./style.css";
const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  return (
    <Layout>
      <div className="cartContainer">
        <Card headerLeft={`My Cart`} headerRight={`Deliver to`}>
          {Object.keys(cartItems).map((keys, index) => (
            <div className="flexRow" key={index}>
              <div className="cartProductContainer">
                <img src="" alt="" />
              </div>
              <div className="cartItemDetails">
                <div>
                  {cartItems[keys].name} - Quantity {cartItems[keys].qty}
                </div>
                <div>Delivery in 3 - 5 days</div>
              </div>
            </div>
          ))}
        </Card>
        <Card style={{ width: "500px" }}>price</Card>
      </div>
    </Layout>
  );
};

export default CartPage;
