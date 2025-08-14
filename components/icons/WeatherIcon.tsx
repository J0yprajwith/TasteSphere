
import React from 'react';

export const WeatherIcon: React.FC<{className?: string}> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19.38,13.2L19.74,12.5C20.5,11.13 19.43,9.5 17.89,9.5H17V8.5A5.5,5.5 0 0,0 6.5,8.5V9.5H6.11C4.57,9.5 3.5,11.13 4.26,12.5L4.62,13.2C5.1,14.07 5.92,14.62 6.88,14.62H17.12C18.08,14.62 18.9,14.07 19.38,13.2Z" />
    </svg>
);
