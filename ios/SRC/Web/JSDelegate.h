//
//  JSDelegate.h
//  myDemoApp
//
//  Created by yong fu on 2019/4/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "JSBridge.h"
#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>
NS_ASSUME_NONNULL_BEGIN

@interface JSDelegate : NSObject<JSBridge>
@property (nonatomic,weak) UIViewController* vc;
@property (nonatomic,weak) JSContext* jsContext;
@property (nonatomic,strong) void(^closeBlock)(void) ;
@end

NS_ASSUME_NONNULL_END
