import React, { useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * CardWrapper Component - A reusable card container with enhanced accessibility
 * 
 * @param {Object} props - Component props
 * @param {string} props.CardTitle - Title text for the card header
 * @param {React.ReactNode} props.icon - Icon element to display in the header
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.role - ARIA role for the card
 * @param {string} props.ariaLabel - ARIA label for accessibility
 * @param {string} props.ariaDescribedBy - ID of element that describes the card
 * @param {boolean} props.isClickable - Whether the card is interactive
 * @param {Function} props.onClick - Click handler for interactive cards
 * @param {string} props.variant - Card style variant ('default', 'highlight', 'warning')
 * @param {boolean} props.loading - Loading state
 * @param {string} props.testId - Test ID for testing
 */
const CardWrapper = forwardRef(({
    CardTitle,
    icon,
    children,
    className = '',
    role = 'region',
    ariaLabel,
    ariaDescribedBy,
    isClickable = false,
    onClick,
    onKeyDown,
    variant = 'default',
    loading = false,
    testId,
    tabIndex,
    ...restProps
}, ref) => {

    // Memoized card styles based on variant and interaction state
    const cardStyles = useMemo(() => {
        const baseClasses = 'backdrop-blur-2xl p-4 md:p-6 rounded-xl transition-all duration-200 ease-in-out';

        const variantStyles = {
            default: 'bg-[#333333]/60 border border-gray-600/30',
            highlight: 'bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-600/30',
            warning: 'bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-600/30',
            error: 'bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-600/30'
        };

        const interactionStyles = isClickable
            ? 'cursor-pointer hover:bg-[#333333]/80 hover:border-gray-500/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 active:scale-[0.98]'
            : '';

        const loadingStyles = loading
            ? 'opacity-70 pointer-events-none animate-pulse'
            : '';

        return `${baseClasses} ${variantStyles[variant]} ${interactionStyles} ${loadingStyles} ${className}`.trim();
    }, [variant, isClickable, loading, className]);

    // Generate unique ID for title if not provided
    const titleId = useMemo(() =>
        CardTitle ? `card-title-${Math.random().toString(36).substr(2, 9)}` : null,
        [CardTitle]
    );

    // Handle keyboard interactions for clickable cards
    const handleKeyDown = (event) => {
        if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onClick?.(event);
        }
        onKeyDown?.(event);
    };

    // Handle click events
    const handleClick = (event) => {
        if (isClickable && !loading) {
            onClick?.(event);
        }
    };

    // Determine appropriate ARIA attributes
    const ariaAttributes = useMemo(() => {
        const attrs = {
            role,
            ...(ariaLabel && { 'aria-label': ariaLabel }),
            ...(ariaDescribedBy && { 'aria-describedby': ariaDescribedBy }),
            ...(titleId && { 'aria-labelledby': titleId }),
            ...(loading && { 'aria-busy': 'true' }),
            ...(isClickable && {
                tabIndex: tabIndex ?? 0,
                'aria-pressed': false
            }),
        };

        // Remove undefined values
        return Object.fromEntries(
            Object.entries(attrs).filter(([_, value]) => value !== undefined)
        );
    }, [role, ariaLabel, ariaDescribedBy, titleId, loading, isClickable, tabIndex]);

    return (
        <article
            ref={ref}
            className={cardStyles}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            data-testid={testId}
            {...ariaAttributes}
            {...restProps}
        >
            {/* Card Content Container */}
            <div className='flex justify-between items-center gap-4'>
                {/* Main Content Section */}
                <div className='flex-1 min-w-0'> {/* min-w-0 prevents flex item from overflowing */}
                    {/* Card Header */}
                    {CardTitle && (
                        <header className='mb-3'>
                            <h2
                                id={titleId}
                                className='font-medium text-xs md:text-sm text-gray-400 leading-tight'
                            >
                                {CardTitle}
                                {loading && (
                                    <span className="ml-2 inline-block w-2 h-2 bg-gray-400 rounded-full animate-ping" aria-hidden="true" />
                                )}
                            </h2>
                        </header>
                    )}

                    {/* Card Body */}
                    <div className='space-y-2'>
                        {loading ? (
                            // Loading skeleton
                            <div className="animate-pulse space-y-2" aria-hidden="true">
                                <div className="h-4 bg-gray-600/30 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-600/30 rounded w-1/2"></div>
                            </div>
                        ) : (
                            children
                        )}
                    </div>
                </div>

                {/* Icon Section */}
                {icon && (
                    <div
                        className='flex-shrink-0 ml-4'
                        role="img"
                        aria-hidden={!ariaLabel ? "true" : "false"}
                    >
                        {React.isValidElement(icon) ? (
                            React.cloneElement(icon, {
                                className: `${icon.props.className || ''} transition-transform duration-200 ${isClickable ? 'group-hover:scale-110' : ''}`.trim(),
                                'aria-hidden': !ariaLabel ? 'true' : 'false'
                            })
                        ) : (
                            icon
                        )}
                    </div>
                )}
            </div>

            {/* Loading overlay for better UX */}
            {loading && (
                <div
                    className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center"
                    aria-hidden="true"
                >
                    <div className="w-6 h-6 border-2 border-gray-400 border-t-green-500 rounded-full animate-spin"></div>
                </div>
            )}
        </article>
    );
});

// PropTypes for better development experience
CardWrapper.propTypes = {
    CardTitle: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    role: PropTypes.string,
    ariaLabel: PropTypes.string,
    ariaDescribedBy: PropTypes.string,
    isClickable: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    variant: PropTypes.oneOf(['default', 'highlight', 'warning', 'error']),
    loading: PropTypes.bool,
    testId: PropTypes.string,
    tabIndex: PropTypes.number,
};

// Default props
CardWrapper.defaultProps = {
    variant: 'default',
    role: 'region',
    isClickable: false,
    loading: false,
};

// Display name for debugging
CardWrapper.displayName = 'CardWrapper';

export default React.memo(CardWrapper);