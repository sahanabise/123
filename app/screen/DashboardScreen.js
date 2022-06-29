import React from "react" ;
import{ 
    View,
    Text,
    Platform,
    
    StyleSheet 
} from "react-native";
import Constants from 'expo-constants';
//import SideBar from './app/screen/SideBar.js'



const DashBoardScreen=(navigation)=>{

 
        return (  
          
            <View style={styles.container}>
                <Header navigation={navigation} title="Home"  />
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text>Home screen </Text>

                    <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'UserPanelTab' }],  
          })
        }
      >
       
      </Button>
                </View>
            </View>
            
        )
    }
  



const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
    },
})
export default DashBoardScreen  ;