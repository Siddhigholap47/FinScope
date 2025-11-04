import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { SummaryCard } from '../components/SummaryCard';
import { TransactionCard } from '../components/TransactionCard';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import api from '../api'; // Make sure api.ts exports an axios instance

export function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  const userName = localStorage.getItem('userName') || 'User';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard'); // Adjust route per your backend
        const data = response.data;

        setTotalBalance(data.totalBalance || 0);
        setTotalIncome(data.totalIncome || 0);
        setTotalExpense(data.totalExpense || 0);
        setTransactions(data.transactions || []);
        setMonthlyData(data.monthlyData || []);
        setWeeklyData(data.weeklyData || []);
        setCategoryData(data.categoryData || []);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Welcome back, {userName}! 👋</h1>
        <p className="text-gray-600">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          amount={totalBalance}
          icon={Wallet}
          gradient="bg-gradient-to-br from-[#4E61D3] to-[#6B7FE8]"
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-[#10B981] to-[#34D399]"
        />
        <SummaryCard
          title="Total Expense"
          amount={totalExpense}
          icon={TrendingDown}
          gradient="bg-gradient-to-br from-[#EF4444] to-[#F87171]"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Income vs Expenses */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-gray-900 mb-4">Income vs Expenses (Last 6 Months)</h3>
          {monthlyData.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No data available yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="income" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart - Category Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-gray-900 mb-4">Expense by Category</h3>
          {categoryData.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No category data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Line Chart - Weekly Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 lg:col-span-2">
          <h3 className="text-gray-900 mb-4">Weekly Spending Trend</h3>
          {weeklyData.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No weekly data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4E61D3"
                  strokeWidth={3}
                  dot={{ fill: '#4E61D3', r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Recent Transactions</h3>
          <button className="text-[#4E61D3] hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center">
              No transactions yet. Add one to get started!
            </p>
          ) : (
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                {...transaction}
                onDelete={handleDeleteTransaction}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
