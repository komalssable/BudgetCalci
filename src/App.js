import './App.css'
import Alert from './components/Alert'
import ExpenseForm from './components/ExpenseForm'
import ExpenseLst from './components/ExpenseLst'

import { useEffect, useState } from 'react'

// const initialExpenses = [
//   // { id : new Date().getTime(),charge:"rent",amount:1800},
//   // { id : new Date().getTime(),charge:"car payment",amount:400},
//   // { id : new Date().getTime(),charge:"credit card bill",amount:180},
  
// ];
const initialExpenses = localStorage.getItem("expenses")?JSON.parse(localStorage.getItem("expenses")) :[]
function App() {
  const [expenses,setExpenses] = useState(initialExpenses);
  
  const [charge,setCharge] =useState('');
  const [amount,setAmount] =useState('');
  const [edit,setEdit] =useState(false);
  const [id,setId] =useState(0);
   useEffect(() => {
     localStorage.setItem("expenses",JSON.stringify(expenses));
   })
  
  const handleCharge = e => {
    setCharge(e.target.value)
  }

  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== "" && amount > 0) {
      if(edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? {...item,charge,amount}:item
        });
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        const singleExpense= {id:new Date().getTime(),charge,amount};
      setExpenses([...expenses,singleExpense]);
      }
      
      setCharge("");
      setAmount("");
    } else {

    }
  }

  const clearExpenses = (expenses) => {
    console.log(expenses);
    setExpenses([])
}

const deleteHandler = (id) => {
 const newItems= expenses.filter((item) => item.id !== id)
  setExpenses(newItems)
}


const editHandler = (id) => {
  let expense = expenses.find((item) => item.id === id)
   let {charge,amount} = expense;
   setCharge(charge);
   setAmount(amount);
   setEdit(true);
   setId(id);
 };
 
  return (
    <>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm 
        charge={charge} 
        amount={amount}
        handleCharge={handleCharge} 
        handleAmount={handleAmount}
        handleSubmit={handleSubmit} 
        edit={edit}/>

        <ExpenseLst 
        expenses={expenses} 
        clearExpenses={clearExpenses} 
        deleteHandler={deleteHandler} 
        editHandler={editHandler} 
        
        />
      </main>
      <h1>
        total spending : <span className="total">
          ${expenses.reduce((acc,curr) => {
              return (acc +=parseInt(curr.amount));
          },0)}
        </span>
      </h1>
      
    </>
  );
}

export default App;
