import React from 'react';

interface IconProps {
  className?: string;
}

export const LeafIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.61 3.22C19.13 4.74 20 6.79 20 9c0 2.21-.87 4.26-2.39 5.78C16.08 16.3 14.03 17 12 17c-2.32 0-4.47-.95-6-2.52C4.16 12.63 3.06 10.05 3.01 7.22c4.1.9 7.53-1.13 8.3-4.01C12.72 5.09 14.78 6 17 6c.3 0 .59-.02.88-.06-1.25-1.46-2.03-3.23-2.27-5.18 1 .19 1.91.69 2.7 1.46zM4.12 3.51C4.54 5.37 5.76 7 7.5 7.82c-2.09.7-3.61 2.34-4.21 4.37-.18-.62-.29-1.28-.29-1.95 0-2.21.87-4.26 2.39-5.78.48-.48.99-.9 1.55-1.25-.49.03-.98.05-1.47.05-1.49 0-2.89-.45-4.12-1.24a.5.5 0 01.35-.91z"/>
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 5a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H6a1 1 0 110-2h5V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" clipRule="evenodd" />
    </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h2.586a1 1 0 01.707.293l1.414 1.414A1 1 0 009.414 6H14.586a1 1 0 00.707-.293l1.414-1.414A1 1 0 0117.414 4H20a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm10 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    <path d="M12 17a5 5 0 100-10 5 5 0 000 10z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c.34 0 .68.04 1.02.11l.83 1.66 1.84.27c1.1.16 1.54 1.51.74 2.3l-1.33 1.3.31 1.83c.2 1.09-.96 1.92-1.94 1.4l-1.65-.86-1.65.86c-.98.52-2.14-.31-1.94-1.4l.31-1.83-1.33-1.3c-.8-.79-.36-2.14.74-2.3l1.84-.27.83-1.66A5.95 5.95 0 0112 2.25zm1.5 15.02l.63 1.26.21.43c.7.1 1.05 1.02.53 1.54l-1 1 .24 1.4c.15.83-.73 1.47-1.48 1.07l-1.25-.66-1.25.66c-.75.4-1.63-.24-1.48-1.07l.24-1.4-1-1c-.52-.52-.17-1.44.53-1.54l1.4-.21.63-1.26a4.48 4.48 0 013 0z" clipRule="evenodd" />
  </svg>
);

export const XCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.707 12.293a1 1 0 01-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 12 8.293 9.707a1 1 0 011.414-1.414L12 10.586l2.293-2.293a1 1 0 011.414 1.414L13.414 12l2.293 2.293z" clipRule="evenodd" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6c-2.4 0-4.6.9-6.2 2.4a.75.75 0 00.9 1.2 8.5 8.5 0 0110.6 0 .75.75 0 00.9-1.2A10 10 0 0012 6zM4.2 9.4a.75.75 0 001 1.1 6.5 6.5 0 018.6 0 .75.75 0 101-1.1 8 8 0 00-10.6 0zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM4 12a8 8 0 018-8 .75.75 0 000-1.5A9.5 9.5 0 002.5 12a.75.75 0 001.5 0z"/>
    <path d="M3 18.5a.75.75 0 001.5 0c0-2.8 2.2-5 5-5h5c2.8 0 5 2.2 5 5a.75.75 0 001.5 0c0-3.6-2.9-6.5-6.5-6.5h-5C5.9 12 3 14.9 3 18.5z"/>
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 6a3 3 0 11-6 0 3 3 0 016 0zM17 12a3 3 0 11-6 0 3 3 0 016 0zM9 6a3 3 0 11-6 0 3 3 0 016 0zM21.7 18.3c-.5-1-1.4-1.7-2.6-2.1.3-.2.5-.5.7-.8.8-1.1 1.2-2.4 1.2-3.8 0-1.2-.4-2.4-1.1-3.3a5.5 5.5 0 00-4.1-1.9c-.3 0-.6 0-.9.1A5.4 5.4 0 0012 4a5.4 5.4 0 00-3.9 1.7c-.7.9-1.1 2-1.1 3.3 0 1.4.4 2.7 1.2 3.8.2.3.4.6.7.8-1.2.4-2.2 1.1-2.6 2.1C4.9 20.2 6.7 22 12 22s7.1-1.8 8.7-3.7z"/>
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M17.5 3a2.5 2.5 0 012.5 2.5c0 1.3-.8 2.4-2 2.5v1.5a4 4 0 01-4 4h-3a4 4 0 01-4-4V8c-1.2-.1-2-1.2-2-2.5A2.5 2.5 0 016.5 3h11zm-5.5 8h-3V8.5h3V11zM11 21a1 1 0 100-2h2a1 1 0 100 2H11z" clipRule="evenodd" />
    <path d="M10 15a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM6 14a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1z" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M15.707 16.707a1 1 0 01-1.414 0L9.586 12l4.707-4.707a1 1 0 011.414 1.414L12.414 12l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

export const LanguageIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04z"/>
        <path d="M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
    </svg>
);

export const LocationMarkerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2.25c-3.14 0-5.69 2.55-5.69 5.69 0 3.14 2.55 5.69 5.69 5.69s5.69-2.55 5.69-5.69C17.69 4.8 15.14 2.25 12 2.25zM12 15.75c-4.97 0-9 4.03-9 9h18c0-4.97-4.03-9-9-9z" clipRule="evenodd" />
        <path d="M12 11.25a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
    </svg>
);