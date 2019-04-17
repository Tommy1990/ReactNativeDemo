//
//  JSBridge.h
//  myDemoApp
//
//  Created by yong fu on 2019/4/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>
NS_ASSUME_NONNULL_BEGIN

@protocol JSBridge<JSExport>
- (void) callData:(NSString*)funcName Dic:(NSDictionary*) dic HandleFunc:(NSString*) handleFunc ID:(NSString*) ID;
- (void) callData:(NSString*)funcName;

@end

NS_ASSUME_NONNULL_END
