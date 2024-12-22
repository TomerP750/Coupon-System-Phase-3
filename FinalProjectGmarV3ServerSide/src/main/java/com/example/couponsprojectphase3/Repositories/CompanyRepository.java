package com.example.couponsprojectphase3.Repositories;

import com.example.couponsprojectphase3.Beans.Company;
import com.example.couponsprojectphase3.Beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    List<Company> findByName(String name);

    Optional<Company> findByEmail(String email);

    boolean existsByName(String name);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email,int companyId);

    boolean existsByEmailAndPassword(String email, String password);

    @Query(value = "SELECT companies.id FROM companies WHERE email = ?1 and password = ?2 ", nativeQuery = true)
    int getCompanyID(String email, String password);

    //boolean existsByEmail(String email);

    List<Company> findByEmailAndPassword(String email, String password);

    @Query(value = "select * from coupons where company_id = ?1", nativeQuery = true)
    List<Coupon> getCompanyCoupons(int companyID);

    @Query(value = "select * from coupons where company_id = ?1 and price <= ?2", nativeQuery = true)
    List<Coupon> getCompanyCouponsMaxPrice(int companyID, int price);

    //List<Coupon> findByCompanyAndCategory(int companyID, Category category);

    @Modifying
    @Transactional
    @Query(value = "delete from coupons where company_id =?1", nativeQuery = true)
    void deleteCompanyCoupons(int companyID);

//    @Modifying
//    @Transactional
//    @Query(value = "DELETE from customers_coupons JOIN coupons ON customers_coupons.coupons_id = coupons.id WHERE company_id = ?1", nativeQuery = true)
//    void deleteCustomerCouponsByDeleteCompany(int companyId);



}
