//
//  NSObject+MyDic2OBJ.h
//  myDemoApp
//
//  Created by yong fu on 2019/6/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSObject (MyDic2OBJ)
+(instancetype) MM_initWithDictionary:(NSDictionary *) dic;
@end

NS_ASSUME_NONNULL_END
