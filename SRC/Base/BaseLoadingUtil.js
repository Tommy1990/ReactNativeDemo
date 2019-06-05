let LoadingUtil = {
    showLoading(){
        global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
    },
    dismissLoading(){
        global.mLoadingComponentRef && global.mLoadingComponentRef.dismissLoading();
    }
}
export default LoadingUtil;