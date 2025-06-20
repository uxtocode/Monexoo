import React, { useState, useEffect, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import MonexoSidebar from './MonexoSidebar';
import Footer from './Footer';
import ScrollToTop from '../ScrollToTop';

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

    return (
        <SidebarContext.Provider value={sidebarContext}>
            <div className="min-h-screen bg-[#0d0d0d] text-white">
                <ScrollToTop />
                <MonexoSidebar />

                {/* Main Content Container */}
                <div className={`transition-all duration-300 min-h-screen flex flex-col ${isMobile ?  'ml-0' : isExpanded ? 'ml-72' : 'ml-20'}`}>

                    {/* main content */}
                    <main className={`flex-1 p-4 md:p-6`}>

                        {/* Navbar */}

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