import React, { useState } from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {
  const [show, setShow] = useState(false)

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        }
        props.onAddExpense(expenseData);
    }

    const handleShow = () => {
      setShow(true)
    }

    const hideForm = () => {
      setShow(false)
    }

  return (
    <div className='new-expense'>
        {!show && <button onClick={handleShow}>Add New Expense</button>}
        {show && <ExpenseForm onCancel = {hideForm} onSaveExpenseData={saveExpenseDataHandler} />}
    </div>
  )
}

export default NewExpense