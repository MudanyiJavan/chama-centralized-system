import { NavLink } from 'react-router-dom';

export default function Sign_up(){
    return(
        <div>
            <label htmlFor="">First Name:</label>
            <br />
            <input type="text" />
                <br />
            <label htmlFor="">Second Name:</label>
            <br />
            <input type="text"/>
            <br />
            <label htmlFor="">Surname:</label>
            <br />
            <input type="text" />
            <br />
            <label htmlFor="">Email:</label>
            <br />
            <input type="text" />
                <br />
            <label htmlFor="">Contact:</label>
            <br />
            <input type="text" />
            <br />
            <label htmlFor="">New Passord:</label>
            <br />
            <input type="text" />
            <br />
            <label htmlFor="">Confirm Password:</label>
            <br />
            <input type="text" />
            <br />
            <button>Create Account</button>

            <div>
                <span>All Ready have an account, 
                    <NavLink to="/Login">Login</NavLink>
                </span>
            </div>
        </div>
    )
}