import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.clear();
        navigate('/signup')

    }
    return (
        <div>
            <img className='logo' src='https://miro.medium.com/v2/resize:fit:1200/0*M4bxiCIjcTK-2Xr6.jpeg' alt='logo'></img>
            {auth ? <ul className='nav-ul'>
                <li><Link to="/">Product </Link></li>
                <li><Link to="/add"> Add Product</Link></li>
                {/* <li><Link to="/update"> Update Product</Link></li> */}

                <li><Link to="/Profile"> Profile</Link></li>
            <div className='logout'><li><Link  onClick={Logout} to="/signup"> Logout ({JSON.parse(auth).name})</Link></li></div>
                {/* <li>{ auth ? <Link onClick={Logout}  to="/signup"> Logout</Link> : <Link to="/signup">Sign Up</Link>}</li>
                <li><Link to="/login"> Login</Link></li> */}



            </ul >
                :
                <ul className='nav-ul Nav-right'>
                    <li>   <Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login"> Login</Link></li>
                </ul>
            }
        </div>
    )
}
export default Nav;