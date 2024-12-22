import "./CouponsList.css";
import {Coupon} from "../../../Models/Coupon";
import {ChangeEvent, useEffect, useState} from "react";
import customerService from "../../../Services/CustomerService";
import {useNavigate} from "react-router-dom";
import {Grid2} from "@mui/material";
import {CouponCard} from "../CouponCard/CouponCard";
import {couponStore, fetchAllCoupons} from "../../../Redux/CouponStore";
import {ClientType} from "../../../Services/ClientType";
import {Category} from "../../../Models/Category";


export function CouponsList(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [selectedValue, setSelectedValue] = useState<string>("ALL");
    const navigate = useNavigate();


    useEffect(() => {
        customerService.getAllCoupons()
            .then(coupons => {
                couponStore.dispatch(fetchAllCoupons(coupons));
                setCoupons(coupons);
                setFilteredCoupons(coupons)
            })
            .catch(err=>{
                alert(err.message)
                navigate("/")
            })
    }, [navigate]);


    useEffect(() => {
        if (coupons.length > 0) {
            // Ensure coupon is typed as Coupon in the map method
            const maxCouponPrice = Math.max(...coupons.map((coupon) => coupon.price));
            setMaxPrice(maxCouponPrice);
            setSliderValue(maxCouponPrice);
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

    return (
        <>
            <div className={"slider-and-coupons-container"}>
                <div className="filter-container">
                    <h3>Adjust Value</h3>
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
                    <select id="category" name="category" required value={selectedValue}
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

                <div className="CouponsList">

                    <Grid2 container spacing={3}>
                        {filteredCoupons.length === 0 ? <p>Loading data...</p> : filteredCoupons.map(c =>
                            <Grid2 key={c.id} sx={{xs: 12, sm: 6, md: 4}}>
                            <CouponCard
                            coupon={c}
                            key={c.id}
                            clientType={ClientType.CUSTOMER}
                            isPurchasable={true}
                            setCoupons={setCoupons}
                            setFilteredCoupons={setFilteredCoupons}
                            />
                            </Grid2>
                            )}
                    </Grid2>
                </div>
            </div>
        </>
    );
}
