package com.zhenglou.service;

import com.zhenglou.pojo.UserAndToken;
import org.springframework.stereotype.Component;

import java.util.List;
public interface LoginServiceImpl {
    UserAndToken loginQuery(String userName, String password);
}
