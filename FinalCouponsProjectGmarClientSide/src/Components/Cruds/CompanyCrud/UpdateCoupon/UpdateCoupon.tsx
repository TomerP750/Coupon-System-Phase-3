import "./UpdateCoupon.css";
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {Coupon} from "../../../../Models/Coupon";
import companyService from "../../../../Services/CompanyService";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import {Category} from "../../../../Models/Category";
import notificationService from "../../../../Services/NotificationService";

export function UpdateCoupon(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<Coupon>();
    const [selectedValue, setSelectedValue] = useState<string>("SPA");
    const navigate = useNavigate();

    const params = useParams();
    const couponId = +params.couponId!;

    useEffect(() => {
        console.log(couponId)
        companyService.getOneCoupon(couponId)
            .then(res=>{
                setValue("amount", res.amount)
                setValue("price", res.price)
                setValue("category", res.category)
                setValue("startDate", res.startDate)
                setValue("endDate", res.endDate)
                setValue("title", res.title)
                setValue("image", res.image)
                setValue("description", res.description)
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }, []);

    function handleSelectorChange(event: ChangeEvent<HTMLSelectElement>): void {
        setSelectedValue(event.target.value)
    }

    function sendCoupon(coupon: Coupon) {
        coupon.id = couponId;
        companyService.updateCoupon(coupon)
            .then(res=>{
                notificationService.successPlainText("Coupon updated!")
                navigate("/company/coupons")
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }

    return (
        <div className="UpdateCoupon">
            <Box
                component="form"
                sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                // noValidate
                autoComplete="off"
                className={"form-container"}
                onSubmit={handleSubmit(sendCoupon)}
            >
                <TextField
                    type={"number"}
                    label="Amount"
                    variant="outlined"
                    required={true}
                    {...register("amount")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    type={"text"}
                    label="Title"
                    variant="outlined"
                    required={true}
                    {...register("title")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    type={"text"}
                    label="Description"
                    variant="outlined"
                    required={true}
                    {...register("description")}
                    fullWidth
                    margin="normal"
                    className="white-input"  // Apply the custom CSS class
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    label="Price"
                    type="number"
                    inputProps={{
                        step: "0.01",
                    }}
                    variant="outlined"
                    {...register("price")}
                    fullWidth
                    margin="normal"
                    required={true}
                    className="white-input"
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    label="From"
                    required={true}
                    type="date"
                    variant="outlined"
                    {...register("startDate")}
                    fullWidth
                    margin="normal"
                    className="white-input"
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    label="To"
                    required={true}
                    type="date"
                    variant="outlined"
                    {...register("endDate")}
                    fullWidth
                    margin="normal"
                    className="white-input"
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
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
                <Button variant={"contained"} color={"success"} type={"submit"}>Update Coupon</Button>
            </Box>

        </div>
    );
}
