package com.example.couponsprojectphase3.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.couponsprojectphase3.LoginManager.ClientType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Set;

@Component
public class TokenManager implements Runnable {

    private Set<String> activeTokens;

    public TokenManager(Set<String> activeTokens) {
        this.activeTokens = activeTokens;
    }

    @Override
    @Scheduled(cron = "0 0/10 * * * ?")
    public void run() {
        activeTokens.removeIf((token) -> JWT.decode(token).getExpiresAt().before(new Date()));
    }

    public void updateTokenLastUpdated() {

    }

    public String createToken(String email,int id, String name ,ClientType clientType) {
        Date expires = new Date();
        expires.setTime(expires.getTime() + 30 * 60 * 1000); // half hour
        return JWT.create()
                .withIssuer("CoupoNest")
                .withIssuedAt(new Date())
                .withClaim("id", id)
                .withClaim("name", name)
                .withClaim("email", email)
                .withClaim("clientType", clientType.toString())
                .withExpiresAt(expires)
                .sign(Algorithm.none());
    }

    public Set<String> getActiveTokens() {
        return activeTokens;
    }

    public void setActiveTokens(Set<String> activeTokens) {
        this.activeTokens = activeTokens;
    }

    // Method to refresh or update the expiration of an existing token
    public String refreshToken(String token) {
        // Decode the existing token to get the claims
        DecodedJWT decoded = JWT.decode(token);
        // Extract the claims from the existing token
        String email = decoded.getClaim("email").asString();
        String clientTypeStr = decoded.getClaim("clientType").asString();
        ClientType clientType = ClientType.valueOf(clientTypeStr);
        int id = decoded.getClaim("id").asInt();
        String name = decoded.getClaim("name").asString();
        // Create a new expiration time (for example, add another 30 minutes)
        Date newExpires = new Date();
        newExpires.setTime(newExpires.getTime() + 30 * 60 * 1000); // half hour more

        // Create a new token with updated expiration
        return JWT.create()
                .withIssuer("CoupoNest")
                .withIssuedAt(new Date())
                .withClaim("id", id)
                .withClaim("name", name)
                .withClaim("email", email)
                .withClaim("clientType", clientType.toString())
                .withExpiresAt(newExpires)
                .sign(Algorithm.none());
    }
}
