import { NavLink } from "react-router-dom"

export default function Admin_screen(){
    return(
        <div>
            <Header/>
            <Hero_section/>
            <Content_section/>
            <Home/>

        </div>
    )
}

function Header(){
    return(
        <div>
            <div>
                <img src="" alt=""/>
                <div>
                    <h2>Chama</h2>
                    <p>CENTRALIZED</p>
                </div>
            </div>
            <div>
                <button><NavLink to="">Notifications</NavLink> </button>
                <div>GW</div>
            </div>
        </div>
    )
}

function Hero_section(){
    return(
        <div>
            <p>Current Chama</p>
            <h4>Umoja Together Chama</h4>
            <div>
                <p>Chairperson</p>
                <p>Switch Chama</p>
            </div>
        </div>
    )
}

function Content_section(){
    return(
        <div>
            <h5>Umoja Together Chama / Home</h5>
            <nav>
                <NavLink to="{Home}" >Home</NavLink>
                <NavLink to="" >My Contributions</NavLink>
                <NavLink to="" >More</NavLink>
            </nav>
        </div>        
    )
}

function Home(){
    return(
        <div>
            <div>new Date()</div>
            <div>Good Morning, Grace</div>
            <div>
                <p>Your Chama is Active. Grow your membership and keep the group moving together</p>
            </div>
            <div>
                <div>
                    <p>October Contributions</p>
                    <p>Ksh. 12, 000</p>
                    <p>4 of 6 members paid</p>
                    <p>target KSH 18000</p>
                </div>
                <div>
                    <p>Still to contribute</p>
                    <p>Ksh. 6, 000</p>
                    <p>2 members pending due</p>
                    <p>15th Oct</p>
                </div>
                <div>
                    <p>Active members</p>
                    <p>2 further invitations</p>
                    <p>awaiting response</p>
                    
                </div>
                <div>
                    <p>Needs your atttention</p>
                    <p>3 requests</p>
                    <p>1 role request. 2 member </p>
                    <p>inquiry</p>
                </div>
            </div>

        </div>
    )
}