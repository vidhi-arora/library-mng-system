import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {

    // const { token, role, setToken, setRole } = useContext(AuthContext);

    // useEffect(() => {

    //     setTimeout(() => {
    //     const t = sessionStorage.getItem('token');
    //     const r = sessionStorage.getItem('role');
    //     console.log(`---> ${t} ${r}`);

    //     setToken(sessionStorage.getItem('token'));
    //     setRole(sessionStorage.getItem('role'));
    //     // console.log("run");
    //     // });
    //     console.log(token + " " + role);
    // });

    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}