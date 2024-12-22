import "./CompanyCoupons.css";
import {ChangeEvent, useEffect, useState} from "react";
import {Coupon} from "../../../../Models/Coupon";
import companyService from "../../../../Services/CompanyService";
import {CouponCard} from "../../../CouponsArea/CouponCard/CouponCard";
import {Category} from "../../../../Models/Category";
import {Grid2} from "@mui/material";
import {ClientType} from "../../../../Services/ClientType";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import notificationService from "../../../../Services/NotificationService";

export function CompanyCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [sliderValue, setSliderValue] = useState(0);
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState<string>("ALL");

    useEffect(() => {
        companyService.getCompanyCoupons()
            .then(res=>{
                setCoupons(res)
                setFilteredCoupons(res)
            })
            .catch(err=>notificationService.errorAxiosApiCall(err));
    }, []);

    useEffect(() => {
        if (coupons.length > 0) {
            // Ensure coupon is typed as Coupon in the map method
            const maxCouponPrice = Math.max(...coupons.map((coupon) => coupon.price));
            setMaxPrice(maxCouponPrice);
            setSliderValue(maxCouponPrice)
        }
    }, [coupons]);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        let newFilteredCoupons: Coupon[] =  coupons;

        setSliderValue(Number(event.target.value));

        if (Number(event.target.value) !== maxPrice) {
            newFilteredCoupons = newFilteredCoupons.filter((c)=> {
                return c.price <= Number(event.target.value);
            })
        }

        console.log(selectedValue)
        if (selectedValue !== "ALL") {
            newFilteredCoupons = newFilteredCoupons.filter((coupon)=> {

                return coupon.category === selectedValue;
            })
        }

        setFilteredCoupons(newFilteredCoupons);
    };


    function handleSelectorChange(event: ChangeEvent<HTMLSelectElement>): void {
        setSelectedValue(event.target.value)
        let newFilteredCoupons: Coupon[] =  coupons;

        if (sliderValue !== maxPrice) {
            newFilteredCoupons = newFilteredCoupons.filter((c)=> {
                return c.price <= sliderValue;
            })
        }

        if (event.target.value != "ALL") {
            newFilteredCoupons = newFilteredCoupons.filter((coupon)=> {

                return coupon.category === event.target.value;
            })
        }
        setFilteredCoupons(newFilteredCoupons);

    }


    return (
        <>
            <Box display="flex" justifyContent="center" mb={2} marginTop={"5%"}>
                <Button variant={"contained"} color={"success"} onClick={() => navigate("/company/addCoupon")}>Add
                    Coupon</Button>
            </Box>

            <div className="filter-and-coupons-container">

                {/* Filter container on the left */}
                <div className="filter-container">
                    <h3>Adjust Value</h3>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="slider"
                    />
                    <p>Price: {sliderValue}</p>
                    <select
                        id="category"
                        name="category"
                        required
                        value={selectedValue}
                        onChange={handleSelectorChange}
                        className="dropdown"
                    >
                        <option key={"ALL"} value={"ALL"}>All</option>
                        {
                            Object.values(Category).map((category) => (
                                <option key={category} value={category.toUpperCase()}>{category.toString()}</option>
                            ))
                        }
                    </select>
                </div>

                {/* Grid for the coupon cards */}
                <Grid2 container className="coupons-grid" spacing={3} >
                    {filteredCoupons?.length > 0 ? filteredCoupons.map(c => (
                        <Grid2 key={c.id} sx={{xs: 12, sm: 6, md: 4}}>
                            <CouponCard
                                coupon={c}
                                clientType={ClientType.COMPANY}
                                isPurchasable={false}
                                setCoupons={setCoupons}
                                setFilteredCoupons={setFilteredCoupons}
                            />
                        </Grid2>
                    )) : (
                        <span>Loading...</span>
                    )}
                </Grid2>

            </div>
        </>
    );
}
