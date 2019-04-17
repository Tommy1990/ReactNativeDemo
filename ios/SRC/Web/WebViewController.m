//
//  WebViewController.m
//  myDemoApp
//
//  Created by yong fu on 2019/4/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "WebViewController.h"
#import <WebKit/WebKit.h>
#import "JSDelegate.h"
#import "AppDelegate.h"
@interface WebViewController ()<UIWebViewDelegate>
@property (nonatomic,strong) UIButton* backBtn;
@property (nonatomic,strong) UIWebView* webView;
@property (nonatomic,strong) JSContext* jsContext;
@end

@implementation WebViewController
- (void)viewDidLoad {
    [super viewDidLoad];
  [self setupUI];
    // Do any additional setup after loading the view.
}
- (void) closeBtnTouched:(UIButton*) sender{
  [self dismissViewControllerAnimated:true completion:nil];
}
- (void)viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
  AppDelegate* app = [UIApplication sharedApplication].delegate;
  app.blockRotation = false;
}
-(BOOL)shouldAutorotate{
  return false;
}
- (BOOL)prefersStatusBarHidden{
  return !_showStatue;
}
- (void)setupUI{
  self.view.backgroundColor = UIColor.whiteColor;
  _webView = [[UIWebView alloc]init];
  CGRect screenFrame = [UIScreen mainScreen].bounds;
   AppDelegate* app = [UIApplication sharedApplication].delegate;
  if (self.isLandScreen){
    app.blockRotation = true;
    CGRect frame = CGRectMake(0, 0, screenFrame.size.height, screenFrame.size.width);
    _webView.frame = frame;
  }else{
    _webView.frame = screenFrame;
  }
  _webView.backgroundColor = UIColor.whiteColor;
  _webView.delegate = self;
  _webView.scalesPageToFit = true;
  _webView.scrollView.bounces = true;
  
  if ([_url hasPrefix:@"http://"] || [_url hasPrefix:@"https://"]){
//    NSURL* tempUrl = [NSURL URLWithString:_url] ;
  NSString* path = [[NSBundle mainBundle] pathForResource:@"test" ofType:@"html"];
  NSURL* tempUrl = [NSURL URLWithString:path];
    NSURLRequest* request = [NSURLRequest requestWithURL:tempUrl cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:10000];
    [_webView loadRequest:request];
  }
  
  
  
  [self.view addSubview:_webView];
  _backBtn = [[UIButton alloc]initWithFrame: CGRectMake(20, 20, 40, 20)];
  [_backBtn setTitle:@"close" forState:UIControlStateNormal];
  [_backBtn setTitleColor:UIColor.redColor forState:UIControlStateNormal];
  [_backBtn addTarget:self action:@selector(closeBtnTouched:) forControlEvents:UIControlEventTouchUpInside];
  [self.view insertSubview:_backBtn aboveSubview:_webView];
}

//设置代理

-(void)webViewDidFinishLoad:(UIWebView *)webView{
  _jsContext = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
  [_backBtn setHidden:true];
  JSDelegate* jsDelegate = [[JSDelegate alloc]init];
  jsDelegate.jsContext = _jsContext;
  jsDelegate.vc = self;
  jsDelegate.closeBlock =  ^{
    typeof(self) weakSelf = self;
    [weakSelf dismissViewControllerAnimated:true completion:nil];
    
  };
  
  [_jsContext setObject:jsDelegate forKeyedSubscript:@"WebViewJavascriptBridge"];
}
@end
