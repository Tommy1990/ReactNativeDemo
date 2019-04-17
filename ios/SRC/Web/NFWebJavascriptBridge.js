

	function callHandler(candelType,candelData,func){
		var callbackId = new Date().getTime();
        console.log(candelData)
        func("123456")
//        WebViewJavascriptBridge.callDataDicHandleFuncID(candelType,candelData,"callBackData",callbackId)
    alert("1234567");
    WebViewJavascriptBridge.callData(candelType);
		
	}
	
	function callBackData(result,callID){
       
		showResponseData(result)
	}
