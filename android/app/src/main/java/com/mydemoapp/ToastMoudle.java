package com.mydemoapp;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;


public class ToastMoudle extends ReactContextBaseJavaModule {
    private static final  String DURATION_SHORT_KEY = "SHORT";
    private  static  final String DURATION_LONG_KEY = "LONG";

    public ToastMoudle(ReactApplicationContext context){
        super(context);
    }
    @Override
    public String getName() {
        return "ToastExample";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String,Object> contains = new HashMap<>();
        contains.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        contains.put(DURATION_LONG_KEY,Toast.LENGTH_LONG);
        return contains;
    }
    @ReactMethod
    public void show(String message,int dustion){
        Toast.makeText(getReactApplicationContext(),message,dustion).show();
    }
}
