import "./UpdateCompany.css";
import {useForm} from "react-hook-form";
import {Company} from "../../../../Models/Company";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import adminService from "../../../../Services/AdminService";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import notificationService from "../../../../Services/NotificationService";

export function UpdateCompany(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<Company>();
    const navigate = useNavigate();
    const params = useParams();
    const companyId = +params.companyId!;

    useEffect(() => {
        adminService.getOneCompany(companyId)
            .then(comp=>{
                setValue("name", comp.name);
                setValue("email", comp.email);
                setValue("password", comp.password)
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }, []);

    function sendCompany(company: Company) {
        company.id = companyId;
        console.log(company)

        adminService.updateCompany(company)
            .then(comp=>{
                notificationService.successPlainText("Company Updated")
                navigate("/admin/companies")
            })
            .catch(err=>{
                notificationService.errorAxiosApiCall(err)
            })
    }


    return (
        <div className="UpdateCompany">
            <Box
                component="form"
                sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                // noValidate
                autoComplete="off"
                className={"form-container"}
                onSubmit={handleSubmit(sendCompany)}
            >

                <TextField
                    label="Name"
                    variant="outlined"
                    {...register("name")}
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
                <Button variant={"contained"} color={"success"} type={"submit"}>Update Company</Button>
            </Box>
        </div>
    );
}
