package com.zhenglou.controller;


import com.zhenglou.mapper.UserMapper;
import com.zhenglou.pojo.User;
import com.zhenglou.pojo.UserAndToken;
import com.zhenglou.service.impl.LoginService;
import com.zhenglou.utils.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import com.zhenglou.pojo.Result;

@Slf4j
@RestController
@RequestMapping("/")
//@CrossOrigin(origins = "http://localhost:8080", methods = {RequestMethod.GET, RequestMethod.POST})
public class LoginController {
    @Autowired
    LoginService loginService;
    @Autowired
    UserMapper userMapper;
    //    @PostMapping("/login")
//    public Result login(@RequestBody String userName,@RequestBody String password) {
//        System.out.println(userName+"222222222222");
//        return Result.success(loginService.loginQuery(userName, password));
//    }
    @PostMapping("/login")
    public Result login(@RequestBody User user) {

        UserAndToken userInfo = loginService.loginQuery(user.getUserName(), user.getPassword());
        if (userInfo == null) {
            return Result.error("未获取到用户信息");
        }
        return Result.success(userInfo);
    }

    @PostMapping("/getTokenAvailable")
    public Result getTokenAvailable(@RequestBody String token) {
        System.out.println(token+"111111");
        boolean tokenExpired = JwtTokenUtil.isTokenExpired(token);
//        System.out.println(tokenExpired);
        return Result.success(tokenExpired);
    }
//    @PostMapping("/getUserInfoByToken")
//    public Result getUserInfoByToken(@RequestBody String token) {
//        System.out.println(token);
//        if(!JwtTokenUtil.isTokenExpired(token)){
//            return Result.success(null);
//        };
//        return Result.error(null);
//    }
    @GetMapping("/getUserInfoByToken")
    public Result getUserInfoByToken(String token) {
        System.out.println(token);
        if(!JwtTokenUtil.isTokenExpired(token)){
            User user = userMapper.userQuery2(JwtTokenUtil.getUsernameFromToken(token));
            return Result.success(user);
        };
        return Result.error("token过期 请重新登录");
    }
}
