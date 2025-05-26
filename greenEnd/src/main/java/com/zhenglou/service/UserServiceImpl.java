package com.zhenglou.service;

import com.zhenglou.pojo.User;

import java.util.List;

public interface UserServiceImpl {
    int increaseUserByUser(User user);

    int deleteUserByUserId(int id);

    int upDateUserInfoByUser(User user);

    int upDateUserPoint(User user);

    int upDateUserInfoByUser2(User user);

    List<User> getAllUserInfo();

    List<User> getAllUserInfoOrderByExperience();

    User getUserInfoByUserId(int id);

    List<User> selectByPage(int page);

    User selectByName(String name);

    int upDateExperience(User user);
}
