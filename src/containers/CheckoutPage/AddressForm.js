import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../action";
import {
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI/MaterialUI";

const AddressForm = (props) => {
  const { initialForm } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(initialForm ? initialForm.name : "");

  const [mobile, setMobileNumber] = useState(
    initialForm ? initialForm.mobile : ""
  );
  const [pinCode, setPinCode] = useState(
    initialForm ? initialForm.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialForm ? initialForm.locality : ""
  );
  const [address, setAddress] = useState(
    initialForm ? initialForm.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialForm ? initialForm.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialForm ? initialForm.state : "");
  const [landmark, setLandmark] = useState(
    initialForm ? initialForm.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialForm ? initialForm.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialForm ? initialForm.addressType : ""
  );
  const [id, setId] = useState(initialForm ? initialForm._id : "");
  const [submitFlag, setSubmitFlag] = useState(false);

  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };
  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobile,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
        addressType,
      },
    };

    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  };
  useEffect(() => {
    if (submitFlag) {
      let _address = {};
      if (_address) {
        _address = {
          _id: id,
          name,
          mobile,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }
      props.onSubmitForm(_address);
    }
  }, [
    name,
    mobile,
    pinCode,
    locality,
    address,
    cityDistrictTown,
    state,
    landmark,
    alternatePhone,
    addressType,
    id,
    user.address,
    props,
    submitFlag,
  ]);
  const renderAddressForm = () => {
    return (
      <>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="City/District/Town"
              value={cityDistrictTown}
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              label="Landmark (Optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label="Alternate Phone (Optional)"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Address Type</label>
          <div className="flexRow">
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("home")}
                name="addressType"
                value="home"
              />
              <span>Home</span>
            </div>
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                name="addressType"
                value="work"
              />
              <span>Work</span>
            </div>
          </div>
        </div>
        <div className="flexRow">
          <MaterialButton
            title="SAVE AND DELIVER HERE"
            onClick={onAddressSubmit}
            style={{
              width: "250px",
              margin: "20px 0",
            }}
          />
        </div>
      </>
    );
  };
  if (props.withoutLayout) {
    return <div>{renderAddressForm()}</div>;
  }
  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div
        style={{
          padding: "0 60px",
          paddingBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        {renderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;
