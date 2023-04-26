import { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  { id: '001', title: "Car Insurance", amount: 250, date: new Date(2022, 10, 4) },
  { id: '002', title: "Bus Insurance", amount: 550, date: new Date(2020, 28, 4) },
  { id: '003', title: "Bike Insurance", amount: 200, date: new Date(2020, 22, 4) },
  { id: '004', title: "Other Insurance", amount: 750, date: new Date(2020, 20, 4) },
];

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses]
    });
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
