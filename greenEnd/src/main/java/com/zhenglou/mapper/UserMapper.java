package com.zhenglou.mapper;

import com.zhenglou.pojo.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface UserMapper {
    //    List<User> userList(Integer id);
//
//    @Delete("delete from users where id = #{id}")
//    void userDelete(Integer id);
//
//    @Insert("insert into users (name, age, gender, phone) values (#{name},#{age},#{gender},#{phone})")
//    void userAdd(User user);
    @Select("select * from users")
    List<User> getAllUserInfo();

    @Select("select * from users order by experience desc ")
    List<User> getAllUserInfoOrderByExperience();

    @Select("select * from users limit 6 offset ${(page-1) * 6};")
    List<User> selectByPage(int page);

    @Insert("INSERT into users(userName, password, role) VALUES (#{userName}, #{password}, #{role})")
    int increaseUserByUser(User user);

    @Update("UPDATE users " +
            "SET userName = #{userName}, " +
            "password = #{password}, " +
            "phone = #{phone}, " +
            "role = #{role}, " +
            "signInStreak = #{signInStreak}, " +
            "experience = #{experience}, " +
            "points = #{points} " +
            "WHERE userId = #{userId}")
    int upDateUser(User user);

    @Update("UPDATE users " +
            "SET userName = #{userName}, " +
            "password = #{password}, " +
            "phone = #{phone}, " +
            "defaultAddress = #{defaultAddress} " +
            "WHERE userId = #{userId}")
    int upDateUser2(User user);


    @Update("UPDATE users " +
            "SET points = users.points + #{points} " +
            "WHERE userId = #{userId}")
    int upDateUserPoint(User user);

    @Update("update users set experience = users.experience + #{experience} where userId = #{userId}")
    int upDateExperience(User user);

    @Delete("DELETE FROM users WHERE userId = #{userId}")
    int deleteUserById(@Param("userId") int userId);

    @Select("select * from users where userName = #{userName} and password = #{password}")
    User userQuery(@Param("userName") String userName, @Param("password") String password);

    @Select("select * from users where userName = #{userName}")
    User userQuery2(@Param("userName") String userName);

    @Select("select * from users where userId = #{userId}")
    User getUserInfoById(@Param("userId") int userId);

}
