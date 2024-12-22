package com.example.couponsprojectphase3.Services;

import com.example.couponsprojectphase3.Beans.Category;
import com.example.couponsprojectphase3.Beans.Coupon;
import com.example.couponsprojectphase3.Beans.Customer;
import com.example.couponsprojectphase3.Exceptions.AlreadyExistException;
import com.example.couponsprojectphase3.Exceptions.NotExistException;
import com.example.couponsprojectphase3.Exceptions.OutOfDateException;
import com.example.couponsprojectphase3.Exceptions.OutOfStockException;
import com.example.couponsprojectphase3.Repositories.CompanyRepository;
import com.example.couponsprojectphase3.Repositories.CouponRepository;
import com.example.couponsprojectphase3.Repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class CustomerService extends ClientService{

    int customerID;
    private CustomerRepository customerRepository;
    private CouponRepository couponRepository;

    public CustomerService(CustomerRepository customerRepository, CouponRepository couponRepository, CompanyRepository companyRepository) {
        super(customerRepository, couponRepository, companyRepository);
        this.customerRepository = customerRepository;
        this.couponRepository = couponRepository;
    }

//    public boolean login(String email, String password) {
//        if (!customerRepository.findByEmailAndPassword(email, password).isEmpty()) {
//            customerID = customerRepository.getCustomerID(email, password);
//            return true;
//        }
//        return false;
//    }

    public boolean login(String email, String password) {
        if (customerRepository.existsByEmailAndPassword(email, password)) {
            customerID = customerRepository.getCustomerID(email, password);
            return true;
        }
        return false;
    }


    public void purchaseCoupon(int customerID ,int couponId) throws AlreadyExistException, NotExistException, OutOfStockException, OutOfDateException {
            Coupon couponFromDb = couponRepository.findById(couponId).orElseThrow(() -> new NotExistException("Coupon Not Found"));
            if(couponFromDb.getAmount() <= 0) {
                throw new OutOfStockException("Coupon out of Stock");
            }
            if (couponFromDb.getEndDate().before(Date.valueOf(LocalDate.now()))) {
                throw new OutOfDateException("Coupon out of Date");
            }


        if (couponRepository.existsByCustomerIdAndCouponId(customerID, couponId) == 1) {
                throw new AlreadyExistException("You already bought the coupon");
            }


        couponRepository.addCouponPurchase(customerID, couponId);
            couponFromDb.setAmount(couponFromDb.getAmount() - 1);


        couponRepository.save(couponFromDb);
    }

    

    /**
     * Shows all the customer available coupons to show to the customer
     * @return arrayList of all the coupons
     */
    public List<Coupon> showCouponsToCustomer() {
        return couponRepository.findAll();
    }

    public List<Coupon> getCustomerCoupons(int customerID) {
        return couponRepository.getAllCustomerCoupons(customerID);
    }

    public List<Coupon> getCustomerCouponsByCategory(Category category) {
        return couponRepository.findByCustomerAndCategory(customerID, category);
    }

    public List<Coupon> getCustomerCouponsByMaxPrice(double maxPrice) {
        return couponRepository.getCustomersCouponsByMaxPrice(customerID, maxPrice);
    }

    public Customer getCustomerDetails() throws NotExistException {
        return customerRepository.findById(customerID).orElseThrow(()->new NotExistException("Customer not found"));
    }




}
