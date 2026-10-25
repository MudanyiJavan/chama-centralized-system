import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.tsx'
import { friendlyAuthError, idle } from './feedback.tsx'
import type { Status } from './feedback.tsx'

export function useLogin() {
    const [contact, setContact] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [status, setStatus] = useState<Status>(idle)
    const navigate = useNavigate()
    const timer = useRef<number | undefined>(undefined)

    const loading = status.type === 'loading'
    const success = status.type === 'success'

    // Cancel the pending redirect if the user leaves the page
    useEffect(() => () => window.clearTimeout(timer.current), [])

    // Clear an old error as soon as the user starts typing again
    function clearError() {
        if (status.type === 'error') setStatus(idle)
    }

    function handleContactChange(value: string) {
        setContact(value)
        clearError()
    }

    function handlePasswordChange(value: string) {
        setPassword(value)
        clearError()
    }

    async function authenticateUser() {
        if (!contact.trim() || !password) {
            setStatus({ type: 'error', message: 'Please enter your login and password.' })
            return
        }

        setStatus({ type: 'loading' })

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: contact.trim(),
                password,
            })

            if (error || !data.user) {
                setStatus({ type: 'error', message: friendlyAuthError(error?.message) })
                return
            }

            setStatus({ type: 'success', message: 'Welcome back! Taking you to your dashboard...' })
            timer.current = window.setTimeout(() => navigate('/chamaAuth'), 1200)
        } catch {
            // Thrown when the request itself fails (offline, server unreachable)
            setStatus({ type: 'error', message: 'Network problem. Check your connection and try again.' })
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        authenticateUser()
    }

    return {
        contact,
        password,
        remember,
        status,
        loading,
        success,
        setRemember,
        handleContactChange,
        handlePasswordChange,
        handleSubmit,
    }
}