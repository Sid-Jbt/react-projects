import React, { useRef, useState } from "react";
import "./MealItemForm.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amtInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amtInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
       return;
    }

    props.onAddToCart(enteredAmountNumber);

  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <Input
        ref={amtInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter Valid Quantity (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
