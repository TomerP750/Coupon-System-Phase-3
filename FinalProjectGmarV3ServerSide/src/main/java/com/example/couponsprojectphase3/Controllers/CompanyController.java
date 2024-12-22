package com.example.couponsprojectphase3.Controllers;

import com.example.couponsprojectphase3.Beans.Category;
import com.example.couponsprojectphase3.Beans.Company;
import com.example.couponsprojectphase3.Beans.Coupon;
import com.example.couponsprojectphase3.Exceptions.AlreadyExistException;
import com.example.couponsprojectphase3.Exceptions.InvalidInputException;
import com.example.couponsprojectphase3.Exceptions.NotExistException;
import com.example.couponsprojectphase3.Services.CompanyService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
public class CompanyController {

    private CompanyService companyService;
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/details")
    public Company getCompanyDetails(HttpServletRequest request) throws NotExistException {
        int companyId = (Integer) request.getAttribute("id");
        return companyService.getCompanyDetails(companyId);
    }

    @GetMapping("/coupons")
    public List<Coupon> getCompanyCoupons(HttpServletRequest request) {
        int companyId = (Integer) request.getAttribute("id");
        return companyService.getCompanyCoupons(companyId);
    }

    @GetMapping("/price/{maxPrice}")
    public List<Coupon> getCompanyCouponsByMaxPrice(HttpServletRequest request,@PathVariable double maxPrice) {
        int companyId = (Integer) request.getAttribute("id");
        return companyService.getCompanyCouponsByMaxPrice(companyId ,maxPrice);
    }

    @GetMapping("categories/{category}")
    public List<Coupon> getCompanyCouponsByCategory(HttpServletRequest request,@PathVariable Category category) {
        int companyId = (Integer) request.getAttribute("id");
        return companyService.getCompanyCouponsByCategory(companyId ,category);
    }

    @PutMapping("update")
    public void updateCoupon(@RequestBody Coupon coupon) throws InvalidInputException, NotExistException, AlreadyExistException {
        companyService.updateCoupon(coupon);
    }

    @PostMapping(value = "add", consumes = {"application/json", "application/json;charset=UTF-8"})
    public void addCoupon(HttpServletRequest request, @RequestBody Coupon coupon) throws InvalidInputException, NotExistException, AlreadyExistException {
        int companyId = (Integer) request.getAttribute("id");
        companyService.addCoupon(companyId ,coupon);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteCoupon(HttpServletRequest request, @PathVariable int id) throws InvalidInputException, NotExistException {
        int companyId = (Integer) request.getAttribute("id");
        companyService.deleteCoupon(companyId ,id);
    }

    @GetMapping("/coupon/{couponID}")
    public Coupon getOneCoupon(HttpServletRequest request ,@PathVariable int couponID) throws NotExistException {
        int companyId = (Integer) request.getAttribute("id");
        return companyService.getOneCoupon(couponID ,companyId);
    }



}
