import React, { useContext, useState } from "react";
import "./Cart.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemove.bind(null, item.id)}
          onAdd={cartItemAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  const handleOrder = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://fir-dc6b3-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className="actions">
      <button className="button--alt" onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending Order Data...</p>;
  const didSubmitModalContent = (
    <>
      <p>Successfully Ordered!!</p>
      <button className="button--alt" onClick={props.onHideCart}>
        Close
      </button>
    </>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
