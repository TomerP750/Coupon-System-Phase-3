package com.example.couponsprojectphase3.Services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.couponsprojectphase3.Beans.Category;
import com.example.couponsprojectphase3.Beans.Company;
import com.example.couponsprojectphase3.Beans.Coupon;
import com.example.couponsprojectphase3.Exceptions.AlreadyExistException;
import com.example.couponsprojectphase3.Exceptions.InvalidInputException;
import com.example.couponsprojectphase3.Exceptions.NotExistException;
import com.example.couponsprojectphase3.Repositories.CompanyRepository;
import com.example.couponsprojectphase3.Repositories.CouponRepository;
import com.example.couponsprojectphase3.Repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class CompanyService extends ClientService {

//    int companyID;
    private CompanyRepository companyRepository;
    private CouponRepository couponRepository;

    public CompanyService(CustomerRepository customerRepository, CouponRepository couponRepository, CompanyRepository companyRepository) {
        super(customerRepository, couponRepository, companyRepository);
        this.companyRepository = companyRepository;
        this.couponRepository = couponRepository;
    }

//    public boolean login(String email, String password) {
//        if (!companyRepository.findByEmailAndPassword(email, password).isEmpty()) {
//            companyID = companyRepository.getCompanyID(email, password);
//            return true;
//        }
//        return false;
//    }

    public boolean login(String email, String password) {
        if (companyRepository.existsByEmailAndPassword(email, password)) {
//            companyID = companyRepository.getCompanyID(email, password);
            return true;
        }
        return false;
    }

    public void addCoupon(int companyID, Coupon coupon) throws AlreadyExistException, NotExistException, InvalidInputException {
        Company companyFromDb = companyRepository.findById(companyID).orElseThrow(() -> new NotExistException("Company not found"));
        coupon.setCompany(companyFromDb);
        if (coupon.getAmount() <= 0) {
            throw new InvalidInputException("Coupon amount must be greater than zero");
        }
        if (coupon.getPrice() < 0) {
            throw new InvalidInputException("Coupon price must be greater or equals to zero");
        }
        if (coupon.getStartDate().before(Date.valueOf(LocalDate.now()))) {
            throw new InvalidInputException("Start date cannot be before today");
        }
        if (coupon.getStartDate().after(coupon.getEndDate())) {
            throw new InvalidInputException("coupon start date after end date");
        }
        if (!couponRepository.findByTitleAndCompanyId(coupon.getTitle(), companyID).isEmpty()) {
            throw new AlreadyExistException("Coupon with the same title already exists for this company");
        }
        if (!coupon.getTitle().isEmpty()) { // if the title is not empty
            couponRepository.save(coupon);
            System.out.println("Coupon added!");
        } else {
            throw new InvalidInputException("cannot input empty title");
        }
    }


    public void updateCoupon(Coupon coupon) throws NotExistException, InvalidInputException, AlreadyExistException {
        Coupon compareCoupon = couponRepository.findById(coupon.getId()).orElseThrow(()->new NotExistException("not exist"));
        coupon.setCompany(compareCoupon.getCompany());
        if (coupon.getAmount() <= 0) {
            throw new InvalidInputException("Coupon amount must be greater than zero");
        }
        if (coupon.getPrice() < 0) {
            throw new InvalidInputException("Coupon price must be greater or equals to zero");
        }
        if (coupon.getId() != compareCoupon.getId()) {
            throw new InvalidInputException("Cannot change coupon id");
        }
        if (coupon.getCompany().getId() != compareCoupon.getCompany().getId()) {
            throw new InvalidInputException("Cannot change company id");
        }
        if ((!compareCoupon.getTitle().equalsIgnoreCase(coupon.getTitle())) && !couponRepository.findByTitleAndCompanyId(coupon.getTitle(), coupon.getCompany().getId()).isEmpty()) {
            throw new AlreadyExistException("Coupon with the same title already exists for this company");
        }
        if (coupon.getStartDate().after(coupon.getEndDate())) {
            throw new InvalidInputException("coupon start date after end date");
        }

        couponRepository.saveAndFlush(coupon);
        System.out.println("Coupon has been updated!");
    }

    public void deleteCoupon(int companyID ,int couponID) throws NotExistException, InvalidInputException {
        Coupon coupon = couponRepository.findById(couponID).orElseThrow(()->new NotExistException("coupon not exists"));
        if (coupon.getCompany().getId() == companyID) {
            couponRepository.deleteCustomersVSCouponsCoupons(couponID);
            couponRepository.deleteById(couponID);
            System.out.println("Coupon deleted!");
        } else {
            throw new InvalidInputException("Cannot delete coupon for other company");
        }
    }

    public List<Coupon> getCompanyCoupons(int companyID) {
        return couponRepository.findByCompanyId(companyID);
    }

    public List<Coupon> getCompanyCouponsByCategory(int companyID, Category category) {
        return couponRepository.findByCompanyIdAndCategory(companyID, category);
    }

    public List<Coupon> getCompanyCouponsByMaxPrice(int companyID ,double maxPrice) {
        return couponRepository.findByCompanyIdAndPriceLessThanEqual(companyID, maxPrice);
    }

    public Company getCompanyDetails(int companyID) throws NotExistException {
        return companyRepository.findById(companyID).orElseThrow(()->new NotExistException("Company not found"));
    }

    public Coupon getOneCoupon(int couponID, int companyID) throws NotExistException {
        return couponRepository.findByIdAndCompanyId(couponID, companyID).orElseThrow(()-> new NotExistException("Coupon not Found!"));
    }


}
