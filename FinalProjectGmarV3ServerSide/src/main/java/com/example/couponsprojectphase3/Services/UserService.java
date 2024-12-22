package com.example.couponsprojectphase3.Services;

import com.example.couponsprojectphase3.Beans.Coupon;
import com.example.couponsprojectphase3.Repositories.CouponRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private CouponRepository couponRepository;
    public UserService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public List<Coupon> getAllCoupons(){
        return couponRepository.findAll();
    }


}
