//
//  VoiceManger.m
//  myDemoApp
//
//  Created by 马继鵬 on 2019/5/3.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "VoiceManger.h"
#import <AVFoundation/AVFoundation.h>
#import <UIKit/UIKit.h>
#import "AppDelegate.h"
@interface VoiceManger()

@property (nonatomic,strong) NSString* filePath;
@property (nonatomic,assign) double startTime;
@property (nonatomic,assign) double endTime;
@property (nonatomic,strong) AVAudioRecorder* recoder;
@end
@implementation VoiceManger
static VoiceManger* manger = nil;
+(instancetype)defaultManger{
  static dispatch_once_t once_token;
  dispatch_once(&once_token, ^{
    manger = [[self alloc]init];
  });
  return manger;
}

- (void) startRecord{
 AVAuthorizationStatus type = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeAudio];
  if (type == AVAuthorizationStatusNotDetermined){
    [AVCaptureDevice requestAccessForMediaType:AVMediaTypeAudio completionHandler:^(BOOL granted) {
      
    }];
    return;
  }else if (type == AVAuthorizationStatusRestricted || type == AVAuthorizationStatusDenied){
    UIViewController* vc = [UIApplication sharedApplication].keyWindow.rootViewController ;
    UIAlertController* alertVC = [UIAlertController alertControllerWithTitle:@"open micro" message:@"Please open micro to recode!" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction* setAction = [UIAlertAction actionWithTitle:@"set" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
      NSURL* url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
      [[UIApplication sharedApplication] openURL:url];
    }];
    UIAlertAction* cancelAction = [UIAlertAction actionWithTitle:@"cancel" style:UIAlertActionStyleCancel handler:nil];
    [alertVC addAction:setAction];
    [alertVC addAction:cancelAction];
    [vc presentViewController:alertVC animated:true completion:nil];
    return;
  }
  
  AVAudioSession* session = [AVAudioSession sharedInstance];
  NSTimeZone* local = [NSTimeZone systemTimeZone];
  double interval = [local secondsFromGMT];
  NSDate* date = [[NSDate alloc]initWithTimeIntervalSinceNow:interval];
  NSDateFormatter* formater = [NSDateFormatter new];
  formater.dateFormat = @"yyyyMMddHHmmss";
  NSString* timeStample = [formater stringFromDate:date];
  _filePath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask, true) firstObject] stringByAppendingString:[NSString stringWithFormat:@"%@.mp4",timeStample]];
 [session setActive:true withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation error:nil];
  [session setActive:true error:nil];
  NSDictionary *recordSetting = [[NSDictionary alloc] initWithObjectsAndKeys:
                                 [NSNumber numberWithFloat: 16000.0],AVSampleRateKey,
                                 [NSNumber numberWithInt: kAudioFormatMPEG4AAC],AVFormatIDKey,
                                 [NSNumber numberWithInt:16],AVLinearPCMBitDepthKey,
                                 [NSNumber numberWithInt: 1], AVNumberOfChannelsKey,
                                 [NSNumber numberWithInt:AVAudioQualityMin],AVEncoderAudioQualityKey,
                                 nil];
  NSError* initError;
  _recoder = nil;
  _startTime = 0;
  _endTime = 0;
  NSURL* recodeUrl = [NSURL URLWithString:_filePath];
  _recoder = [[AVAudioRecorder alloc] initWithURL:recodeUrl settings:recordSetting error:&initError];
  
  [_recoder setMeteringEnabled:true];
  [_recoder prepareToRecord];
  [_recoder record];
  _startTime = [[NSDate new] timeIntervalSince1970];
  
}
-(void)endRecordVoiceWithData:(void (^)(NSData* data,double length)) block{
//  if(!recoder.isRecording){
//    return;
//  }
  [_recoder stop];
  AVAuthorizationStatus type = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeAudio];
  if (type != AVAuthorizationStatusAuthorized){
    return;
  }
  [self getLocalRecodData:^(NSData * data, double length) {
    block(data,length);
  }];
}
-(void)clearOldVoice{
  NSFileManager* fileManager = [NSFileManager defaultManager];
  [fileManager removeItemAtPath:_filePath error:nil];
}
-(void)getLocalRecodData:(void (^)(NSData* data,double length)) block {
  _endTime = [[NSDate new] timeIntervalSince1970];
  NSData* data = [NSData dataWithContentsOfURL:[NSURL URLWithString:_filePath]];
  double length = _endTime - _startTime;
  block(data,length);
  [self clearOldVoice];
  
}
-(void)stopRecord{
  if(_recoder.isRecording){
    [_recoder stop];
    [self clearOldVoice];
  }
}
@end
