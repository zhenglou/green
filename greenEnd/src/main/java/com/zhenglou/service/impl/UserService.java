package com.zhenglou.service.impl;

import com.zhenglou.mapper.UserMapper;
import com.zhenglou.pojo.User;
import com.zhenglou.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserService implements UserServiceImpl {
    @Autowired
    UserMapper userMapper;
    @Override
    public int increaseUserByUser(User user) {
        return userMapper.increaseUserByUser(user);
    }

    @Override
    public int deleteUserByUserId(int id) {
        return userMapper.deleteUserById(id);
    }

    @Override
    public int upDateUserInfoByUser(User user) {
        return userMapper.upDateUser(user);
    }

    @Override
    public int upDateUserPoint(User user) {
        return userMapper.upDateUserPoint(user);
    }

    @Override
    public int upDateUserInfoByUser2(User user) {
        return userMapper.upDateUser2(user);
    }

    @Override
    public List<User> getAllUserInfo() {
        return userMapper.getAllUserInfo();
    }

    @Override
    public User getUserInfoByUserId(int id) {
        return userMapper.getUserInfoById(id);
    }

    @Override
    public List<User> selectByPage(int page) {
        return userMapper.selectByPage(page);
    }

    @Override
    public User selectByName(String name) {
        return userMapper.userQuery2(name);
    }

    @Override
    public int upDateExperience(User user) {
        return userMapper.upDateExperience(user);
    }

    @Override
    public List<User> getAllUserInfoOrderByExperience() {
        return  userMapper.getAllUserInfoOrderByExperience();
    }

}
