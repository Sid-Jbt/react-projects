import React, { useContext, useEffect, useState } from "react";
import "./HeaderCartButton.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const[btnHighlight, setBtnHighlight] = useState(false)

  const cartCtx = useContext(CartContext)

  const {items} = cartCtx;

  const numOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
 
  const btnClasses = `button ${btnHighlight ? 'bump' : ''}`

  useEffect(() => {
    if(cartCtx.items.length === 0){
      return;
    }
    setBtnHighlight(true);

    const timer = setTimeout(() => {
      setBtnHighlight(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    };
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
