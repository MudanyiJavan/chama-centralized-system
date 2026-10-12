
import { supabase } from '../supabaseClient.tsx'

import { NavLink, useNavigate } from 'react-router-dom';
import {useState} from 'react';


export default function Log_in(){
    const [contact, setContact]= useState('')
    const [password, setPassword]= useState('')
    const navigate = useNavigate(); // 1. Initialize the navigate function

    async function authenticate_user() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: contact,
            password: password,
        })
        if(data.user?.aud==="authenticated"){
            alert("success")
            navigate("/admin_screen")
        }else{
            alert(error)
        }
    }
    return(
        <div>
          

            <label htmlFor="">Phone Number:</label> <br />
            <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder='Enter phone number'/>
            <br />

            <label htmlFor="">Password:</label> <br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password'/>
            <br />
            
            <p>{contact} </p>
            <p>{password} </p>
            <button onClick={authenticate_user}>Login</button>
            <div>
                <span>Don't have an account, 
                    <NavLink to="/Signup">Signup</NavLink>
                </span>
            </div>
        </div>
    )
}