package com.zhenglou.utils;

import com.zhenglou.mapper.UserMapper;
import com.zhenglou.pojo.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
public class JwtTokenUtil {
    @Autowired
    UserMapper userMapper;
    // 设置JWT密钥
    private static final String SECRET_KEY = "9b23d16e6b61fcd073e0c0ed2ffb25cd1d8c786ca7a04384dbbc8a3f231a58216b8c2760d3c2c2edb80b6b178e50ff0db4189878768e428bb2b3cae4faee9f1b"; // 生产环境中应更改为更复杂的密钥

    // 设置JWT的过期时间 (单位：毫秒)
    private static final long EXPIRATION_TIME = 86400000L; // 1天

    /**
     * 生成JWT Token
     *
     * @param username 用户名
     * @return 生成的JWT token
     */
    public static String generateToken(String username,String password) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
//                .setSubject(username+":"+password) // 设置JWT主题
                .claim("username", username) // 将用户名存储为自定义claim
                .claim("password", password) // 将密码存储为自定义claim
                .setIssuedAt(now) // 设置签发时间
                .setExpiration(expirationDate) // 设置过期时间
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY) // 使用HS512算法加密并指定密钥
                .compact();
    }

    /**
     * 解析JWT Token
     *
     * @param token JWT Token
     * @return 解析出来的Claims
     */
    public static Claims parseToken(String token) {
//        System.out.println(token+"2222");
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY) // 设置密钥
                    .parseClaimsJws(token) // 解析token
                    .getBody();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }

    /**
     * 获取JWT Token中的用户名
     *
     * @param token JWT Token
     * @return 用户名
     */
    public static String getUsernameFromToken(String token) {
        Claims claims = parseToken(token);
        String username = claims.get("username", String.class);// 获取用户名
        return username;
    }

    /**
     * 验证JWT Token是否过期
     *
     * @param token JWT Token
     * @return 是否过期
     */
    public static boolean isTokenExpired(String token) {
        Claims claims = parseToken(token);

        Date expirationDate = claims.getExpiration();
        return expirationDate.before(new Date());
    }

    /**
     * 验证JWT Token是否有效
     *
     * @param token       JWT Token `
     * @param username    用户名
     * @return 是否有效
     */
    public static boolean validateToken(String token, String username, String password) {
        // 解析Token
        Claims claims = parseToken(token);

        // 获取JWT中的用户名和密码
        String tokenUsername = claims.get("username", String.class); // 从Claims获取用户名
        String tokenPassword = claims.get("password", String.class); // 从Claims获取密码

        // 验证用户名和密码是否一致，以及Token是否过期
        return (username.equals(tokenUsername) && password.equals(tokenPassword) && !isTokenExpired(token));
    }

    public static String[] getAccountAndPasswordFromToken(String token) {
        Claims claims = parseToken(token);
        String username = claims.get("username", String.class); // 获取用户名
        String password = claims.get("password", String.class); // 获取密码
        return new String[] { username, password };
    }
    public static void main(String[] args) {
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        String token = jwtTokenUtil.generateToken("zhenglou","123456");
        System.out.println(token);
        String[] accountAndPasswordFromToken = JwtTokenUtil.getAccountAndPasswordFromToken(token);
        System.out.println(JwtTokenUtil.validateToken(token, accountAndPasswordFromToken[0], accountAndPasswordFromToken[1]));
        for (String s : accountAndPasswordFromToken) {
            System.out.println(s);
        }
    }
}
