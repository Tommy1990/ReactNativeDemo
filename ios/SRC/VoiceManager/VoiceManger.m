//
//  VoiceManger.m
//  myDemoApp
//
//  Created by 马继鵬 on 2019/5/3.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "VoiceManger.h"
#import <AVFoundation/AVFoundation.h>
@interface VoiceManger()

@property (nonatomic,strong) NSString* filePath;
@property (nonatomic,assign) double startTime;
@property (nonatomic,assign) double endTime;
@end
@implementation VoiceManger
static AVAudioRecorder* recoder = nil;
static VoiceManger* manger = nil;
+(instancetype)defaultManger{
  static dispatch_once_t once_token;
  dispatch_once(&once_token, ^{
    manger = [[self alloc]init];
  });
  return manger;
}
+(id)allocWithZone:(struct _NSZone *)zone{
  static dispatch_once_t once_token;
  dispatch_once(&once_token, ^{
    manger = [[self alloc]init];
  });
  return manger;
}
- (void) startRecord{
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
                                 [NSNumber numberWithInt: kAudioFormatLinearPCM],AVFormatIDKey,
                                 [NSNumber numberWithInt:16],AVLinearPCMBitDepthKey,
                                 [NSNumber numberWithInt: 1], AVNumberOfChannelsKey,
                                 [NSNumber numberWithInt:AVAudioQualityMin],AVEncoderAudioQualityKey,
                                 nil];
  NSError* initError;
  recoder = nil;
  _startTime = 0;
  _endTime = 0;
  NSURL* recodeUrl = [NSURL URLWithString:_filePath];
  recoder = [[AVAudioRecorder alloc] initWithURL:recodeUrl settings:recordSetting error:&initError];
  [recoder setMeteringEnabled:true];
  [recoder prepareToRecord];
  [recoder record];
  _startTime = [[NSDate new] timeIntervalSince1970];
  
}
-(void)endRecordVoice{
  if(!recoder.isRecording){
    return;
  }
  [recoder stop];
  _endTime = [[NSDate new] timeIntervalSince1970];
  
}
-(void)clearOldVoice{
  NSFileManager* fileManager = [NSFileManager defaultManager];
  [fileManager removeItemAtPath:_filePath error:nil];
}
-(void)getLocalRecodData:(void (^)(NSData* data,double length)) block {
  NSData* data = [NSData dataWithContentsOfFile:_filePath];
  double length = _endTime - _startTime;
  block(data,length);
  [self clearOldVoice];
  
}
-(void)stopRecord{
  if(recoder.isRecording){
    [recoder stop];
    [self clearOldVoice];
  }
}
@end
