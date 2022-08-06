import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../action/cart.action";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/UI/Card/Card";
import CartItem from "./CartItem/CartItem";
import "./style.css";
const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };
  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };
  return (
    <Layout>
      <div className="cartContainer">
        <Card headerLeft={`My Cart`} headerRight={`Deliver to`}>
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
            />
          ))}
        </Card>
        <Card
          style={{ width: "500px", alignItems: "flex-start" }}
          headerLeft="Price"
        ></Card>
      </div>
    </Layout>
  );
};

export default CartPage;
