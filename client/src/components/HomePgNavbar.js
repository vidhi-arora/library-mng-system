import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';
import '../css/homeNavbar.css';
import homeImg from '../images/bookheaders/homepg-4.jpg';

export function HomePgNavbar() {

    const [isLoginActive, setLoginActive] = useState(false);
    const [isSignupActive, setSignupActive] = useState(false);
    const navigate = useNavigate();

    const loginToggle = () => {

        setSignupActive(false);
        (isLoginActive) ? navigate('/') : navigate('/login');
        setLoginActive(!isLoginActive);
    }

    const signupToggle = () => {

        setLoginActive(false);
        (isSignupActive) ? navigate('/') : navigate('/signup');
        setSignupActive(!isSignupActive);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light special-nav">
                <div className="container-fluid">
                    <a className="navbar-brand lib1" href="#" style={{ fontSize: 18 }}>
                        <MenuBookIcon sx={{ color: '#121314f3', verticalAlign: 'middle', fontSize: 40 }} />
                        &nbsp; Library Management System
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* <Link classNameName="btn btn-primary me-2" to="/login">Login</Link> */}
                                <button className='btn btn-dark me-2 lib2' onClick={loginToggle} >Login</button>
                            </li>

                            <li className="nav-item">
                                {/* <Link classNameName="btn btn-primary" to="/signup">SignUp</Link> */}
                                <button className='btn btn-dark lib3' onClick={signupToggle}>SignUp</button>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>

            <div className="home-container">
                <div className="inner-div-1"></div>
                <div className="inner-div-2"></div>
                <div className="img-container" style={{ backgroundImage: `url(${homeImg})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <div className='quote-text'>
                        <p>Books are a uniquely portable magic.</p>
                    </div>
                    <div className='quote-text2'>
                        <p>Read.Listen.Learn.Repeat</p>
                    </div>
                </div>
            </div>
        </>
    );

}