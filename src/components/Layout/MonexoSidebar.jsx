import React, { useEffect, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Plus,
  Receipt,
  Settings,
  Menu,
  IndianRupee,
  TrendingUp,
} from 'lucide-react';
import { useSidebar } from './Layout';

// Memoized navigation configuration for performance
const navLinks = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    ariaLabel: 'Navigate to home page',
    title: 'Home'
  },
  {
    href: '/add',
    label: 'Add Transaction',
    icon: Plus,
    ariaLabel: 'Add new transaction',
    title: 'Add Transaction'
  },
  {
    href: '/transactions',
    label: 'Transactions',
    icon: Receipt,
    ariaLabel: 'View all transactions',
    title: 'View all transactions'

  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    ariaLabel: 'Access application settings',
    title: 'Settings'
  },
];

const MonexoSidebar = () => {
  const { isExpanded, setIsExpanded, device } = useSidebar();

  // Memoized calculations for performance
  const sidebarWidth = useMemo(() => {
    if (device === 'desktop') {
      return isExpanded ? 'w-72' : 'w-20';
    } else if (device === 'tablet') {
      return 'w-20';
    }
    return 'hidden';
  }, [device, isExpanded]);

  const sidebarClasses = useMemo(() =>
    `fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out
     bg-[#0d0d0d] text-white shadow-lg border-r border-[#1a1a1a]/50 ${sidebarWidth}`,
    [sidebarWidth]
  );

  // Auto-adjust expansion based on screen size
  useEffect(() => {
    if (device === 'desktop') {
      setIsExpanded(true);
    } else if (device === 'tablet') {
      setIsExpanded(false);
    }
  }, [device, setIsExpanded]);

  // Memoized toggle function for performance
  const toggleSidebar = useCallback(() => {
    if (device === 'desktop') {
      setIsExpanded(prev => !prev);
    }
  }, [device, setIsExpanded]);

  // Keyboard event handler for accessibility
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSidebar();
    }
  }, [toggleSidebar]);

  // Skip link for keyboard navigation
  const skipToMainContent = useCallback((event) => {
    if (event.key === 'Tab' && !event.shiftKey) {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
      }
    }
  }, []);

  return (
    <>
      {/* Skip link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg"
        onKeyDown={skipToMainContent}
      >
        Skip to main content
      </a>

      <aside
        className={sidebarClasses}
        role="navigation"
        aria-label="Main navigation sidebar"
        aria-expanded={isExpanded}
      >
        <nav className="h-full flex flex-col" role="menubar">
          {/* Header */}
          <header
            className={`flex items-center justify-between border-b border-[#1a1a1a]/50 
              ${isExpanded ? 'px-6 py-5' : 'py-7'}`}
            role="banner"
          >
            {isExpanded && (
              <div
                title="Monexo logo and brandname"
                className='flex items-center gap-4' role="img" aria-label="Monexo logo and brand">
                <div
                  className='w-10 h-10 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center'
                  aria-hidden="true"
                >
                  <IndianRupee className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className='flex flex-col'>
                  <h1 className='font-bold text-xl'>Monexo</h1>
                  <p className='text-xs text-[#bdbdbd] font-[500]'>Expense Tracker</p>
                </div>
              </div>
            )}

            {device === 'desktop' && (
              <button
                title='Toggle sidebar'
                onClick={toggleSidebar}
                onKeyDown={handleKeyDown}
                className={`w-6 h-6 cursor-pointer rounded-sm ${!isExpanded ? 'mx-auto' : ''}`}
                aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                aria-expanded={isExpanded}
                type="button"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            {device === 'tablet' && (
              <div
                title='Monexo app icon'
                className="mx-auto"
                role="img"
                aria-label="Monexo app icon"
              >
                <IndianRupee
                  className="w-11 h-11 p-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white"
                  aria-hidden="true"
                />
              </div>
            )}
          </header>

          {/* Navigation */}
          <div className={`md:py-6 lg:py-8 lg:pb-4 flex flex-col flex-1 ${isExpanded ? 'px-5' : 'p-4'}`}>
            {/* Navigation Links */}
            <nav
              className={`flex flex-col ${isExpanded ? 'gap-2' : 'gap-4'}`}
              role="menubar"
              aria-label="Main navigation menu"
            >
              {navLinks.map(({ href, label, icon: Icon, ariaLabel, title }, index) => (
                <NavLink
                  key={`nav-${href}`}
                  to={href}
                  title={title}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl cursor-pointer transition-all duration-200
                    ${isExpanded ? 'hover:bg-[#1a1a1a] py-3 px-4' : 'px-3 py-3 justify-center hover:bg-[#1a1a1a]'}
                    ${isActive ? 'bg-gradient-to-r from-green-600 to-green-500 shadow-lg' : ''}`
                  }
                  aria-label={ariaLabel}
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                  role="menuitem"
                  tabIndex={0}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className="w-6 h-6 flex-shrink-0"
                        aria-hidden="true"
                        style={{ minWidth: '24px' }}
                      />
                      {isExpanded && (
                        <span className="font-medium truncate">
                          {label}
                          {isActive && <span className="sr-only"> (current page)</span>}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Financial Stats */}
            {/* {isExpanded && (
              <section
                className="mt-auto p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600/30"
                aria-labelledby="financial-stats-heading"
                role="region"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp
                    className="w-4 h-4 text-green-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <h2
                    id="financial-stats-heading"
                    className="text-xs font-semibold text-gray-300"
                  >
                    This Month
                  </h2>
                </div>
                <div className="flex items-center gap-1 mb-2" role="group" aria-label="Monthly expense amount">
                  <IndianRupee
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span
                    className="text-xl font-bold text-white"
                    aria-label="12,450 rupees"
                  >
                    12,450
                  </span>
                </div>
                <p
                  className="text-xs text-gray-400"
                  aria-label="15 percent increase from last month"
                >
                  +15% from last month
                </p>
              </section>
            )} */}
          </div>
        </nav>
      </aside>
    </>
  );
};

// Add display name for debugging
MonexoSidebar.displayName = 'MonexoSidebar';

export default React.memo(MonexoSidebar);