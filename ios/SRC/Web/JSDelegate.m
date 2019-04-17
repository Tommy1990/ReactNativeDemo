//
//  JSDelegate.m
//  myDemoApp
//
//  Created by yong fu on 2019/4/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "JSDelegate.h"

@interface JSDelegate()
@property (nonatomic,assign) NSMutableDictionary* resData;

@end

@implementation JSDelegate
- (void)callData:(NSString *)funcName dic:(NSDictionary *)dic handleFunc:(NSString *)handleFunc ID:(NSString *)ID{
  [self.resData setObject:funcName forKey:@"method"];
  NSLog(@"1234567890=====%@",funcName);
  if ([funcName isEqualToString:@"nfShowToast"]){
    [self showToast];
    [_resData setObject:@"1" forKey:@"code"];
    [_resData setObject:@"调用成功" forKey:@"message"];
  }else if ([funcName isEqualToString:@"nfClosePage"]){
    self.closeBlock();
    NSLog(@"1234567890====clled");
    [_resData setObject:@"1" forKey:@"code"];
    [_resData setObject:@"调用成功" forKey:@"message"];
  }
  [self callBackHandleFunc:funcName ID:ID];
  
}
-(void) callData:(NSString *)funcName{
  [self.resData setObject:funcName forKey:@"method"];
  NSLog(@"1234567890=====%@",funcName);
  if ([funcName isEqualToString:@"nfShowToast"]){
    [self showToast];
    [_resData setObject:@"1" forKey:@"code"];
    [_resData setObject:@"调用成功" forKey:@"message"];
  }else if ([funcName isEqualToString:@"nfClosePage"]){
    self.closeBlock();
    NSLog(@"1234567890====clled");
    [_resData setObject:@"1" forKey:@"code"];
    [_resData setObject:@"调用成功" forKey:@"message"];
  }
  [self callBackHandleFunc:funcName ID:@"1234567"];
}

- (void) showToast{
  UIAlertController* alertVC = [UIAlertController alertControllerWithTitle:@"" message:@"toast" preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* cancell = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
  [alertVC addAction:cancell];
  [self.vc presentViewController:alertVC animated:true completion:nil];
  [_resData setObject:@"1" forKey:@"code"];
  [_resData setObject:@"调用成功" forKey:@"message"];
  
}

-(void) callBackHandleFunc:(NSString*) handleFunc ID:(NSString*)ID{
 JSValue* handle = [_jsContext objectForKeyedSubscript:handleFunc];
  NSString* res = [self transDic:_resData];
  NSArray* arr = [[NSArray alloc]initWithObjects:res,ID, nil];
  [handle callWithArguments:arr];
}
-(NSString*) transDic:(NSDictionary*) dic{
  if (![NSJSONSerialization isValidJSONObject:dic]){
    NSLog(@"无法解析");
    return @"";
  }
  NSData * data = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:nil];
  NSString* jsonStr = [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];
  return jsonStr;
}
@end
