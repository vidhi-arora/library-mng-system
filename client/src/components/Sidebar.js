import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';
import "../css/sidebar.css";

export const Sidebar = () => {

    const { role, setToken, setRole } = useContext(AuthContext);
    const navigate = useNavigate();
    // const logoutClass = "logout";
    // const { addToast } = useToasts();

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        setToken('');
        setRole('');
        toast.success('Logged out successfully');
        // addToast('Logged out successfully', { appearance: 'success' });
    }

    return (
        <>
            {/* <script src="https://kit.fontawesome.com/b99e675b6e.js"></script> */}

            {/* <div className="wrapper"> */}
            <div className="sidebar">
                <h3>Dashboard</h3>
                <hr style={{ backgroundColor: 'whitesmoke', height: '2px', marginBottom: 42 }} />

                {role === 'user' ?
                    <ul>
                        {/* <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/home"> Home</NavLink></li> */}
                        {/* <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/profile"> Profile</NavLink></li> */}
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/viewBooks"> Books Catalogue</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/issuedBooks"> Issued Books</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/requestBook"> Request Book</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/requestStatus"> Request Status</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/read"> History</NavLink></li>
                        {/* <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/recommendations"> Recommendations</NavLink></li> */}
                        {/* <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/pendingDues"> Pending Dues</NavLink></li> */}
                        {/* <li><div className='user'><img src={userImg} /></div><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="#"> Logout</NavLink></li> */}
                    </ul>
                    : role === 'admin' ?
                        <>
                            <ul>
                                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="viewBooks"> Books Catalogue</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="addBook"> Add Book</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="requestedBooks"> Requested Books</NavLink></li>
                            </ul>
                        </>
                        : <>
                            {/* to navigate to login if a user tries to access the previous/next page after logout */}
                            {navigate('/libmngsystem')}
                        </>
                }

                <div className='logoutDiv'>
                    {/* <div className='user'></div> */}
                    <LogoutIcon sx={{ color: 'white', fontSize: 29 }} />
                    <NavLink className="logout" to="/" onClick={logout}> Logout</NavLink>
                </div>

            </div>
            {/* </div> */}

        </>
    );
};
