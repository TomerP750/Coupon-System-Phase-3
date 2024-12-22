import "./CompanyDashboard.css";
import {NavLink, useNavigate} from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';


export function CompanyDashboard(): JSX.Element {

    return (
        <div className="CompanyDashboard">

            <NavLink to="/company/details" className="dashboard-item" style={{ textDecoration: 'none' }}>
                <AccountCircle sx={{fontSize: '8rem', color: 'white'}}/>
                <span className="nav-link">Account</span>
            </NavLink>

            <NavLink to="/company/coupons" className="dashboard-item" style={{ textDecoration: 'none' }}>
                <ConfirmationNumberIcon sx={{fontSize: '8rem', color: 'white'}}/>
                <span className="nav-link">Coupons</span>
            </NavLink>

        </div>
    );

}
