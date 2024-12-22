package com.example.couponsprojectphase3.Services;

import com.example.couponsprojectphase3.Beans.Company;
import com.example.couponsprojectphase3.Beans.Customer;
import com.example.couponsprojectphase3.Exceptions.AlreadyExistException;
import com.example.couponsprojectphase3.Exceptions.InvalidInputException;
import com.example.couponsprojectphase3.Exceptions.NotExistException;
import com.example.couponsprojectphase3.Repositories.CompanyRepository;
import com.example.couponsprojectphase3.Repositories.CouponRepository;
import com.example.couponsprojectphase3.Repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService extends ClientService {

    private final CouponRepository couponRepository;
    private CompanyRepository companyRepository;
    private CustomerRepository customerRepository;

    public AdminService(CustomerRepository customerRepository, CouponRepository couponRepository, CompanyRepository companyRepository) {
        super(customerRepository, couponRepository, companyRepository);
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.couponRepository = couponRepository;
    }

    public boolean login(String email, String password) {
        if (email.equalsIgnoreCase("admin@admin.com") && password.equals("admin")) {
            return true;
        }
        return false;
    }

//    public void addCompany(Company company) throws InvalidInputException { // change ti exist instead findby
//        if (!companyRepository.findByName(company.getName()).isEmpty()|| !companyRepository.findByEmail(company.getEmail()).isEmpty()) {
//            throw new InvalidInputException("Cannot add a company with already existing name or email");
//        }
//        companyRepository.save(company);
//        System.out.println("Company Added!");
//    }

    public void addCompany(Company company) throws AlreadyExistException {
        if (companyRepository.existsByEmail(company.getEmail())) {
            throw new AlreadyExistException("Company with email already exists!");
        }
        if (companyRepository.existsByName(company.getName())) {
            throw new AlreadyExistException("Company with name already exists!");
        }
        companyRepository.save(company);
        System.out.println("company added!");
    }

    public void updateCompany(Company company) throws NotExistException, InvalidInputException, AlreadyExistException {
        Company compareCompany = companyRepository.findById(company.getId()).orElseThrow(()->new NotExistException("Company not exists"));
        if (company.getId() != compareCompany.getId()) {
            throw new InvalidInputException("Cannot change company id");
        }
        if (!company.getName().equalsIgnoreCase(compareCompany.getName())) {
            throw new InvalidInputException("Cannot change company name");
        }
        if (companyRepository.existsByEmailAndIdNot(compareCompany.getEmail(), company.getId())) {
            throw new AlreadyExistException("Email already exists");
        }

        companyRepository.saveAndFlush(company);
        System.out.println("Company has been updated!");
    }

    public void deleteCompany(int companyID) {
        if (companyRepository.existsById(companyID)) { // do i need validation
            couponRepository.deleteCustomerCouponsByDeleteCompany(companyID); // deletes from customer vs coupons
            companyRepository.deleteCompanyCoupons(companyID); // deletes from coupons table
            companyRepository.deleteById(companyID); // deletes from companies table
            System.out.println("Company and its coupons has been deleted!");
        }
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getOneCompany(int companyID) throws NotExistException {
        return companyRepository.findById(companyID).orElseThrow(()->new NotExistException("Company not exists"));
    }

//    public void addCustomer(Customer customer) throws AlreadyExistException {
//        if (customerRepository.findByEmail(customer.getEmail()).isEmpty()) {
//            customerRepository.save(customer);
//            System.out.println("Customer added!");
//        } else {
//            throw new AlreadyExistException("Email is already exists");
//        }
//    }

    public void addCustomer(Customer customer) throws AlreadyExistException {
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new AlreadyExistException("User with that email already exists!");
        }
        customerRepository.save(customer);
        System.out.println("Customer added!");
    }

    public void updateCustomer(Customer customer) throws InvalidInputException, NotExistException, AlreadyExistException {
        Customer compareCustomer = customerRepository.findById(customer.getId()).orElseThrow(()->new NotExistException("Customer not found"));
        if (customer.getId() != compareCustomer.getId()) {
            throw new InvalidInputException("Cannot change the customer ID");
        }
        if (customerRepository.existsByEmailAndIdNot(compareCustomer.getEmail(), customer.getId())) {
            throw new AlreadyExistException("Email already exists");
        }
        customerRepository.save(customer);
        System.out.println("Customer has been updated!");
    }

    public void deleteCustomer(int customerID) {
        customerRepository.deleteCustomerCoupons(customerID);
        customerRepository.deleteById(customerID);
        System.out.println("Customer has been deleted!");
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getOneCustomer(int customerID) throws NotExistException {
        return customerRepository.findById(customerID).orElseThrow(()->new NotExistException("customer not found"));
    }


}
