import {Platform,Dimensions} from 'react-native'

export default class BaseDimension {
     getNavHeight(){
        let {width,height} = Dimensions.get('window');
        return Platform.OS === 'ios' && height > 811 ? 44 + 40 : 44 + 20
    }
    getStatueHeight(){
        let {width,height} = Dimensions.get('window');
        return Platform.OS === 'ios' && height > 811 ? 40 : 20
    }
    getScreenHeight(){
        let {height} = Dimensions.get('window');
        return height;
    }
    getScreenWidth(){
        let {width} = Dimensions.get('window');
        return width;
    }
}