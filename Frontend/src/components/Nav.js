import { Link } from 'react-router-dom';
import '../styles/Nav.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../images/logo.PNG"
const Nav = (props) => {
    const LoginHandler = () => {
        props.setLogin(true)
    }

    const SigninHandler = () => {
        props.setLogin(false)
    }

    const NotThere = () => {
        toast.info("Coming Soon");
    }
    return (
        <div className="Navi">
            <div className='together'>
                <img className='logo' src={logo}></img>
                <div className='Symbol'>Vital Visits</div>
            </div>
            <div className='gen'>
                <button className='genBtn'>Home</button>
                <button className='genBtn'>Services</button>
                <button className='genBtn'>FAQ's</button>
                <button className='genBtn' onClick={NotThere}>Blog</button>
            </div>
            <div className='loginSign'>
                <button className='loginSignin button' onClick={LoginHandler}><Link to="/login"><span>Login</span></Link></button>
                <button className='loginSignin button' onClick={SigninHandler}><Link to="/login"><span>SignUp</span></Link></button>

            </div>
        </div>

    )
}


export default Nav;