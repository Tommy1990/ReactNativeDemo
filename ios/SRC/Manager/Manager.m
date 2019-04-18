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
@end
