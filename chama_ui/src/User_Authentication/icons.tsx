export const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z" />
    </svg>
)

export const LockIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9h-2zM9 7a3 3 0 0 1 6 0v2H9V7z" />
    </svg>
)

export const Avatar = () => (
    <svg viewBox="0 0 100 100" className="h-24 w-24 rounded-full">
        <rect width="100" height="100" fill="#8ea0ad" />
        <rect width="100" height="50" fill="#a9b8c4" />
        <circle cx="50" cy="38" r="15" fill="white" />
        <path d="M20 100c0-22 13-34 30-34s30 12 30 34z" fill="white" />
    </svg>
)