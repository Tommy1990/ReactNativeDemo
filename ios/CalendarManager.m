//
//  CalendarManager.m
//  myDemoApp
//
//  Created by yong fu on 2019/3/18.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import <React/RCTLog.h>
@implementation CalendarManager
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(findEvent:(RCTResponseSenderBlock) callback ){
  callback(@[@"123",@"456"]);
}
@end
