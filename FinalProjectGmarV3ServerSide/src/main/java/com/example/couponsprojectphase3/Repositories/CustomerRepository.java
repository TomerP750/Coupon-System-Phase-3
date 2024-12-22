package com.example.couponsprojectphase3.Repositories;

import com.example.couponsprojectphase3.Beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Optional<Customer> findByEmail(String email); // not working with type boolean

    List<Customer> findByEmailAndPassword(String email, String password); // not working with type boolean

    boolean existsByEmailAndIdNot(String email, int customerId);

    boolean existsByEmailAndPassword(String email,String password);

    @Query(value = "select customers.id from customers where email=?1 and password=?2", nativeQuery = true)
    int getCustomerID(String email, String password);

    @Query(value = "INSERT INTO customers_coupons(customer_id, coupons_id) values(?1, ?2) ", nativeQuery = true)
    void addCouponPurchase(int customerID, int couponID);

    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "delete from customers_coupons where customer_id = ?1", nativeQuery = true)
    void deleteCustomerCoupons(int customerID);


}
