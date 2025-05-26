package com.zhenglou.pojo;

public class UserAndToken {
    private User user;
    private String token;

    public UserAndToken() {
    }

    public UserAndToken(User user, String token) {
        this.user = user;
        this.token = token;
    }

    /**
     * 获取
     * @return user
     */
    public User getUser() {
        return user;
    }

    /**
     * 设置
     * @param user
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * 获取
     * @return token
     */
    public String getToken() {
        return token;
    }

    /**
     * 设置
     * @param token
     */
    public void setToken(String token) {
        this.token = token;
    }

    public String toString() {
        return "UserAndToken{user = " + user + ", token = " + token + "}";
    }
}
