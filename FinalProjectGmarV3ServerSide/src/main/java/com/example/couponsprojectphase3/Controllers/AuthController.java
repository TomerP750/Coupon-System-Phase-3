package com.example.couponsprojectphase3.Controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.couponsprojectphase3.Exceptions.NotExistException;
import com.example.couponsprojectphase3.Security.TokenManager;
import com.example.couponsprojectphase3.Exceptions.InvalidLoginException;
import com.example.couponsprojectphase3.LoginManager.ClientType;
import com.example.couponsprojectphase3.LoginManager.LoginManager;
import com.example.couponsprojectphase3.Services.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("auth")
public class AuthController {

    private final LoginManager loginManager;
    private final TokenManager tokenManager;

    public AuthController(LoginManager loginManager, TokenManager tokenManager) {
        this.loginManager = loginManager;
        this.tokenManager = tokenManager;

    }

    @PostMapping("login")
    public String login(String email, String password, ClientType clientType) throws InvalidLoginException, NotExistException {
        return loginManager.login(email, password, clientType);

    }

    @GetMapping("logout")
    public void logOut(String token) {
        tokenManager.getActiveTokens().remove(token);
    }


}
