package com.zhenglou.utils;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.*;
public class BlobTypeHandler extends BaseTypeHandler<byte[]> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, byte[] parameter, JdbcType jdbcType) throws SQLException {
        ps.setBytes(i, parameter);
    }

    @Override
    public byte[] getNullableResult(ResultSet rs, String columnName) throws SQLException {
        Blob blob = rs.getBlob(columnName);
        return blob != null ? blob.getBytes(1, (int) blob.length()) : null;
    }

    @Override
    public byte[] getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        Blob blob = rs.getBlob(columnIndex);
        return blob != null ? blob.getBytes(1, (int) blob.length()) : null;
    }

    @Override
    public byte[] getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        Blob blob = cs.getBlob(columnIndex);
        return blob != null ? blob.getBytes(1, (int) blob.length()) : null;
    }
}
