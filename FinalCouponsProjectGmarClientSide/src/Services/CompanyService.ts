import {Category} from "../Models/Category";
import {Coupon} from "../Models/Coupon";
import {CustomerService} from "./CustomerService";
import axios from "axios";

export class CompanyService {


    async getCompanyDetails() {
        return (await axios.get("http://localhost:8080/companies/details")).data
    }

    async getCompanyCoupons() {
        console.log("axios test" + ": " + axios)
        return (await axios.get("http://localhost:8080/companies/coupons")).data
    }

    async getCompanyCouponsByMaxPrice(maxPrice: number) {
        return (await axios.get(`http://localhost:8080/companies/price/${maxPrice}`)).data
    }

    async getCompanyCouponsByCategory(category: Category) {
        return (await axios.get(`http://localhost:8080/companies/categories/${category}`)).data
    }

    async addCoupon(coupon: Coupon) {
        return (await axios.post("http://localhost:8080/companies/add", coupon)).data
    }

    async deleteCoupon(id: number) {
        return (await axios.delete(`http://localhost:8080/companies/delete/${id}`)).data
    }

    async updateCoupon(coupon: Coupon) {
        return (await axios.put("http://localhost:8080/companies/update", coupon)).data
    }

    async getOneCoupon(id: number) {
        return (await axios.get(`http://localhost:8080/companies/coupon/${id}`)).data
    }

}
const companyService = new CompanyService();
export default companyService;
