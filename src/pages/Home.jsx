import React from 'react';
import { Link } from 'react-router-dom';
import CardWrapper from '../components/UI/CardWrapper';
import PropTypes from 'prop-types';
import { Bus, CupSoda, Shirt, Wallet, ArrowUpRight } from 'lucide-react';
import {
  Landmark,
  HeartPulse,
  ShoppingCart,
  Smile,
  BookOpen,
  Tv,
  Banknote,
  HandCoins,
  Activity
} from 'lucide-react';

// Transaction categories
const TRANSACTION_CATEGORIES = {
  food: {
    icon: CupSoda,
    label: 'Food & Beverages',
    color: 'text-orange-400',
  },
  investment: {
    icon: Landmark,
    label: 'Investment',
    color: 'text-green-400',
  },
  clothing: {
    icon: Shirt,
    label: 'Clothing & Accessories',
    color: 'text-purple-400',
  },
  transport: {
    icon: Bus,
    label: 'Transportation',
    color: 'text-blue-400',
  },
  entertainment: {
    icon: Smile,
    label: 'Entertainment',
    color: 'text-red-400',
  },
  rent: {
    icon: Landmark,
    label: 'Rent & Utilities',
    color: 'text-yellow-400',
  },
  groceries: {
    icon: ShoppingCart,
    label: 'Groceries',
    color: 'text-teal-400',
  },
  health: {
    icon: HeartPulse,
    label: 'Health & Medical',
    color: 'text-indigo-400',
  },
  personal: {
    icon: Activity,
    label: 'Personal Care',
    color: 'text-pink-400',
  },
  education: {
    icon: BookOpen,
    label: 'Education',
    color: 'text-lime-400',
  },
  subscriptions: {
    icon: Tv,
    label: 'Subscriptions',
    color: 'text-fuchsia-400',
  },
  loan: {
    icon: Banknote,
    label: 'Loan / EMI',
    color: 'text-amber-500',
  },
  charity: {
    icon: HandCoins,
    label: 'Donations & Charity',
    color: 'text-emerald-400',
  },
  default: {
    icon: Wallet,
    label: 'General',
    color: 'text-gray-400',
  },
};

// Mock data
const MOCK_TRANSACTIONS = [
  {
    id: 1,
    category: 'food',
    title: 'Coffee Shop',
    amount: -5.00,
    date: 'Today, 11:00 AM',
    type: 'expense'
  },
  {
    id: 2,
    category: 'clothing',
    title: 'Clothes',
    amount: -25.00,
    date: 'Yesterday',
    type: 'expense'
  },
  {
    id: 3,
    category: 'transport',
    title: 'Travel',
    amount: -4.00,
    date: '2 days ago',
    type: 'expense'
  },
  {
    id: 4,
    category: 'food',
    title: 'Coffee Shop',
    amount: -25.00,
    date: '3 days ago',
    type: 'expense'
  },
  {
    id: 5,
    category: 'clothing',
    title: 'Shopping',
    amount: -25.00,
    date: '3 days ago',
    type: 'expense'
  }
];

// Simple format currency function
const formatCurrency = (amount) => {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '- ' : amount > 0 ? '+ ' : '';
  return `${sign}$${absAmount.toFixed(2)}`;
};

