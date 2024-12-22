package com.example.couponsprojectphase3.Controllers;

import com.example.couponsprojectphase3.Beans.Company;
import com.example.couponsprojectphase3.Beans.Customer;
import com.example.couponsprojectphase3.Exceptions.AlreadyExistException;
import com.example.couponsprojectphase3.Exceptions.InvalidInputException;
import com.example.couponsprojectphase3.Exceptions.NotExistException;
import com.example.couponsprojectphase3.Services.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private AdminService adminService;
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("company/add")
    public void addCompany(@RequestBody Company company) throws AlreadyExistException {
        adminService.addCompany(company);
    }

    @DeleteMapping("company/delete/{id}")
    public void deleteCompany(@PathVariable int id) {
        adminService.deleteCompany(id);
    }

    @PutMapping("/company/update")
    public void updateCompany(@RequestBody Company company) throws InvalidInputException, NotExistException, AlreadyExistException {
        adminService.updateCompany(company);
    }

    @GetMapping("company/all")
    public List<Company> getAllCompanies() {
        return adminService.getAllCompanies();
    }

    @GetMapping("company/{id}")
    public Company getCompany(@PathVariable int id) throws NotExistException {
        return adminService.getOneCompany(id);
    }

    @GetMapping("customer/{id}")
    public Customer getCustomer(@PathVariable int id) throws NotExistException {
        return adminService.getOneCustomer(id);
    }

    @GetMapping("customer/all")
    public List<Customer> getAllCustomers() {
        return adminService.getAllCustomers();
    }

    @DeleteMapping("/customer/delete/{id}")
    public void deleteCustomer(@PathVariable int id) {
        adminService.deleteCustomer(id);
    }

    @PutMapping("/customer/update")
    public void updateCustomer(@RequestBody Customer customer) throws InvalidInputException, NotExistException, AlreadyExistException {
        adminService.updateCustomer(customer);
    }

    @PostMapping("customer/add")
    public void addCustomer(@RequestBody Customer customer) throws AlreadyExistException {
        adminService.addCustomer(customer);
    }



}
