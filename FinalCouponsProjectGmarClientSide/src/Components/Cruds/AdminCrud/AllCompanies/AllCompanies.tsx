import "./AllCompanies.css";
import {useEffect, useState} from "react";
import {Company} from "../../../../Models/Company";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import adminService from "../../../../Services/AdminService";
import {Grid2} from "@mui/material";
import {CompanyCard} from "../../../Cards/CompanyCard/CompanyCard";
import Box from "@mui/material/Box";
import notificationService from "../../../../Services/NotificationService";

export function AllCompanies(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        adminService.getAllCompanies()
            .then(result => {
                setCompanies(result)
                setFilteredCompanies(result)
            })
            .catch(err => notificationService.errorAxiosApiCall(err));
    }, []);

    return (
        <>
            <Box display="flex" justifyContent="center" mb={2} marginTop={"5%"}>
            <Button variant={"contained"} color={"success"} onClick={()=>navigate("/admin/addCompany")}>Add Company</Button>
            </Box>
        <div className="AllCompanies">
            <Grid2 container display={"flex"} flexWrap={"wrap"} justifyContent={"center"} spacing={4}>
            {companies?.length > 0 ? companies?.map(comp=><CompanyCard company={comp} key={comp.id} setCompanies={setCompanies} setFilteredCompanies={setFilteredCompanies}/>) : <span>Loading...</span>}
            </Grid2>
        </div>
            </>
    );
}