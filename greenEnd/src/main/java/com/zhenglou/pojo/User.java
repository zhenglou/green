package com.zhenglou.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer userId;
    private String userName;
    private String password;
    private String phone;
    private Integer role;
    private Integer signInStreak;
    private Integer experience;
    private Integer points;
    private Integer totalPoint;
    private LocalDateTime createTime;
    private String avatar;
    private String openid;
    private String sessionKey;
    private String defaultAddress;
}
