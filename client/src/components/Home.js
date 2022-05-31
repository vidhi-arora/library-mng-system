import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/authProvider';
import '../css/homepg.css';
import bookImg2 from "../images/bookheaders/Book lover-bro.png";
import bookImg3 from "../images/bookheaders/lib-illus3.png";

export const Home = () => {

    const [signupActive, setSignupActive] = useState('');

    //LOGIN AND SIGNUP STATES
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const { setRole, setToken } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');

    const login = async (props) => {
        props.preventDefault();

        try {
            // axios.defaults.baseURL = 'https://library-mng-system.herokuapp.com/auth'

            const res = await axios.post('/login', JSON.stringify({ loginEmail, loginPassword }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
                baseURL: 'https://library-mng-system.herokuapp.com/auth'
            });
            // console.log(res.data.user.role);

            //setting token and role initially after login
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('role', res.data.user.role);
            setRole(res.data.user.role);
            setToken(res.data.token);

            setLoginEmail('');
            setLoginPassword('');
            navigate('/dashboard/viewBooks');

            toast.success('Logged in successfully');

        }
        catch (e) {
            toast.error("Invalid email or password");
            console.log(e);
        }
    }

    const signup = async (props) => {
        props.preventDefault();
        try {

            const response = await axios.post('/signup', JSON.stringify({ name, signupEmail, signupPassword }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false,
                    baseURL: 'https://library-mng-system.herokuapp.com/auth'
                });

            console.log("user created");
            setSignupActive('inactive');
            // console.log(response.data);
            toast.success('Registered successfully');
        }
        catch (e) {
            toast.error("Please fill all the details");
            console.log(e.response);
        }
    }

    return (
        <>
            {/* <div style={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
                <p>Home Component</p>
            </div> */}

            {/* <div className="home-container">
                <div className="inner-div-1"></div>
                <div className="inner-div-2"></div>
                <div className="img-container"></div>
            </div> */}

            <div className={"homecontainer " + (signupActive === 'active' ? "right-panel-active" : "")} id="container">
                <div className="form-container sign-up-container">
                    <form className="homeform" onSubmit={signup}>
                        <h1 className='homeh1 extra'>Register</h1>

                        <div className="field">
                            <input type="text" id='name'
                                autoComplete='off' onChange={(e) => setName(e.target.value)} required />
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className="field">
                            <input type="email" id='email'
                                autoComplete='off' onChange={(e) => setSignupEmail(e.target.value)} required />
                            <label htmlFor='email'>Email Address</label>
                        </div>
                        <div className="field">
                            <input type="password" id='password'
                                autoComplete='off' onChange={(e) => setSignupPassword(e.target.value)} required />
                            <label htmlFor='password'>Password</label>
                        </div>
                        <button className='homeBtn formBtn'>Sign Up</button>
                        <div className="signup-link">Already registered? <a href="#" onClick={() => setSignupActive('inactive')}>&nbsp;Login now</a></div>

                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className="homeform" onSubmit={login}>
                        <h1 className='homeh1 extra'>Login</h1>

                        <div className="field">
                            <input type="email" id='loginemail' onChange={(e) => setLoginEmail(e.target.value)} autoComplete='off'
                                required />
                            <label htmlFor='loginemail'>Email Address</label>
                        </div>
                        <div className="field">
                            <input type="password" id='loginpassword' onChange={(e) => setLoginPassword(e.target.value)} autoComplete='off'
                                required />
                            <label htmlFor='loginpassword'>Password</label>
                        </div>

                        <button className='homeBtn formBtn'>Login</button>
                        <div className="signup-link">Not a member? <a href="#" onClick={() => setSignupActive('active')}> &nbsp;Signup now</a></div>

                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            {/* <h1 className='homeh1'>Welcome Back!</h1>
                            <p className='homepara'>To keep connected with us please login with your personal info</p> */}
                            <img src={bookImg2} style={{ width: 520, height: 480, marginTop: -50, marginLeft: 110 }} />
                            <p className='libText'>This automated system operates a <br />library with efficiency and at reduced costs.</p>
                            <button className="homeBtn ghost lgnBtn" id="signIn" onClick={() => setSignupActive('inactive')}>Login</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            {/* <h1 className='homeh1'>Hello, Friend!</h1>
                            <p className='homepara'>Enter your personal details and start journey with us</p> */}
                            <img src={bookImg3} style={{ width: 480, height: 470, marginTop: -50, marginLeft: -110 }} />
                            <h1 className='homeh1 lib' style={{ marginLeft: -95 }}>Library Management <br />System</h1>
                            <button className="homeBtn ghost upBtn" id="signUp" onClick={() => setSignupActive('active')}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}