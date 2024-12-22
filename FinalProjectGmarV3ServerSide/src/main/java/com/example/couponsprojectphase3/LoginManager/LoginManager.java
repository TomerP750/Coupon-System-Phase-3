package com.example.couponsprojectphase3.LoginManager;


import com.example.couponsprojectphase3.Beans.Company;
import com.example.couponsprojectphase3.Beans.Customer;
import com.example.couponsprojectphase3.Exceptions.InvalidLoginException;
import com.example.couponsprojectphase3.Exceptions.NotExistException;
import com.example.couponsprojectphase3.Repositories.CompanyRepository;
import com.example.couponsprojectphase3.Repositories.CustomerRepository;
import com.example.couponsprojectphase3.Security.TokenManager;
import com.example.couponsprojectphase3.Services.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Scope("singleton") // just for convenience
public class LoginManager {

    private  ApplicationContext ctx;
    private TokenManager tokenManager;

    public LoginManager(ApplicationContext ctx, TokenManager tokenManager) {
        this.ctx = ctx;
        this.tokenManager = tokenManager;
    }

    public String login(String email, String password, ClientType clientType) throws InvalidLoginException, NotExistException {
        switch (clientType) {
            case ADMINISTRATOR:
                AdminService adminService = ctx.getBean(AdminService.class);
                if (adminService.login(email, password)) {
                    String token = tokenManager.createToken(email, -1, "Admin", clientType);
                    tokenManager.getActiveTokens().add(token);
                    return token;
                } else {
                    throw new InvalidLoginException("Email and password are wrong");
                }
            case COMPANY:
                CompanyService companyService = ctx.getBean(CompanyService.class);
                if (companyService.login(email, password)) {
                    Company companyFromDb = ctx.getBean(CompanyRepository.class).findByEmail(email).orElseThrow(()->new NotExistException("Email not found"));
                    String token = tokenManager.createToken(email, companyFromDb.getId(), companyFromDb.getName() ,clientType);
                    tokenManager.getActiveTokens().add(token);
                    return token;
                } else {
                    throw new InvalidLoginException("Email and password are wrong");
                }
            case CUSTOMER:
                CustomerService customerService = ctx.getBean(CustomerService.class);
                if (customerService.login(email, password)) {
                    Customer customerFromDb = ctx.getBean(CustomerRepository.class).findByEmail(email).orElseThrow(()->new NotExistException("Email not found"));
                    String token = tokenManager.createToken(email, customerFromDb.getId(), customerFromDb.getFirstName()+" "+customerFromDb.getLastName() ,clientType);
                    tokenManager.getActiveTokens().add(token);
                    return token;
                } else {
                    throw new InvalidLoginException("Email and password are wrong");
                }
            default:
                throw new InvalidLoginException("Client type not supported");
        }
    }


}
