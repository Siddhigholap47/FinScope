# FinScope - Modern Collaborative Budgeting App 💰

A beautiful, feature-rich budgeting application built with React, TypeScript, and Tailwind CSS. Perfect for individuals, couples, friends, and families to manage finances together.

## 🌟 Key Features

### 💑 Joint & Collaborative Budgeting
- **No Role Restrictions**: Any user can add partners or friends to share budgets
- **Flexible Partnerships**: Support for couples, friends, family, and roommates
- **Custom Contribution Split**: Set any percentage split (60-40, 50-50, etc.)
- **Shared Goals**: Create joint financial goals like "Goa Trip ✈️" or "Dinner Nights 🍽️"
- **Real-time Collaboration**: Track expenses and progress together

### 📊 Personal Finance Management
- **Dashboard Overview**: Beautiful visual representation of income, expenses, and savings
- **Smart Categories**: Pre-defined categories for better expense tracking
- **Interactive Charts**: Pie charts, bar charts, and line graphs for insights
- **Calendar View**: Visual heatmap showing daily spending patterns
- **Receipt Management**: Upload and attach receipts to expenses

### 👥 Partner & Friend Management
- **Easy Invitations**: Invite via email or username
- **Multiple Budgets**: Create separate budgets for different partners/groups
- **Contribution Tracking**: See who contributed what percentage
- **Budget Dashboard**: Dedicated view for shared budgets
- **Partner Avatars**: Visual representation of all participants

### ⚙️ Profile & Settings
- **Comprehensive Profile**: Manage personal information
- **Currency Preferences**: Default set to ₹ (Indian Rupees), supports multiple currencies
- **Notification Controls**: Manage push and email notifications
- **Language Options**: English interface (Hindi support available)
- **Receipt Management**: Centralized receipt storage and viewing

### 🎨 Beautiful UI/UX
- **Warm Color Palette**: Soft yellows (#F4F754), golds (#E9D484), pinks (#CFADC1), and royal blue (#4E61D3)
- **Glassmorphism Design**: Modern backdrop blur effects
- **Smooth Animations**: Confetti, sparkles, and micro-interactions
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Playful Elements**: Emojis and celebratory animations for achievements

## 🚀 Quick Actions

The dashboard includes quick access buttons for:
- ➕ **Add Expense** - Log expenses with receipt upload
- 💵 **Add Income** - Track income sources
- 🎯 **Set Goal** - Create financial goals
- 📄 **Upload Receipt** - Manage receipts separately
- 👥 **Add Partner/Friend** - Create shared budgets

## 📱 Pages & Navigation

### Main Pages
1. **Dashboard** - Overview of your finances
2. **Couple Budget** - Dedicated collaborative budgeting view
3. **Financial Goals** - Track and manage goals
4. **Accounts** - Manage bank accounts
5. **Income** - Income tracking
6. **Expenses** - Expense management
7. **Reports** - Financial reports and insights
8. **Calendar** - Date-based expense tracking
9. **Settings** - Profile, preferences, and joint budgets

### Settings Tabs
- **Profile** - Personal information and avatar
- **Joint Budgets** - View and manage shared budgets
- **Receipts** - Receipt management
- **Preferences** - Currency, language, notifications

## 🎯 User Flow

### Creating a Shared Budget
1. Click "Add Partner/Friend" from dashboard or settings
2. Choose budget type (Couple, Friend, Family, Roommate)
3. Enter budget name and description
4. Add partner's name and email
5. Set contribution split using slider
6. Send invitation

### Adding an Expense
1. Click "Add Expense" quick action
2. Enter expense details
3. Select category
4. Upload receipt (optional)
5. Assign to shared budget (if applicable)
6. Submit

### Viewing Shared Budgets
1. Navigate to Settings > Joint Budgets tab
2. Or click on shared budget count in dashboard header
3. View all active shared budgets
4. Click "View Details" to see budget specifics

## 🎨 Design Philosophy

### Color System
- **Primary Yellow** (#F4F754) - Energy, optimism, warmth
- **Gold** (#E9D484) - Trust, prosperity
- **Pink** (#CFADC1) - Friendliness, collaboration
- **Royal Blue** (#4E61D3) - Trust, stability, professionalism

### Typography
- Clean, readable fonts
- Consistent sizing hierarchy
- Proper contrast for accessibility

### Animations
- Smooth transitions for better UX
- Celebratory confetti for achievements
- Micro-interactions on hover and click
- Loading states and feedback

## 💡 Features Highlights

### Indian User Focus
- Default currency: ₹ (INR)
- Indian place names and examples
- Local context (Mumbai, Goa, etc.)
- Relatable expense categories

### Functional Excellence
- All buttons and links are functional
- No dead interactions
- Proper navigation flow
- Real-time updates
- Local storage persistence

### Trust & Security
- Secure authentication
- Password validation
- Data privacy focused
- No external data sharing

## 🔧 Technical Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Routing**: React Router
- **Storage**: LocalStorage (demo) / Backend ready

## 📦 Component Structure

```
components/
├── AddPartnerDialog.tsx      # Dialog for adding partners/friends
├── SharedBudgetCard.tsx       # Card displaying shared budget info
├── FinScopeSidebar.tsx        # Main navigation sidebar
├── ProfileDropdown.tsx        # User profile dropdown menu
└── ui/                        # Shadcn UI components

pages/
├── FinScopeLogin.tsx          # Login page
├── FinScopeSignup.tsx         # Signup page
├── FinScopeDashboard.tsx      # Main dashboard
├── CouplesDashboard.tsx       # Collaborative budgeting view
├── CalendarView.tsx           # Calendar with expense heatmap
├── Settings.tsx               # Settings and profile
└── [other pages]              # Goals, Income, Expenses, etc.

layouts/
└── FinScopeLayout.tsx         # Main app layout
```

## 🎉 Future Enhancements

- Real-time sync with partners
- Bank account integration
- Budget recommendations
- Spending insights with AI
- Export reports (PDF, Excel)
- Multi-language support expansion
- Mobile app version
- Push notifications
- Bill reminders
- Investment tracking

## 📝 Notes

This is a demonstration application showcasing modern web development practices and collaborative budgeting features. Data is currently stored in localStorage for demo purposes. For production use, integrate with a backend API and database.

---

**Built with ❤️ for Indian users who want to manage money smarter, together.**
