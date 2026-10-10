import { NavLink } from 'react-router-dom';

export default function Log_in(){
    return(
        <div>
            <label htmlFor=""> Username:</label> <br />
            <input type="text" />
            <br />

            <label htmlFor="">Phone Number:</label> <br />
            <input type="text" />
            <br />

            <label htmlFor="">Password:</label> <br />
            <input type="text" />
            <br />

            <button>Get OTP</button>
            <div>
                <span>Don't have an account, 
                    <NavLink to="/Signup">Signup</NavLink>
                </span>
            </div>
        </div>
    )
}