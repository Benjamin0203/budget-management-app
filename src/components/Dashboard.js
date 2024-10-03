// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import BudgetChart from './BudgetChart';

const Dashboard = ({ auth }) => {
  const [budget, setBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  const [newBudget, setNewBudget] = useState('');

  // State for editing a transaction
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const userId = auth.getProfile().sub;

  useEffect(() => {
    const userDocRef = doc(db, 'users', userId);

    // Fetch budget
    const fetchBudget = async () => {
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setBudget(userData.budget || 0);
      }
    };

    fetchBudget();

    // Listen for transactions
    const transactionsRef = collection(db, 'users', userId, 'transactions');
    const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleSetBudget = async (e) => {
    e.preventDefault();

    const userDocRef = doc(db, 'users', userId);

    await setDoc(
      userDocRef,
      {
        budget: parseFloat(newBudget),
      },
      { merge: true }
    );

    setBudget(parseFloat(newBudget));
    setNewBudget('');
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const transactionsRef = collection(db, 'users', userId, 'transactions');

    await addDoc(transactionsRef, {
      type: 'expense',
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: serverTimestamp(),
    });

    setExpenseAmount('');
    setExpenseCategory('');
  };

  // Edit transaction functions
  const startEditing = (transaction) => {
    setEditingTransaction(transaction);
    setEditAmount(transaction.amount);
    setEditCategory(transaction.category);
  };

  const cancelEditing = () => {
    setEditingTransaction(null);
    setEditAmount('');
    setEditCategory('');
  };

  const saveEditedTransaction = async (e) => {
    e.preventDefault();

    const transactionRef = doc(
      db,
      'users',
      userId,
      'transactions',
      editingTransaction.id
    );

    await updateDoc(transactionRef, {
      amount: parseFloat(editAmount),
      category: editCategory,
    });

    // Reset editing state
    cancelEditing();
  };

  const deleteTransaction = async (transactionId) => {
    const transactionRef = doc(db, 'users', userId, 'transactions', transactionId);
    await deleteDoc(transactionRef);
  };

  return (
    <div>
      <h1>Welcome, {auth.getProfile().name}</h1>
      <h2>Budget: ${budget.toFixed(2)}</h2>

      {/* Form to Set Budget */}
      <form onSubmit={handleSetBudget}>
        <h3>Set Your Budget</h3>
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Enter budget amount"
          required
        />
        <button type="submit">Set Budget</button>
      </form>

      {/* Form to Add Expense */}
      <form onSubmit={handleAddExpense}>
        <h3>Add an Expense</h3>
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder="Enter expense amount"
          required
        />
        <input
          type="text"
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
          placeholder="Enter category"
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* Edit Transaction Form */}
      {editingTransaction && (
        <form onSubmit={saveEditedTransaction}>
          <h3>Edit Transaction</h3>
          <input
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            placeholder="Enter category"
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={cancelEditing}>
            Cancel
          </button>
        </form>
      )}

      {/* Display Transactions */}
      <h3>Your Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)} -{' '}
            {transaction.category}{' '}
            <button onClick={() => startEditing(transaction)}>Edit</button>{' '}
            <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Budget Chart */}
      <BudgetChart transactions={transactions} budget={budget} />
    </div>
  );
};

export default Dashboard;
