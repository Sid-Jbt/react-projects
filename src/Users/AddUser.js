import React, { useState } from "react";
import Card from "../UI/Card";
import "./AddUser.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputUsername.trim().length === 0 || inputAge.trim().length === 0){
      setError({
        title: "Invalid Input",
        message: "Please Enter A Valid Name & Age (non-empty values)"
      })
      return
    }
    if(+inputAge < 1){
      setError({
        title: "Invalid Age",
        message: "Please Enter A Valid Age (> 0)"
      })
      return
    }
    props.onAddUser(inputUsername, inputAge);
    setInputUsername("");
    setInputAge("");
  };

  const errorHandler = () => {
    setError(null)
  }

  return (
    <>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm = {errorHandler}/>}
    <Card className="input">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter Username"
          onChange={(e) => setInputUsername(e.target.value)}
          value={inputUsername}
        />
        <label htmlFor="age">Age (In Years)</label>
        <input
          type="number"
          id="age"
          placeholder="Enter Age"
          onChange={(e) => setInputAge(e.target.value)}
          value={inputAge}
        />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </>
  );
};

export default AddUser;
