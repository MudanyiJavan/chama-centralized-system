import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/chama_logo.png'

/* Palette (3 colors only)
   blue  #1e4f9c  (main)
   white #ffffff  (main)
   gold  #c9a227  (rare accent)
*/

const links = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'For Your Group', href: '#for-your-group' },
    { label: 'FAQs', href: '#faqs' },
]

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-[#1e4f9c]/15 bg-white text-[#1e4f9c]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
                <Chama_profile />

                {/* Desktop nav */}
                <div className="hidden md:block">
                    <About />
                </div>

                {/* Desktop buttons */}
                <div className="hidden items-center gap-3 md:flex">
                    
                    <Get_Started />
                </div>

                {/* Mobile menu toggle */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-[#1e4f9c]/30 md:hidden"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        {open
                            ? <path d="M6 6l12 12M18 6L6 18" />
                            : <path d="M4 7h16M4 12h16M4 17h16" />}
                    </svg>
                </button>
            </div>

            {/* Mobile panel */}
            {open && (
                <div className="border-t border-[#1e4f9c]/15 bg-white px-4 pb-5 pt-3 md:hidden">
                    <About mobile onNavigate={() => setOpen(false)} />
                    <div className="mt-4 flex flex-col gap-3">
                        
                        <Get_Started />
                    </div>
                </div>
            )}
        </header>
    );
}


function Chama_profile() {
    return (
        <NavLink to="/" className="flex items-center gap-3">
            <img
                src={logo}
                alt="Chama logo"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-[#c9a227]"
            />
            <div className="leading-tight">
                <h2 className="text-xl font-bold">Morbs</h2>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1e4f9c]/70">
                    Centralized
                </p>
            </div>
        </NavLink>
    )
}

function About({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
    return (
        <nav>
            <ul className={mobile ? 'flex flex-col gap-1' : 'flex items-center gap-8'}>
                {links.map((l) => (
                    <li key={l.label}>
                        <a
                            href={l.href}
                            onClick={onNavigate}
                            className={
                                mobile
                                    ? 'block rounded-md px-2 py-2 text-sm font-medium hover:bg-[#1e4f9c]/5'
                                    : 'border-b-2 border-transparent pb-1 text-sm font-medium text-[#1e4f9c]/80 transition hover:border-[#c9a227] hover:text-[#1e4f9c]'
                            }
                        >
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}



function Get_Started() {
    return (
        <NavLink
            to="/Signup"
            className="rounded-full bg-[#1e4f9c] px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-[#173f7d]"
        >
            Get Started
        </NavLink>
    )
}