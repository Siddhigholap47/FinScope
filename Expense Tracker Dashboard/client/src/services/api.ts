import axios from "axios";

// Replace with your backend API base URL if you have one
const api = axios.create({
  baseURL: "http://localhost:5000/api", // change this later if needed
});

// Example placeholder functions (prevent import errors)
export const getExpenses = async () => {
  return []; // empty mock data
};

export const addExpense = async (expense: any) => {
  console.log("Expense added:", expense);
};

export const deleteExpense = async (id: string) => {
  console.log("Expense deleted:", id);
};

export default api;
