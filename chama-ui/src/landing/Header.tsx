import { NavLink } from 'react-router-dom';
import logo from '../assets/chama_logo.png'

export default function Header(){
    return (
        <div>
            <Chama_profile/>            
            <About/>
            <Get_Started/>
            
        </div>
    );
}


function Chama_profile(){
    return(
        <div>
            <img src={logo} alt="logo" />
            <div>
                <h2>Chama</h2>
                <p>Centerilized</p>
            </div>
        </div>
    )
}

function About(){
    return(
        <div>
            <ul>
                <li> <a href="http://">How it works</a></li>
                <li> <a href="http://">Features</a></li>
                <li> <a href="http://">For Your Group</a></li>
                <li> <a href="http://">FAQs</a></li>
            </ul>
        </div>
    )
}

function Get_Started(){
    return(
        <div>           
            <button><NavLink to="/Signup" >Get Started </NavLink></button>
        </div>
    )
}