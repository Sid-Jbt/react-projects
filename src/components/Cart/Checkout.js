import React, { useRef, useState } from "react";
import "./Checkout.css";

const isEmpty = (value) => value.trim() == "";

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    add: true,
  });

  const nameInputRef = useRef();
  const addInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAdd = addInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const addIsValid = !isEmpty(enteredAdd);

    setFormInputsValidity({
        name: nameIsValid,
        add: addIsValid
    })

    const isFormValid = nameIsValid && addIsValid;

    if (!isFormValid) {
      return;
    }

    props.onConfirm({
        name: enteredName,
        add: enteredAdd
    });
  };

  return (
    <form className="form" onSubmit={confirmHandler}>
      <div className={`control ${formInputsValidity.name ? '' : 'invalid' }`}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Please Enter A Valid Name</p>}
      </div>
      <div className={`control ${formInputsValidity.add ? '' : 'invalid' }`}>
        <label htmlFor="address">Address</label>
        <input ref={addInputRef} type="text" id="address" />
        {!formInputsValidity.add && <p>Please Enter A Valid Address</p>}
      </div>
      <div className="actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
