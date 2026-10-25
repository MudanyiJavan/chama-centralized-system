import logo from '../assets/logo.png'
import policy_logo from '../assets/policy_logo.png'
import { useState, useEffect} from 'react'
export default function Chama_Auth(){
    interface Profile {
        name: string;
        admin: string;
    }
    const[fetched_data, setData] = useState<Profile[]>([])
    useEffect(()=>{
        const url = "http://localhost:8080/chamas"
        const fetchchamas= async()=>{
            try {
                const response= await fetch(url)

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                console.log(result)
                setData(result);
            } catch (error) {
                console.error("Error fetching chamas:", error);
            }
        }
        fetchchamas()
    }, [])

    return(
        <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans text-[#14213d]">
            <div className="flex flex-col justify-between gap-10 bg-[#123573] px-8 py-10 text-white lg:w-[41%] lg:px-[88px] lg:py-[88px]">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="" className="h-10 w-10 rounded-lg bg-white object-contain p-1.5" />
                    {/*morbs is a cooperation sheme that enable people to come together to pull up there resource inorder to do something*/}
                    <h4 className="text-3xl font-normal tracking-tight">Morbs</h4>
                </div>
                <p className="text-sm font-medium uppercase tracking-wide text-[#a9c1ee]">TOGETHER ON YOUR TERMS</p>
                <div>
                    <h3 className="text-5xl font-medium leading-[1.15] tracking-tight xl:text-6xl">Your people.</h3>
                    <h3 className="text-5xl font-medium leading-[1.15] tracking-tight xl:text-6xl">Your plans</h3>
                    <h3 className="text-5xl font-medium leading-[1.15] tracking-tight xl:text-6xl">One place to grow</h3>
                </div>
                <p className="max-w-xl text-xl leading-relaxed text-[#c3d3f2]">From family welfare to a circle of friends, make room for the way you agree to work together.</p>
                <div className="mx-auto hidden h-72 w-72 rounded-full border border-white/25 lg:block">

                </div>
                <div className="flex items-start gap-4 text-lg leading-snug text-[#c3d3f2]">
                    <img src={policy_logo} alt="" className="mt-1 h-6 w-6 object-contain" />
                    <p>Clear agreements. Shared visibility. A personal account that stays yours.</p>
                </div>
            </div>


            <div className="flex flex-1 flex-col gap-8 px-6 py-10 sm:px-12 lg:px-[110px] lg:py-[60px]">
                {/*header for this interface*/}
                {/* after logging in you must encounter this page inorder to loggin to any morbs account you are in*/}
                <h4 className="text-sm font-medium text-[#5b6b85]">Morbs/Personal Account</h4>
                <div className="w-full max-w-[680px] rounded-xl border border-[#c9d8f6] bg-[#eef3fd] p-5">
                    {/* incase of an invitation it will appear hear else no invitation send */}
                    <div className="flex flex-col gap-4">
                        <p className="text-base leading-snug text-[#123573]">Admin washingtone from ZUURI Multibusiness has invited you</p>
                        <div className="flex gap-3">
                            {/* onclicking the button should change to view*/}
                            <button className="rounded-lg bg-[#1a56db] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1648b8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] focus-visible:ring-offset-2">click to join</button> 
                            <button className="rounded-lg border border-[#d5dbe6] bg-white px-5 py-2.5 text-sm font-semibold text-[#14213d] transition hover:bg-[#f5f7fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] focus-visible:ring-offset-2">cancel </button>
                        </div>
                    </div>
                    {/*on your next visit to the page the invitation should not be there but moved to section below this*/}
                </div>

                <div className="flex w-full max-w-[680px] flex-col gap-3">
                    {/*all those morbs account you belong will be here, if not then you don't belong to any */}
                    {/*just for security features you will seperately login to each*/}
                   
                    {fetched_data.map((data, index)=>(
                        <div key={index} className="rounded-xl border border-[#d5dbe6] bg-white px-5 py-4 transition hover:border-[#1a56db]">
                            <p className="text-base text-[#14213d]"><strong>Name:</strong> {data.name}</p>
                            <p className="text-sm text-[#6b7a90]"><strong>Admin:</strong> {data.admin}</p>
                               
                        </div>
                    ))}                      
                    
                </div>

                <div className="w-full max-w-[680px] rounded-xl bg-[#eef3fd] p-6">
                    {/*incase you want to create a Morbs Account and invite people*/}
                    <p className="text-lg font-medium text-[#123573]">Create a Morbs account,</p>
                    <p className="mt-1 text-base text-[#3d5a94]">Best Digital cooperation scheme</p>
                    <button className="mt-5 rounded-lg bg-[#1a56db] text-base font-semibold text-white transition hover:bg-[#1648b8] focus-within:ring-2 focus-within:ring-[#1a56db] focus-within:ring-offset-2"><a href="" className="block px-6 py-3.5">Create Morbs Cooperation Account</a></button>
                </div>

                <div className="mt-auto">
                    <button className="rounded-lg border border-[#d5dbe6] px-5 py-2.5 text-sm font-semibold text-[#1a56db] transition hover:bg-[#eef3fd] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] focus-visible:ring-offset-2">
                        logout
                    </button>
                </div>
            </div>
        </div>
    )
}
