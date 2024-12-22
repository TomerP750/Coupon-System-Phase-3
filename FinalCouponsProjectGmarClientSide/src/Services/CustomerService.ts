import axios from "axios";
import {Category} from "../Models/Category";
import {Coupon} from "../Models/Coupon";
export class CustomerService {

    async getCustomerCoupons() {
        return (await axios.get("http://localhost:8080/customers/customer_coupons")).data
    }

    async getAllCoupons() {
        return (await axios.get("http://localhost:8080/customers/coupons")).data
    }

    async getCouponsByMaxPrice(maxPrice:number) {
        return (await axios.get(`http://localhost:8080/customers/price/${maxPrice}`)).data
    }

    async getCouponsByCategory(category:Category) {
        return (await axios.get(`http://localhost:8080/customers/${category}`)).data
    }

    async showAccount() {
        return (await axios.get("http://localhost:8080/customers/account")).data
    }

    async purchaseCoupon(couponId:number) {
        return await axios.post("http://localhost:8080/customers/purchase/" + couponId);
    }

}

const customerService = new CustomerService();
export default customerService;