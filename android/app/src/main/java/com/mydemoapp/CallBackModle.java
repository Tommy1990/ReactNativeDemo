package com.mydemoapp;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class CallBackModle extends ReactContextBaseJavaModule {
    public CallBackModle(ReactApplicationContext context){
        super(context);
    }
    @ReactMethod
    public void callbackData(Callback callback){

        callback.invoke(null,"123456789");
    }

    @Nonnull
    @Override
    public String getName() {
        return "Callback";
    }
}
