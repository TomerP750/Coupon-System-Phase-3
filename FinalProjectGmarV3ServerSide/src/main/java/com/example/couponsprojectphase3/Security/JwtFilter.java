package com.example.couponsprojectphase3.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;

@Component
@Order(2)
public class JwtFilter extends OncePerRequestFilter {

    private final TokenManager tokenManager;

    public JwtFilter(TokenManager tokenManager) {
        this.tokenManager = tokenManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {

            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Missing or invalid Authorization header!");
                return;
            }

            String token = request.getHeader("Authorization").replace("Bearer ", ""); // GET THE TOKEN
            if (!tokenManager.getActiveTokens().contains(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized, please log in!");
                return;
            }

                DecodedJWT decoded = JWT.decode(token);
                int id = decoded.getClaim("id").asInt();
                String clientType = decoded.getClaim("clientType").asString();


                tokenManager.refreshToken(token);
                if (isAuthorized(request.getServletPath(), clientType.toUpperCase())) {

                    // Set claims in the request attributes
                    request.setAttribute("id", id);

                    // Authorization successful, proceed to next filter or controller


                    filterChain.doFilter(request, response);
                } else {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.getWriter().write("Forbidden: Insufficient permissions!");
                }


        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().println("Unauthorized, Please Log in");
        }
    }

    private boolean isAuthorized(String path, String clientType) {
        if (path.startsWith("/admin") && "ADMINISTRATOR".equalsIgnoreCase(clientType)) {
            return true;
        } else if (path.startsWith("/companies") && "COMPANY".equalsIgnoreCase(clientType)) {
            return true;
        } else if (path.startsWith("/customers") && "CUSTOMER".equalsIgnoreCase(clientType)) {
            return true;
        }
        return false;
    }

    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().startsWith("/auth");
    }


}
