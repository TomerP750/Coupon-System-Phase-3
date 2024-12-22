import "./AddCoupon.css";
import {useForm} from "react-hook-form";
import {Coupon} from "../../../../Models/Coupon";
import companyService from "../../../../Services/CompanyService";
import {ChangeEvent, useState} from "react";
import {Category} from "../../../../Models/Category";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

// import defaultImage from "../../../../Assets/Images/placeholder.svg"; // Import the default image

import notificationService from "../../../../Services/NotificationService";

export function AddCoupon(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<Coupon>();
    const [selectedValue, setSelectedValue] = useState<string>("SPA");
    const navigate = useNavigate();

    function handleSelectorChange(event: ChangeEvent<HTMLSelectElement>): void {
        setSelectedValue(event.target.value)
    }

    function sendCoupon(coupon: Coupon) {
        companyService.addCoupon(coupon)
            .then(coup=>{
                notificationService.successPlainText("coupon added!")
                navigate("/company/coupons")
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))

    }

    return (
        <div className="AddCoupon">
            {/*<form onSubmit={handleSubmit(sendCoupon)}>*/}
                {/*<input type={"number"} placeholder={"Amount"} {...register("amount")}/>*/}

            <Box
                component="form"
                sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                // noValidate
                autoComplete="off"
                className={"form-container"}
                onSubmit={handleSubmit(sendCoupon)}
            >
                <TextField
                    required={true}
                    type={"number"}
                    label="Amount"
                    variant="outlined"
                    {...register("amount")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                />
                <TextField
                    required={true}
                    type={"text"}
                    label="Title"
                    variant="outlined"
                    {...register("title")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                />
                <TextField
                    required={true}
                    type={"text"}
                    label="Description"
                    variant="outlined"
                    {...register("description")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                />
                <TextField
                    required={true}
                    label="Price"
                    type="number"
                    variant="outlined"
                    {...register("price")}
                    fullWidth
                    margin="normal"
                    className="white-input"
                />
                <TextField
                    required={true}
                    label="From"
                    type="date"
                    variant="outlined"
                    {...register("startDate")}
                    fullWidth
                    margin="normal"
                    className="white-input"
                />
                <TextField
                    required={true}
                    label="To"
                    type="date"
                    variant="outlined"
                    {...register("endDate")}
                    fullWidth
                    margin="normal"
                    className="white-input"
                />
                <select id="category" required value={selectedValue} {...register("category")}
                        onChange={handleSelectorChange} className={"dropdown"}>
                    {
                        Object.values(Category).map((category) => {
                                return <option key={category}
                                               value={category.toUpperCase()}>{category.toString()}</option>
                            }
                        )
                    }
                </select>
                <br/>
                <br/><br/>


                <Button variant={"contained"} color={"success"} type={"submit"}>Add Coupon</Button>
            </Box>

        </div>
    );
}
