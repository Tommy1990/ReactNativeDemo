//
//  Manager.m
//  myDemoApp
//
//  Created by yong fu on 2019/4/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "Manager.h"
#import <React/RCTBridgeModule.h>
#import "AppDelegate.h"
#import "WebViewController.h"
#import "VoiceManger.h"

@implementation Manager
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(openurl:(NSString*)url){
  UIViewController* vc = [UIApplication sharedApplication].keyWindow.rootViewController ;
  
  [[NSOperationQueue mainQueue] addOperationWithBlock:^{
    WebViewController* temp = [[WebViewController alloc] init];
    temp.isLandScreen = true;
    temp.showStatue = false;
    temp.url = url;
    [vc presentViewController:temp animated:true completion:^{
      
    }];
  }];
};

RCT_EXPORT_METHOD(getLocation:(RCTResponseSenderBlock)callback){
  callback(@[[NSNull null],@"上海"]);
}
RCT_EXPORT_METHOD(startRecode){
  [[VoiceManger defaultManger] startRecord];
  NSLog(@"0000000===start ios");
}
RCT_EXPORT_METHOD(endRecode:(RCTResponseSenderBlock)callback){
  [[VoiceManger defaultManger]endRecordVoice];
  [[VoiceManger defaultManger] getLocalRecodData:^(NSData * _Nonnull data, double length) {
    callback(@[[NSNull null],@[data,[NSNumber numberWithDouble:length]]]);
  }];
  NSLog(@"0000000===end ios");
  
}
RCT_EXPORT_METHOD(stopRecode){
  [[VoiceManger defaultManger] stopRecord];
}
@end
