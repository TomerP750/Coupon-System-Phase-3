import "./CustomerCoupons.css";
import {ChangeEvent, useEffect, useState} from "react";
import {Coupon} from "../../../../Models/Coupon";
import customerService from "../../../../Services/CustomerService";
import {CouponCard} from "../../../CouponsArea/CouponCard/CouponCard";
import {Grid2} from "@mui/material";
import {Category} from "../../../../Models/Category";
import {ClientType} from "../../../../Services/ClientType";
import notificationService from "../../../../Services/NotificationService";


export function CustomerCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [sliderValue, setSliderValue] = useState(0);


    const [selectedValue, setSelectedValue] = useState<string>("ALL");


    useEffect(() => {
        customerService.getCustomerCoupons()
            .then(data=>{
                setCoupons(data)
                setFilteredCoupons(data)
            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    }, []);

    useEffect(() => {
        if (coupons.length > 0) {
            // Ensure coupon is typed as Coupon in the map method
            const maxCouponPrice = Math.max(...coupons.map((coupon) => coupon.price));
            setMaxPrice(maxCouponPrice);
            setSliderValue(maxCouponPrice)
        }
    }, [coupons]);

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


    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newFilteredCoupons: Coupon[] =  coupons;

        setSliderValue(Number(event.target.value))

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

    return (
        <>
            <div className={"slider-and-coupons-container"}>
                <div className="filter-container">
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        style={{width: '200px'}}
                        className={"slider"}
                    />
                    <p>Price: {sliderValue}</p>


                <select  id="category" name="category" required value={selectedValue}
                        onChange={handleSelectorChange} className={"dropdown"}>
                    <option key={"ALL"} value={"ALL"}>All</option>
                    {
                        Object.values(Category).map((category) => {
                                    return <option key={category}
                                                   value={category.toUpperCase()}>{category.toString()}</option>
                                }
                            )
                    }
                </select>
                </div>
                <Grid2 container className="coupons-grid" spacing={3} >
                <Grid2 container spacing={3}>
                    {filteredCoupons?.length > 0 ? filteredCoupons.map(c => <CouponCard coupon={c} key={c.id}
                                                                                        clientType={ClientType.CUSTOMER}
                                                                                        isPurchasable={false}/>) :
                        <span>Loading...</span>}
                </Grid2>
                </Grid2>

            </div>
        </>
    )
        ;
}
