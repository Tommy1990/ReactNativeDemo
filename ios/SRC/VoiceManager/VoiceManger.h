//
//  VoiceManger.h
//  myDemoApp
//
//  Created by 马继鵬 on 2019/5/3.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface VoiceManger : NSObject
+ (instancetype)defaultManger;
- (void) startRecord;
- (void) endRecordVoiceWithData:(void (^)(NSData* data,double length)) bloc;
- (void) stopRecord;
//-(void)getLocalRecodData:(void (^)(NSData* data,double length)) block;
@end

NS_ASSUME_NONNULL_END
