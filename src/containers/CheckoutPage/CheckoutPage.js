import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../action";
import Layout from "../../components/Layout/Layout";
import { MaterialButton } from "../../components/MaterialUI/MaterialUI";
import AddressForm from "./AddressForm";
import "./style.css";
const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
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
  const [newAddress, setNewAddress] = useState(false);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState([]);
  // console.log(user);
  const dispatch = useDispatch();
  const onAddressSubmit = () => {};
  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
  }, [dispatch, auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);
  const selectAddress = (addr) => {
    const updateAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updateAddress);
  };
  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
  };
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"1"}
            title={"Login"}
            active={auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : null
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"Delivery Address"}
            active={!confirmAddress}
            body={
              <>
                {confirmAddress
                  ? "we are going to show address"
                  : address.map((adr) => (
                      <div className="flexRow addressContainer" key={adr._id}>
                        <div>
                          <input
                            name="address"
                            type="radio"
                            id="address"
                            onClick={() => selectAddress(adr)}
                          />
                        </div>
                        <div className="flexRow sb addressinfo">
                          <div>
                            <div>
                              <span>{adr.name}</span>
                              <span>{adr.addressType}</span>
                              <span>{adr.mobile}</span>
                            </div>
                            <div>{adr.address}</div>
                            {adr.selected && (
                              <MaterialButton
                                title="Delivery Here"
                                style={{ width: "250px" }}
                                onClick={() => confirmDeliveryAddress(adr)}
                              />
                            )}
                          </div>
                          {adr.selected && <div>edit</div>}
                        </div>
                      </div>
                    ))}
              </>
            }
          />

          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              title="Add New Address"
              active={false}
              onClick={() => setNewAddress(true)}
            />
          )}
          {/* {auth.authenticate ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : null} */}
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
