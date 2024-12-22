import "./CustomerDashboard.css";
import {NavLink, useNavigate} from 'react-router-dom';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";


export function CustomerDashboard(): JSX.Element {

    return (
        <>
            <div className="CustomerDashboard">
                {/* Wrapping the whole dashboard item in a NavLink to make it clickable */}
                <NavLink to="/customer/account" className="dashboard-item" style={{ textDecoration: 'none' }}>
                    {/* Apply the sx prop directly to the icons to set font size */}
                    <AccountCircle sx={{fontSize: '8rem', color: 'white'}}/>
                    <span className="nav-link">Account</span>
                </NavLink>
                <NavLink to="/customer/orders" className="dashboard-item" style={{ textDecoration: 'none' }}>
                    {/* Apply the sx prop directly to the icons to set font size */}
                    <ShoppingCartIcon sx={{fontSize: '8rem', color: 'white'}}/>
                    <span className="nav-link">Orders</span>
                </NavLink>
            </div>
        </>
    )


}



