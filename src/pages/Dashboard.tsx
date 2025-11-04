
import React, { useEffect, useState } from 'react';
import { expenses } from '../services/api';

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await expenses.list();
        setItems(res.data);
      } catch(e) {
        console.error(e);
      } finally { setLoading(false); }
    }
    load();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2>Your expenses</h2>
      {items.length === 0 ? <div>No expenses found</div> : (
        <ul>
          {items.map(it => <li key={it._id}>{it.category} — {it.amount} — {new Date(it.date).toLocaleDateString()}</li>)}
        </ul>
      )}
    </div>
  );
}
