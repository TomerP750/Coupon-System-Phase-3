import "./CompanyDetails.css";
import {useEffect, useState} from "react";
import {Company} from "../../../../Models/Company";
import companyService from "../../../../Services/CompanyService";
import notificationService from "../../../../Services/NotificationService";

export function CompanyDetails(): JSX.Element {

    const [account, setAccount] = useState<Company>();

    useEffect(() => {
        companyService.getCompanyDetails()
            .then(res=>setAccount(res))
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }, []);

    return (
        <div className="CompanyDetails">
            <div className="account-box">
                <h1 className="account-title">Account Details</h1>
                <div className="account-info">
                    <div className="account-item">
                        <strong>Name</strong> <span>{account?.name}</span>
                    </div>
                    <div className="account-item">
                        <strong>Email:</strong> <span>{account?.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
