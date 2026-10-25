export type Status = {
    type: 'idle' | 'loading' | 'success' | 'error'
    message?: string
}

export const idle: Status = { type: 'idle' }

/* ---------- Spinner ---------- */
export const Spinner = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
)

/* ---------- Inline success / error message ---------- */
export function StatusBanner({ status }: { status: Status }) {
    if (status.type !== 'success' && status.type !== 'error') return null
    const isError = status.type === 'error'

    return (
        <div
            role={isError ? 'alert' : 'status'}
            aria-live={isError ? 'assertive' : 'polite'}
            className={`flex items-start gap-2 rounded-md border-l-4 bg-white px-3 py-2 text-xs ${
                isError ? 'border-red-500 text-red-700' : 'border-green-500 text-green-700'
            }`}
        >
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isError
                    ? <path d="M12 8v5M12 17h.01M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    : <path d="M5 13l4 4L19 7" />}
            </svg>
            <span>{status.message}</span>
        </div>
    )
}

/* ---------- Submit button with built-in spinner ---------- */
type SubmitProps = {
    loading: boolean
    disabled?: boolean
    label: string
    loadingLabel: string
}

export function SubmitButton({ loading, disabled, label, loadingLabel }: SubmitProps) {
    return (
        <button
            type="submit"
            disabled={loading || disabled}
            className="mx-auto flex min-w-[170px] items-center justify-center gap-2 rounded-full bg-[#3b9dd2] px-10 py-2.5 text-sm font-light uppercase tracking-wide text-white transition hover:bg-[#2f8abd] disabled:cursor-not-allowed disabled:opacity-70"
        >
            {loading && <Spinner />}
            {loading ? loadingLabel : label}
        </button>
    )
}

/* ---------- Turn raw Supabase errors into plain language ---------- */
export function friendlyAuthError(message?: string): string {
    const m = (message ?? '').toLowerCase()
    if (m.includes('invalid login credentials')) return 'Wrong email or password. Please try again.'
    if (m.includes('email not confirmed')) return 'Please confirm your email first, then log in.'
    if (m.includes('rate limit') || m.includes('too many')) return 'Too many attempts. Please wait a moment and try again.'
    if (m.includes('fetch') || m.includes('network')) return 'Network problem. Check your connection and try again.'
    return message || 'Something went wrong. Please try again.'
}