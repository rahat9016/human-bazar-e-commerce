import React from "react";
import Header from "../Header/Header";
import MenuHeader from "../MenuHeader/MenuHeader";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <MenuHeader />
      {props.children}
    </div>
  );
};

export default Layout;
