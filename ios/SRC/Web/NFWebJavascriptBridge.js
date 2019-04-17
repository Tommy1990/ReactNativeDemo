

	function callHandler(candelType,candelData,func){
		var callbackId = new Date().getTime();
        console.log(candelData)
        func("123456")
        WebViewJavascriptBridge.callData(candelType,candelData,"callBackData",callbackId)
		
	}
	
	function callBackData(result,callID){
       
		showResponseData(result)
	}
