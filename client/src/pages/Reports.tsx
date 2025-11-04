import { useState, useEffect } from 'react';
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

interface SavingsTrend {
  month: string;
  amount: number;
}

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('2025');
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [savingsTrend, setSavingsTrend] = useState<SavingsTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Future backend integration:
    // Fetch data dynamically from backend
    const fetchReports = async () => {
      setLoading(true);
      try {
        // Example placeholder for real API call:
        // const res = await fetch(`/api/reports?year=${selectedPeriod}`);
        // const data = await res.json();
        // setMonthlyData(data.monthly);
        // setSavingsTrend(data.trend);

        // For now, empty placeholder data:
        setMonthlyData([]);
        setSavingsTrend([]);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [selectedPeriod]);

  const totalIncome = monthlyData.reduce((sum, i) => sum + i.income, 0);
  const totalExpense = monthlyData.reduce((sum, i) => sum + i.expense, 0);
  const totalSavings = monthlyData.reduce((sum, i) => sum + i.savings, 0);
  const averageMonthlyIncome =
    monthlyData.length > 0 ? Math.round(totalIncome / monthlyData.length) : 0;

  const downloadReport = async (type: 'income' | 'expense') => {
    if (monthlyData.length === 0) return alert('No data available to download.');

    const csvContent = [
      ['Month', 'Income', 'Expense', 'Savings'],
      ...monthlyData.map((item) => [
        item.month,
        item.income,
        item.expense,
        item.savings,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-report-${selectedPeriod}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">
            Analyze your income, expenses, and savings trends.
          </p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-40 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#4E61D3] to-[#6B7FE8] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <p className="text-white/80">Total Income</p>
          </div>
          <p className="text-white">
            ₹{totalIncome.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#EF4444] to-[#F87171] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingDown className="w-5 h-5" />
            </div>
            <p className="text-white/80">Total Expense</p>
          </div>
          <p className="text-white">
            ₹{totalExpense.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-white/80">Total Savings</p>
          </div>
          <p className="text-white">
            ₹{totalSavings.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#CFADC1] to-[#E9D484] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-white/80">Avg Monthly</p>
          </div>
          <p className="text-white">
            ₹{averageMonthlyIncome.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={() => downloadReport('income')}
          className="bg-white border-2 border-[#4E61D3] text-[#4E61D3] hover:bg-[#4E61D3] hover:text-white rounded-xl py-6 transition-all duration-300"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Income Report
        </Button>
        <Button
          onClick={() => downloadReport('expense')}
          className="bg-white border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded-xl py-6 transition-all duration-300"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Expense Report
        </Button>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        {/* Monthly Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-gray-900 mb-4">Monthly Overview - {selectedPeriod}</h3>
          {loading ? (
            <div className="text-center text-gray-500 py-20">Loading data...</div>
          ) : monthlyData.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No report data available yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
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
                <Bar dataKey="income" fill="#10B981" radius={[8, 8, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#EF4444" radius={[8, 8, 0, 0]} name="Expense" />
                <Bar dataKey="savings" fill="#4E61D3" radius={[8, 8, 0, 0]} name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Savings Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-gray-900 mb-4">Savings Trend</h3>
          {loading ? (
            <div className="text-center text-gray-500 py-20">Loading trend...</div>
          ) : savingsTrend.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No savings trend data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={savingsTrend}>
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
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
