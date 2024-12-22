import "./AdminDashboard.css";
import {NavLink, useNavigate} from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import BusinessIcon from '@mui/icons-material/Business';


export function AdminDashboard(): JSX.Element {

    return (
        <div className="AdminDashboard">

            <NavLink to="/admin/customers" className="dashboard-item" style={{ textDecoration: 'none' }}>
                <AccountCircle sx={{fontSize: '8rem', color: 'white'}}/>
                <span className="nav-link">Customers</span>
            </NavLink>

            <NavLink to="/admin/companies" className="dashboard-item" style={{ textDecoration: 'none' }}>
                <BusinessIcon sx={{fontSize: '8rem', color: 'white'}}/>
                <span className="nav-link">Companies</span>
            </NavLink>

        </div>
    );

}


