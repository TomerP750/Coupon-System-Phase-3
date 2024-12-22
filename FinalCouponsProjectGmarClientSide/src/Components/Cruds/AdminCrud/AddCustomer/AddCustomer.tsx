import "./AddCustomer.css";
import {useForm} from "react-hook-form";
import {Customer} from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import notificationService from "../../../../Services/NotificationService";
import {useNavigate} from "react-router-dom";

export function AddCustomer(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<Customer>();
    const navigate = useNavigate();
    function sendCustomer(customer: Customer) {
        adminService.addCustomer(customer)
            .then(cust=>{
                notificationService.successPlainText("Customer added!")
                navigate("/admin/customers")
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }

    return (
        <div className="AddCustomer">
            <Box
                component="form"
                sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                // noValidate
                autoComplete="off"
                className={"form-container"}
                onSubmit={handleSubmit(sendCustomer)}
            >
                <TextField
                    required={true}
                    label="First Name"
                    variant="outlined"
                    {...register("firstName")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                />
                <TextField
                    required={true}
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
                    required={true}
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
                    required={true}
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
                <Button variant={"contained"} color={"success"} type={"submit"}>Add Customer</Button>
            </Box>
        </div>
    );
}
