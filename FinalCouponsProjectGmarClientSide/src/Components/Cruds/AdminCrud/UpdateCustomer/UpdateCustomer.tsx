import "./UpdateCustomer.css";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Customer} from "../../../../Models/Customer";
import {useEffect} from "react";
import adminService from "../../../../Services/AdminService";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import notificationService from "../../../../Services/NotificationService";

export function UpdateCustomer(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const customerId = +params.customerId!;
    const {register, handleSubmit, formState, setValue} = useForm<Customer>();

    useEffect(() => {
        adminService.getOneCustomer(customerId)
            .then(cust=>{
                setValue("firstName", cust.firstName)
                setValue("lastName", cust.lastName)
                setValue("email", cust.email)
                setValue("password", cust.password)
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }, []);

    function sendCustomer(customer: Customer) {
        customer.id = customerId;
        adminService.updateCustomer(customer)
            .then(cust=>{
                notificationService.successPlainText("customer updated!")
                navigate("/admin/customers")
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }

    return (
        <div className="UpdateCustomer">

            <Box
                component="form"
                sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                // noValidate
                autoComplete="off"
                className={"form-container"}
                onSubmit={handleSubmit(sendCustomer)}
            >
                <TextField
                    label="First Name"
                    variant="outlined"
                    {...register("firstName")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    {...register("lastName")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    type={"email"}
                    label="Email"
                    variant="outlined"
                    {...register("email")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register("password")}
                    fullWidth
                    margin="normal"
                    className="white-input"
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <Button variant={"contained"} color={"success"} type={"submit"}>Update Customer</Button>
            </Box>
        </div>
    );
}
