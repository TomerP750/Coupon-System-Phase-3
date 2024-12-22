import "./CustomerAccountDetails.css";
import customerService from "../../../../Services/CustomerService";
import {useEffect, useState} from "react";
import {Customer} from "../../../../Models/Customer";

export function CustomerAccountDetails(): JSX.Element {

    const [account, setAccount] = useState<Customer>();

    useEffect(() => {
        customerService.showAccount()
            .then(data=>{
                setAccount(data)
            })
            .catch(err=>err.response.data)
    }, []);

    return (
        // <div className="CustomerAccountDetails">
        //     <h1>First Name: {account?.firstName}</h1>
        //     <h1>Last Name: {account?.lastName}</h1>
        // 	<h1>Email: {account?.email}</h1>
        // </div>
        <div className="CustomerAccountDetails">
            <div className="account-box">
                <h1 className="account-title">Account Details</h1>
                <div className="account-info">
                    <div className="account-item">
                        <strong>First Name:</strong> <span>{account?.firstName}</span>
                    </div>
                    <div className="account-item">
                        <strong>Last Name:</strong> <span>{account?.lastName}</span>
                    </div>
                    <div className="account-item">
                        <strong>Email:</strong> <span>{account?.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
