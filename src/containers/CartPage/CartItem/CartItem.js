import React, { useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import { AiFillDelete } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import "./style.css";
const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { _id, name, price, img } = props.cartItem;
  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };
  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    else {
      setQty(qty - 1);
      props.onQuantityDec(_id, qty - 1);
    }
  };
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>TK. {price}</p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button style={{ cursor: "pointer" }} onClick={onQuantityDecrement}>
            {" "}
            -{" "}
          </button>
          <input value={qty} readOnly />
          <button style={{ cursor: "pointer" }} onClick={onQuantityIncrement}>
            <BsPlus />
          </button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button className="cartActionBtn" style={{ color: "#e03838" }}>
          <AiFillDelete />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
