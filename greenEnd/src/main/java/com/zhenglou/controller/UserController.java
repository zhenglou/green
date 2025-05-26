package com.zhenglou.controller;

import com.zhenglou.pojo.RecyClingPrice;
import com.zhenglou.pojo.Result;
import com.zhenglou.pojo.User;
import com.zhenglou.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping("/getAllUserInfo")
    public Result getAllUserInfo(){
        List<User> allUserInfo = userService.getAllUserInfo();
        return Result.success(allUserInfo);
    }

    @GetMapping("/getAllUserInfoOrderByExperience")
    public Result getAllUserInfoOrderByExperience(){
        List<User> allUserInfo = userService.getAllUserInfoOrderByExperience();
        return Result.success(allUserInfo);
    }

    @PostMapping("/increaseUserByUser")
    public Result increaseUserByUser(@RequestBody User user){
        int b = userService.increaseUserByUser(user);
        return Result.success(b);
    }
    @PostMapping("/update")
    public int update(@RequestBody User user) {
        return userService.upDateUserInfoByUser(user);
    }
    @PostMapping("/update2")
    public int update2(@RequestBody User user) {
        return userService.upDateUserInfoByUser2(user);
    }

    @PostMapping("/upDateUserPoint")
    public int upDateUserPoint(@RequestBody User user) {
        return userService.upDateUserPoint(user);
    }
    @PostMapping("/upDateExperience")
    public int upDateExperience(@RequestBody User user) {
        return userService.upDateExperience(user);
    }
    @PostMapping("/delete")
    public int delete(@RequestParam int id) {
        System.out.println(id);
        return userService.deleteUserByUserId(id);
    }
    @GetMapping("/selectOne")
    public User selectByOne(@RequestParam int id) {
        return userService.getUserInfoByUserId(id);
    }
    @GetMapping("/selectByPage")
    public List<User> selectByPage(@RequestParam int page) {
        return userService.selectByPage(page);
    }
    @GetMapping("/selectByName")
    public User selectByName(@RequestParam String name) {
        return userService.selectByName(name);
    }
}
