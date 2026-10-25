import { NavLink } from 'react-router-dom'
import { StatusBanner, SubmitButton } from './feedback.tsx'
import { Avatar, LockIcon, UserIcon } from './icons.tsx'
import { useLogin } from './use_login.tsx'

const NOTCH = 60
const notchMask = `radial-gradient(circle ${NOTCH}px at 50% 0px, transparent ${NOTCH - 0.5}px, #000 ${NOTCH}px)`

const inputClass =
    "w-full bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#3b9dd2] disabled:cursor-not-allowed disabled:opacity-60"

export default function Log_in() {
    const {
        contact, password, remember, status, loading, success,
        setRemember, handleContactChange, handlePasswordChange, handleSubmit,
    } = useLogin()

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <div className="relative mt-16 w-full max-w-md">

                <div
                    className="absolute inset-0 rounded-[28px] bg-[#bec9d4]"
                    style={{ maskImage: notchMask, WebkitMaskImage: notchMask }}
                />

                <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2">
                    <Avatar />
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="relative flex flex-col gap-5 px-10 pb-10 pt-24"
                >
                    <h1 className="mb-1 text-center text-3xl font-light uppercase tracking-wider text-white">
                        Login
                    </h1>

                    <StatusBanner status={status} />

                    <fieldset disabled={loading || success} className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0">
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => handleContactChange(e.target.value)}
                                placeholder="Enter phone number"
                                autoComplete="username"
                                className={inputClass}
                            />
                        </div>

                        <div className="relative">
                            <LockIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className={inputClass}
                            />
                        </div>

                        <label className="flex cursor-pointer items-center gap-2 text-xs text-white/90">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-4 w-4 accent-[#3b9dd2]"
                            />
                            Remember me
                        </label>

                        <SubmitButton
                            loading={loading || success}
                            label="Login"
                            loadingLabel={success ? 'Redirecting...' : 'Logging in...'}
                        />
                    </fieldset>

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
        </div>
    )
}