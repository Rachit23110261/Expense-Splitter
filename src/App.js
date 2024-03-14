import React, { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [settledTransactions, setSettledTransactions] = useState([]);
  
const handleAddExpense = () => {
  const name = prompt('Enter name:');
  const amount = parseFloat(prompt('Enter amount:'));
  setExpenses([...expenses, { name, amount }]);
};

const calculateSettlements = () => {
  const average = expenses.reduce((sum, expense) => sum + expense.amount, 0) / expenses.length;
  const balanceMap = expenses.reduce((acc, expense) => {
    acc[expense.name] = expense.amount - average;
    return acc;
  }, {});

  const balanceArray = Object.entries(balanceMap);
  balanceArray.sort((a, b) => a[1] - b[1]);

  const settlements = [];

  let i = 0;
  let j = balanceArray.length - 1;
  let shidtedbalance=0;

  while (balanceArray.length>2) {
    const debtor = balanceArray[i][0];
    const creditor = balanceArray[j][0];
    const debtAmount = Math.min(Math.abs(balanceArray[i][1]), Math.abs(balanceArray[j][1]));
    
    if (debtAmount==Math.abs(balanceArray[i][1]  )) {
      balanceArray[j][1]= balanceArray[j][1]-debtAmount;
      shidtedbalance=balanceArray.shift();

      
    } 
    else {
      balanceArray[i][1]= balanceArray[i][1]+debtAmount;
      shidtedbalance=balanceArray.pop();

    }
    j = balanceArray.length - 1;
    balanceArray.sort((a, b) => a[1] - b[1]);

    settlements.push({
      debtor,
      creditor,
      debtAmount: Math.round(debtAmount),
    });
  }

  setSettledTransactions(settlements);
};


  // ... (handleAddExpense and calculateSettlements functions remain unchanged)

  return (
    <div className="App">
    <h1>Expense Splitter</h1>
    <div className="buttons-container">
      <button onClick={handleAddExpense}>Add Expense</button>
      <button onClick={calculateSettlements}>Calculate Settlements</button>
    </div>
    <div className='results'>
    <div className='enteredexpenses'>
      <h2>Entered Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name} paid {expense.amount}
          </li>
        ))}
      </ul>
    </div>
    <div className='settled'>
      <h2>Settled Transactions</h2>
      <ul>
        {settledTransactions.map((transaction, index) => (
          <li key={index}>
            {transaction.debtor} owes {transaction.creditor} {transaction.debtAmount} amount of money
          </li>
        ))}
      </ul>
    </div>
    </div>
  </div>
);
}

export default App;