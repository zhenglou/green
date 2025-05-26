package com.zhenglou.config;
import com.zhenglou.utils.JwtTokenUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 从请求头中获取 Token
        String token = request.getHeader("token");
//        System.out.println(token);
        // 校验 Token 的有效性（你可以替换为实际的校验逻辑）
        if (token == null || isValidToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Invalid or missing token");
            return false;
        }

        // 如果校验通过，继续处理请求
        return true;
    }

    private boolean isValidToken(String token) {
        // 模拟 Token 校验逻辑
        System.out.println("请求前置校验");
        return JwtTokenUtil.isTokenExpired(token); // 替换为你的实际校验逻辑
    }
}
