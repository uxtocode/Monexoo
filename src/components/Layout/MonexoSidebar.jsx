import React, { useEffect } from 'react';
import { NavLink,  } from 'react-router-dom';
import {
  Home,
  Plus,
  Receipt,
  Settings,
  Menu,
  IndianRupee,
  TrendingUp,
  X,
} from 'lucide-react';
import { useSidebar } from './Layout'; // Import the context hook

const MonexoSidebar = () => {
  const {
    isExpanded,
    setIsExpanded,
    isMobile,
    isOpen,
    setIsOpen
  } = useSidebar();

  const navLinks = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
    },
    {
      href: '/add',
      label: 'Add',
      icon: Plus,
    },
    {
      href: '/transactions',
      label: 'Transactions',
      icon: Receipt,
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
    }
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(prev => !prev);
    } else {
      setIsExpanded(prev => !prev);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && !event.target.closest('aside') && !event.target.closest('[data-mobile-trigger]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, isOpen, setIsOpen]);

  const sidebarWidth = isExpanded ? 'w-72' : 'w-20';
  const mobileWidth = 'w-80 max-w-[85vw]';

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? 'fixed' : 'fixed'}
          hidden md:block
          left-0 top-0 h-full z-50 
          transition-all duration-300 
          bg-[#0d0d0d] text-white shadow-lg border-r-1 border-[#1a1a1a]/50
          ${isMobile
            ? `${mobileWidth} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
            : `${sidebarWidth} translate-x-0`
          }
        `}
      >
        <nav className="h-full flex flex-col">
          {/* Header */}
          <div className={`flex items-center justify-between border-b-1 border-[#1a1a1a]/50 
            ${isExpanded || isMobile ? 'px-6 py-5' : 'py-7'}`}>

            {(isExpanded || isMobile) && (
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center'>
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-bold text-xl'>Monexo</h2>
                  <p className='text-xs text-[#bdbdbd] font-[500]'>Expense Tracker</p>
                </div>
              </div>
            )}

            {isMobile ? (
              <X
                className="w-6 h-6 cursor-pointer transition-transform duration-300"
                onClick={closeMobileSidebar}
              />
            ) : (
              <Menu
                className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${!isExpanded ? 'mx-auto' : ''}`}
                onClick={toggleSidebar}
              />
            )}
          </div>

          {/* Navigation */}
          <div className={` py-8 flex flex-col flex-1 ${isExpanded ? 'px-5' : 'p-4'}`}>
            {/* Navigation Links */}
            <div className={`flex flex-col ${(isExpanded || isMobile) ? 'gap-2' : 'gap-4'}`}>
              {navLinks.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl cursor-pointer transition-colors duration-200 
                    ${(isExpanded || isMobile)
                      ? 'hover:bg-[#1a1a1a] py-3 px-4'
                      : 'px-3 py-3 justify-center'
                    } 
                    ${isActive ? 'bg-gradient-to-r from-green-600 to-green-500' : ''}`
                  }
                >
                  <item.icon className={`${(isExpanded || isMobile) ? 'w-6 h-6' : 'w-6 h-6'}`} />
                  {(isExpanded || isMobile) && <span className='font-medium'>{item.label}</span>}
                </NavLink>
              ))}
            </div>

            {/* Financial Stats Card */}
            <div className='mt-auto'>
              {(isExpanded || isMobile) && (
                <div
                  className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-semibold text-gray-300">This Month</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <IndianRupee className="w-5 h-5 text-green-400" />
                    <span className="text-xl font-bold text-white">12,450</span>
                  </div>
                  <p className="text-xs text-gray-400">+15% from last month</p>

                  {/* Additional mobile-friendly stats */}
                  {isMobile && (
                    <div className="mt-4 pt-3 border-t border-gray-600/30">
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <p className="text-xs text-gray-400">Income</p>
                          <p className="text-sm font-semibold text-green-400">₹18,500</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Expenses</p>
                          <p className="text-sm font-semibold text-red-400">₹6,050</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default MonexoSidebar;