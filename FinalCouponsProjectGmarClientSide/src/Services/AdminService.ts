import {Company} from "../Models/Company";
import {Customer} from "../Models/Customer";
import axios from "axios";
import {Admin} from "../Models/Admin";

export class AdminService {

    async addCompany(company: Company) {
        return (await axios.post("http://localhost:8080/admin/company/add",company)).data
    }

    async deleteCompany(id: number) {
        return (await axios.delete(`http://localhost:8080/admin/company/delete/${id}`)).data // works
    }

    async updateCompany(company: Company) {
        return await axios.put("http://localhost:8080/admin/company/update", company)
    }

    async getOneCompany(id: number) {
        return (await axios.get(`http://localhost:8080/admin/company/${id}`)).data
    }

    async getAllCompanies() {
        return (await axios.get("http://localhost:8080/admin/company/all")).data // works
    }

    async addCustomer(customer: Customer) {
        return (await axios.post("http://localhost:8080/admin/customer/add", customer)).data
    }

    async deleteCustomer(id: number) {
        return await axios.delete(`http://localhost:8080/admin/customer/delete/${id}`)
    }

    async updateCustomer(customer: Customer) {
        return await axios.put(`http://localhost:8080/admin/customer/update`, customer)
    }

    async getOneCustomer(id: number) {
        return (await axios.get(`http://localhost:8080/admin/customer/${id}`)).data
    }

    async getAllCustomers() {
        return (await axios.get("http://localhost:8080/admin/customer/all")).data // works
    }

}

const adminService = new AdminService();
export default adminService;