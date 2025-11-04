import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // adjust if your backend uses a different port
});

// Signup request
export const signup = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await API.post("/signup", userData);
  return res.data;
};

export async function getExpenses() {
  const res = await fetch('/api/expenses');
  return res.json();
}

export async function addExpense(data) {
  return fetch('/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteExpense(id) {
  return fetch(`/api/expenses/${id}`, { method: 'DELETE' });
}


// Login request
export const login = async (userData: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/login", userData);
  return res.data;
};
