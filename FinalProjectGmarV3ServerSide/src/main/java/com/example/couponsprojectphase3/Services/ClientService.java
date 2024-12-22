package com.example.couponsprojectphase3.Services;

import com.example.couponsprojectphase3.Repositories.CompanyRepository;
import com.example.couponsprojectphase3.Repositories.CouponRepository;
import com.example.couponsprojectphase3.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public abstract class ClientService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private CompanyRepository companyRepository;

    public ClientService(CustomerRepository customerRepository, CouponRepository couponRepository, CompanyRepository companyRepository) {
        this.customerRepository = customerRepository;
        this.couponRepository = couponRepository;
        this.companyRepository = companyRepository;
    }

    public abstract boolean login(String email, String password);

}
