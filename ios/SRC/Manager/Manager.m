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
@interface Manager()
@property (nonatomic,strong) VoiceManger* voiceManager;
@end
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
//录音
RCT_EXPORT_METHOD(startRecode){
  _voiceManager = [VoiceManger defaultManger];
  [[NSOperationQueue mainQueue] addOperationWithBlock:^{
    __weak typeof(self) weakSelf = self;
    [weakSelf.voiceManager startRecord];
  }];
  
  NSLog(@"0000000===start ios");
}
RCT_EXPORT_METHOD(endRecode:(RCTResponseSenderBlock)callback){
  [[NSOperationQueue mainQueue] addOperationWithBlock:^{
    __weak typeof(self) weakSelf = self;
    
    [weakSelf.voiceManager endRecordVoiceWithData:^(NSString * filePath, double length) {
      callback(@[[NSNull null],@[filePath,[NSNumber numberWithDouble:length]]]);
    }];
  }];
}
RCT_EXPORT_METHOD(stopRecode){
  [[NSOperationQueue mainQueue] addOperationWithBlock:^{
    __weak typeof(self) weakSelf = self;
    [weakSelf.voiceManager stopRecord];
  }];
  
}
RCT_EXPORT_METHOD(cleanVoice){
  [[NSOperationQueue mainQueue] addOperationWithBlock:^{
    __weak typeof(self) weakSelf = self;
    [weakSelf.voiceManager clearOldVoice];
  }];
}
//make phone call
RCT_EXPORT_METHOD(makePhoneCall:(NSString*)phoneNum){
  if (phoneNum.length >= 11){
    NSString* tel = [NSString stringWithFormat:@"tel:%@",phoneNum];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
      [[UIApplication sharedApplication] openURL:[NSURL URLWithString:tel]];
    }];
    
  }
}
@end
