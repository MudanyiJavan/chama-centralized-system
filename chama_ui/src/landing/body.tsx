import group_photo from "../assets/chama_landing.png"
import contribution from "../assets/contribution.png"
import chats from "../assets/chats.png"
import shared from "../assets/shared.png"

export default function Maincontent(){
    return(
        <div className="bg-white font-sans text-slate-900 antialiased">
    {/* hero: left + right side by side */}
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pt-24">

        {/*the left handside div*/}
        <div>

            <div className="flex items-center gap-3">
                <p className="h-0.5 w-6 overflow-hidden bg-blue-700 text-transparent">-</p>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">FOR THE FUTURE YOU BUILD TOGETHER</p>
            </div>

            <div className="mt-8 text-5xl font-semibold leading-[1.08] tracking-tight text-blue-950 sm:text-6xl xl:text-7xl">
                <p>Your groups.</p>
                <p>Your goals.</p>
                <p>One shared</p>
                <p>place.</p>
            </div>

            <div className="mt-8 max-w-xl">
                <p className="text-lg leading-relaxed text-slate-500 sm:text-xl">Bring your chama’s contributions, conversations and decisions together.
                    Less chasing records. More moving forward, together.</p>
            </div>

        </div>

        {/*the right handside div*/}
        <div>
            <img
                src={group_photo}
                alt=""
                className="h-[420px] w-full rounded-[2rem] object-cover shadow-xl shadow-blue-900/10 sm:h-[520px] lg:h-[600px]"
            />
        </div>

    </div>

    {/*the long div sitting beneath the above divs*/}
    <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-3 lg:px-10">

            <div className="flex items-start gap-4">
                <div className="mt-1 h-7 w-7 shrink-0">
                    <img src={contribution} alt="" className="h-full w-full object-contain" />
                </div>
                <div>
                    <p className="text-lg font-semibold text-blue-950">Clear contribution records</p>
                    <p className="text-slate-500">Know where your group stands</p>
                </div>
            </div>

            <div className="flex items-start gap-4 md:justify-center">
                <div className="mt-1 h-7 w-7 shrink-0">
                    <img src={chats} alt="" className="h-full w-full object-contain" />
                </div>
                <div>
                    <p className="text-lg font-semibold text-blue-950">Connected conversations</p>
                    <p className="text-slate-500">Updates and Questions in one place</p>
                </div>
            </div>

            <div className="flex items-start gap-4 md:justify-end">
                <div className="mt-1 h-7 w-7 shrink-0">
                    <img src={shared} alt="" className="h-full w-full object-contain" />
                </div>
                <div>
                    <p className="text-lg font-semibold text-blue-950">Shared goals kept in view</p>
                    <p className="text-slate-500">from welfare to investment projects</p>
                </div>
            </div>

        </div>
    </div>
</div>
    )
}