// Transaction item component
const TransactionItem = ({ transaction, isLast }) => {
  const categoryData = TRANSACTION_CATEGORIES[transaction.category] || TRANSACTION_CATEGORIES.default;
  const IconComponent = categoryData.icon;

  return (
    <div className={`flex justify-between items-center py-4 ${!isLast ? 'border-b border-gray-600/30' : ''}`}>
      <div className='flex items-center gap-3'>
        <div className={`w-9 h-9 md:w-10 md:h-10 bg-[#333333] p-2 rounded-md flex items-center justify-center ${categoryData.color}`}>
          <IconComponent className="w-full h-full" />
        </div>
        <div className='flex flex-col gap-0.5'>
          <h3 className='font-medium text-sm md:text-base text-white'>
            {transaction.title}
          </h3>
          <p className='text-xs text-gray-400 font-medium'>
            {transaction.date}
          </p>
        </div>
      </div>
      <div className='text-right'>
        <span className={`text-sm font-semibold ${transaction.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
          {formatCurrency(transaction.amount)}
        </span>
      </div>
    </div>
  );
};

const SimpleHeader = ({ transactions = MOCK_TRANSACTIONS, onViewAllTransactions, loading = false, className = '' }) => {
  // Simple calculations
  const totalBalance = 1250.00; // Static for now
  const totalIncome = 2500.00;   // Static for now
  const totalExpenses = 1250.00; // Static for now

  // Show only first 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  const handleViewAllTransactions = (event) => {
    event.preventDefault();
    if (onViewAllTransactions) {
      onViewAllTransactions();
    }
  };
  

  return (
    <>
      <main className='grid grid-cols-1'>

        <section className={`${className}`}>

          {/* Welcome Title */}
          <div className='mb-2 ml-0.5 md:hidden'>
            <h1
              className='text-lg font-medium'
              id="welcome-title"
              title='Welcome back, Gursharan!'
              aria-labelledby="welcome-title"
              role="heading"
              aria-label="Welcome back, Gursharan!"
              tabIndex={0}
            >
              Welcome back, Gursharan!
            </h1>
          </div>


          {/* Total Balance Card */}
          <CardWrapper
            CardTitle="Total Balance"
            icon={
              <Wallet className='text-green-400 bg-[#333333]/60 backdrop-blur-2xl p-2.5 rounded-full border border-gray-600/30 w-11 h-11' />
            }
            loading={loading}
          >
            <h2
              id="total-balance"
              title={`$${totalBalance.toFixed(2)}`}
              className='text-2xl md:text-3xl font-bold tracking-tight text-white'>
              ${totalBalance.toFixed(2)}
            </h2>
          </CardWrapper>

          {/* Income and Expenses Grid */}
          <div className='grid grid-cols-2 gap-4 my-4'>
            <CardWrapper
              CardTitle="Total Income"
              loading={loading}
            >
              <h3
                id="total-income"
                title={`+$${totalIncome.toFixed(2)}`}
                className='text-xl font-bold tracking-tight text-green-400'>
                + ${totalIncome.toFixed(2)}
              </h3>
            </CardWrapper>

            <CardWrapper
              CardTitle="Total Expenses"
              loading={loading}
            >
              <h3
                id="total-expenses"
                title={`-$${totalExpenses.toFixed(2)}`}
                className='text-xl font-bold tracking-tight text-red-400'>
                - ${totalExpenses.toFixed(2)}
              </h3>
            </CardWrapper>
          </div>

          {/* Recent Transactions Section */}
          <div className='bg-[#333333]/60 backdrop-blur-2xl p-6 rounded-xl border border-gray-600/30'>
            {/* Header */}
            <div
              id="recent-transactions"
              title="Recent Transactions"
              className="flex items-center justify-between mb-4">
              <h2 className='font-medium text-sm md:text-base text-gray-400'>
                Recent Transactions
              </h2>
              <Link
                to="/transactions"
                onClick={handleViewAllTransactions}
                className="text-green-400 text-sm font-medium hover:underline"
              >
                <span>View all</span>
                <ArrowUpRight className="inline w-3 h-3 ml-1" />
              </Link>
            </div>

            {/* Transactions List */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="flex items-center gap-3 py-4">
                      <div className="w-10 h-10 bg-gray-600/30 rounded-md"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-600/30 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-600/30 rounded w-1/4"></div>
                      </div>
                      <div className="h-4 bg-gray-600/30 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentTransactions.length > 0 ? (
              <div>
                {recentTransactions.map((transaction, index) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    isLast={index === recentTransactions.length - 1}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent transactions</p>
                <p className="text-sm mt-1">Your transactions will appear here</p>
              </div>
            )}
          </div>
        </section>
      </main>

    </>
  );
};

SimpleHeader.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['income', 'expense']).isRequired
  })),
  onViewAllTransactions: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default SimpleHeader;