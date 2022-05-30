import { Outlet } from "react-router-dom";
import { Home } from "../components/Home";

export const HomePage = () => {

    return (
        <div>
            <Home />
            {/* <Home /> */}
            <Outlet />
        </div>

    );
};