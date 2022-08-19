import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../action";
import Layout from "../../components/Layout/Layout";
import { MaterialButton } from "../../components/MaterialUI/MaterialUI";
import AddressForm from "./AddressForm";
import "./style.css";
const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div className={`checkoutHeader ${props.active && "active"}`}>
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  // console.log(user);
  const dispatch = useDispatch();
  const onAddressSubmit = () => {};
  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"1"}
            title={"Login"}
            active={auth.authenticate}
            body={
              <div className="loggedInId">
                <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
              </div>
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"Delivery Address"}
            active={auth.authenticate}
            body={
              <>
                {user.address.map((adr) => (
                  <div className="flexRow addressContainer">
                    <div>
                      <input name="address" type="radio" />
                    </div>
                    <div className="flexRow sb addressinfo">
                      <div>
                        <div>
                          <span>{adr.name}</span>
                          <span>{adr.addressType}</span>
                          <span>{adr.mobile}</span>
                        </div>
                        <div>{adr.address}</div>
                        <MaterialButton
                          title="Delivery Here"
                          style={{ width: "250px" }}
                        />
                      </div>
                      <div>edit</div>
                    </div>
                  </div>
                ))}
              </>
            }
          />
          <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          <CheckoutStep
            stepNumber={"3"}
            title={"Order Summery"}
            active={auth.authenticate}
          />
          <CheckoutStep
            stepNumber={"4"}
            title={"Payment Option"}
            active={auth.authenticate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
