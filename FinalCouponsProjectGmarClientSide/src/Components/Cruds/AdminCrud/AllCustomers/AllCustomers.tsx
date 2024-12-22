import "./AllCustomers.css";
import {useEffect, useState} from "react";
import {Customer} from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import {CustomerCard} from "../../../Cards/CustomerCard/CustomerCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Grid2} from "@mui/material";
import {useNavigate} from "react-router-dom";
import notificationService from "../../../../Services/NotificationService";

export function AllCustomers(): JSX.Element {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        adminService.getAllCustomers()
            .then(cust=> {
                setCustomers(cust)
                setFilteredCustomers(cust)
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }, []);

    return (
        <>
        <Box display="flex" justifyContent="center" mb={2} marginTop={"5%"}>
            <Button variant={"contained"} color={"success"} onClick={()=>navigate("/admin/addCustomer")}>Add Customer</Button>
        </Box>
        <div className="AllCustomers">
            <Grid2 container display={"flex"} flexWrap={"wrap"} justifyContent={"center"} spacing={4}>
            {customers?.length > 0 ? customers.map(cust=><CustomerCard customer={cust} setCustomers={setCustomers} setFilteredCustomers={setFilteredCustomers}/>) : <span>Loading...</span>}
            </Grid2>
        </div>
            </>
    );
}
