import axios from "axios";
import {ClientType} from "../../Services/ClientType";
import {SelectChangeEvent} from "@mui/material";

class AuthService {
    async login(email:string, password:string, clientType: string) {
        return (await(axios.post(`http://localhost:8080/auth/login?email=${email}&password=${password}&clientType=${clientType}`))).data;
    }

    async logOut() {
        return (await axios.get(`http://localhost:8080/auth/logout?token=${localStorage.my_token}`))
    }
}

const authService = new AuthService();
export default authService;