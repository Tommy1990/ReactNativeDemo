//
//  WebViewController.h
//  myDemoApp
//
//  Created by yong fu on 2019/4/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "JSDelegate.h"
NS_ASSUME_NONNULL_BEGIN

@interface WebViewController : UIViewController

@property (nonatomic,strong) NSString* url;
@property (nonatomic,assign) bool* isLandScreen;
@property (nonatomic,assign) bool* showStatue;
@end

NS_ASSUME_NONNULL_END
