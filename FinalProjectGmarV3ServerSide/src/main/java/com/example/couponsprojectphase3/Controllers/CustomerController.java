package com.example.couponsprojectphase3.Controllers;
import com.example.couponsprojectphase3.Beans.Category;
import com.example.couponsprojectphase3.Beans.Coupon;
import com.example.couponsprojectphase3.Beans.Customer;
import com.example.couponsprojectphase3.Exceptions.AlreadyExistException;
import com.example.couponsprojectphase3.Exceptions.NotExistException;
import com.example.couponsprojectphase3.Exceptions.OutOfDateException;
import com.example.couponsprojectphase3.Exceptions.OutOfStockException;
import com.example.couponsprojectphase3.Services.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("customer_coupons")
    public List<Coupon>getCustomerCoupons(HttpServletRequest request){
        int customerId = (Integer) request.getAttribute("id");
        return customerService.getCustomerCoupons(customerId);
    }

    @GetMapping("coupons")
    public List<Coupon>showCoupons(){
        return customerService.showCouponsToCustomer();
    }

    @GetMapping("price/{maxPrice}")
    public List<Coupon>getCustomerCouponsPrice(@PathVariable double maxPrice){
        return customerService.getCustomerCouponsByMaxPrice(maxPrice);
    }

    @GetMapping("category")
    public List<Coupon>getCustomerCouponsCategory(Category category){
        return customerService.getCustomerCouponsByCategory(category);
    }

    @PostMapping("/purchase/{couponId}")
    public void purchaseCoupon(HttpServletRequest request, @PathVariable int couponId) throws NotExistException, AlreadyExistException, OutOfDateException, OutOfStockException {
        int customerId = (Integer) request.getAttribute("id");
        System.out.println("customerId: " + customerId);
        System.out.println("couponId: " + couponId);
        customerService.purchaseCoupon(customerId ,couponId);
    }

    @GetMapping("account")
    public Customer getAccountDetails() throws NotExistException {
        return customerService.getCustomerDetails();
    }



}
