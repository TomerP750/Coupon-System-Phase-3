import "./AddCompany.css";
import {Company} from "../../../../Models/Company";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import adminService, {AdminService} from "../../../../Services/AdminService";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import notificationService from "../../../../Services/NotificationService";
import {useNavigate} from "react-router-dom";

export function AddCompany(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<Company>()
    const navigate = useNavigate();


    function sendCompany(newCompany: Company) {
        adminService.addCompany(newCompany)
            .then(company=>{
                notificationService.successPlainText("Company added!")
                navigate("/admin/companies")
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }

    return (
        <div className="AddCompany">

            <Box
                component="form"
                sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
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
                    className="white-input"
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
                    className="white-input"
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
                <Button variant={"contained"} color={"success"} type={"submit"}>Add Company</Button>
            </Box>
        </div>
    );
}
