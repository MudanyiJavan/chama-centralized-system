import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
//import { supabase } from '../supabaseClient.tsx'
import { StatusBanner, SubmitButton, idle } from './feedback.tsx';
import type { Status } from './feedback.tsx';

/* ---------- Icons ---------- */
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
};

const Field = ({ icon, type = 'text', value, onChange, placeholder }: FieldProps) => (
    <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#3b9dd2] disabled:cursor-not-allowed disabled:opacity-60"
        />
    </div>
);

/* ---------- Page ---------- */
export default function Sign_up() {
    const [fname, setFname] = useState('')
    const [sname, setSname] = useState('')
    const [contact, setContact] = useState('')
    const [email, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [status, setStatus] = useState<Status>(idle)
    const navigate = useNavigate();
    const timer = useRef<number | undefined>(undefined)

    const loading = status.type === 'loading'
    const success = status.type === 'success'

    useEffect(() => () => window.clearTimeout(timer.current), [])

    // Wrap each setter so typing clears an old error
    const edit = (setter: (v: string) => void) => (v: string) => {
        setter(v)
        if (status.type === 'error') setStatus(idle)
    }

    async function createAccount() {
        if (!fname.trim() || !sname.trim() || !contact.trim() || !email.trim() || !password) {
            setStatus({ type: 'error', message: 'Please fill in all the fields.' })
            return
        }
        if (password.length < 6) {
            setStatus({ type: 'error', message: 'Password must be at least 6 characters.' })
            return
        }
        if (password !== confirm) {
            setStatus({ type: 'error', message: 'Passwords do not match.' })
            return
        }

        setStatus({ type: 'loading' })

        try {
            const url ='http://localhost:8080/userd'
            const post_response = await fetch(url, 
                {
                    method:'post',
                    headers:{
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        fname: fname,
                        sname: sname,
                        contact: Number(contact),
                        email: email,
                        password: password
                    }),
    
                }
            )
            if (!post_response.ok) {
                const errorText = await post_response.text();
                console.error("Server error:", errorText);
                return;
            }

            const result = await post_response.json()

            console.log(result)
            {/*
            const { error } = await supabase
                .from('profiles')
                .insert([{ name: `${fname.trim()} ${sname.trim()}`, role: email.trim(), contact: contact.trim(), password }])
            
            if (error) {
                console.error('Signup Error:', error.message)
                setStatus({ type: 'error', message: error.message })
                return
            }
             */}   

            setStatus({ type: 'success', message: 'Account created! Taking you to your dashboard...' })
            timer.current = window.setTimeout(() => navigate('/chamaAuth'), 1500)
        } catch {
            setStatus({ type: 'error', message: 'Network problem. Check your connection and try again.' })
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
            <form
                onSubmit={(e) => { e.preventDefault(); createAccount(); }}
                noValidate
                className="flex w-full max-w-md flex-col gap-5 rounded-[28px] bg-[#bec9d4] px-10 py-12"
            >
                <h1 className="mb-1 text-center text-3xl font-light uppercase tracking-wider text-white">
                    Sign Up
                </h1>

                <StatusBanner status={status} />

                <fieldset disabled={loading || success} className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0">
                    <Field icon={<UserIcon className="h-4 w-4" />} value={fname} onChange={edit(setFname)} placeholder="First name" />
                    <Field icon={<UserIcon className="h-4 w-4" />} value={sname} onChange={edit(setSname)} placeholder="Second name" />
                    <Field icon={<PhoneIcon className="h-4 w-4" />} value={contact} onChange={edit(setContact)} placeholder="Mobile contact" />
                    <Field icon={<BadgeIcon className="h-4 w-4" />} value={email} onChange={edit(setRole)} placeholder="Your email address" />
                    <Field icon={<LockIcon className="h-4 w-4" />} type="password" value={password} onChange={edit(setPassword)} placeholder="Password" />
                    <Field icon={<LockIcon className="h-4 w-4" />} type="password" value={confirm} onChange={edit(setConfirm)} placeholder="Confirm password" />

                    <SubmitButton
                        loading={loading || success}
                        label="Create Account"
                        loadingLabel={success ? 'Redirecting...' : 'Creating...'}
                    />
                </fieldset>

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