import React, { Fragment } from "react";
import "./Header.css";
import mealImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className="header">
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className="main-image">
        <img src={mealImg} alt="Meal Img" />
      </div>
    </Fragment>
  );
};

export default Header;
