import logo from "../assets/chama_logo.png"

export default function Footer(){
    return(
        <div className="border-t border-slate-200 bg-blue-50/40 font-sans antialiased">
    <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-10">

        {/* top: brand + three link columns */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">

            {/* brand */}
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                        <img src={logo} alt="" className="h-7 w-7 object-contain" />
                    </div>
                    <div className="leading-none">
                        <h4 className="text-3xl font-bold tracking-tight text-blue-950">Morbs</h4>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">Centralized</p>
                    </div>
                </div>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500">
                    A shared home for community welfare and investment groups. Every contribution builds our shared future.
                </p>
            </div>

            {/* explore */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-950">Eplore</h4>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">How it works</p>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">contributions</p>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">Group activity</p>
            </div>

            {/* your group */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-950">Your Group</h4>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">For chairperson</p>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">For members</p>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">Frequently Asked Questions</p>
            </div>

            {/* get started */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-950">Get Started</h4>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">Create you group</p>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">Member sign in </p>
                <p className="cursor-pointer text-slate-500 transition hover:text-blue-700">Help & supports</p>
            </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-8 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Chama Centralized</p>
            <p className="space-x-6">Privacy Terms</p>
            <p className="font-medium text-blue-700">Stronger Together</p>
        </div>

    </div>
</div>
    )
}