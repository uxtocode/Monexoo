import { useEffect } from 'react';
import { useNavigationType, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();
    const navigationType = useNavigationType(); // POP = back/forward, PUSH = new route

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname, navigationType]);

    return null;
};

export default ScrollToTop;
