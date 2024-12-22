package com.example.couponsprojectphase3.Repositories;

import com.example.couponsprojectphase3.Beans.Category;
import com.example.couponsprojectphase3.Beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {

    Optional<Coupon> findByIdAndCompanyId(int id, int companyId);

    List<Coupon> findByTitleAndCompanyId(String title, int companyID);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM customers_coupons where coupons_id = ?1",  nativeQuery = true)
    void deleteCustomersVSCouponsCoupons(int couponID);

    @Transactional
    @Modifying
    @Query(value = "DELETE cc FROM customers_coupons cc JOIN coupons c ON cc.coupons_id = c.id WHERE c.end_date < CURDATE()", nativeQuery = true)
    void deleteCustomersExpiredCoupons();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM coupons WHERE end_date < CURDATE()", nativeQuery = true)
    void deleteExpiredCoupons();

    List<Coupon>findByCompanyId(int companyID);

    List<Coupon>findByCompanyIdAndPriceLessThanEqual(int companyID, double price);

    List<Coupon>findByCompanyIdAndCategory(int companyID, Category category);

    @Query(value = "SELECT c.* FROM coupons c JOIN customers_coupons cc ON c.id = cc.coupons_id WHERE cc.customer_id = ?1", nativeQuery = true)
    List<Coupon> getAllCustomerCoupons(int customerID);

    @Query(value = "SELECT * FROM Coupons JOIN customers_coupons ON coupons.id = customers_coupons.coupons_id WHERE customers_coupons.customer_id = ?1 AND coupons.category = ?2", nativeQuery = true)
    List<Coupon>findByCustomerAndCategory(int customerID, Category category);

    @Query(value = "select * from coupons join customers_coupons on coupons.id = customers_coupons.coupons_id where customers_coupons.customer_id = ?1 and price < ?2", nativeQuery = true)
    List<Coupon> getCustomersCouponsByMaxPrice(int customerID ,double maxPrice);

    @Modifying
    @Transactional
    @Query(value = "DELETE cc FROM customers_coupons cc JOIN coupons c ON cc.coupons_id = c.id WHERE c.company_id = ?1;", nativeQuery = true)
    void deleteCustomerCouponsByDeleteCompany(int companyId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO customers_coupons (customer_id, coupons_id) VALUES (?1, ?2)", nativeQuery = true)
    void addCouponPurchase(long customerId, long couponId);

    @Query(value = "SELECT EXISTS ( SELECT * FROM customers_coupons  WHERE (customer_id = ?) and (coupons_id = ?)) as res", nativeQuery = true)
    int existsByCustomerIdAndCouponId(int customerId, int couponId);


}
