//
//  NSObject+MyDic2OBJ.m
//  myDemoApp
//
//  Created by yong fu on 2019/6/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "NSObject+MyDic2OBJ.h"
#import <objc/runtime.h>
#import <objc/message.h>
@implementation NSObject (MyDic2OBJ)
+(instancetype) MM_initWithDictionary:(NSDictionary *) dic{
  id myObj = [[self alloc] init];
  unsigned int outCout;
  objc_property_t* arrPropertys = class_copyPropertyList([self class], &outCout);
  for(NSInteger i = 0;i<outCout;i++){
    objc_property_t property = arrPropertys[i];
    NSString* propertyName = [NSString stringWithUTF8String:property_getName(property)];
    id propertyValue = dic[propertyName];
    if(propertyValue != nil){
      [myObj setValue:propertyValue forKey:propertyName];
    }
  }
  free(arrPropertys);
  return myObj;
}
@end
