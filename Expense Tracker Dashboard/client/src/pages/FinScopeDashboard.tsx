import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Target,
  Users,
  IndianRupee,
  Upload,
  PartyPopper,
} from "lucide-react";
import { motion } from "motion/react";
import { AddPartnerDialog } from "../components/AddPartnerDialog";
import { SharedBudgetCard } from "../components/SharedBudgetCard";
import { WelcomeTour } from "../components/WelcomeTour";
import { EmptySharedBudgets } from "../components/EmptySharedBudgets";
import { QuickStats } from "../components/QuickStats";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

/**
 * FinScopeDashboard - working quick actions:
 * - Add Expense
 * - Add Income
 * - Set Goal
 * - Upload Receipt
 *
 * Stores data to localStorage keys: "expenses", "incomes", "goals", "receipts"
 */

export function FinScopeDashboard() {
  const userName = localStorage.getItem("userName") || "User";
  const [showCelebration, setShowCelebration] = useState(false);

  // Dialog open states
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  // Form states - expense
  const [expenseAmount, setExpenseAmount] = useState<number | "">("");
  const [expenseCategory, setExpenseCategory] = useState<string>("food");

  // Form states - income
  const [incomeAmount, setIncomeAmount] = useState<number | "">("");
  const [incomeSource, setIncomeSource] = useState<string>("salary");

  // Form states - goal
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState<number | "">("");

  // Receipts
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Partners + dashboard sums
  const [partners, setPartners] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<{
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
  } | null>(null);

  // Load partners and compute dashboard sums on mount and when localStorage changes
  useEffect(() => {
    const loadPartners = () => {
      const storedPartners = JSON.parse(localStorage.getItem("partners") || "[]");
      setPartners(storedPartners.filter((p: any) => p.active));
    };

    const computeDashboard = () => {
      const incomes: any[] = JSON.parse(localStorage.getItem("incomes") || "[]");
      const expenses: any[] = JSON.parse(localStorage.getItem("expenses") || "[]");

      const totalIncome = incomes.reduce((s, i) => s + Number(i.amount || 0), 0);
      const totalExpense = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
      const totalBalance = Math.max(0, totalIncome - totalExpense);

      setDashboardData({ totalBalance, totalIncome, totalExpense });
    };

    loadPartners();
    computeDashboard();

    // Recompute when storage events happen in same tab (custom event used below)
    const onStorageUpdate = () => computeDashboard();
    window.addEventListener("storage", onStorageUpdate);
    window.addEventListener("dataUpdated", onStorageUpdate as EventListener); // custom
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
      window.removeEventListener("dataUpdated", onStorageUpdate as EventListener);
    };
  }, []);

  // Utility to broadcast a local update (same-tab)
  const broadcastUpdate = () => {
    // custom event so the same tab recomputes
    window.dispatchEvent(new Event("dataUpdated"));
  };

  // Handler: Add expense
  const handleAddExpense = () => {
    if (!expenseAmount || Number(expenseAmount) <= 0) {
      toast.error("Enter a valid expense amount");
      return;
    }
    const expenses: any[] = JSON.parse(localStorage.getItem("expenses") || "[]");
    const newExpense = {
      id: "exp-" + Date.now(),
      amount: Number(expenseAmount),
      category: expenseCategory,
      date: new Date().toISOString(),
      createdBy: userName,
    };
    expenses.unshift(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    toast.success("Expense added");
    // reset
    setExpenseAmount("");
    setExpenseCategory("food");
    setIsExpenseDialogOpen(false);
    broadcastUpdate();
  };

  // Handler: Add income
  const handleAddIncome = () => {
    if (!incomeAmount || Number(incomeAmount) <= 0) {
      toast.error("Enter a valid income amount");
      return;
    }
    const incomes: any[] = JSON.parse(localStorage.getItem("incomes") || "[]");
    const newIncome = {
      id: "inc-" + Date.now(),
      amount: Number(incomeAmount),
      source: incomeSource,
      date: new Date().toISOString(),
      createdBy: userName,
    };
    incomes.unshift(newIncome);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    toast.success("Income added");
    setIncomeAmount("");
    setIncomeSource("salary");
    setIsIncomeDialogOpen(false);
    broadcastUpdate();
  };

  // Handler: Create goal
  const handleCreateGoal = () => {
    if (!goalTitle || !goalAmount || Number(goalAmount) <= 0) {
      toast.error("Please enter a goal title and a valid target amount");
      return;
    }
    const goals: any[] = JSON.parse(localStorage.getItem("goals") || "[]");
    const newGoal = {
      id: "goal-" + Date.now(),
      title: goalTitle,
      target: Number(goalAmount),
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    goals.unshift(newGoal);
    localStorage.setItem("goals", JSON.stringify(goals));
    toast.success("Goal created");
    setGoalTitle("");
    setGoalAmount("");
    setIsGoalDialogOpen(false);
    broadcastUpdate();
  };

  // Handler: Upload receipt (triggers hidden input)
  const handleUploadReceiptClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onReceiptFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) {
      toast.error("No file selected");
      return;
    }
    // For demo: we'll save just metadata and base64 small preview (if small)
    const reader = new FileReader();
    reader.onload = () => {
      const receipts: any[] = JSON.parse(localStorage.getItem("receipts") || "[]");
      const newReceipt = {
        id: "rcpt-" + Date.now(),
        name: f.name,
        size: f.size,
        type: f.type,
        uploadedAt: new Date().toISOString(),
        // store data URL only if < 1MB (to avoid huge localStorage usage)
        dataUrl: f.size < 1024 * 1024 ? reader.result : null,
      };
      receipts.unshift(newReceipt);
      localStorage.setItem("receipts", JSON.stringify(receipts));
      toast.success("Receipt uploaded (saved locally)");
      broadcastUpdate();
    };
    // read small files as data URL; for larger we skip storing binary
    if (f.size < 1024 * 1024) {
      reader.readAsDataURL(f);
    } else {
      // no preview: just store metadata
      reader.onload = () => {}; // no-op
      const receipts: any[] = JSON.parse(localStorage.getItem("receipts") || "[]");
      const newReceipt = {
        id: "rcpt-" + Date.now(),
        name: f.name,
        size: f.size,
        type: f.type,
        uploadedAt: new Date().toISOString(),
        dataUrl: null,
      };
      receipts.unshift(newReceipt);
      localStorage.setItem("receipts", JSON.stringify(receipts));
      toast.success("Receipt metadata saved (file too large for preview)");
      broadcastUpdate();
    }
    // clear input so same file can be re-selected later
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Basic formatting
  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-8">
      <WelcomeTour />

      {/* Celebration Modal */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCelebration(false)}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-gradient-to-br from-[#F4F754] to-[#E9D484] rounded-3xl p-8 text-center shadow-2xl">
            <PartyPopper className="w-16 h-16 mx-auto text-[#4E61D3] mb-4" />
            <h2 className="text-gray-900 mb-2">Goal Achieved! 🎉</h2>
            <p className="text-gray-700">Congratulations on reaching your target!</p>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-white/60 via-white/50 to-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-gray-900 flex items-center gap-2">Welcome back, {userName}! 👋</h1>
            <p className="text-gray-600 mt-1">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div>
            {partners.length > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] px-4 py-2 rounded-xl shadow-lg text-white cursor-pointer">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {partners.length} Shared Budget{partners.length > 1 ? "s" : ""}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {dashboardData ? (
          <QuickStats totalIncome={dashboardData.totalIncome} totalExpense={dashboardData.totalExpense} totalSavings={dashboardData.totalBalance} partnersCount={partners.length} />
        ) : (
          <div className="text-center text-gray-500 border border-dashed rounded-2xl p-10">No financial data yet. Connect your account to see insights.</div>
        )}
      </motion.div>

      {/* Shared Budgets */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        {partners.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-[#4E61D3]" />
                Shared Budgets
              </h2>
              <AddPartnerDialog />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner) => <SharedBudgetCard key={partner.id} budget={partner} />)}
            </div>
          </>
        ) : (
          <EmptySharedBudgets />
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-br from-[#F4F754]/20 via-[#E9D484]/15 to-[#CFADC1]/10 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-[#4E61D3]" />Quick Actions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Add Expense */}
          <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-[#EF4444] to-[#F87171] hover:from-[#DC2626] hover:to-[#EF4444] text-white rounded-xl py-6 shadow-lg">
                <Plus className="w-5 h-5 mr-2" /> Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95">
              <DialogHeader><DialogTitle>Add New Expense</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Amount (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input type="number" placeholder="0" value={expenseAmount === "" ? "" : String(expenseAmount)} onChange={(e) => setExpenseAmount(e.target.value === "" ? "" : Number(e.target.value))} className="rounded-xl pl-10" />
                  </div>
                </div>

                <div>
                  <Label>Category</Label>
                  <Select value={expenseCategory} onValueChange={setExpenseCategory}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-[#4E61D3] rounded-xl" onClick={handleAddExpense}>Add Expense</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Income */}
          <Dialog open={isIncomeDialogOpen} onOpenChange={setIsIncomeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#059669] hover:to-[#10B981] text-white rounded-xl py-6 shadow-lg">
                <Plus className="w-5 h-5 mr-2" /> Add Income
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95">
              <DialogHeader><DialogTitle>Add New Income</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Amount (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input type="number" placeholder="0" value={incomeAmount === "" ? "" : String(incomeAmount)} onChange={(e) => setIncomeAmount(e.target.value === "" ? "" : Number(e.target.value))} className="rounded-xl pl-10" />
                  </div>
                </div>

                <div>
                  <Label>Source</Label>
                  <Select value={incomeSource} onValueChange={setIncomeSource}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-[#4E61D3] rounded-xl" onClick={handleAddIncome}>Add Income</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Set Goal */}
          <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-[#CFADC1] to-[#E9D484] hover:from-[#B89AAD] hover:to-[#D4BE70] text-white rounded-xl py-6 shadow-lg">
                <Target className="w-5 h-5 mr-2" /> Set Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95">
              <DialogHeader><DialogTitle>Set Financial Goal</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Goal Title</Label>
                  <Input placeholder="e.g., Goa Trip" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} className="rounded-xl" />
                </div>

                <div>
                  <Label>Target Amount (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input type="number" placeholder="0" value={goalAmount === "" ? "" : String(goalAmount)} onChange={(e) => setGoalAmount(e.target.value === "" ? "" : Number(e.target.value))} className="rounded-xl pl-10" />
                  </div>
                </div>

                <Button className="w-full bg-[#4E61D3] rounded-xl" onClick={handleCreateGoal}>Create Goal</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Upload Receipt (no dialog) */}
          <div>
            <input ref={fileInputRef} onChange={onReceiptFileSelected} accept="image/*,application/pdf" type="file" style={{ display: "none" }} />
            <Button className="w-full bg-gradient-to-r from-[#E9D484] to-[#F4F754] hover:from-[#D4BE70] hover:to-[#E9D484] text-gray-900 rounded-xl py-6 shadow-lg" onClick={handleUploadReceiptClick}>
              <Upload className="w-5 h-5 mr-2" /> Upload Receipt
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FinScopeDashboard;
