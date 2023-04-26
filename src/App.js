import Expenses from "./components/Expenses/Expenses";

function App() {
  const expenses = [
    { title: 'Car Insurance', amount: 250, date: new Date(2022, 10, 4)},
    { title: 'Bus Insurance', amount: 550, date: new Date(2020, 28, 4)},
    { title: 'Bike Insurance', amount: 200, date: new Date(2020, 22, 4)},
    { title: 'Other Insurance', amount: 750, date: new Date(2020, 20, 4)}
  ]
  return (
    <div className="App">
     <Expenses expenses = {expenses} />
    </div>
  );
}

export default App;
