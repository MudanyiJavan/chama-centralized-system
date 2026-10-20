import { NavLink } from "react-router-dom"

/* Palette (3 colors only)
   blue  #1e4f9c  (main)
   white #ffffff  (main)
   gold  #c9a227  (rare accent)
   Softer shades are just blue with opacity, e.g. text-[#1e4f9c]/70
*/

export default function Admin_screen() {
    return (
        <div className="min-h-screen bg-white text-[#1e4f9c]">
            <Header />
            <Hero_section />
            <Content_section />
            <Home />
        </div>
    )
}

function Header() {
    return (
        <header className="flex items-center justify-between border-b border-[#1e4f9c]/15 bg-white px-4 py-3 sm:px-8">
            <div className="flex items-center gap-3">
                {/* Logo placeholder: replace with <img src="/logo.png" alt="Chama" /> later */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1e4f9c] text-lg font-bold text-white ring-2 ring-[#c9a227]">
                    C
                </div>
                <div className="leading-tight">
                    <h2 className="text-xl font-bold">Chama</h2>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1e4f9c]/70">
                        Centralized
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <NavLink
                    to="/notifications"
                    className="rounded-full border border-[#1e4f9c] px-4 py-1.5 text-sm font-medium transition hover:bg-[#1e4f9c] hover:text-white"
                >
                    Notifications
                </NavLink>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e4f9c] text-sm font-bold text-white">
                    GW
                </div>
            </div>
        </header>
    )
}

function Hero_section() {
    return (
        <section className="bg-[#1e4f9c] px-4 py-8 text-white sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Current Chama
            </p>
            <h4 className="mt-1 text-2xl font-semibold sm:text-3xl">Umoja Together Chama</h4>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-[#1e4f9c]">
                    Chairperson
                </span>
                <button className="rounded-full border border-white/50 px-4 py-1 text-sm transition hover:bg-white/10">
                    Switch Chama
                </button>
            </div>
        </section>
    )
}

function Content_section() {
    const tab = ({ isActive }: { isActive: boolean }) =>
        `border-b-2 px-1 pb-3 text-sm font-medium transition ${
            isActive
                ? "border-[#c9a227] text-[#1e4f9c]"
                : "border-transparent text-[#1e4f9c]/60 hover:text-[#1e4f9c]"
        }`

    return (
        <section className="border-b border-[#1e4f9c]/15 bg-white px-4 pt-4 sm:px-8">
            <h5 className="mb-3 text-xs text-[#1e4f9c]/60">Umoja Together Chama / Home</h5>
            <nav className="flex gap-6">
                <NavLink to="/admin_screen" end className={tab}>Home</NavLink>
                <NavLink to="/contributions" className={tab}>My Contributions</NavLink>
                <NavLink to="/more" className={tab}>More</NavLink>
            </nav>
        </section>
    )
}

/* ---------- Reusable stat card ---------- */
type CardProps = {
    label: string;
    value: string;
    lines: string[];
    children?: React.ReactNode;
}

function StatCard({ label, value, lines, children }: CardProps) {
    return (
        <div className="rounded-xl border border-[#1e4f9c]/20 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1e4f9c]/60">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
            {children}
            <div className="mt-3 space-y-0.5 text-sm text-[#1e4f9c]/75">
                {lines.map((l) => <p key={l}>{l}</p>)}
            </div>
        </div>
    )
}

function Home() {
    const now = new Date()
    const hour = now.getHours()
    const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening"
    const dateText = now.toLocaleDateString("en-KE", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    })

    const paid = 12000
    const target = 18000
    const percent = Math.round((paid / target) * 100)

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
            <p className="text-sm text-[#1e4f9c]/60">{dateText}</p>
            <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{greeting}, Grace</h3>

            <div className="mt-4 rounded-xl border-l-4 border-[#1e4f9c] bg-[#1e4f9c]/5 px-4 py-3">
                <p className="text-sm">
                    Your Chama is Active. Grow your membership and keep the group moving together.
                </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="October Contributions"
                    value="Ksh. 12,000"
                    lines={["4 of 6 members paid", "Target Ksh. 18,000"]}
                >
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#1e4f9c]/15">
                        <div
                            className="h-full rounded-full bg-[#1e4f9c]"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                    <p className="mt-1 text-xs text-[#1e4f9c]/60">{percent}% of target</p>
                </StatCard>

                <StatCard
                    label="Still to contribute"
                    value="Ksh. 6,000"
                    lines={["2 members pending", "Due 15th Oct"]}
                />

                <StatCard
                    label="Active members"
                    value="6"
                    lines={["2 further invitations", "awaiting response"]}
                />

                <StatCard
                    label="Needs your attention"
                    value="3 requests"
                    lines={["1 role request", "2 member inquiries"]}
                />
            </div>
        </main>
    )
}