import { supabase } from '../supabaseClient.tsx'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

/* ---------- Icons (inline SVG, no dependencies) ---------- */
const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z" />
    </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9h-2zM9 7a3 3 0 0 1 6 0v2H9V7z" />
    </svg>
);

const Avatar = () => (
    <svg viewBox="0 0 100 100" className="h-24 w-24 rounded-full">
        <rect width="100" height="100" fill="#8ea0ad" />
        <rect width="100" height="50" fill="#a9b8c4" />
        <circle cx="50" cy="38" r="15" fill="white" />
        <path d="M20 100c0-22 13-34 30-34s30 12 30 34z" fill="white" />
    </svg>
);

/* ---------- Page ---------- */
export default function Log_in() {
    const [contact, setContact] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function authenticate_user() {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: contact,
            password: password,
        })
        setLoading(false)

        if (data.user?.aud === "authenticated") {
            alert("success")
            navigate("/admin_screen")
        } else {
            alert(error?.message)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <form
                onSubmit={(e) => { e.preventDefault(); authenticate_user(); }}
                className="relative mt-12 flex w-full max-w-md flex-col gap-5 rounded-[28px] bg-[#bec9d4] px-10 pb-10 pt-16"
            >
                {/* Avatar overlapping the top edge */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <Avatar />
                </div>

                <h1 className="mb-3 text-center text-3xl font-light uppercase tracking-wider text-white">
                    Login
                </h1>

                {/* Phone / email */}
                <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#3b9dd2]"
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#3b9dd2]"
                    />
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-2 text-xs text-white/90">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 accent-[#3b9dd2]"
                    />
                    Remember me
                </label>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mx-auto rounded-full bg-[#3b9dd2] px-12 py-2.5 text-sm font-light uppercase tracking-wide text-white transition hover:bg-[#2f8abd] disabled:opacity-60"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {/* Footer links */}
                <div className="flex flex-col items-center gap-1 text-xs text-white/90">
                    <NavLink to="/forgot-password" className="hover:underline">
                        Forgot phone number / password?
                    </NavLink>
                    <span>
                        Don't have an account?{' '}
                        <NavLink to="/Signup" className="underline hover:text-white">
                            Signup
                        </NavLink>
                    </span>
                </div>
            </form>
        </div>
    )
}