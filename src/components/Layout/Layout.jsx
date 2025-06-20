import React, { useState, useEffect, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import MonexoSidebar from './MonexoSidebar';
import Footer from './Footer';
import ScrollToTop from '../ScrollToTop';

import { Bell, ChevronDown, Settings, LogOut, User } from 'lucide-react';

// Create context to share sidebar state
const SidebarContext = createContext();

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

const Layout = () => {
    // sidebar starts
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768; // md breakpoint
            setIsMobile(mobile);

            if (mobile) {
                setIsExpanded(true);
                setIsOpen(false);
            } else {
                setIsExpanded(window.innerWidth >= 1100);
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarContext = {
        isExpanded,
        setIsExpanded,
        isMobile,
        setIsMobile,
        isOpen,
        setIsOpen,
    };
    // sidebar ends



    // navbar var start
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);

    const notifications = [
        { id: 1, title: 'New expense added', time: '2 min ago', type: 'expense' },
        { id: 2, title: 'Monthly budget exceeded', time: '1 hour ago', type: 'warning' },
        { id: 3, title: 'Payment reminder', time: '3 hours ago', type: 'reminder' },
    ];

    const clearNotifications = () => {
        setUnreadCount(0);
        setShowNotifications(false);
    };
    // navbar vars end

    return (
        <SidebarContext.Provider value={sidebarContext}>
            <div className="min-h-screen bg-[#0d0d0d] text-white">
                <ScrollToTop />
                <MonexoSidebar />

                {/* Main Content Container */}
                <div className={`
          transition-all duration-300 min-h-screen flex flex-col
          ${isMobile
                        ? 'ml-0'
                        : isExpanded
                            ? 'ml-72'
                            : 'ml-20'
                    }
        `}>
                    
                    {/* main content */}
                    <main className={`
            flex-1 
            ${isMobile ? 'p-4' : 'p-6'}
          `}>
                        
                        {/* Navbar */}
                        <div className='sticky top-0 z-30 bg-[#0d0d0d]'>
                            <div className='flex items-center justify-between pb-4'>
                                {/* Welcome Section */}
                                <div className='hidden md:flex flex-col min-w-0 flex-1'>
                                    <h1 className='text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-white truncate'>
                                        Welcome back, Gursharan
                                    </h1>
                                    <p className='text-xs sm:text-sm text-gray-400 mt-1 hidden sm:block'>
                                        {new Date().toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div className='flex flex-col min-w-0 flex-1 md:hidden'>
                                    <h1 className='text-xl lg:text-2xl font-extrabold tracking-tight text-white'>
                                        <a href="/">
                                            Monexo
                                        </a>
                                    </h1>
                                </div>

                                {/* Actions Section */}
                                <div className='flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0'>
                                    {/* Notifications */}
                                    <div className='relative'>
                                        <button
                                            onClick={() => setShowNotifications(!showNotifications)}
                                            className='relative h-8 w-8 sm:h-10 sm:w-10 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-full p-1.5 sm:p-2.5 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#0d0d0d]'
                                            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
                                        >
                                            <Bell className='h-4 w-4 sm:h-5 sm:w-5' />
                                            {unreadCount > 0 && (
                                                <span className='absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse'>
                                                    {unreadCount > 9 ? '9+' : unreadCount}
                                                </span>
                                            )}
                                        </button>

                                        {/* Notifications Dropdown */}
                                        {showNotifications && (
                                            <div className='absolute right-0 mt-2 w-72 sm:w-80 bg-[#0d0d0d] rounded-xl shadow-2xl border border-[#1a1a1a] py-2 z-50'>
                                                <div className='px-4 py-2 border-b border-[#1a1a1a] flex items-center justify-between'>
                                                    <h3 className='font-semibold text-white'>Notifications</h3>
                                                    {unreadCount > 0 && (
                                                        <button
                                                            onClick={clearNotifications}
                                                            className='text-sm text-green-400 hover:text-green-300 font-medium'
                                                        >
                                                            Mark all read
                                                        </button>
                                                    )}
                                                </div>
                                                <div className='max-h-64 overflow-y-auto'>
                                                    {notifications.length > 0 ? (
                                                        notifications.map((notification) => (
                                                            <div key={notification.id} className='px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer border-b border-[#1a1a1a]/50 last:border-b-0'>
                                                                <p className='text-sm font-medium text-white'>{notification.title}</p>
                                                                <p className='text-xs text-gray-400 mt-1'>{notification.time}</p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className='px-4 py-8 text-center text-gray-400 text-sm'>
                                                            No new notifications
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Profile Menu */}
                                    <div className='relative'>
                                        <button
                                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                                            className='flex items-center gap-1 sm:gap-2 hover:bg-[#1a1a1a] rounded-full p-1 pr-2 sm:pr-3 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#0d0d0d]'
                                            aria-label='Profile menu'
                                        >
                                            <div className='relative'>
                                                <img
                                                    src="./profile.png"
                                                    alt="Profile picture"
                                                    className='w-10 h-10 rounded-full object-cover border-2 border-[#1a1a1a]'
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMxQTFBMUEiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxVjE5QzIwIDE3LjkzOTEgMTkuNTc4NiAxNi45MjE3IDE4LjgyODQgMTYuMTcxNkMxOC4wNzgzIDE1LjQyMTQgMTcuMDYwOSAxNSAxNiAxNUg4QzYuOTM5MTMgMTUgNS45MjE3MiAxNS40MjE0IDUuMTcxNTcgMTYuMTcxNkM0LjQyMTQzIDE2LjkyMTcgNCAxNy45MzkxIDQgMTlWMjEiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEyIDExQzE0LjIwOTEgMTEgMTYgOS4yMDkxNCAxNiA3QzE2IDQuNzkwODYgMTQuMjA5MSAzIDEyIDNDOS43OTA4NiAzIDggNC43OTA4NiA4IDdDOCA5LjIwOTE0IDkuNzkwODYgMTEgMTIgMTFaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                                                    }}
                                                />
                                                <div className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-[#0d0d0d]'></div>
                                            </div>
                                            <ChevronDown className='h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hidden sm:block' />
                                        </button>

                                        {/* Profile Dropdown */}
                                        {showProfileMenu && (
                                            <div className='absolute right-0 mt-2 w-52 sm:w-56 bg-[#0d0d0d] rounded-xl shadow-2xl border border-[#1a1a1a] py-2 z-50'>
                                                <div className='px-4 py-3 border-b border-[#1a1a1a]'>
                                                    <p className='font-semibold text-white text-sm sm:text-base'>Gursharan Singh</p>
                                                    <p className='text-xs sm:text-sm text-gray-400 truncate'>gursharan@example.com</p>
                                                </div>
                                                <div className='py-2'>
                                                    <button className='w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white flex items-center gap-3 transition-colors duration-200'>
                                                        <User className='h-4 w-4' />
                                                        Profile Settings
                                                    </button>
                                                    <button className='w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white flex items-center gap-3 transition-colors duration-200'>
                                                        <Settings className='h-4 w-4' />
                                                        Account Settings
                                                    </button>
                                                    <hr className='my-2 border-[#1a1a1a]' />
                                                    <button className='w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-3 transition-colors duration-200'>
                                                        <LogOut className='h-4 w-4' />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Click outside handlers */}
                            {(showNotifications || showProfileMenu) && (
                                <div
                                    className='fixed inset-0 z-20'
                                    onClick={() => {
                                        setShowNotifications(false);
                                        setShowProfileMenu(false);
                                    }}
                                />
                            )}
                        </div>

                        {/* Main Content */}
                        <div className="">
                            <Outlet />
                        </div>
                    </main>

                    {/* Footer */}
                    {/* <Footer /> */}
                </div>
            </div>
        </SidebarContext.Provider>
    );
};

export default Layout;