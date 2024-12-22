import "./CouponCard.css";
import {Coupon} from "../../../Models/Coupon";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import customerService from "../../../Services/CustomerService";
import companyService from "../../../Services/CompanyService";
import {ClientType} from "../../../Services/ClientType";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import notificationService from "../../../Services/NotificationService";
import spaImage from "../../../Assets/Images/SPA.png";
import sportImage from "../../../Assets/Images/SPORT.png";
import vacationImage from "../../../Assets/Images/Vacation.png";
import techImage from "../../../Assets/Images/tech.png";
import fashionImage from "../../../Assets/Images/FASHION.png";
import foodImage from "../../../Assets/Images/food.png";
import {CardActions, CardContent, CardMedia} from "@mui/material";
import {Category} from "../../../Models/Category";


interface CouponProps {
    coupon: Coupon
    clientType : ClientType
    isPurchasable : boolean
    setCoupons? : React.Dispatch<React.SetStateAction<any>>;
    setFilteredCoupons? : React.Dispatch<React.SetStateAction<any>>;
}


export function CouponCard(props: CouponProps): JSX.Element {

    const navigate = useNavigate();

    function handlePurchase(coupon: Coupon) {
        customerService.purchaseCoupon(coupon.id)
            .then(suc=>{
                notificationService.successPlainText("Purchase Coupon! Thank you for buying")
                if (props?.setCoupons) {
                    props?.setCoupons((prevState: Coupon[]) => {
                        // Update the coupon with the given ID
                        return prevState.map(coup => {
                            if (coup.id === props.coupon.id) {
                                // Update the coupon amount if the ID matches
                                return {...coup, amount: (coup.amount - 1)};
                            }
                            return coup;
                        });
                    });
                }
                if (props?.setFilteredCoupons) {
                    props?.setFilteredCoupons((prevState: Coupon[]) => {
                        // Update the coupon with the given ID
                        return prevState.map(coup => {

                            if (coup.id === props.coupon.id) {

                                // Update the coupon amount if the ID matches
                                return {...coup, amount: (coup.amount - 1)};
                            }
                            return coup;
                        });
                    });
                }
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err)
            })



    }

    function handleDelete(id: number) {
        companyService.deleteCoupon(id)
            .then(res=>notificationService.successPlainText("coupon has been deleted"))
            .catch(err=>notificationService.errorAxiosApiCall(err));
            if (props?.setCoupons) {
                props?.setCoupons((prevState: Coupon[]) => {
                    return prevState.filter(coup => coup.id !== props.coupon.id);
                });
            }
            if (props.setFilteredCoupons) {
                props?.setFilteredCoupons((prevState: Coupon[])=> {
                    return prevState.filter(coup=>coup.id !== props.coupon.id);
                })
            }
    }


    function handleImage(): string {
        let imageToReturn: string = "";

        if (props.coupon.category === Category.SPA) {
            imageToReturn = spaImage
        }
        if (props.coupon.category === Category.SPORT) {
            imageToReturn = sportImage
        }
        if (props.coupon.category === Category.VACATION) {
            imageToReturn = vacationImage
        }
        if (props.coupon.category === Category.TECH) {
            imageToReturn = techImage
        }
        if (props.coupon.category === Category.FOOD) {
            imageToReturn = foodImage
        }
        if (props.coupon.category === Category.FASHION) {
            imageToReturn = fashionImage
        }

        return imageToReturn;
    }
    const imageToDisplay: string = handleImage();

    return (
        <Card className={"CouponCard"} variant={"elevation"} sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{mb: 2, height: 180}}
                image={imageToDisplay}
                title="spa"
                component='img'
            />

            <CardContent>
            <Typography variant="h5" className="companyName" sx={{mb: 1 }}>
                Company: {props.coupon.company.name}
            </Typography>


            <Typography variant="h6" className="price" sx={{mb: 1 }}>
                Price: ${props.coupon.price}
            </Typography>

            <Typography variant="h5" className="category" sx={{mb: 1 }}>
                Category: {props.coupon.category}
            </Typography>


            <Typography variant="h6" className="couponTitle" sx={{mb: 1 }}>
                Title: {props.coupon.title}
            </Typography>

            <Typography variant="body1" className="description" sx={{mb: 1 }}>
                Description: {props.coupon.description}
            </Typography>

            <Typography variant="h5" className="amount" sx={{mb: 1 }}>
                Amount: {props.coupon.amount}
            </Typography>
            </CardContent>
            {
                props.clientType === ClientType.COMPANY
                    ?
                    <>
                        <button className={"card-button deleteButton"} onClick={() => handleDelete(props.coupon.id)}><DeleteForeverIcon
                            color={"inherit"}></DeleteForeverIcon>Delete</button>
                        <button className={"card-button editButton"} onClick={()=>navigate(`/company/updateCoupon/${props.coupon.id}`)}><EditIcon
                            color={"inherit"}></EditIcon>Edit</button>
                    </>
                    :
                    props.isPurchasable
                        ?
                        <button className={"card-button"} onClick={() => handlePurchase(props.coupon)}><ShoppingCartIcon
                            color={"inherit"}></ShoppingCartIcon>Purchase</button>
                        : <></>

            }
       </Card>
    );

}


