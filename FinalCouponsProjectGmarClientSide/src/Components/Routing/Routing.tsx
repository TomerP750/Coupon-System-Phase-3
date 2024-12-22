import "./Routing.css";
import {Route, Routes} from "react-router-dom";
import Login from "../AuthArea/Login/Login";
import {PrivacyPolicy} from "../PrivacyPolicy/PrivacyPolicy";
import {TermsOfService} from "../TermsOfService/TermsOfService";
import {About} from "../About/About"
import {NotFound} from "../NotFound/NotFound";
import {CouponsList} from "../CouponsArea/CouponsList/CouponsList";
import {AdminDashboard} from "../Dashboards/AdminDashboard/AdminDashboard";
import {CompanyDashboard} from "../Dashboards/CompanyDashboard/CompanyDashboard";
import {CustomerDashboard} from "../Dashboards/CustomerDashboard/CustomerDashboard";
import {Home} from "../LayoutArea/Home/Home";
import {AddCompany} from "../Cruds/AdminCrud/AddCompany/AddCompany";
import {UpdateCompany} from "../Cruds/AdminCrud/UpdateCompany/UpdateCompany";
import {AddCustomer} from "../Cruds/AdminCrud/AddCustomer/AddCustomer";
import {UpdateCustomer} from "../Cruds/AdminCrud/UpdateCustomer/UpdateCustomer";
import {AddCoupon} from "../Cruds/CompanyCrud/AddCoupon/AddCoupon";
import {UpdateCoupon} from "../Cruds/CompanyCrud/UpdateCoupon/UpdateCoupon";
import {CustomerCoupons} from "../Cruds/CustomerCrud/CustomerCoupons/CustomerCoupons";
import {CustomerAccountDetails} from "../Cruds/CustomerCrud/CustomerAccountDetails/CustomerAccountDetails";
import {AllCompanies} from "../Cruds/AdminCrud/AllCompanies/AllCompanies";
import {AllCustomers} from "../Cruds/AdminCrud/AllCustomers/AllCustomers";
import {CompanyCoupons} from "../Cruds/CompanyCrud/CompanyCoupons/CompanyCoupons";
import {useEffect, useState} from "react";
import {ClientType} from "../../Services/ClientType";
import {authStore} from "../AuthArea/AuthStore";
import {CompanyDetails} from "../Cruds/CompanyCrud/CompanyDetails/CompanyDetails";


export function Routing(): JSX.Element {
    const [clientType, setClientType] = useState<ClientType | undefined>(authStore.getState().user?.clientType)
    console.log("clientType: " + clientType)


    useEffect(() => {
        // Define the subscription callback
        const unsubscribe = authStore.subscribe(() => {
            // Get the latest state from the store
            const newClientType = authStore.getState().user?.clientType;
            if (newClientType) {
                setClientType(newClientType); // Update the state
            }

        });

        // Cleanup the subscription when the component is unmounted
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array means it will run only once on mount


    return (
        <div className="Routing">
			<Routes>
                <Route path={"/"} Component={Home}/>
                <Route path={"/login"} Component={Login}/>

                <Route path={"/privacy"} Component={PrivacyPolicy}/>
                <Route path={"/terms"} Component={TermsOfService}/>
                <Route path={"/about"} Component={About}/>
                {/*admin*/}
                {
                    clientType === ClientType.ADMINISTRATOR &&
                    <>
                        <Route path={"/admin/dashboard"} Component={AdminDashboard}/>
                        <Route path={"/admin/companies"} Component={AllCompanies}/>
                        <Route path={"/admin/customers"} Component={AllCustomers}/>
                        <Route path={"/admin/addCompany"} Component={AddCompany}/>
                        <Route path={"/admin/updateCompany/:companyId"} Component={UpdateCompany}/>
                        <Route path={"/admin/addCustomer"} Component={AddCustomer}/>
                        <Route path={"/admin/updateCustomer/:customerId"} Component={UpdateCustomer}/>
                    </>
                }
                {/*company*/}
                {
                    clientType === ClientType.COMPANY &&
                    <>
                        <Route path={"/company/details"} Component={CompanyDetails}/>
                        <Route path={"/company/dashboard"} Component={CompanyDashboard}/>
                        <Route path={"/company/coupons"} Component={CompanyCoupons}/>
                        <Route path={"/company/addCoupon"} Component={AddCoupon}/>
                        <Route path={"/company/updateCoupon/:couponId"} Component={UpdateCoupon}/>
                    </>

                }
                {/*customer*/}
                {
                    clientType === ClientType.CUSTOMER &&
                    <>
                        <Route path={"/customer/dashboard"} Component={CustomerDashboard}/>
                        <Route path={"/coupons"} Component={CouponsList}/>
                        <Route path={"/customer/orders"} Component={CustomerCoupons}/>
                        <Route path={"/customer/account"} Component={CustomerAccountDetails}/>
                    </>

                }
                <Route path={"*"} Component={NotFound}/>
            </Routes>
        </div>
    );
}
