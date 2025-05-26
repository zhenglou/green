package com.zhenglou.service.impl;

import com.zhenglou.mapper.UserMapper;
import com.zhenglou.pojo.User;
import com.zhenglou.pojo.UserAndToken;
import com.zhenglou.service.LoginServiceImpl;
import com.zhenglou.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class LoginService implements LoginServiceImpl{
    @Autowired
    UserMapper userMapper;
    @Override
    public UserAndToken loginQuery(String userName, String password) {
        UserAndToken userResult = null;
        User users = userMapper.userQuery(userName, password);
        if(users == null) return userResult;
        System.out.println(users.getUserName());
        System.out.println(users.getPassword());
        String token = JwtTokenUtil.generateToken(users.getUserName(), users.getPassword());
        userResult = new UserAndToken(users, token);
        return userResult;
    }
}
