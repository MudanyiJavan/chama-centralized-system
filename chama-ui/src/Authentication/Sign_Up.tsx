import { NavLink, redirect } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabaseClient.tsx'

export default function Sign_up(){
    const [fname, setFname]= useState('')
    const [sname, setSname]= useState('')
    const [contact, setContact]= useState('')
    const [role, setRole] = useState('')
    const [password, setPassword]= useState('')   

    async function createAccount() {
         // Prevents accidental page reloads
        const {error } = await supabase.from('profiles').insert([{name:`${fname} ${sname}`, role:role, contact:contact, password:password }])
        if (error) {
            console.error('Signup Error:', error.message);
            alert('Failed to create account: ' + error.message);
        } else {
            alert('Account created successfully!');
            // Optional: Reset form fields here
            setFname('');
            setSname('');
            setContact('');
            setPassword('');

            redirect("/admin_screen")
        }

    }
    return(
        <div>
            <label htmlFor="">First Name:</label>
            <br />
            <input type="text" value={fname} onChange={(e)=> setFname(e.target.value)} placeholder='Enter first name'/>
            <br />
            <label htmlFor="">Second Name:</label>
            <br />
            <input type="text" value={sname} onChange={(e)=> setSname(e.target.value)} placeholder='Enter Second name'/>
            <br />            
            <label htmlFor="">Contact:</label>
            <br />
            <input type="mail" required value={contact} onChange={(e)=> setContact(e.target.value)} placeholder='Enter YYour mobile contact'/>                            
            <br />            
            <label htmlFor="">Role:</label>
            <br />
            <input type="mail" required value={role} onChange={(e)=> setRole(e.target.value)} placeholder='Enter Your Role'/>                            
            <br />   
            <label htmlFor="">Confirm Password:</label>
            <br />
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter  password'/>
            <br />
            <button onClick={createAccount}>Create Account</button>

            <div>
                <span>All Ready have an account, 
                    <NavLink to="/Login">Login</NavLink>
                </span>
            </div>
        </div>
    )
}