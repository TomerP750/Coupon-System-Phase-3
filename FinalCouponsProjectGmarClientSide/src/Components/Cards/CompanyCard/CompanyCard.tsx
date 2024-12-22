import "./CompanyCard.css";
import {Company} from "../../../Models/Company";
import adminService from "../../../Services/AdminService";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import notificationService from "../../../Services/NotificationService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea, CardActions, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";



interface CompanyProps {
    company: Company
    setCompanies : React.Dispatch<React.SetStateAction<any>>;
    setFilteredCompanies : React.Dispatch<React.SetStateAction<any>>;
}

export function CompanyCard(props: CompanyProps): JSX.Element {
    const navigate = useNavigate();

    function deleteCompany() {
        adminService.deleteCompany(props.company.id)
            .then(res=>{
                notificationService.successPlainText("Company deleted successfully")
                props.setCompanies((prevState: Company[]) => {
                    return prevState.filter(comp => comp.id !== props.company.id);
                });
                props.setFilteredCompanies((prevState: Company[])=> {
                    return prevState.filter(comp=>comp.id !== props.company.id);
                })

            })
            .catch(err=>notificationService.errorAxiosApiCall(err))
    };



    return (
        // <div className="CompanyCard">
		// 	<h2>Company Name: {props.company.name}</h2>
        //     <h2>Email: {props.company.email}</h2>
        //     <Button onClick={deleteCompany}><DeleteForeverIcon color={"success"}></DeleteForeverIcon></Button>
        //     <Button onClick={()=>navigate(`/admin/updateCompany/${props.company.id}`)}><EditIcon color={"success"}></EditIcon></Button>
        // </div>
        <Card className={"CompanyCard"} sx={{ maxWidth: 300}}>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    height="140"*/}
                {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
                {/*    alt="green iguana"*/}
                {/*/>*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                       Name: {props.company.name}
                    </Typography>
                    <Typography variant="body2" >
                        Email: {props.company.email}
                    </Typography>
                </CardContent>

                <Button className={"card-button deleteButton"} onClick={deleteCompany}><DeleteForeverIcon color={"inherit"}></DeleteForeverIcon>Delete</Button>
                <Button className={"card-button editButton"} onClick={()=>navigate(`/admin/updateCompany/${props.company.id}`)}><EditIcon color={"inherit"}></EditIcon>Edit</Button>

        </Card>
    );
}
