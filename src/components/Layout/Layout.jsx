import React, {
    useState,
    useEffect,
    createContext,
    useContext,
    useCallback,
    useMemo,
    useRef
} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MonexoSidebar from './MonexoSidebar';
import ScrollToTop from '../ScrollToTop';
import { Plus, IndianRupee } from 'lucide-react';

// Sidebar Context Setup with better error handling
const SidebarContext = createContext(null);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

// Device breakpoints configuration
const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
};

// Custom hook for device detection with debouncing
const useDeviceDetection = () => {
    const [device, setDevice] = useState('desktop');
    const timeoutRef = useRef(null);

    const updateDevice = useCallback(() => {
        const width = window.innerWidth;
        let newDevice = 'desktop';

        if (width < BREAKPOINTS.mobile) {
            newDevice = 'mobile';
        } else if (width < BREAKPOINTS.tablet) {
            newDevice = 'tablet';
        }

        setDevice(newDevice);
    }, []);

    // Debounced resize handler for better performance
    const debouncedUpdateDevice = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(updateDevice, 150);
    }, [updateDevice]);

    useEffect(() => {
        updateDevice();
        window.addEventListener('resize', debouncedUpdateDevice, { passive: true });

        return () => {
            window.removeEventListener('resize', debouncedUpdateDevice);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [updateDevice, debouncedUpdateDevice]);

    return device;
};

// Custom hook for date formatting
const useFormattedDate = () => {
    return useMemo(() => {
        const date = new Date();
        const weekday = date.toLocaleString('en-US', { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();

        return {
            weekday,
            day,
            month,
            year,
            fullDate: `${weekday}, ${day} ${month} ${year}`,
            ariaDate: date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
    }, []);
};

const Layout = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const device = useDeviceDetection();
    const location = useLocation();
    const dateInfo = useFormattedDate();
    const mainContentRef = useRef(null);

    // Auto-adjust sidebar expansion based on device
    useEffect(() => {
        if (device === 'desktop') {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    }, [device]);

    // Memoized sidebar context to prevent unnecessary re-renders
    const sidebarContext = useMemo(() => ({
        isExpanded,
        setIsExpanded,
        device,
    }), [isExpanded, setIsExpanded, device]);

    // Memoized main content margin classes
    const mainContentClasses = useMemo(() => {
        const marginClass = device === 'mobile'
            ? 'ml-0'
            : device === 'tablet'
                ? 'ml-20'
                : isExpanded
                    ? 'ml-72'
                    : 'ml-20';

        return `transition-all duration-300 ease-in-out min-h-screen flex flex-col ${marginClass}`;
    }, [device, isExpanded]);

    // Handle quick add transaction
    const handleQuickAdd = useCallback((event) => {
        // Add your quick add logic here
        console.log('Quick add transaction triggered');
    }, []);

    // Handle profile menu
    const handleProfileClick = useCallback((event) => {
        // Add your profile menu logic here
        console.log('Profile menu triggered');
    }, []);

    // Keyboard handlers for accessibility
    const handleQuickAddKeyDown = useCallback((event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleQuickAdd();
        }
    }, [handleQuickAdd]);

    const handleProfileKeyDown = useCallback((event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleProfileClick();
        }
    }, [handleProfileClick]);

    // Get page title from route for better SEO
    const getPageTitle = useMemo(() => {
        const pathMap = {
            '/': 'Dashboard',
            '/add': 'Add Transaction',
            '/transactions': 'Transactions',
            '/settings': 'Settings',
        };
        return pathMap[location.pathname] || 'Page';
    }, [location.pathname]);

    return (
        <SidebarContext.Provider value={sidebarContext}>
            <div className="min-h-screen bg-[#0d0d0d] text-white">
                {/* SEO and accessibility meta info */}
                <ScrollToTop />

                {/* Skip to main content link */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:font-medium"
                >
                    Skip to main content
                </a>

                <MonexoSidebar />

                <div className={mainContentClasses}>
                    <main
                        id="main-content"
                        ref={mainContentRef}
                        className="flex-1 p-4 md:p-6"
                        role="main"
                        aria-label={`${getPageTitle} - Main content`}
                        tabIndex={-1}
                    >
                        {/* Top Navigation Bar */}
                        <header
                            className='flex items-center justify-between mb-8'
                            role="banner"
                            aria-label="Top navigation and user controls"
                        >
                            {/* Mobile Logo */}
                            <div
                                id="mobile-logo"
                                title='Monexo logo'
                                className='flex md:hidden items-center gap-2'
                                role="img"
                                aria-label="Monexo expense tracker logo"
                            >
                                <div className="relative">
                                    <IndianRupee
                                        className="w-9 h-9 p-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h1 className='font-extrabold text-xl'>
                                    Monexo
                                    <span className="sr-only"> - Expense Tracker</span>
                                </h1>
                            </div>

                            {/* Greeting Section */}
                            <div className='hidden md:block' role="region" aria-label="Welcome message and current date">
                                <h1
                                    id="welcome-title"
                                    title='Welcome back, Gursharan!'
                                    className='font-extrabold text-2xl mb-1.5'>
                                    Welcome back, Gursharan!
                                </h1>
                                <time
                                    id="date-info"
                                    title={dateInfo.ariaDate}
                                    className='font-medium text-sm text-gray-400 block'
                                    dateTime={new Date().toISOString().split('T')[0]}
                                    aria-label={`Today is ${dateInfo.ariaDate}`}
                                >
                                    {dateInfo.fullDate}
                                </time>
                            </div>

                            {/* Action Controls */}
                            <div
                                className='flex items-center gap-4'
                                role="group"
                                aria-label="Quick actions and user menu"
                            >
                                {/* Quick Add Button */}
                                <button
                                    title='Quick add new transaction'
                                    onClick={handleQuickAdd}
                                    onKeyDown={handleQuickAddKeyDown}
                                    className="relative group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-full"
                                    aria-label="Quick add new transaction"
                                    type="button"
                                >
                                    <Plus
                                        className="w-9 h-9 bg-[#333333] hover:bg-[#3a3a3a] group-focus:bg-[#3a3a3a] p-2 rounded-full cursor-pointer text-white transition-colors duration-200"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Add new transaction</span>
                                </button>

                                {/* Profile Menu */}
                                <button
                                    title='Open user profile menu'
                                    onClick={handleProfileClick}
                                    onKeyDown={handleProfileKeyDown}
                                    className='relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-full'
                                    aria-label="Open user profile menu"
                                    type="button"
                                >
                                    <img
                                        src="./profile.png"
                                        alt="User profile picture"
                                        className='w-9 h-9 rounded-full shadow-lg hover:shadow-white/20 transition-shadow duration-200'
                                        onError={(e) => {
                                            // Fallback for missing profile image
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback profile placeholder */}
                                    <div
                                        className="w-9 h-9 rounded-full bg-gradient-to-r from-green-600 to-green-500 items-center justify-center text-white font-bold text-sm hidden"
                                        aria-hidden="true"
                                    >
                                        G
                                    </div>
                                </button>
                            </div>
                        </header>

                        {/* Page Content Container */}
                        <section
                            className="flex-1"
                            role="region"
                            aria-label={`${getPageTitle} content`}
                        >
                            <Outlet />
                        </section>
                    </main>
                </div>

            </div>
        </SidebarContext.Provider>
    );
};

// Display name for debugging
Layout.displayName = 'Layout';

export default React.memo(Layout);