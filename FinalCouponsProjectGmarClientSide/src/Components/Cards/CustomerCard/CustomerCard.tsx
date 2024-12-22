import "./CustomerCard.css";
import {Customer} from "../../../Models/Customer";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import adminService from "../../../Services/AdminService";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import notificationService from "../../../Services/NotificationService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";



interface CustomerProps {
    customer: Customer
    setCustomers : React.Dispatch<React.SetStateAction<any>>;
    setFilteredCustomers : React.Dispatch<React.SetStateAction<any>>;
}


export function CustomerCard(props: CustomerProps): JSX.Element {

    const navigate = useNavigate();

    function deleteCustomer() {
        adminService.deleteCustomer(props.customer.id)
            .then(res=>{
                notificationService.successPlainText("Customer deleted successfully")
                props.setCustomers((prevState: Customer[]) => {
                    return prevState.filter(comp => comp.id !== props.customer.id);
                });
                props.setFilteredCustomers((prevState: Customer[])=> {
                    return prevState.filter(alb=>alb.id !== props.customer.id);
                })

            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    };

    return (

        <Card className={"CustomerCard"} sx={{ maxWidth: 300 }}>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    height="140"*/}
                {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
                {/*    alt="green iguana"*/}
                {/*/>*/}
                <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                        First Name: {props.customer.firstName}
                    </Typography>
                    <Typography variant="body2" sx={{ mb:"1" }}>
                        Last Name: {props.customer.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: "1" }} >
                        Email: {props.customer.email}
                    </Typography>
                </CardContent>

                <Button className={"card-button deleteButton"} onClick={deleteCustomer}><DeleteForeverIcon color={"inherit"}></DeleteForeverIcon>DELETE</Button>
                <Button className={"card-button editButton"} onClick={()=>navigate(`/admin/updateCustomer/${props.customer.id}`)}><EditIcon color={"inherit"}></EditIcon>EDIT</Button>

        </Card>
    );
}
