const Icon = ({ width = '3.2rem', height = '3.2rem', viewBox = '0 0 32 32', className, children }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox={viewBox}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            {children}
        </svg>
    );
};

export default Icon;
