import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabaseClient.tsx'

/* ---------- Icons (inline SVG, no dependencies) ---------- */
type IconProps = { className?: string };

const UserIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z" />
    </svg>
);

const PhoneIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
);

const BadgeIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM10 5h4v2h-4V5z" />
    </svg>
);

const LockIcon = ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9h-2zM9 7a3 3 0 0 1 6 0v2H9V7z" />
    </svg>
);

/* ---------- Reusable input with icon ---------- */
type FieldProps = {
    icon: React.ReactNode;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    required?: boolean;
};

const Field = ({ icon, type = 'text', value, onChange, placeholder, required }: FieldProps) => (
    <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span>
        <input
            type={type}
            value={value}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#3b9dd2]"
        />
    </div>
);

/* ---------- Page ---------- */
export default function Sign_up() {
    const [fname, setFname] = useState('')
    const [sname, setSname] = useState('')
    const [contact, setContact] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function createAccount() {
        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }

        setLoading(true)
        const { error } = await supabase
            .from('profiles')
            .insert([{ name: `${fname} ${sname}`, role: role, contact: contact, password: password }])
        setLoading(false)

        if (error) {
            console.error('Signup Error:', error.message);
            alert('Failed to create account: ' + error.message);
        } else {
            alert('Account created successfully!');
            setFname('');
            setSname('');
            setContact('');
            setRole('');
            setPassword('');
            setConfirm('');
            navigate('/admin_screen');
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
            <form
                onSubmit={(e) => { e.preventDefault(); createAccount(); }}
                className="flex w-full max-w-md flex-col gap-5 rounded-[28px] bg-[#bec9d4] px-10 py-12"
            >
                <h1 className="mb-3 text-center text-3xl font-light uppercase tracking-wider text-white">
                    Sign Up
                </h1>

                <Field
                    icon={<UserIcon className="h-4 w-4" />}
                    value={fname}
                    onChange={setFname}
                    placeholder="First name"
                    required
                />
                <Field
                    icon={<UserIcon className="h-4 w-4" />}
                    value={sname}
                    onChange={setSname}
                    placeholder="Second name"
                    required
                />
                <Field
                    icon={<PhoneIcon className="h-4 w-4" />}
                    type="text"
                    value={contact}
                    onChange={setContact}
                    placeholder="Mobile contact"
                    required
                />
                <Field
                    icon={<BadgeIcon className="h-4 w-4" />}
                    value={role}
                    onChange={setRole}
                    placeholder="Your role"
                    required
                />
                <Field
                    icon={<LockIcon className="h-4 w-4" />}
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Password"
                    required
                />
                <Field
                    icon={<LockIcon className="h-4 w-4" />}
                    type="password"
                    value={confirm}
                    onChange={setConfirm}
                    placeholder="Confirm password"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mx-auto mt-2 rounded-full bg-[#3b9dd2] px-10 py-2.5 text-sm font-light uppercase tracking-wide text-white transition hover:bg-[#2f8abd] disabled:opacity-60"
                >
                    {loading ? 'Creating...' : 'Create Account'}
                </button>

                <p className="text-center text-xs text-white/90">
                    Already have an account?{' '}
                    <NavLink to="/Login" className="underline hover:text-white">
                        Login
                    </NavLink>
                </p>
            </form>
        </div>
    )
}