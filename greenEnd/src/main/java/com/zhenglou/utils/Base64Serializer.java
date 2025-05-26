package com.zhenglou.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.util.Base64;

public class Base64Serializer extends JsonSerializer<byte[]> {
    @Override
    public void serialize(byte[] value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeString(Base64.getEncoder().encodeToString(value));
    }
}

