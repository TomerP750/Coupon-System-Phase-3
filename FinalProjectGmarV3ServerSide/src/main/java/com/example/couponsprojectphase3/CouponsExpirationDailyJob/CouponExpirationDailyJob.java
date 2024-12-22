package com.example.couponsprojectphase3.CouponsExpirationDailyJob;

import com.example.couponsprojectphase3.Repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Date;

@Component
@Scope("singleton") // just for convenience
public class CouponExpirationDailyJob implements Runnable {
    private CouponRepository couponRepository;

    public CouponExpirationDailyJob(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    @Override
    @Scheduled(cron = "0 0 12 * * ?")
    public void run() {
        couponRepository.deleteCustomersExpiredCoupons();
        couponRepository.deleteExpiredCoupons();
    }


}
